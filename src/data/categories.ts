export type CategoryType = 'Veg' | 'NonVeg' | 'Drink';

export const categories: CategoryType[] = ['Veg', 'NonVeg', 'Drink'];

export const categoryIcons: Record<CategoryType, string> = {
  Veg: '🥗',
  NonVeg: '🍗',
  Drink: '🍹'
};

export const categoryColors: Record<CategoryType, string> = {
  Veg: 'bg-green-100 text-green-800',
  NonVeg: 'bg-red-100 text-red-800',
  Drink: 'bg-blue-100 text-blue-800'
};