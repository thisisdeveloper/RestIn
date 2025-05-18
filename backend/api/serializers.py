from rest_framework import serializers
from django.contrib.auth.models import User
from .models import (
    Restaurant, Table, Stall, MenuItem, MenuItemTag, MenuItemIngredient,
    Review, Order, OrderItem, Wallet, WalletTransaction, Notification
)

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'first_name', 'last_name')

class MenuItemTagSerializer(serializers.ModelSerializer):
    class Meta:
        model = MenuItemTag
        fields = ('name',)

class MenuItemIngredientSerializer(serializers.ModelSerializer):
    class Meta:
        model = MenuItemIngredient
        fields = ('name',)

class ReviewSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    
    class Meta:
        model = Review
        fields = ('id', 'user', 'rating', 'comment', 'created_at')

class MenuItemSerializer(serializers.ModelSerializer):
    tags = MenuItemTagSerializer(many=True, read_only=True)
    ingredients = MenuItemIngredientSerializer(many=True, read_only=True)
    reviews = ReviewSerializer(many=True, read_only=True)
    rating = serializers.SerializerMethodField()
    rating_count = serializers.SerializerMethodField()

    class Meta:
        model = MenuItem
        fields = (
            'id', 'name', 'description', 'price', 'category', 'sub_category',
            'image', 'available', 'preparation_time', 'featured', 'calories',
            'protein', 'carbs', 'fat', 'tags', 'ingredients', 'reviews',
            'rating', 'rating_count'
        )

    def get_rating(self, obj):
        reviews = obj.reviews.all()
        if not reviews:
            return None
        return sum(review.rating for review in reviews) / len(reviews)

    def get_rating_count(self, obj):
        return obj.reviews.count()

class StallSerializer(serializers.ModelSerializer):
    menu = MenuItemSerializer(source='menu_items', many=True, read_only=True)

    class Meta:
        model = Stall
        fields = ('id', 'name', 'description', 'logo', 'cuisine', 'menu')

class TableSerializer(serializers.ModelSerializer):
    class Meta:
        model = Table
        fields = ('id', 'number', 'seats', 'qr_code', 'type', 'is_available', 'is_locked')

class RestaurantSerializer(serializers.ModelSerializer):
    tables = TableSerializer(many=True, read_only=True)
    menu = MenuItemSerializer(source='menu_items', many=True, read_only=True)
    stalls = StallSerializer(many=True, read_only=True)

    class Meta:
        model = Restaurant
        fields = (
            'id', 'name', 'description', 'logo', 'venue_type', 'country',
            'state', 'city', 'address', 'latitude', 'longitude',
            'opening_time', 'closing_time', 'tables', 'menu', 'stalls'
        )

class OrderItemSerializer(serializers.ModelSerializer):
    menu_item = MenuItemSerializer(read_only=True)
    menu_item_id = serializers.PrimaryKeyRelatedField(
        queryset=MenuItem.objects.all(), 
        write_only=True,
        source='menu_item'
    )

    class Meta:
        model = OrderItem
        fields = (
            'id', 'menu_item', 'menu_item_id', 'stall', 'quantity',
            'price', 'special_instructions'
        )

class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True)
    user = UserSerializer(read_only=True)

    class Meta:
        model = Order
        fields = (
            'id', 'user', 'restaurant', 'table', 'status', 'total_amount',
            'estimated_delivery_time', 'items', 'created_at', 'updated_at'
        )
        read_only_fields = ('user', 'total_amount', 'status')

    def create(self, validated_data):
        items_data = validated_data.pop('items')
        order = Order.objects.create(**validated_data)
        
        total_amount = 0
        for item_data in items_data:
            menu_item = item_data['menu_item']
            quantity = item_data['quantity']
            price = menu_item.price * quantity
            total_amount += price
            
            OrderItem.objects.create(
                order=order,
                menu_item=menu_item,
                stall=item_data.get('stall'),
                quantity=quantity,
                price=price,
                special_instructions=item_data.get('special_instructions', '')
            )
        
        order.total_amount = total_amount
        order.save()
        return order

class WalletTransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = WalletTransaction
        fields = ('id', 'type', 'amount', 'description', 'created_at')

class WalletSerializer(serializers.ModelSerializer):
    transactions = WalletTransactionSerializer(many=True, read_only=True)

    class Meta:
        model = Wallet
        fields = ('id', 'balance', 'currency', 'transactions')

class NotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notification
        fields = ('id', 'type', 'message', 'read', 'created_at')