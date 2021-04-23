from django.contrib.auth import get_user_model
from django.test import TestCase
from django.urls import reverse

from rest_framework import status
from rest_framework.test import APIClient

from core.models import Movie, Genre

from movie.serializers import MovieSerializer, MovieDetailSerializer


MOVIES_URL = reverse('movie:movie-list')


def detail_url(movie_id):
    """Return movie detail URL
    """
    return reverse('movie:movie-detail', args=[movie_id])


def sample_genre(user, name='Sample Genre'):
    """Create and return a sample genre
    """
    return Genre.objects.create(user=user, name=name)


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

    def test_view_movie_detail(self):
        """Test viewing a movie detail
        """
        movie = sample_movie(user=self.user)
        movie.genre.add(sample_genre(user=self.user))

        url = detail_url(movie.id)
        res = self.client.get(url)

        serializer = MovieDetailSerializer(movie)
        self.assertEqual(res.data, serializer.data)

    def test_create_basic_movie(self):
        """Test creating movie
        """
        payload = {
            'title': 'Interstellar',
            'description': 'A movie that will blow your mind',
            'stock': 100,
            'rental_price': 2.50,
            'sale_price': 10.00,
            'availability': True
        }
        res = self.client.post(MOVIES_URL, payload)

        self.assertEqual(res.status_code, status.HTTP_201_CREATED)
        movie = Movie.objects.get(id=res.data['id'])
        for key in payload.keys():
            self.assertEqual(payload[key], getattr(movie, key))

    def test_create_basic_movie_no_admin(self):
        """Test creating movie with a non admin user
        """
        payload = {
            'title': 'Interstellar',
            'description': 'A movie that will blow your mind',
            'stock': 100,
            'rental_price': 2.50,
            'sale_price': 10.00,
            'availability': True
        }
        res = self.client_nonadmin.post(MOVIES_URL, payload)

        self.assertEqual(res.status_code, status.HTTP_403_FORBIDDEN)

    def test_create_movie_with_genre(self):
        """Test creating a movie with genre
        """
        genre1 = sample_genre(user=self.user, name='Sci-fy')
        genre2 = sample_genre(user=self.user, name='Suspense')
        payload = {
            'title': 'Interstellar',
            'description': 'A movie that will blow your mind',
            'genre': [genre1.id, genre2.id],
            'stock': 100,
            'rental_price': 2.50,
            'sale_price': 10.00,
            'availability': True
        }
        res = self.client.post(MOVIES_URL, payload)

        self.assertEqual(res.status_code, status.HTTP_201_CREATED)
        movie = Movie.objects.get(id=res.data['id'])
        genres = movie.genre.all()
        self.assertEqual(genres.count(), 2)
        self.assertIn(genre1, genres)
        self.assertIn(genre2, genres)

    def test_partial_update_movie(self):
        """Test updating a movie with patch
        """
        movie = sample_movie(user=self.user)
        movie.genre.add(sample_genre(user=self.user))
        new_genre = sample_genre(user=self.user, name='Action')

        payload = {
            'title': 'Avengers: Infinity War',
            'genre': [new_genre.id],
            'availability': False
        }
        url = detail_url(movie.id)
        self.client.patch(url, payload)

        movie.refresh_from_db()
        self.assertEqual(movie.title, payload['title'])
        self.assertEqual(movie.availability, payload['availability'])
        genres = movie.genre.all()
        self.assertEqual(len(genres), 1)
        self.assertIn(new_genre, genres)

    def test_full_update_movie(self):
        """Test updating a recipe with put
        """
        movie = sample_movie(user=self.user)
        movie.genre.add(sample_genre(user=self.user))
        payload = {
            'title': 'Interstellar',
            'description': 'A movie that will blow your mind',
            'stock': 200,
            'rental_price': 3.50,
            'sale_price': 12.00,
            'availability': False
        }
        url = detail_url(movie.id)
        self.client.put(url, payload)

        movie.refresh_from_db()
        self.assertEqual(movie.title, payload['title'])
        self.assertEqual(movie.description, payload['description'])
        self.assertEqual(movie.stock, payload['stock'])
        self.assertEqual(movie.rental_price, payload['rental_price'])
        self.assertEqual(movie.sale_price, payload['sale_price'])
        self.assertEqual(movie.availability, payload['availability'])
        genre = movie.genre.all()
        self.assertEqual(len(genre), 0)
