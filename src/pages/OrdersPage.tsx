import React, { useState } from 'react';
import { ArrowLeft, Clock, CheckCircle2, AlertCircle, ChevronDown, ChevronUp } from 'lucide-react';
import useStore from '../store';
import { OrderStatus as OrderStatusType, Order } from '../types';
import { useNavigate } from 'react-router-dom';

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

const OrdersPage: React.FC = () => {
  const navigate = useNavigate();
  const { orders, cancelOrder } = useStore();
  const [showCancelledOrders, setShowCancelledOrders] = useState(false);

  // Filter active and cancelled orders
  const activeOrders = orders.filter(order => order.status !== 'cancelled' && order.status !== 'delivered');
  const completedOrders = orders.filter(order => order.status === 'delivered');
  const cancelledOrders = orders.filter(order => order.status === 'cancelled');

  // Calculate total amount for active orders
  const totalActiveAmount = activeOrders.reduce((total, order) => total + order.totalAmount, 0);

  const handleCancelOrder = (orderId: string) => {
    if (confirm('Are you sure you want to cancel this order?')) {
      cancelOrder(orderId);
    }
  };

  const OrderCard = ({ order }: { order: Order }) => {
    const status = statusConfig[order.status];
    const isActiveOrder = ['pending', 'confirmed', 'preparing'].includes(order.status);
    const progressPercentage = 
      order.status === 'pending' ? 25 :
      order.status === 'confirmed' ? 50 :
      order.status === 'preparing' ? 75 :
      order.status === 'ready' || order.status === 'delivered' ? 100 : 0;

    return (
      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-4">
        <div className={`p-4 text-white ${status.color}`}>
          <div className="flex items-center">
            {status.icon}
            <span className="ml-2 font-bold">{status.text}</span>
          </div>
          
          {isActiveOrder && (
            <div className="w-full bg-white bg-opacity-25 rounded-full h-2.5 mt-2">
              <div 
                className="bg-white h-2.5 rounded-full transition-all duration-1000" 
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
          )}
        </div>
        
        <div className="p-4">
          <div className="bg-gray-50 p-3 rounded-lg mb-4">
            <h3 className="font-bold mb-2">Order Details</h3>
            <p className="text-sm text-gray-600">Order #{order.id}</p>
            <p className="text-sm text-gray-600">
              Placed: {new Date(order.createdAt).toLocaleTimeString()}
            </p>
            {order.estimatedDeliveryTime && (
              <p className="text-sm text-gray-600">
                Estimated delivery: {new Date(order.estimatedDeliveryTime).toLocaleTimeString()}
              </p>
            )}
          </div>
          
          <div className="mb-4">
            <h3 className="font-bold mb-2">Items</h3>
            <div className="space-y-2">
              {order.items.map((item) => (
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
              <span>${order.totalAmount.toFixed(2)}</span>
            </div>
          </div>
          
          {order.status === 'pending' && (
            <button
              onClick={() => handleCancelOrder(order.id)}
              className="w-full py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Cancel Order
            </button>
          )}
        </div>
      </div>
    );
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
            <h1 className="text-xl font-bold ml-2">Orders</h1>
          </div>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4 py-6">
        {orders.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500">No orders found</p>
          </div>
        ) : (
          <>
            {/* Active Orders */}
            {activeOrders.length > 0 && (
              <div className="mb-8">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-semibold">Active Orders</h2>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">Total Amount:</p>
                    <p className="font-bold text-lg text-indigo-600">
                      ${totalActiveAmount.toFixed(2)}
                    </p>
                  </div>
                </div>
                {activeOrders.map(order => (
                  <OrderCard key={order.id} order={order} />
                ))}
              </div>
            )}

            {/* Completed Orders */}
            {completedOrders.length > 0 && (
              <div className="mb-8">
                <h2 className="text-lg font-semibold mb-4">Completed Orders</h2>
                {completedOrders.map(order => (
                  <OrderCard key={order.id} order={order} />
                ))}
              </div>
            )}
            
            {/* Cancelled Orders */}
            {cancelledOrders.length > 0 && (
              <div>
                <button
                  onClick={() => setShowCancelledOrders(!showCancelledOrders)}
                  className="flex items-center justify-between w-full p-3 bg-gray-200 rounded-lg mb-4"
                >
                  <span className="font-semibold">Cancelled Orders</span>
                  {showCancelledOrders ? <ChevronUp /> : <ChevronDown />}
                </button>
                
                {showCancelledOrders && (
                  <div className="space-y-4">
                    {cancelledOrders.map(order => (
                      <OrderCard key={order.id} order={order} />
                    ))}
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default OrdersPage;