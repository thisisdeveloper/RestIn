from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    RestaurantViewSet, TableViewSet, MenuItemViewSet,
    OrderViewSet, WalletViewSet, NotificationViewSet
)

router = DefaultRouter()
router.register(r'restaurants', RestaurantViewSet)
router.register(r'tables', TableViewSet)
router.register(r'menu-items', MenuItemViewSet)
router.register(r'orders', OrderViewSet, basename='order')
router.register(r'wallet', WalletViewSet, basename='wallet')
router.register(r'notifications', NotificationViewSet, basename='notification')

urlpatterns = [
    path('', include(router.urls)),
]