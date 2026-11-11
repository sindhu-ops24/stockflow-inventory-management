from django.urls import path
from .views import (
    RegisterView,
    LoginView,
    ProductListCreateView,
    ProductDetailView,
    DashboardView
)

urlpatterns = [
    path("register/", RegisterView.as_view(), name="register"),
    path("login/", LoginView.as_view(), name="login"),

    path("products/", ProductListCreateView.as_view(), name="product-list-create"),

    path("products/<int:pk>/", ProductDetailView.as_view(), name="product-detail"),
    path("dashboard/", DashboardView.as_view(), name="dashboard"),
]