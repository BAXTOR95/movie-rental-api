from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import viewsets, mixins, status
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
        assigned_only = bool(
            int(self.request.query_params.get('assigned_only', 0))
        )
        queryset = self.queryset
        if assigned_only:
            queryset = queryset.filter(movie__isnull=False)

        return queryset.filter(
            user=self.request.user
        ).order_by('-name').distinct()

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

    def _params_to_ints(self, qs):
        """Convert a list of string IDs to a list of integers

        Args:
            qs (list): Query String
        """
        return [int(str_id) for str_id in qs.split(',')]

    def get_queryset(self):
        """Retrieve the movies for all users
        """
        genre = self.request.query_params.get('genre')
        availability = self.request.query_params.get('availability')
        queryset = self.queryset
        is_staff = self.request.user.is_staff
        if is_staff and genre:
            genre_ids = self._params_to_ints(genre)
            queryset = queryset.filter(genre__id__in=genre_ids)
        if is_staff and availability:
            queryset = queryset.filter(availability=availability.capitalize())

        # only admin users can view all movies, available or not
        if is_staff:
            return queryset.all()
        else:
            return queryset.filter(availability=True)

    def get_serializer_class(self):
        """Return appropriate serializer class
        """
        if self.action == 'retrieve':
            return serializers.MovieDetailSerializer
        elif self.action == 'upload_image':
            return serializers.MovieImageSerializer

        return self.serializer_class

    def perform_create(self, serializer):
        """Create a new movie
        """
        serializer.save(user=self.request.user)

    def perform_update(self, serializer):
        """Update a new movie
        """
        serializer.save(user=self.request.user)

    @action(methods=['POST'], detail=True, url_path='upload-image')
    def upload_image(self, request, pk=None):
        """Upload an image to a movie
        """
        movie = self.get_object()
        serializer = self.get_serializer(
            movie,
            data=request.data
        )

        if serializer.is_valid():
            serializer.save()
            return Response(
                serializer.data,
                status=status.HTTP_200_OK
            )

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )
