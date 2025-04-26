import React, { useState } from 'react';
import { BellRing, X, MessageSquare, Send } from 'lucide-react';

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
    if (isCalled) {
      // If already called, cancel the call
      handleCancel();
    } else {
      // Start new call
      setIsCalled(true);
      setIsExpanded(true);
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
    setIsExpanded(false);
    setShowMessageInput(false);
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
            <span className="font-medium">Waiter Called</span>
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
          
          {isCalled && (
            <div className="text-sm text-gray-500 mb-3">
              Waiting time: {formatTime(timer)}
            </div>
          )}

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
                  <Send className="w-4 h-4 mr-1" />
                  Send
                </button>
              </div>
            </div>
          ) : (
            <div className="flex space-x-2">
              <button
                onClick={handleCancel}
                className="flex-1 px-3 py-1.5 text-sm bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Cancel Call
              </button>
              <button
                onClick={() => setShowMessageInput(true)}
                className="flex-1 px-3 py-1.5 text-sm bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 flex items-center justify-center"
              >
                <MessageSquare className="w-4 h-4 mr-1" />
                Message
              </button>
            </div>
          )}
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