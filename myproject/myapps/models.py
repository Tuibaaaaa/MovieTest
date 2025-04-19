from django.db import models
from django.db.models import Avg


# Create your models here.
class Product(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    stock = models.IntegerField()


class Offers(models.Model):
    code = models.CharField(max_length=20)
    product_name = models.CharField(max_length=100)
    discount_percentage = models.DecimalField(max_digits=5, decimal_places=2)


class Movies(models.Model):
    title = models.CharField(max_length=255)  # Tên phim
    original_title = models.CharField(max_length=255, blank=True, null=True)  # Tên gốc
    short_description = models.TextField(blank=True, null=True)  # Mô tả ngắn
    detailed_description = models.TextField(blank=True, null=True)  # Mô tả chi tiết
    director = models.CharField(max_length=255)  # Đạo diễn
    actors = models.TextField(blank=True, null=True)  # Diễn viên
    genre = models.CharField(max_length=255)  # Thể loại
    release_date = models.DateField()  # Ngày phát hành
    poster_image = models.ImageField(
        upload_to="movies/", blank=True, null=True
    )  # Lưu ảnh poster
    cover_image = models.ImageField(
        upload_to="movies/", blank=True, null=True
    )  # Lưu ảnh bìa # Đường dẫn ảnh bìa
    video_url = models.URLField(max_length=255)  # Đường dẫn video chính
    trailer_url = models.URLField(max_length=255)  # Đường dẫn trailer
    imdb_rating = models.DecimalField(
        max_digits=3, decimal_places=1, blank=True, null=True
    )  # Điểm IMDb
    rotten_tomatoes_rating = models.DecimalField(
        max_digits=3, decimal_places=1, blank=True, null=True
    )  # Điểm Rotten Tomatoes
    related_movies = models.TextField(
        blank=True, null=True
    )  # Danh sách các bộ phim liên quan
    sequels = models.TextField(blank=True, null=True)  # Danh sách các phần tiếp theo
    like = models.BooleanField(default=False)  # Số lượt thích
    star = models.DecimalField(
        max_digits=3, decimal_places=1, blank=True, null=True
    )  # Số sao

    def update_average_rating(self):
        # Tính điểm sao trung bình sử dụng aggregate để tính tổng và đếm
        average_rating = MovieRating.objects.filter(movie=self).aggregate(
            Avg("rating")
        )["rating__avg"]
        if average_rating:
            self.star = round(average_rating, 1)  # Làm tròn đến 1 chữ số thập phân
        else:
            self.star = 0  # Nếu không có đánh giá, gán giá trị 0
        self.save()


class MovieRating(models.Model):
    movie = models.ForeignKey(
        Movies, on_delete=models.CASCADE
    )  # Tham chiếu đến bộ phim
    ip_address = models.GenericIPAddressField()  # Lưu địa chỉ IP của người đánh giá
    rating = models.DecimalField(
        max_digits=3, decimal_places=1
    )  # Điểm sao mà người dùng đưa ra

    def __str__(self):
        return f"Rating for {self.movie.title} by IP: {self.ip_address}"

    # Lưu trữ và tính toán lại điểm sao trung bình khi đánh giá mới được tạo
    def save(self, *args, **kwargs):
        # Kiểm tra xem IP này đã đánh giá bộ phim chưa
        if MovieRating.objects.filter(
            movie=self.movie, ip_address=self.ip_address
        ).exists():
            raise ValueError("You have already rated this movie.")

        super().save(*args, **kwargs)  # Lưu đánh giá vào database
        self.movie.update_average_rating()
