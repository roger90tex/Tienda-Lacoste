from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    ProductViewSet,
    OrderViewSet,
    AccountViewSet,
    AddressViewSet,
    PaymentViewSet,
    MetricViewSet,
)

router = DefaultRouter()
router.register(r'products', ProductViewSet)
router.register(r'orders', OrderViewSet)
router.register(r'accounts', AccountViewSet)
router.register(r'addresses', AddressViewSet)
router.register(r'payments', PaymentViewSet)
router.register(r'metrics', MetricViewSet)

urlpatterns = [
    path('', include(router.urls)),
]