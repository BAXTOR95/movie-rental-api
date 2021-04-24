from rest_framework import serializers

from core.models import Genre, Movie


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
