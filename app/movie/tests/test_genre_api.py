from django.contrib.auth import get_user_model
from django.urls import reverse
from django.test import TestCase

from rest_framework import status
from rest_framework.test import APIClient

from core.models import Genre

from movie.serializers import GenreSerializer


GENRE_URL = reverse('movie:genre-list')


def create_user(**params):
    return get_user_model().objects.create_user(**params)


def create_superuser(**params):
    return get_user_model().objects.create_superuser(**params)


class PublicGenreApiTests(TestCase):
    """Test the publicly available genre API
    """

    def setUp(self):
        self.client = APIClient()

    def test_login_required(self):
        """Test that login is required for retrieving tags
        """
        res = self.client.get(GENRE_URL)

        self.assertEqual(res.status_code, status.HTTP_401_UNAUTHORIZED)


class PrivateGenreApiTests(TestCase):
    """Test the authorized user genre API
    """

    def setUp(self):
        # Set Up Admin user
        self.user = create_superuser(
            email='admin@gmail.com', password='password123')
        self.client = APIClient()
        self.client.force_authenticate(self.user)

        # Set Up Normal user
        self.user_nonadmin = create_user(
            email='test@gmail.com', password='password123')
        self.client_nonadmin = APIClient()
        self.client_nonadmin.force_authenticate(self.user_nonadmin)

    def test_retrieve_genre_normal_user(self):
        """Test retrieving genre with a normal user
        """
        Genre.objects.create(user=self.user, name='Action')
        Genre.objects.create(user=self.user, name='Fantasy')

        res = self.client_nonadmin.get(GENRE_URL)

        self.assertEqual(res.status_code, status.HTTP_403_FORBIDDEN)

    def test_retrieve_genre_admin_user(self):
        """Test retrieving genre with an admin user
        """
        Genre.objects.create(user=self.user, name='Fantasy')
        Genre.objects.create(user=self.user, name='Action')

        res = self.client.get(GENRE_URL)

        genres = Genre.objects.all().order_by('-name')
        serializer = GenreSerializer(genres, many=True)
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(res.data, serializer.data)

    def test_genre_limited_to_user(self):
        """Test that genre returned are for the authenticated user
        """
        user2 = get_user_model().objects.create_superuser(
            'otheradmin@gmail.com',
            'testpass'
        )
        Genre.objects.create(user=user2, name='Romantic')
        genre = Genre.objects.create(user=self.user, name='Action')

        res = self.client.get(GENRE_URL)

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(len(res.data), 1)
        self.assertEqual(res.data[0]['name'], genre.name)

    def test_create_genre_successful(self):
        """Test creating a new genre as admin user
        """
        payload = {'name': 'Test Genre'}
        self.client.post(GENRE_URL, payload)

        exists = Genre.objects.filter(
            user=self.user,
            name=payload['name']
        ).exists()
        self.assertTrue(exists)

    def test_create_genre_unsuccessful(self):
        """Test creating a new genre as a normal user
        """
        payload = {'name': 'Test Genre'}
        res = self.client_nonadmin.post(GENRE_URL, payload)

        exists = Genre.objects.filter(
            user=self.user_nonadmin,
            name=payload['name']
        ).exists()
        self.assertTrue(not exists)
        self.assertEqual(res.status_code, status.HTTP_403_FORBIDDEN)

    def test_create_tag_invalid(self):
        """Test creating a new tag with invalid payload
        """
        payload = {'name': ''}
        res = self.client.post(GENRE_URL, payload)

        self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)
