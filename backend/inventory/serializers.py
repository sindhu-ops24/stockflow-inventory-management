
from django.contrib.auth import get_user_model
from rest_framework import serializers
from .models import Organization, Product

User = get_user_model()


class RegisterSerializer(serializers.Serializer):
    username = serializers.CharField(max_length=150)
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)
    organization_name = serializers.CharField(max_length=150)

    def validate_username(self, value):
        if User.objects.filter(username=value).exists():
            raise serializers.ValidationError(
                "This username is already taken."
            )
        return value

    def validate_email(self, value):
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError(
                "This email is already registered."
            )
        return value

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data["username"],
            email=validated_data["email"],
            password=validated_data["password"]
        )

        Organization.objects.create(
            owner=user,
            name=validated_data["organization_name"]
        )

        return user


class ProductSerializer(serializers.ModelSerializer):

    class Meta:
        model = Product
        fields = [
            "id",
            "name",
            "sku",
            "description",
            "quantity",
            "cost_price",
            "selling_price",
            "low_stock_threshold",
            "created_at",
            "updated_at"
        ]
        read_only_fields = ["id", "created_at", "updated_at"]
