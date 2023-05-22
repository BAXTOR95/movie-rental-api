import uuid
import os
import logging
from decimal import Decimal
from django.db import models
from django.db.models import F
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, \
    PermissionsMixin
from django.db.utils import IntegrityError
from django.utils import timezone
from django.utils.translation import gettext_lazy as _
from django.conf import settings

logger = logging.getLogger(__name__)


def movie_image_file_path(instance, filename):
    """Generate file path for new movie image
    """
    ext = filename.split('.')[-1]
    filename = f'{uuid.uuid4()}.{ext}'

    return os.path.join('uploads/movie/', filename)


class UserManager(BaseUserManager):

    def create_user(self, email, name, password=None, **extra_fields):
        """Creates and saves a new user

        Args:
            email (string): User email
            name (string): User name
            password (string, optional): User Password. Defaults to None.

        Returns:
            Object: The user model
        """
        if not email:
            raise ValueError(_('Users must have an email address'))

        user = self.model(
            email=self.normalize_email(email),
            name=name,
            **extra_fields)
        user.set_password(password)
        user.save(using=self._db)

        return user

    def create_superuser(self, email, name, password, **extra_fields):
        """Creates and saves a new superuser

        Args:
            email (string): User email
            name (string): User name
            password (string): User Password

        Returns:
            Object: The user model
        """
        user = self.create_user(email, name, password)
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)

        return user


class User(AbstractBaseUser, PermissionsMixin):
    """Custom user model that supports using email instead of username
    """
    email = models.EmailField(max_length=255, unique=True)
    name = models.CharField(max_length=255)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['name', 'is_staff']

    def get_full_name(self):
        return self.name

    def get_short_name(self):
        return self.name

    def __str__(self):
        return self.email


class Genre(models.Model):
    """Genre to be used for a movie
    """
    name = models.CharField(max_length=255)
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
    )

    def __str__(self):
        return self.name


class Movie(models.Model):
    """Movie object
    """
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
    )
    title = models.CharField(max_length=255)
    description = models.CharField(max_length=255)
    link = models.CharField(max_length=255, blank=True)
    genre = models.ManyToManyField('Genre')
    image = models.ImageField(
        null=True, upload_to=movie_image_file_path)
    stock = models.IntegerField()
    rental_price = models.DecimalField(max_digits=5, decimal_places=2)
    sale_price = models.DecimalField(max_digits=5, decimal_places=2)
    availability = models.BooleanField(default=True)

    @property
    def likes(self):
        """Returns the movies like count
        """
        return LikedMovie.objects.filter(movie_id=self.pk).count()

    def save(self, *args, **kwargs):
        if self.stock == 0:
            self.availability = False
        else:
            self.availability = True
        super(Movie, self).save(*args, **kwargs)

    def __str__(self):
        return self.title


class Rental(models.Model):
    """Rental movie object
    """
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE
    )
    movie = models.ForeignKey(
        'Movie',
        on_delete=models.CASCADE
    )
    date_out = models.DateTimeField(default=timezone.now, blank=True)
    date_returned = models.DateTimeField(
        auto_now=False, null=True)
    daily_rental_fee = models.DecimalField(
        max_digits=5, decimal_places=2, default=Decimal('0.00'))
    rental_debt = models.DecimalField(
        max_digits=5, decimal_places=2, default=Decimal('0.00'))

    @property
    def calculated_rental_debt(self):
        """Returns the amount to pay for the rented movie
        """
        local_do = timezone.localtime(
            self.date_out, timezone.get_fixed_timezone(60)
        )
        print("local_do", local_do)
        local_dr = timezone.localtime(
            timezone.now(), timezone.get_fixed_timezone(60)
        )
        print("local_dr", local_dr)
        if self.date_returned:
            local_dr = timezone.localtime(
                self.date_returned, timezone.get_fixed_timezone(60)
            )
        days_in_debt = local_dr-local_do
        print("days_in_debt", days_in_debt)
        debt_to_pay = days_in_debt.days * self.daily_rental_fee
        print("debt_to_pay", debt_to_pay)
        # if rental debt == 0 set it to rental price
        if debt_to_pay == 0:
            debt_to_pay = self.movie.rental_price

        return debt_to_pay

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=['user', 'movie', 'date_returned'],
                name='unique movie returned'
            )
        ]

    def save(self, *args, **kwargs):
        # Calculate rental debt
        self.rental_debt = str(self.calculated_rental_debt)
        # if rental fee == 0 set it to rental price
        if float(self.daily_rental_fee) == 0:
            self.daily_rental_fee = self.movie.rental_price
        # if movie returned, calculate the debt
        if self.date_returned:
            # Increment stock count from movie
            Movie.objects.filter(pk=self.movie.id).update(
                stock=F('stock')+1)
            # Calculate rental debt
            # save the calculated debt to the rental_debt field
            logger.debug(
                f'Movie id={self.movie.id} returned on {self.date_returned} ' +
                f'by user id={self.user.id} with a debt of {self.rental_debt}')
        elif not self.pk:
            # Decrement stock count from movie
            Movie.objects.filter(pk=self.movie.id).update(stock=F('stock')-1)
        super(Rental, self).save(*args, **kwargs)

    def __str__(self):
        return f'{self.user.email}-{self.movie.title}-{self.date_out}'


class Purchase(models.Model):
    """Purchase movie object
    """
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE
    )
    movie = models.ForeignKey(
        'Movie',
        on_delete=models.CASCADE
    )
    date_bought = models.DateTimeField(default=timezone.now, blank=True)
    purchase_price = models.DecimalField(
        max_digits=5, decimal_places=2, default=Decimal('0.00'))

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=['user', 'movie', 'date_bought'],
                name='unique movie bought'
            )
        ]

    def save(self, *args, **kwargs):
        # if purchase price == 0 set it to rental price
        if float(self.purchase_price) == 0:
            self.purchase_price = self.movie.sale_price
        if not self.pk:
            # Decrement stock count from movie
            Movie.objects.filter(pk=self.movie.id).update(stock=F('stock')-1)
        logger.debug(
            f'User id={self.user.id} bought the Movie id={self.movie.id} ' +
            f'on {self.date_bought} for a price={self.purchase_price}')
        super(Purchase, self).save(*args, **kwargs)

    def __str__(self):
        return f'{self.user.email}-{self.movie.title}-{self.date_bought}'


class LikedMovie(models.Model):
    """Liked movie object
    """
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE
    )
    movie = models.ForeignKey(
        'Movie',
        on_delete=models.CASCADE
    )

    def save(self, *args, **kwargs):
        # if purchase price == 0 set it to rental price
        try:
            super(LikedMovie, self).save(*args, **kwargs)
        except IntegrityError:
            raise IntegrityError("You already liked this movie.")

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=['user', 'movie'], name='unique movie liked')
        ]

    def __str__(self):
        return f'{self.user.email}-{self.movie.title}'
