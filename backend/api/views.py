from rest_framework import viewsets, status, filters
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.shortcuts import get_object_or_404
from .models import (
    Restaurant, Table, MenuItem, Order, Wallet, Notification
)
from .serializers import (
    RestaurantSerializer, TableSerializer, MenuItemSerializer,
    OrderSerializer, WalletSerializer, NotificationSerializer
)

class RestaurantViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Restaurant.objects.filter(is_active=True)
    serializer_class = RestaurantSerializer
    permission_classes = [AllowAny]
    filter_backends = [filters.SearchFilter]
    search_fields = ['name', 'description', 'city', 'state', 'country']

    @action(detail=True, methods=['get'])
    def tables(self, request, pk=None):
        restaurant = self.get_object()
        tables = restaurant.tables.filter(is_available=True)
        serializer = TableSerializer(tables, many=True)
        return Response(serializer.data)

    @action(detail=True, methods=['get'])
    def menu(self, request, pk=None):
        restaurant = self.get_object()
        menu_items = restaurant.menu_items.filter(available=True)
        serializer = MenuItemSerializer(menu_items, many=True)
        return Response(serializer.data)

class TableViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Table.objects.all()
    serializer_class = TableSerializer
    permission_classes = [AllowAny]

    @action(detail=True, methods=['post'])
    def lock(self, request, pk=None):
        table = self.get_object()
        if table.is_locked:
            return Response(
                {'error': 'Table is already locked'},
                status=status.HTTP_400_BAD_REQUEST
            )
        table.is_locked = True
        table.save()
        return Response({'status': 'Table locked successfully'})

    @action(detail=True, methods=['post'])
    def unlock(self, request, pk=None):
        table = self.get_object()
        if not table.is_locked:
            return Response(
                {'error': 'Table is not locked'},
                status=status.HTTP_400_BAD_REQUEST
            )
        table.is_locked = False
        table.save()
        return Response({'status': 'Table unlocked successfully'})

class MenuItemViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = MenuItem.objects.filter(available=True)
    serializer_class = MenuItemSerializer
    permission_classes = [AllowAny]
    filter_backends = [filters.SearchFilter]
    search_fields = ['name', 'description', 'category', 'sub_category']

class OrderViewSet(viewsets.ModelViewSet):
    serializer_class = OrderSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Order.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    @action(detail=True, methods=['post'])
    def cancel(self, request, pk=None):
        order = self.get_object()
        if order.status != 'pending':
            return Response(
                {'error': 'Only pending orders can be cancelled'},
                status=status.HTTP_400_BAD_REQUEST
            )
        order.status = 'cancelled'
        order.save()
        return Response({'status': 'Order cancelled successfully'})

class WalletViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = WalletSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Wallet.objects.filter(user=self.request.user)

    @action(detail=True, methods=['post'])
    def add_money(self, request, pk=None):
        wallet = self.get_object()
        amount = request.data.get('amount')
        
        try:
            amount = float(amount)
            if amount <= 0:
                raise ValueError
        except (TypeError, ValueError):
            return Response(
                {'error': 'Invalid amount'},
                status=status.HTTP_400_BAD_REQUEST
            )

        wallet.balance += amount
        wallet.save()
        
        wallet.transactions.create(
            type='credit',
            amount=amount,
            description='Added money to wallet'
        )
        
        return Response({'status': 'Money added successfully'})

class NotificationViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = NotificationSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Notification.objects.filter(user=self.request.user)

    @action(detail=True, methods=['post'])
    def mark_as_read(self, request, pk=None):
        notification = self.get_object()
        notification.read = True
        notification.save()
        return Response({'status': 'Notification marked as read'})