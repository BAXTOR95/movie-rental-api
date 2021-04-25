from django.urls import path, include
from rest_framework.routers import DefaultRouter

from movie import views


router = DefaultRouter()
router.register('genres', views.GenreViewSet)
router.register('movies', views.MovieViewSet)
router.register('rentals', views.RentalViewSet)

app_name = 'movie'

urlpatterns = [
    path('', include(router.urls))
]
