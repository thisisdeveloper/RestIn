import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  User, ArrowLeft, Wallet, ClipboardList, Gift, Bell, 
  RefreshCw, MessageSquare, Settings, Share2, LogOut, ChevronRight 
} from 'lucide-react';

const menuItems = [
  { icon: <User size={20} />, label: 'My Profile', link: '/profile' },
  { icon: <Wallet size={20} />, label: 'Wallet', link: '/wallet' },
  { icon: <ClipboardList size={20} />, label: 'Orders & Discounts', link: '/orders' },
  { icon: <Gift size={20} />, label: 'Rewards', link: '/rewards' },
  { icon: <Bell size={20} />, label: 'Notifications', link: '/notifications' },
  { icon: <RefreshCw size={20} />, label: 'Refund Status', link: '/refunds' },
  { icon: <MessageSquare size={20} />, label: 'Feedback', link: '/feedback' },
  { icon: <Settings size={20} />, label: 'Preferences', link: '/preferences' },
  { icon: <MessageSquare size={20} />, label: 'Support', link: '/support' },
  { icon: <Share2 size={20} />, label: 'Share App', action: 'share' },
  { icon: <LogOut size={20} />, label: 'Logout', action: 'logout' }
];

const AccountPage: React.FC = () => {
  const navigate = useNavigate();

  const handleMenuItemClick = (item: typeof menuItems[0]) => {
    if (item.action === 'logout') {
      // Handle logout
      if (confirm('Are you sure you want to logout?')) {
        // Perform logout logic here
        navigate('/');
      }
    } else if (item.action === 'share') {
      // Handle share
      if (navigator.share) {
        navigator.share({
          title: 'Smart Restaurant Menu',
          text: 'Check out this awesome restaurant menu app!',
          url: window.location.origin
        });
      }
    } else {
      navigate(item.link);
    }
  };

  return (
    <div className="fixed inset-y-0 right-0 z-40 w-80 bg-white shadow-xl transform transition-transform duration-300 ease-in-out">
      {/* Header */}
      <div className="p-4 border-b">
        <div className="flex items-center">
          <button 
            onClick={() => navigate('/')}
            className="p-2 -ml-2 rounded-full hover:bg-gray-100"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h2 className="text-xl font-semibold ml-2">Account</h2>
        </div>
      </div>

      {/* Profile Summary */}
      <div className="p-4 border-b bg-indigo-50">
        <div className="flex items-center">
          <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center">
            <User className="w-8 h-8 text-indigo-600" />
          </div>
          <div className="ml-4">
            <h3 className="font-semibold text-lg">John Doe</h3>
            <p className="text-gray-600">+1 234 567 8900</p>
            <p className="text-sm text-indigo-600">View Profile</p>
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <div className="overflow-y-auto h-[calc(100%-200px)] pb-24">
        {menuItems.map((item, index) => (
          <button
            key={index}
            onClick={() => handleMenuItemClick(item)}
            className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors border-b"
          >
            <div className="flex items-center">
              <span className="text-gray-600">{item.icon}</span>
              <span className="ml-3">{item.label}</span>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>
        ))}
      </div>

      {/* App Info */}
      <div className="absolute bottom-0 w-full bg-white border-t">
        <div className="p-4 text-center">
          <div className="text-gray-900 font-medium mb-2">Smart Restaurant Menu</div>
          <div className="text-sm text-gray-500">Version 1.0.0</div>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;