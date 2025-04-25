import React, { useState } from 'react';
import { ArrowLeft, Search, MessageSquare, Phone, Mail, ChevronRight, ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

const faqs: FAQItem[] = [
  {
    id: 'faq1',
    question: 'How do I place an order?',
    answer: 'To place an order, simply scan the QR code at your table, browse the menu, select your items, and add them to your cart. Once you\'re ready, click on "Place Order" in your cart.',
    category: 'Orders'
  },
  {
    id: 'faq2',
    question: 'How can I modify or cancel my order?',
    answer: 'You can modify or cancel your order within 5 minutes of placing it. Go to the Orders section and look for the cancel option. After 5 minutes, please contact our staff for assistance.',
    category: 'Orders'
  },
  {
    id:  'faq3',
    question: 'How do I redeem my rewards?',
    answer: 'Navigate to the Rewards section in your account. Select the reward you want to redeem and click on "Redeem". The reward will be automatically applied to your next eligible order.',
    category: 'Rewards'
  },
  {
    id: 'faq4',
    question: 'What payment methods do you accept?',
    answer: 'We accept all major credit cards, debit cards, and digital wallets including Apple Pay and Google Pay. You can also pay using your wallet balance.',
    category: 'Payment'
  }
];

const SupportPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFAQ, setSelectedFAQ] = useState<string | null>(null);

  const filteredFAQs = faqs.filter(faq =>
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const contactMethods = [
    {
      icon: <MessageSquare className="w-5 h-5" />,
      title: 'Live Chat',
      description: 'Chat with our support team',
      action: 'Start Chat'
    },
    {
      icon: <Phone className="w-5 h-5" />,
      title: 'Phone',
      description: '+1 (234) 567-8900',
      action: 'Call Now'
    },
    {
      icon: <Mail className="w-5 h-5" />,
      title: 'Email',
      description: 'support@restaurant.com',
      action: 'Send Email'
    }
  ];

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
            <h1 className="text-xl font-bold ml-2">Support</h1>
          </div>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4 py-6">
        {/* Search */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search for help..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Contact Methods */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-6">
          <div className="p-4 border-b">
            <h2 className="font-semibold">Contact Us</h2>
          </div>
          <div className="divide-y">
            {contactMethods.map((method, index) => (
              <div key={index} className="p-4 flex items-center">
                <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600">
                  {method.icon}
                </div>
                <div className="ml-4 flex-1">
                  <h3 className="font-medium">{method.title}</h3>
                  <p className="text-sm text-gray-500">{method.description}</p>
                </div>
                <button className="flex items-center text-indigo-600 font-medium">
                  {method.action}
                  <ExternalLink className="w-4 h-4 ml-1" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* FAQs */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-4 border-b">
            <h2 className="font-semibold">Frequently Asked Questions</h2>
          </div>
          <div className="divide-y">
            {filteredFAQs.map(faq => (
              <div key={faq.id} className="p-4">
                <button
                  onClick={() => setSelectedFAQ(selectedFAQ === faq.id ? null : faq.id)}
                  className="w-full text-left"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">{faq.question}</h3>
                    <ChevronRight
                      className={`w-5 h-5 text-gray-400 transition-transform ${
                        selectedFAQ === faq.id ? 'rotate-90' : ''
                      }`}
                    />
                  </div>
                  {selectedFAQ === faq.id && (
                    <p className="mt-2 text-gray-600 text-sm">{faq.answer}</p>
                  )}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupportPage;