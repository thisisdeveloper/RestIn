import React from 'react';
import { ArrowLeft, Gift, Star, Trophy, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Reward {
  id: string;
  title: string;
  description: string;
  points: number;
  image: string;
  expiryDate?: Date;
  claimed: boolean;
}

const mockRewards: Reward[] = [
  {
    id: 'r1',
    title: 'Free Dessert',
    description: 'Get any dessert from our menu for free',
    points: 500,
    image: 'https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&w=800',
    claimed: false
  },
  {
    id: 'r2',
    title: '25% Off Next Order',
    description: 'Get 25% off on your next order',
    points: 1000,
    image: 'https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg?auto=compress&cs=tinysrgb&w=800',
    expiryDate: new Date('2024-03-31'),
    claimed: false
  },
  {
    id: 'r3',
    title: 'Free Appetizer',
    description: 'Choose any appetizer from our menu',
    points: 300,
    image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800',
    claimed: true
  }
];

const RewardsPage: React.FC = () => {
  const navigate = useNavigate();
  const userPoints = 750;
  const membershipLevel = userPoints >= 1000 ? 'Gold' : userPoints >= 500 ? 'Silver' : 'Bronze';

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
            <h1 className="text-xl font-bold ml-2">Rewards</h1>
          </div>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4 py-6">
        {/* Points Summary */}
        <div className="bg-indigo-600 rounded-xl p-6 text-white mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <Star className="w-6 h-6 mr-2" />
              <span className="text-sm opacity-90">Available Points</span>
            </div>
            <Trophy className="w-6 h-6" />
          </div>
          <div className="text-3xl font-bold mb-2">{userPoints} pts</div>
          <div className="text-sm">
            {membershipLevel} Member
          </div>
        </div>

        {/* Available Rewards */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-4">Available Rewards</h2>
          <div className="space-y-4">
            {mockRewards
              .filter(reward => !reward.claimed)
              .map(reward => (
                <div 
                  key={reward.id}
                  className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
                >
                  <div className="h-32 relative">
                    <img 
                      src={reward.image} 
                      alt={reward.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 right-2 bg-black/50 text-white px-2 py-1 rounded-full text-sm backdrop-blur-sm">
                      {reward.points} pts
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-lg mb-1">{reward.title}</h3>
                    <p className="text-gray-600 text-sm mb-3">{reward.description}</p>
                    {reward.expiryDate && (
                      <p className="text-sm text-gray-500 mb-3">
                        Expires on {reward.expiryDate.toLocaleDateString()}
                      </p>
                    )}
                    <button
                      disabled={userPoints < reward.points}
                      className={`w-full py-2 rounded-lg font-medium ${
                        userPoints >= reward.points
                          ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                          : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      }`}
                    >
                      {userPoints >= reward.points ? 'Redeem Reward' : 'Not Enough Points'}
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* Claimed Rewards */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Claimed Rewards</h2>
          <div className="space-y-4">
            {mockRewards
              .filter(reward => reward.claimed)
              .map(reward => (
                <div 
                  key={reward.id}
                  className="bg-gray-50 rounded-xl p-4"
                >
                  <div className="flex items-center">
                    <img 
                      src={reward.image}
                      alt={reward.title}
                      className="w-16 h-16 rounded-lg object-cover mr-4"
                    />
                    <div className="flex-1">
                      <h3 className="font-medium">{reward.title}</h3>
                      <p className="text-sm text-gray-500">Claimed on {new Date().toLocaleDateString()}</p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RewardsPage;