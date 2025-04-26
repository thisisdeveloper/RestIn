import { Review } from '../types';

export const generateMockReviews = (itemId: string): Review[] => {
  return [
    {
      id: `${itemId}-rev1`,
      userId: 'user1',
      userName: 'John D.',
      rating: 5,
      comment: 'Absolutely delicious! The flavors were perfectly balanced.',
      createdAt: new Date('2024-02-15')
    },
    {
      id: `${itemId}-rev2`,
      userId: 'user2',
      userName: 'Sarah M.',
      rating: 4,
      comment: 'Really enjoyed this dish. Would definitely order again!',
      createdAt: new Date('2024-02-10')
    },
    {
      id: `${itemId}-rev3`,
      userId: 'user3',
      userName: 'Mike R.',
      rating: 5,
      comment: 'One of the best dishes I\'ve had here. Highly recommended!',
      createdAt: new Date('2024-02-05')
    }
  ];
};