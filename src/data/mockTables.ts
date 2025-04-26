import { Table } from '../types';

export const generateMockTables = (): Table[] => {
  return Array.from({ length: 10 }, (_, i) => ({
    id: `table-${i + 1}`,
    number: i + 1,
    seats: 4 + (i % 2) * 2,
    qrCode: `table-${i + 1}-qr`
  }));
};