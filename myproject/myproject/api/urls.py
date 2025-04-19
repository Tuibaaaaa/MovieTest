from rest_framework.routers import DefaultRouter
from django.urls import path, include
from myapps.urls import movie_router  # Adjusted import path to exclude 'myproject'

router = DefaultRouter()
router.register.extend(movie_router.registry)
urlpatterns = [
    path("", include(router.urls)),
]
