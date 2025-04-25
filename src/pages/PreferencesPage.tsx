import React, { useState } from 'react';
import { ArrowLeft, Bell, Globe, Moon, Sun } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Preferences {
  theme: 'light' | 'dark' | 'system';
  language: string;
  notifications: {
    orderUpdates: boolean;
    promotions: boolean;
    rewards: boolean;
    newsletter: boolean;
  };
  currency: string;
}

const PreferencesPage: React.FC = () => {
  const navigate = useNavigate();
  const [preferences, setPreferences] = useState<Preferences>({
    theme: 'system',
    language: 'english',
    notifications: {
      orderUpdates: true,
      promotions: true,
      rewards: true,
      newsletter: false
    },
    currency: 'USD'
  });

  const handleNotificationChange = (key: keyof typeof preferences.notifications) => {
    setPreferences(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [key]: !prev.notifications[key]
      }
    }));
  };

  const handleThemeChange = (theme: Preferences['theme']) => {
    setPreferences(prev => ({ ...prev, theme }));
  };

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
            <h1 className="text-xl font-bold ml-2">Preferences</h1>
          </div>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4 py-6">
        {/* Theme */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-6">
          <div className="p-4 border-b">
            <h2 className="font-semibold">Theme</h2>
          </div>
          <div className="p-4">
            <div className="grid grid-cols-3 gap-3">
              {[
                { value: 'light', icon: <Sun className="w-5 h-5" />, label: 'Light' },
                { value: 'dark', icon: <Moon className="w-5 h-5" />, label: 'Dark' },
                { value: 'system', icon: <span className="text-xl">💻</span>, label: 'System' }
              ].map(theme => (
                <button
                  key={theme.value}
                  onClick={() => handleThemeChange(theme.value as Preferences['theme'])}
                  className={`p-3 rounded-xl border text-center transition-all ${
                    preferences.theme === theme.value
                      ? 'border-indigo-500 bg-indigo-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex justify-center mb-2">{theme.icon}</div>
                  <span className="text-sm font-medium">{theme.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Language */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-6">
          <div className="p-4 border-b">
            <div className="flex items-center">
              <Globe className="w-5 h-5 mr-2" />
              <h2 className="font-semibold">Language & Region</h2>
            </div>
          </div>
          <div className="p-4 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Language
              </label>
              <select
                value={preferences.language}
                onChange={(e) => setPreferences(prev => ({ ...prev, language: e.target.value }))}
                className="block w-full rounded-lg border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="english">English</option>
                <option value="spanish">Spanish</option>
                <option value="french">French</option>
                <option value="german">German</option>
                <option value="chinese">Chinese</option>
                <option value="japanese">Japanese</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Currency
              </label>
              <select
                value={preferences.currency}
                onChange={(e) => setPreferences(prev => ({ ...prev, currency: e.target.value }))}
                className="block w-full rounded-lg border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="USD">USD ($)</option>
                <option value="EUR">EUR (€)</option>
                <option value="GBP">GBP (£)</option>
                <option value="JPY">JPY (¥)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-4 border-b">
            <div className="flex items-center">
              <Bell className="w-5 h-5 mr-2" />
              <h2 className="font-semibold">Notifications</h2>
            </div>
          </div>
          <div className="p-4">
            <div className="space-y-4">
              {Object.entries(preferences.notifications).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between">
                  <span className="text-sm font-medium capitalize">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={value}
                      onChange={() => handleNotificationChange(key as keyof typeof preferences.notifications)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreferencesPage;