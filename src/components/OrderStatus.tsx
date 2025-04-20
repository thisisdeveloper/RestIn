import React from 'react';
import { Clock, CheckCircle2, AlertCircle } from 'lucide-react';
import useStore from '../store';
import { OrderStatus as OrderStatusType } from '../types';

interface OrderStatusProps {
  isVisible: boolean;
  onClose: () => void;
}

const statusConfig: Record<OrderStatusType, { icon: React.ReactNode; color: string; text: string }> = {
  pending: {
    icon: <Clock className="w-5 h-5" />,
    color: 'bg-yellow-500',
    text: 'Your order is being reviewed'
  },
  confirmed: {
    icon: <CheckCircle2 className="w-5 h-5" />,
    color: 'bg-blue-500',
    text: 'Your order has been confirmed'
  },
  preparing: {
    icon: <Clock className="w-5 h-5" />,
    color: 'bg-purple-500',
    text: 'The kitchen is preparing your food'
  },
  ready: {
    icon: <CheckCircle2 className="w-5 h-5" />,
    color: 'bg-green-500',
    text: 'Your order is ready to be served'
  },
  delivered: {
    icon: <CheckCircle2 className="w-5 h-5" />,
    color: 'bg-green-700',
    text: 'Your order has been delivered to your table'
  },
  cancelled: {
    icon: <AlertCircle className="w-5 h-5" />,
    color: 'bg-red-500',
    text: 'Your order has been cancelled'
  }
};

const OrderStatus: React.FC<OrderStatusProps> = ({ isVisible, onClose }) => {
  const { currentOrder, cancelOrder } = useStore();

  const handleCancelOrder = () => {
    if (currentOrder) {
      if (confirm('Are you sure you want to cancel this order?')) {
        cancelOrder(currentOrder.id);
      }
    }
  };

  if (!isVisible || !currentOrder) return null;

  const status = statusConfig[currentOrder.status];
  const isActiveOrder = ['pending', 'confirmed', 'preparing'].includes(currentOrder.status);
  const progressPercentage = 
    currentOrder.status === 'pending' ? 25 :
    currentOrder.status === 'confirmed' ? 50 :
    currentOrder.status === 'preparing' ? 75 :
    currentOrder.status === 'ready' || currentOrder.status === 'delivered' ? 100 : 0;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
      <div className="bg-white w-full max-w-md rounded-lg overflow-hidden animate-fade-in">
        <div className={`p-4 text-white ${status.color}`}>
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold">Order Status</h2>
            <button 
              onClick={onClose}
              className="p-1 rounded-full hover:bg-white hover:bg-opacity-20 transition-colors"
            >
              <span className="sr-only">Close</span>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
        
        <div className="p-4">
          <div className="mb-4">
            <div className="flex items-center mb-2">
              {status.icon}
              <span className="ml-2 font-bold">{status.text}</span>
            </div>
            
            {isActiveOrder && (
              <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                <div 
                  className="bg-indigo-600 h-2.5 rounded-full transition-all duration-1000" 
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
            )}
          </div>
          
          <div className="bg-gray-50 p-3 rounded-lg mb-4">
            <h3 className="font-bold mb-2">Order Details</h3>
            <p className="text-sm text-gray-600">Order #{currentOrder.id}</p>
            <p className="text-sm text-gray-600">
              Placed: {new Date(currentOrder.createdAt).toLocaleTimeString()}
            </p>
            {currentOrder.estimatedDeliveryTime && (
              <p className="text-sm text-gray-600">
                Estimated delivery: {new Date(currentOrder.estimatedDeliveryTime).toLocaleTimeString()}
              </p>
            )}
          </div>
          
          <div className="mb-4">
            <h3 className="font-bold mb-2">Items</h3>
            <div className="space-y-2">
              {currentOrder.items.map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span>
                    {item.quantity} x {item.name}
                  </span>
                  <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
            
            <div className="border-t mt-3 pt-3 flex justify-between font-bold">
              <span>Total</span>
              <span>${currentOrder.totalAmount.toFixed(2)}</span>
            </div>
          </div>
          
          {currentOrder.status === 'pending' && (
            <button
              onClick={handleCancelOrder}
              className="w-full py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Cancel Order
            </button>
          )}
          
          {currentOrder.status === 'delivered' && (
            <div className="bg-green-100 text-green-800 p-3 rounded-lg text-sm">
              Thank you for dining with us! Enjoy your meal.
            </div>
          )}
          
          {currentOrder.status === 'cancelled' && (
            <div className="bg-red-100 text-red-800 p-3 rounded-lg text-sm">
              This order has been cancelled.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderStatus;