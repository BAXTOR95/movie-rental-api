from rest_framework import viewsets, mixins
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import (
    IsAdminUser, BasePermission, SAFE_METHODS)

from core.models import Genre, Movie

from movie import serializers


class IsAdminOrReadOnly(BasePermission):
    """Object-level permission to only allow admin users to edit an object
    """

    def has_permission(self, request, view):
        # Read permissions are allowed to any request,
        # so we'll always allow GET, HEAD or OPTIONS requests.
        if request.method in SAFE_METHODS:
            return True

        # Instance must belong to an admin user
        return request.user.is_staff


class BaseMovieAttrViewSet(viewsets.GenericViewSet,
                           mixins.ListModelMixin,
                           mixins.CreateModelMixin):
    """Base viewset for movie attributes
    """
    authentication_classes = (JWTAuthentication,)

    def get_queryset(self):
        """Return objects for the current authenticated user only
        """
        return self.queryset.filter(user=self.request.user).order_by('-name')

    def perform_create(self, serializer):
        """Create a new object
        """
        serializer.save(user=self.request.user)


class GenreViewSet(BaseMovieAttrViewSet):
    """Manage Genre in the database
    """
    permission_classes = (IsAdminUser,)
    queryset = Genre.objects.all()
    serializer_class = serializers.GenreSerializer


class MovieViewSet(viewsets.ModelViewSet):
    """Manage movies in the database
    """
    serializer_class = serializers.MovieSerializer
    queryset = Movie.objects.all()
    authentication_classes = (JWTAuthentication,)
    permission_classes = (IsAdminOrReadOnly,)

    def get_queryset(self):
        """Retrieve the movies for all users
        """
        return self.queryset.all()

    def get_serializer_class(self):
        """Return appropriate serializer class
        """
        if self.action == 'retrieve':
            return serializers.MovieDetailSerializer

        return self.serializer_class

    def perform_create(self, serializer):
        """Create a new movie
        """
        serializer.save(user=self.request.user)
