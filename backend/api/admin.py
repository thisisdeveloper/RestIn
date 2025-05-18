from django.contrib import admin
from .models import (
    Restaurant, Table, Stall, MenuItem, MenuItemTag, MenuItemIngredient,
    Review, Order, OrderItem, Wallet, WalletTransaction, Notification
)

@admin.register(Restaurant)
class RestaurantAdmin(admin.ModelAdmin):
    list_display = ('name', 'venue_type', 'city', 'is_active')
    list_filter = ('venue_type', 'is_active', 'city')
    search_fields = ('name', 'description', 'address')

@admin.register(Table)
class TableAdmin(admin.ModelAdmin):
    list_display = ('restaurant', 'number', 'seats', 'type', 'is_available', 'is_locked')
    list_filter = ('type', 'is_available', 'is_locked', 'restaurant')
    search_fields = ('number', 'qr_code')

@admin.register(Stall)
class StallAdmin(admin.ModelAdmin):
    list_display = ('name', 'restaurant', 'cuisine', 'is_active')
    list_filter = ('cuisine', 'is_active', 'restaurant')
    search_fields = ('name', 'description')

@admin.register(MenuItem)
class MenuItemAdmin(admin.ModelAdmin):
    list_display = ('name', 'restaurant', 'stall', 'category', 'price', 'available')
    list_filter = ('category', 'available', 'featured', 'restaurant', 'stall')
    search_fields = ('name', 'description')

@admin.register(MenuItemTag)
class MenuItemTagAdmin(admin.ModelAdmin):
    list_display = ('menu_item', 'name')
    search_fields = ('name',)

@admin.register(MenuItemIngredient)
class MenuItemIngredientAdmin(admin.ModelAdmin):
    list_display = ('menu_item', 'name')
    search_fields = ('name',)

@admin.register(Review)
class ReviewAdmin(admin.ModelAdmin):
    list_display = ('menu_item', 'user', 'rating', 'created_at')
    list_filter = ('rating', 'created_at')
    search_fields = ('comment',)

@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'restaurant', 'status', 'total_amount', 'created_at')
    list_filter = ('status', 'created_at', 'restaurant')
    search_fields = ('user__username',)

@admin.register(OrderItem)
class OrderItemAdmin(admin.ModelAdmin):
    list_display = ('order', 'menu_item', 'quantity', 'price')
    list_filter = ('created_at',)
    search_fields = ('special_instructions',)

@admin.register(Wallet)
class WalletAdmin(admin.ModelAdmin):
    list_display = ('user', 'balance', 'currency')
    search_fields = ('user__username',)

@admin.register(WalletTransaction)
class WalletTransactionAdmin(admin.ModelAdmin):
    list_display = ('wallet', 'type', 'amount', 'created_at')
    list_filter = ('type', 'created_at')
    search_fields = ('description',)

@admin.register(Notification)
class NotificationAdmin(admin.ModelAdmin):
    list_display = ('user', 'type', 'read', 'created_at')
    list_filter = ('type', 'read', 'created_at')
    search_fields = ('message',)