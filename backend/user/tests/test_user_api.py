from django.test import TestCase
from django.contrib.auth import get_user_model
from django.urls import reverse

from rest_framework.test import APIClient
from rest_framework import status


CREATE_USER_URL = reverse('user:create')
TOKEN_URL = reverse('user:token')
TOKEN_REFRESH_URL = reverse('user:token_refresh')
LOGOUT_URL = reverse('user:logout')
ME_URL = reverse('user:me')


def create_user(**params):
    return get_user_model().objects.create_user(**params)


class PublicUserApiTests(TestCase):
    """Test the users API (public)
    """

    def setUp(self):
        self.client = APIClient()

    def test_create_valid_user_success(self):
        """Test creating user with valid payload is successful
        """
        payload = {
            'email': 'test@gmail.com',
            'password': 'testpass',
            'name': 'Test Name'
        }
        res = self.client.post(CREATE_USER_URL, payload)

        self.assertEqual(res.status_code, status.HTTP_201_CREATED)
        user = get_user_model().objects.get(**res.data)
        self.assertTrue(user.check_password(payload['password']))
        self.assertNotIn('password', res.data)

    def test_user_exists(self):
        """Test creating a user that already exists fails
        """
        payload = {'email': 'test@gmail.com', 'password': 'testpass'}
        create_user(**payload)

        res = self.client.post(CREATE_USER_URL, payload)

        self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)

    def test_password_too_short(self):
        """Test that the password must be more than 5 characters
        """
        payload = {'email': 'test@gmail.com', 'password': 'pwd'}
        res = self.client.post(CREATE_USER_URL, payload)

        self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)
        user_exists = get_user_model().objects.filter(
            email=payload['email']
        ).exists()
        self.assertFalse(user_exists)

    def test_create_token_for_user(self):
        """Test that a token is created for the user
        """
        payload = {'email': 'test@gmail.com', 'password': 'testpass'}
        create_user(**payload)
        res = self.client.post(TOKEN_URL, payload)

        self.assertIn('access', res.data)
        self.assertIn('refresh', res.data)
        self.assertEqual(res.status_code, status.HTTP_200_OK)

    def test_create_token_invalid_credentials(self):
        """Test that token is not created if invalid credentials are given
        """
        create_user(email='test@gmail.com', password='testpass')
        payload = {'email': 'test@gmail.com', 'password': 'wrong'}
        res = self.client.post(TOKEN_URL, payload)

        self.assertNotIn('access', res.data)
        self.assertNotIn('refresh', res.data)
        self.assertEqual(res.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_create_token_no_user(self):
        """Test that token is not created if user doesn't exist
        """
        payload = {'email': 'test@gmail.com', 'password': 'testpass'}
        res = self.client.post(TOKEN_URL, payload)

        self.assertNotIn('access', res.data)
        self.assertNotIn('refresh', res.data)
        self.assertEqual(res.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_create_token_missing_field(self):
        """Test that email and password are required
        """
        res = self.client.post(TOKEN_URL, {'email': 'one', 'password': ''})
        self.assertNotIn('access', res.data)
        self.assertNotIn('refresh', res.data)
        self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)

    def test_retrieve_user_unauthorized(self):
        """Test that authentication is required for users
        """
        res = self.client.get(ME_URL)

        self.assertEqual(res.status_code, status.HTTP_401_UNAUTHORIZED)


class PrivateUserApiTests(TestCase):
    """Test API request that require authentication
    """

    def setUp(self):
        self.user = create_user(
            email='test@gmail.com',
            password='testpass',
            name='name'
        )
        self.client = APIClient()
        self.client.force_authenticate(user=self.user)

    def test_retrieve_profile_success(self):
        """Test retrieving profile for logged in user
        """
        res = self.client.get(ME_URL)

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(res.data, {
            'name': self.user.name,
            'email': self.user.email
        })

    def test_post_me_not_allowed(self):
        """Test that POST is not allowed on the me url
        """
        res = self.client.post(ME_URL, {})

        self.assertEqual(res.status_code, status.HTTP_405_METHOD_NOT_ALLOWED)

    def test_update_user_profile(self):
        """Test updating the user profile for authenticated user
        """
        payload = {'name': 'new name', 'password': 'newpassword123'}

        res = self.client.patch(ME_URL, payload)

        self.user.refresh_from_db()
        self.assertEqual(self.user.name, payload['name'])
        self.assertTrue(self.user.check_password(payload['password']))
        self.assertEqual(res.status_code, status.HTTP_200_OK)

    def test_refresh_token(self):
        """Test that token is refreshed
        """
        payload = {'email': 'test2@gmail.com', 'password': 'testpass'}
        create_user(**payload)
        res_token = self.client.post(TOKEN_URL, payload)
        refresh = res_token.data['refresh']
        res_refresh = self.client.post(TOKEN_REFRESH_URL, {'refresh': refresh})
        self.assertIn('refresh', res_refresh.data)
        self.assertIn('access', res_refresh.data)
        self.assertEqual(res_refresh.status_code, status.HTTP_200_OK)

    def test_logout_user(self):
        """Test that user is logged out successfully
        """
        payload = {'email': 'test2@gmail.com', 'password': 'testpass'}
        create_user(**payload)
        res_token = self.client.post(TOKEN_URL, payload)
        refresh = res_token.data['refresh']
        res_logout = self.client.post(LOGOUT_URL, {'refresh': refresh})
        self.assertEqual(res_logout.status_code, status.HTTP_205_RESET_CONTENT)