import React, { useState } from 'react';
import { ShoppingCart, X, Trash2, ChevronUp, ChevronDown } from 'lucide-react';
import useStore from '../store';

interface CartProps {
  isVisible: boolean;
  onClose: () => void;
}

const Cart: React.FC<CartProps> = ({ isVisible, onClose }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
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
    setIsSubmitting(true);
    
    // Simulating API call with a timeout
    setTimeout(() => {
      placeOrder();
      setIsSubmitting(false);
      onClose();
    }, 1000);
  };
  
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end">
      <div className="bg-white w-full max-w-md h-full flex flex-col animate-slide-in-right">
        <div className="p-4 border-b flex justify-between items-center bg-indigo-600 text-white">
          <div className="flex items-center">
            <ShoppingCart className="mr-2" />
            <h2 className="text-xl font-bold">Your Cart</h2>
            <span className="ml-2 px-2 py-1 bg-white text-indigo-600 rounded-full text-sm font-bold">
              {totalItems}
            </span>
          </div>
          <button 
            onClick={onClose}
            className="p-1 rounded-full hover:bg-indigo-700 transition-colors"
          >
            <X />
          </button>
        </div>
        
        {cart.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center p-8">
            <ShoppingCart className="w-16 h-16 text-gray-300 mb-4" />
            <p className="text-gray-500 text-center">Your cart is empty</p>
            <button
              onClick={onClose}
              className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded-lg"
            >
              Browse Menu
            </button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto p-4">
              <div className="space-y-4">
                {cart.map((item) => (
                  <div key={item.id} className="bg-gray-50 rounded-lg p-3">
                    <div className="flex justify-between">
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <h3 className="font-medium">{item.name}</h3>
                          <p className="font-bold">${(item.price * item.quantity).toFixed(2)}</p>
                        </div>
                        <p className="text-sm text-gray-600">${item.price.toFixed(2)} each</p>
                      </div>
                    </div>
                    
                    <div className="mt-2 flex justify-between items-center">
                      <div className="flex items-center border rounded-lg overflow-hidden">
                        <button
                          onClick={() => updateCartItem(item.id, item.quantity - 1)}
                          className="px-2 py-1 bg-gray-100 hover:bg-gray-200"
                        >
                          <ChevronDown size={16} />
                        </button>
                        <span className="px-3 py-1">{item.quantity}</span>
                        <button
                          onClick={() => updateCartItem(item.id, item.quantity + 1)}
                          className="px-2 py-1 bg-gray-100 hover:bg-gray-200"
                        >
                          <ChevronUp size={16} />
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
                      <div className="mt-2 text-sm text-gray-600 bg-gray-100 p-2 rounded">
                        <p className="font-medium">Special instructions:</p>
                        <p>{item.specialInstructions}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
            
            <div className="border-t p-4 bg-gray-50">
              <div className="space-y-2 mb-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax (10%)</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-bold text-lg pt-2 border-t">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
              
              <div className="space-y-2">
                {currentRestaurant && currentTable && (
                  <div className="bg-blue-50 p-3 rounded-lg text-sm">
                    <p className="font-medium">{currentRestaurant.name}</p>
                    <p className="text-gray-600">Table #{currentTable.number}</p>
                  </div>
                )}
                
                <button
                  onClick={handlePlaceOrder}
                  disabled={isSubmitting}
                  className={`w-full py-3 rounded-lg font-bold text-white ${
                    isSubmitting ? 'bg-gray-400' : 'bg-indigo-600 hover:bg-indigo-700'
                  }`}
                >
                  {isSubmitting ? 'Processing...' : 'Place Order'}
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;