import React from 'react';
import { ArrowLeft, Bell, CheckCircle, AlertCircle, Info, Gift } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import useStore from '../store';

const NotificationsPage: React.FC = () => {
  const navigate = useNavigate();
  const { notifications, markNotificationAsRead } = useStore();

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'warning':
        return <AlertCircle className="w-5 h-5 text-yellow-500" />;
      case 'error':
        return <AlertCircle className="w-5 h-5 text-red-500" />;
      default:
        return <Info className="w-5 h-5 text-blue-500" />;
    }
  };

  const getNotificationStyle = (type: string) => {
    switch (type) {
      case 'success':
        return 'bg-green-50 border-green-100';
      case 'warning':
        return 'bg-yellow-50 border-yellow-100';
      case 'error':
        return 'bg-red-50 border-red-100';
      default:
        return 'bg-blue-50 border-blue-100';
    }
  };

  // Group notifications by date
  const groupedNotifications = notifications.reduce((groups, notification) => {
    const date = new Date(notification.createdAt).toLocaleDateString();
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(notification);
    return groups;
  }, {} as Record<string, typeof notifications>);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-md sticky top-0 z-10">
        <div className="max-w-lg mx-auto px-4 py-4">
          <div className="flex items-center">
            <button 
              onClick={() => navigate('/account')}
              className="p-2 -ml-2 rounded-full hover:bg-gray-100"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <h1 className="text-xl font-bold ml-2">Notifications</h1>
          </div>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4 py-6">
        {notifications.length === 0 ? (
          <div className="text-center py-12">
            <Bell className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">No notifications yet</p>
          </div>
        ) : (
          <div className="space-y-8">
            {Object.entries(groupedNotifications).map(([date, dateNotifications]) => (
              <div key={date}>
                <h2 className="text-sm font-medium text-gray-500 mb-4">{date}</h2>
                <div className="space-y-3">
                  {dateNotifications.map(notification => (
                    <div
                      key={notification.id}
                      className={`p-4 rounded-xl border ${getNotificationStyle(notification.type)} ${
                        notification.read ? 'opacity-75' : ''
                      }`}
                      onClick={() => markNotificationAsRead(notification.id)}
                    >
                      <div className="flex items-start">
                        <div className="flex-shrink-0">
                          {getNotificationIcon(notification.type)}
                        </div>
                        <div className="ml-3 flex-1">
                          <p className={`text-sm ${notification.read ? 'font-normal' : 'font-medium'}`}>
                            {notification.message}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            {new Date(notification.createdAt).toLocaleTimeString()}
                          </p>
                        </div>
                        {!notification.read && (
                          <div className="ml-3 flex-shrink-0">
                            <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationsPage;