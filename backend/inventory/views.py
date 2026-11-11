from django.db.models import Count, Sum, F
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from .models import Product
from .serializers import ProductSerializer
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest_framework.authtoken.models import Token
from rest_framework.authtoken.views import ObtainAuthToken

from .serializers import RegisterSerializer


class RegisterView(generics.CreateAPIView):
    serializer_class = RegisterSerializer
    permission_classes = [AllowAny]

    def get(self, request, *args, **kwargs):
        return Response({
            "message": "Enter your registration details below."
        })

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        user = serializer.save()
        token, created = Token.objects.get_or_create(user=user)

        return Response({
            "message": "Registration successful",
            "token": token.key,
            "username": user.username
        }, status=status.HTTP_201_CREATED)


class LoginView(ObtainAuthToken):
    permission_classes = [AllowAny]

    def get(self, request, *args, **kwargs):
        return Response({
            "message": "Enter your username and password to login."
        })

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(
            data=request.data,
            context={"request": request}
        )
        serializer.is_valid(raise_exception=True)

        user = serializer.validated_data["user"]
        token, created = Token.objects.get_or_create(user=user)

        return Response({
            "message": "Login successful",
            "token": token.key,
            "username": user.username
        }, status=status.HTTP_200_OK)



class ProductListCreateView(generics.ListCreateAPIView):
    serializer_class = ProductSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Product.objects.filter(
            organization=self.request.user.organization
        )

    def perform_create(self, serializer):
        serializer.save(
            organization=self.request.user.organization
        )


class ProductDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = ProductSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Product.objects.filter(
            organization=self.request.user.organization
        )


class DashboardView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        products = Product.objects.filter(
            organization=request.user.organization
        )

        low_stock_products = products.filter(
            quantity__lte=F("low_stock_threshold")
        )

        total_products = products.count()

        total_stock_quantity = products.aggregate(
            total=Sum("quantity")
        )["total"] or 0

        return Response({
            "total_products": total_products,
            "total_stock_quantity": total_stock_quantity,
            "low_stock_products": low_stock_products.count(),
            "low_stock_items": ProductSerializer(
                low_stock_products, many=True
            ).data
        })