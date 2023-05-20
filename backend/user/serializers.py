from djoser.serializers import UserCreateSerializer as DjoUserCreateSerializer
from django.contrib.auth import get_user_model


class UserCreateSerializer(DjoUserCreateSerializer):
    """Serializer for the users object
    """

    class Meta(DjoUserCreateSerializer.Meta):
        model = get_user_model()
        fields = ('id', 'email', 'name', 'password')
        extra_kwargs = {'password': {'write_only': True, 'min_length': 5}}
