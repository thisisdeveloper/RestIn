import React, { useEffect, useState } from 'react';
import { Camera, X, ArrowLeft } from 'lucide-react';
import { Html5Qrcode } from 'html5-qrcode';
import useStore from '../store';
import { getRestaurantById, getTableByQRCode } from '../data/mockData';

interface QRScannerProps {
  onClose?: () => void;
}

const QRScanner: React.FC<QRScannerProps> = ({ onClose }) => {
  const [isScanning, setIsScanning] = useState(false);
  const [scanError, setScanError] = useState<string | null>(null);
  const [html5QrCode, setHtml5QrCode] = useState<Html5Qrcode | null>(null);
  
  const { 
    setCurrentRestaurant, 
    setCurrentTable, 
    setScanning: setStoreScanningState 
  } = useStore();

  useEffect(() => {
    if (isScanning && !html5QrCode) {
      const qrScanner = new Html5Qrcode('qr-reader');
      setHtml5QrCode(qrScanner);
    }
    
    return () => {
      if (html5QrCode?.isScanning) {
        html5QrCode.stop().catch(error => console.error('Failed to stop QR scanner:', error));
      }
    };
  }, [isScanning, html5QrCode]);

  const startScanner = () => {
    setIsScanning(true);
    setScanError(null);
    setStoreScanningState(true);
    
    if (html5QrCode) {
      const config = { fps: 10, qrbox: { width: 250, height: 250 } };
      
      html5QrCode.start(
        { facingMode: 'environment' },
        config,
        onScanSuccess,
        onScanFailure
      ).catch(error => {
        console.error('Failed to start QR scanner:', error);
        setScanError('Could not access camera. Please check permissions.');
        setIsScanning(false);
        setStoreScanningState(false);
      });
    }
  };

  const stopScanner = () => {
    if (html5QrCode?.isScanning) {
      html5QrCode.stop().catch(error => console.error('Failed to stop QR scanner:', error));
    }
    setIsScanning(false);
    setStoreScanningState(false);
  };

  const onScanSuccess = async (decodedText: string) => {
    try {
      // Expected QR code format: "restaurant-id:table-qr-code"
      const [restaurantId, tableQrCode] = decodedText.split(':');
      
      if (!restaurantId || !tableQrCode) {
        throw new Error('Invalid QR code format');
      }
      
      const restaurant = await getRestaurantById(restaurantId);
      const table = await getTableByQRCode(tableQrCode);
      
      if (!restaurant || !table) {
        throw new Error('Restaurant or table not found');
      }
      
      setCurrentRestaurant(restaurant);
      setCurrentTable(table);
      stopScanner();
      
    } catch (error) {
      console.error('Error processing QR code:', error);
      setScanError('Invalid QR code or restaurant/table not found. Please try again.');
      // Keep scanning for another attempt
    }
  };

  const onScanFailure = (error: string) => {
    // This is called frequently when no QR is detected, so we don't want to set state
    // on every frame. Only report actual errors.
    if (error !== 'No QR code found') {
      console.error('QR scan error:', error);
    }
  };
  
  // For demo purposes - simulate scanning a valid QR code
  const simulateScan = async () => {
    const restaurant = await getRestaurantById('rest-1');
    const table = await getTableByQRCode('table-1-qr');
    
    if (restaurant && table) {
      setCurrentRestaurant(restaurant);
      setCurrentTable(table);
      stopScanner();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-white shadow-md">
        <div className="max-w-lg mx-auto px-4 py-4">
          <div className="flex items-center">
            <button 
              onClick={onClose}
              className="p-2 -ml-2 rounded-full hover:bg-gray-100"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <h1 className="text-xl font-bold ml-2">Scan QR Code</h1>
          </div>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {isScanning ? (
            <div className="relative">
              <div id="qr-reader" className="w-full h-64 overflow-hidden rounded-lg bg-gray-100" />
              <button 
                onClick={stopScanner}
                className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md"
                aria-label="Close scanner"
              >
                <X className="w-5 h-5 text-gray-700" />
              </button>
              
              {scanError && (
                <div className="mt-4 p-3 bg-red-100 text-red-800 rounded-md text-sm">
                  {scanError}
                </div>
              )}
            </div>
          ) : (
            <div className="text-center">
              <div className="w-48 h-48 bg-gray-100 flex items-center justify-center rounded-lg mx-auto mb-6">
                <Camera className="w-16 h-16 text-gray-400" />
              </div>
              
              <p className="text-gray-600 mb-8">
                Scan the QR code on your table to start ordering
              </p>
              
              <button
                onClick={startScanner}
                className="w-full py-3 bg-indigo-600 text-white rounded-lg font-medium shadow-sm hover:bg-indigo-700 transition-colors mb-4"
              >
                Start Scanning
              </button>
              
              <button
                onClick={simulateScan}
                className="w-full py-3 bg-gray-200 text-gray-800 rounded-lg font-medium shadow-sm hover:bg-gray-300 transition-colors"
              >
                Simulate Scan (Demo)
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QRScanner;