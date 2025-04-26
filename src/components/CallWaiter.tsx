import React, { useState } from 'react';
import { BellRing, X, MessageSquare, Phone } from 'lucide-react';

interface CallWaiterProps {
  tableNumber: number;
}

const CallWaiter: React.FC<CallWaiterProps> = ({ tableNumber }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isCalled, setIsCalled] = useState(false);
  const [timer, setTimer] = useState(0);
  const [showMessageInput, setShowMessageInput] = useState(false);
  const [message, setMessage] = useState('');
  const [timerInterval, setTimerInterval] = useState<NodeJS.Timeout | null>(null);

  const handleCall = () => {
    if (!isExpanded) {
      setIsExpanded(true);
      return;
    }

    if (isCalled) {
      handleCancel();
    } else {
      setIsCalled(true);
      setTimer(0);
      const interval = setInterval(() => {
        setTimer(prev => {
          if (prev >= 300) { // 5 minutes
            handleCancel();
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
      setTimerInterval(interval);
    }
  };

  const handleSendMessage = () => {
    if (message.trim()) {
      // In a real app, this would send the message to staff
      console.log('Message sent:', message);
      setMessage('');
      setShowMessageInput(false);
    }
  };

  const handleCancel = () => {
    if (timerInterval) {
      clearInterval(timerInterval);
      setTimerInterval(null);
    }
    setIsCalled(false);
    setTimer(0);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed bottom-20 left-6 z-50 flex flex-col items-start space-y-2">
      {isExpanded && (
        <div className="bg-white rounded-lg shadow-lg p-4 animate-fade-in min-w-[250px]">
          <div className="flex items-center justify-between mb-2">
            <span className="font-medium">Call Waiter</span>
            <button 
              onClick={() => setIsExpanded(false)}
              className="p-1 hover:bg-gray-100 rounded-full"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          
          <p className="text-sm text-gray-600 mb-2">
            Table #{tableNumber}
          </p>
          
          {/* Call Status */}
          {isCalled && (
            <div className="text-sm text-gray-500 mb-3">
              Waiting time: {formatTime(timer)}
            </div>
          )}

          {/* Action Buttons */}
          <div className="space-y-3">
            {/* Call Button */}
            <button
              onClick={handleCall}
              className={`w-full flex items-center justify-center px-3 py-2 rounded-lg transition-colors ${
                isCalled 
                  ? 'bg-red-600 hover:bg-red-700 text-white'
                  : 'bg-indigo-600 hover:bg-indigo-700 text-white'
              }`}
            >
              <Phone className="w-4 h-4 mr-2" />
              {isCalled ? 'Cancel Call' : 'Call Waiter'}
            </button>

            {/* Message Section */}
            {showMessageInput ? (
              <div className="space-y-2">
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type your message here..."
                  className="w-full p-2 border rounded-lg text-sm resize-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  rows={3}
                />
                <div className="flex justify-end space-x-2">
                  <button
                    onClick={() => setShowMessageInput(false)}
                    className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded-lg"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSendMessage}
                    disabled={!message.trim()}
                    className="px-3 py-1 text-sm bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                  >
                    <MessageSquare className="w-4 h-4 mr-1" />
                    Send
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => setShowMessageInput(true)}
                className="w-full flex items-center justify-center px-3 py-2 bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200"
              >
                <MessageSquare className="w-4 h-4 mr-2" />
                Send Message
              </button>
            )}
          </div>
        </div>
      )}

      <button
        onClick={handleCall}
        className={`p-3 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110 ${
          isCalled 
            ? 'bg-red-500 text-white animate-pulse' 
            : 'bg-indigo-600 text-white hover:bg-indigo-700'
        }`}
        title={isCalled ? 'Cancel Call' : 'Call Waiter'}
      >
        <BellRing className="w-6 h-6" />
      </button>
    </div>
  );
};

export default CallWaiter;