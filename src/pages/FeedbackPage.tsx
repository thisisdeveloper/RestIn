import React, { useState } from 'react';
import { ArrowLeft, Star, ThumbsUp, MessageSquare } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface FeedbackCategory {
  id: string;
  name: string;
  icon: React.ReactNode;
}

const categories: FeedbackCategory[] = [
  { id: 'food', name: 'Food Quality', icon: <span className="text-2xl">🍽️</span> },
  { id: 'service', name: 'Service', icon: <span className="text-2xl">👨‍🍳</span> },
  { id: 'ambiance', name: 'Ambiance', icon: <span className="text-2xl">🏠</span> },
  { id: 'app', name: 'App Experience', icon: <span className="text-2xl">📱</span> },
  { id: 'other', name: 'Other', icon: <span className="text-2xl">✨</span> }
];

const FeedbackPage: React.FC = () => {
  const navigate = useNavigate();
  const [rating, setRating] = useState<number>(0);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [feedback, setFeedback] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle feedback submission
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-lg mx-auto px-4 py-12 text-center">
          <ThumbsUp className="w-16 h-16 text-green-500 mx-auto mb-6" />
          <h2 className="text-2xl font-bold mb-4">Thank You for Your Feedback!</h2>
          <p className="text-gray-600 mb-8">
            Your feedback helps us improve our service and provide a better experience for everyone.
          </p>
          <button
            onClick={() => navigate('/account')}
            className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700"
          >
            Back to Account
          </button>
        </div>
      </div>
    );
  }

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
            <h1 className="text-xl font-bold ml-2">Share Feedback</h1>
          </div>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4 py-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Rating */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              How would you rate your overall experience?
            </label>
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((value) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setRating(value)}
                  className="p-2 focus:outline-none"
                >
                  <Star
                    className={`w-8 h-8 ${
                      value <= rating
                        ? 'text-yellow-400 fill-yellow-400'
                        : 'text-gray-300'
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Categories */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              What would you like to give feedback about?
            </label>
            <div className="grid grid-cols-3 gap-3">
              {categories.map(category => (
                <button
                  key={category.id}
                  type="button"
                  onClick={() => setSelectedCategory(category.id)}
                  className={`p-4 rounded-xl border text-center transition-all ${
                    selectedCategory === category.id
                      ? 'border-indigo-500 bg-indigo-50 scale-[1.02]'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="mb-2">{category.icon}</div>
                  <span className="text-sm font-medium">{category.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Feedback Text */}
          <div>
            <label htmlFor="feedback" className="block text-sm font-medium text-gray-700 mb-2">
              Tell us more about your experience
            </label>
            <div className="relative">
              <textarea
                id="feedback"
                rows={4}
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="Share your thoughts..."
                className="block w-full rounded-lg border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
              <div className="absolute bottom-2 right-2">
                <MessageSquare className="w-5 h-5 text-gray-400" />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={!rating || !selectedCategory || !feedback}
            className={`w-full py-3 rounded-lg font-medium ${
              rating && selectedCategory && feedback
                ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                : 'bg-gray-200 text-gray-500 cursor-not-allowed'
            }`}
          >
            Submit Feedback
          </button>
        </form>
      </div>
    </div>
  );
};

export default FeedbackPage;