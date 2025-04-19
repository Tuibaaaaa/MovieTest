from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import MovieViewSet
from . import views

movie_router = DefaultRouter()
movie_router.register(r"movies", MovieViewSet)

urlpatterns = [
    # path("movies/", views.movies),
    path("api/", include(movie_router.urls)),
    path("api/movies/<int:movie_id>/rate_movie/", views.rate_movie, name="rate_movie"),
]
# urls of myapps
