import React, { useState, useEffect } from 'react';
import { Bell } from 'lucide-react';
import useStore from '../store';

interface NotificationsProps {
  isVisible: boolean;
  onClose: () => void;
}

const Notifications: React.FC<NotificationsProps> = ({ isVisible, onClose }) => {
  const { notifications, markNotificationAsRead } = useStore();
  const [isClosing, setIsClosing] = useState(false);
  
  const unreadCount = notifications.filter(notification => !notification.read).length;
  
  useEffect(() => {
    if (!isVisible) {
      setIsClosing(false);
    }
  }, [isVisible]);
  
  const handleClose = () => {
    setIsClosing(true);
    setTimeout(onClose, 300); // Match the duration of the animation
  };
  
  const handleNotificationClick = (id: string) => {
    markNotificationAsRead(id);
  };
  
  if (!isVisible && !isClosing) return null;
  
  const notificationTypeStyles = {
    info: 'bg-blue-100 border-l-4 border-blue-500',
    success: 'bg-green-100 border-l-4 border-green-500',
    warning: 'bg-yellow-100 border-l-4 border-yellow-500',
    error: 'bg-red-100 border-l-4 border-red-500'
  };

  return (
    <div 
      className={`fixed inset-y-0 right-0 z-40 w-80 bg-white shadow-xl transform transition-transform duration-300 ease-in-out ${
        isVisible && !isClosing ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center">
          <Bell className="h-5 w-5 mr-2" />
          <h2 className="text-lg font-semibold">Notifications</h2>
          {unreadCount > 0 && (
            <div className="ml-2 px-2 py-0.5 bg-indigo-600 text-white text-xs rounded-full">
              {unreadCount}
            </div>
          )}
        </div>
        <button 
          onClick={handleClose}
          className="p-1 rounded-full hover:bg-gray-200"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      
      <div className="overflow-y-auto h-full pb-20">
        {notifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
            <Bell className="h-12 w-12 text-gray-300 mb-4" />
            <p className="text-gray-500">No notifications yet</p>
          </div>
        ) : (
          <div className="p-4 space-y-3">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-3 rounded-lg ${notificationTypeStyles[notification.type]} ${
                  notification.read ? 'opacity-60' : ''
                }`}
                onClick={() => handleNotificationClick(notification.id)}
              >
                <div className="flex justify-between items-start">
                  <p className={`text-sm ${notification.read ? 'font-normal' : 'font-semibold'}`}>
                    {notification.message}
                  </p>
                  {!notification.read && (
                    <span className="bg-blue-500 h-2 w-2 rounded-full"></span>
                  )}
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  {new Date(notification.createdAt).toLocaleTimeString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Notifications;