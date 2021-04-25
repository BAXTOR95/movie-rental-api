from unittest.mock import patch
from django.utils import timezone

from django.test import TestCase
from django.contrib.auth import get_user_model

from core import models


def sample_user(email='test@gmail.com', password='testpass'):
    """Create a sample user

    Args:
        email (str, optional): user email. Defaults to 'test@gmail.com'.
        password (str, optional): user password. Defaults to 'testpass'.
    """
    return get_user_model().objects.create_user(email, password)


def sample_movie(user, **params):
    """Create and return a sample movie
    """
    defaults = {
        'title': 'Sample movie',
        'description': 'Sample description',
        'stock': 100,
        'rental_price': 2.50,
        'sale_price': 10.00,
        'availability': True
    }
    defaults.update(params)

    return models.Movie.objects.create(user=user, **defaults)


class ModelTests(TestCase):

    def test_create_user_with_email_successful(self):
        """Test creating a new user with an email is successful"""
        email = 'test@gmail.com'
        name = 'Test User'
        password = 'Testpass123'
        user = get_user_model().objects.create_user(
            email=email,
            name=name,
            password=password
        )

        self.assertEqual(user.email, email)
        self.assertTrue(user.check_password(password))

    def test_new_user_email_normalized(self):
        """Test the email for a new user is normalized
        """
        email = 'test@GMAIL.COM'
        user = get_user_model().objects.create_user(
            email,
            'test name',
            'test123'
        )

        self.assertEqual(user.email, email.lower())

    def test_new_user_invalid_email(self):
        """Test creating user with no email raises error
        """
        with self.assertRaises(ValueError):
            get_user_model().objects.create_user(None, 'test name', 'test123')

    def test_create_new_superuser(self):
        """Test creating a new superuser
        """
        user = get_user_model().objects.create_superuser(
            'test@gmail.com',
            'test name',
            'test123'
        )

        self.assertTrue(user.is_superuser)
        self.assertTrue(user.is_staff)

    def test_genre_str(self):
        """Test the genre string representation
        """
        genre = models.Genre.objects.create(
            user=sample_user(),
            name='Action'
        )

        self.assertEqual(str(genre), genre.name)

    def test_movie_str(self):
        """Test the movie string representation
        """
        movie = models.Movie.objects.create(
            user=sample_user(),
            title='Interstellar',
            description='A movie that will blow your mind',
            stock=100,
            rental_price=2.50,
            sale_price=10.00,
            availability=True
        )

        self.assertEqual(str(movie), movie.title)

    @patch('uuid.uuid4')
    def test_movie_file_name_uuid(self, mock_uuid):
        """Test that image is save in the correct location
        """
        uuid = 'test-uuid'
        mock_uuid.return_value = uuid
        file_path = models.movie_image_file_path(None, 'image.jpg')

        exp_path = f'uploads/movie/{uuid}.jpg'
        self.assertEqual(file_path, exp_path)

    def test_rental_str(self):
        """Test the rental string representation
        """
        user = sample_user()
        movie = sample_movie(user=user)
        date_now = timezone.now()
        rental = models.Rental.objects.create(
            user=user,
            movie=movie,
            date_out=date_now,
            daily_rental_fee=2.50
        )

        self.assertEqual(
            str(rental), f'{user.email}-{movie.title}-{rental.date_out}')
