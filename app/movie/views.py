from rest_framework import viewsets, mixins
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import IsAdminUser

from core.models import Genre

from movie import serializers


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
