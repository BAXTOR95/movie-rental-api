from django.contrib.auth import get_user_model
from django.test import TestCase
from django.urls import reverse

from rest_framework import status
from rest_framework.test import APIClient

from core.models import Movie

from movie.serializers import MovieSerializer


MOVIES_URL = reverse('movie:movie-list')


def sample_movie(user, **params):
    """Create and return a sample movie
    """
    defaults = {
        'title': 'Sample movie',
        'description': 'Sample description',
        'image': 'http://image.com/image.jpg',
        'stock': 100,
        'rental_price': 2.50,
        'sale_price': 10.00,
        'availability': True
    }
    defaults.update(params)

    return Movie.objects.create(user=user, **defaults)


class PublicMovieApiTests(TestCase):
    """Test unauthenticated movie API access
    """

    def setUp(self):
        self.client = APIClient()

    def test_auth_required(self):
        """Test that no authentication is required to view the movies
        """
        res = self.client.get(MOVIES_URL)

        self.assertEqual(res.status_code, status.HTTP_200_OK)


class PrivateMovieApiTests(TestCase):
    """Test authenticated movie API access
    """

    def setUp(self):
        # admin user
        self.client = APIClient()
        self.user = get_user_model().objects.create_superuser(
            'admin@gmail.com',
            'testpass'
        )
        self.client.force_authenticate(self.user)

        # non admin user
        self.client_nonadmin = APIClient()
        self.user_nonadmin = get_user_model().objects.create_user(
            'test@gmail.com',
            'testpass'
        )
        self.client_nonadmin.force_authenticate(self.user_nonadmin)

    def test_retrieve_movies(self):
        """Test retrieving a list of movies
        """
        sample_movie(user=self.user)
        sample_movie(user=self.user)

        res = self.client.get(MOVIES_URL)

        movies = Movie.objects.all()
        serializer = MovieSerializer(movies, many=True)
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(res.data, serializer.data)

    def test_movies_not_limited_to_user(self):
        """Retrieving movies for all users
        """
        user2 = get_user_model().objects.create_superuser(
            'admin2@gmail.com',
            'password123'
        )
        sample_movie(user=user2)
        sample_movie(user=self.user)

        res = self.client.get(MOVIES_URL)

        movies = Movie.objects.all()
        serializer = MovieSerializer(movies, many=True)
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(len(res.data), 2)
        self.assertEqual(res.data, serializer.data)
