from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from rest_framework import viewsets, filters
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.decorators import api_view

from myapps.models import Product, Offers
from .models import Movies, MovieRating
from .serializers import MovieSerializer


class MovieViewSet(viewsets.ModelViewSet):
    queryset = Movies.objects.all()
    serializer_class = MovieSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ["title", "director"]  # fields to search


def movie_detail(request, movie_id):
    try:
        # Try to fetch the movie by ID
        movie = Movies.objects.get(id=movie_id)

        # Return movie data as JSON
        return JsonResponse(
            {
                "title": movie.title,
                "video_url": movie.video_url,
                "poster_image": movie.poster_image.url,  # Ensure MEDIA_URL is correctly set
            }
        )

    except Movies.DoesNotExist:
        # Return an error if the movie does not exist
        return JsonResponse({"error": "Movie not found"}, status=404)


@api_view(["POST"])
def rate_movie(request, movie_id):
    try:
        movie = Movies.objects.get(id=movie_id)
        rating = request.data.get("rating")
        ip_address = request.META.get("REMOTE_ADDR")  # Lấy địa chỉ IP người dùng

        if rating and 0 <= rating <= 5:  # Kiểm tra rating hợp lệ (0-5)
            # Kiểm tra xem IP này đã đánh giá bộ phim chưa
            if MovieRating.objects.filter(movie=movie, ip_address=ip_address).exists():
                return JsonResponse(
                    {"error": "You have already rated this movie."}, status=400
                )

            # Nếu chưa đánh giá, tạo mới MovieRating
            movie_rating = MovieRating.objects.create(
                movie=movie, ip_address=ip_address, rating=rating
            )
            movie.update_average_rating()  # Cập nhật lại điểm sao trung bình
            return JsonResponse({"message": "Rating submitted successfully"})

        return JsonResponse({"error": "Invalid rating"}, status=400)

    except Movies.DoesNotExist:
        return JsonResponse({"error": "Movie not found"}, status=404)
