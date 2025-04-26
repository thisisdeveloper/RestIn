import React from 'react';
import { ArrowLeft, ShoppingCart, Trash2, Plus, Minus, UtensilsCrossed } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import useStore from '../store';

const CartPage: React.FC = () => {
  const navigate = useNavigate();
  const { 
    cart, 
    updateCartItem, 
    removeFromCart, 
    placeOrder, 
    currentRestaurant,
    currentTable
  } = useStore();
  
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
  const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  const tax = subtotal * 0.1; // 10% tax rate
  const total = subtotal + tax;

  const handlePlaceOrder = () => {
    placeOrder();
    navigate('/orders');
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white shadow-md sticky top-0 z-10">
        <div className="max-w-lg mx-auto px-4 py-4">
          <div className="flex items-center">
            <button 
              onClick={() => navigate('/')}
              className="p-2 -ml-2 rounded-full hover:bg-gray-100"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <h1 className="text-xl font-bold ml-2">Cart</h1>
            {totalItems > 0 && (
              <span className="ml-2 px-2 py-1 bg-indigo-600 text-white rounded-full text-sm">
                {totalItems}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4 py-6">
        {cart.length === 0 ? (
          <div className="text-center py-12">
            <ShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 mb-6">Your cart is empty</p>
            <button
              onClick={() => navigate('/')}
              className="px-6 py-2 bg-indigo-600 text-white rounded-lg"
            >
              Browse Menu
            </button>
          </div>
        ) : (
          <>
            {/* Restaurant Info */}
            {currentRestaurant && currentTable && (
              <div className="bg-blue-50 p-4 rounded-lg mb-6">
                <p className="font-medium">{currentRestaurant.name}</p>
                <p className="text-sm text-gray-600">Table #{currentTable.number}</p>
              </div>
            )}

            {/* Cart Items */}
            <div className="space-y-4 mb-6">
              {cart.map((item) => (
                <div key={item.id} className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
                  <div className="flex justify-between">
                    <div className="flex-1">
                      <div className="flex items-center">
                        <UtensilsCrossed className="w-4 h-4 text-gray-500 mr-2" />
                        <div className="flex justify-between flex-1">
                          <h3 className="font-medium">{item.name}</h3>
                          <p className="font-bold">${(item.price * item.quantity).toFixed(2)}</p>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 ml-6">${item.price.toFixed(2)} each</p>
                    </div>
                  </div>
                  
                  <div className="mt-3 flex justify-between items-center">
                    <div className="flex items-center border rounded-lg overflow-hidden">
                      <button
                        onClick={() => updateCartItem(item.id, item.quantity - 1)}
                        className="px-2 py-1 bg-gray-100 hover:bg-gray-200"
                      >
                        <Minus size={16} />
                      </button>
                      <span className="px-3 py-1">{item.quantity}</span>
                      <button
                        onClick={() => updateCartItem(item.id, item.quantity + 1)}
                        className="px-2 py-1 bg-gray-100 hover:bg-gray-200"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                    
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="p-1 text-red-500 hover:text-red-700"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                  
                  {item.specialInstructions && (
                    <div className="mt-3 text-sm text-gray-600 bg-gray-50 p-2 rounded">
                      <p className="font-medium">Special instructions:</p>
                      <p>{item.specialInstructions}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 mb-6">
              <h2 className="font-semibold mb-4">Order Summary</h2>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax (10%)</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-bold text-lg pt-2 border-t mt-2">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Place Order Button */}
            <button
              onClick={handlePlaceOrder}
              className="w-full py-3 bg-indigo-600 text-white rounded-lg font-bold hover:bg-indigo-700 transition-colors"
            >
              Place Order
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default CartPage;