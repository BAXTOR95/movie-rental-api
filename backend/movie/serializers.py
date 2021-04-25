from rest_framework import serializers

from core.models import Genre, Movie, Rental


class GenreSerializer(serializers.ModelSerializer):
    """Serializer for tag objects
    """

    class Meta:
        model = Genre
        fields = ('id', 'name')
        read_only_fields = ('id',)


class MovieSerializer(serializers.ModelSerializer):
    """Serialize a movie
    """
    genre = serializers.PrimaryKeyRelatedField(
        many=True,
        queryset=Genre.objects.all()
    )

    class Meta:
        model = Movie
        fields = (
            'id', 'title', 'description', 'link', 'genre', 'image',
            'stock', 'rental_price', 'sale_price', 'availability'
        )
        read_only_fields = ('id', 'image')
        ordering = ('id',)


class MovieDetailSerializer(MovieSerializer):
    """Serialize a movie detail
    """
    genre = GenreSerializer(many=True, read_only=True)


class MovieImageSerializer(serializers.ModelSerializer):
    """Serializer for uploading images to movies
    """

    class Meta:
        model = Movie
        fields = ('id', 'image')
        read_only_fields = ('id',)


class RentalSerializer(serializers.ModelSerializer):
    """Serialize a Rental object
    """

    class Meta:
        model = Rental
        fields = ('id', 'user', 'movie', 'date_out',
                  'date_returned', 'daily_rental_fee', 'rental_debt')
        read_only_fields = ('id',)
