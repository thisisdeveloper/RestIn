import React, { useEffect, useState } from 'react';
import { Camera, X, ArrowLeft, LogIn, LogOut, Search, AlertCircle } from 'lucide-react';
import { Html5Qrcode } from 'html5-qrcode';
import useStore from '../store';
import { getRestaurantById, getTableByQRCode } from '../data/mockData';
import { useNavigate } from 'react-router-dom';

const QRScanner: React.FC = () => {
  const navigate = useNavigate();
  const [isScanning, setIsScanning] = useState(false);
  const [scanError, setScanError] = useState<string | null>(null);
  const [html5QrCode, setHtml5QrCode] = useState<Html5Qrcode | null>(null);
  const [cameraPermission, setCameraPermission] = useState<'granted' | 'denied' | 'prompt'>('prompt');
  
  const { 
    setCurrentRestaurant, 
    setCurrentTable, 
    setScanning: setStoreScanningState,
    isLoggedIn
  } = useStore();

  useEffect(() => {
    // Check for existing camera permission
    navigator.permissions.query({ name: 'camera' as PermissionName })
      .then(permissionStatus => {
        setCameraPermission(permissionStatus.state as 'granted' | 'denied' | 'prompt');
        
        // Listen for permission changes
        permissionStatus.onchange = () => {
          setCameraPermission(permissionStatus.state as 'granted' | 'denied' | 'prompt');
        };
      });

    return () => {
      if (html5QrCode?.isScanning) {
        html5QrCode.stop().catch(error => console.error('Failed to stop QR scanner:', error));
      }
    };
  }, []);

  // New useEffect to handle scanner initialization after permission is granted
  useEffect(() => {
    if (cameraPermission === 'granted' && isScanning) {
      const qrScanner = new Html5Qrcode('qr-reader');
      setHtml5QrCode(qrScanner);
      
      const config = { fps: 10, qrbox: { width: 250, height: 250 } };
      
      qrScanner.start(
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
  }, [cameraPermission, isScanning]);

  const requestCameraPermission = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      stream.getTracks().forEach(track => track.stop()); // Stop the stream immediately
      setCameraPermission('granted');
      setIsScanning(true);
      setStoreScanningState(true);
      setScanError(null);
    } catch (error) {
      console.error('Camera permission denied:', error);
      setCameraPermission('denied');
      setScanError('Camera access denied. Please enable camera access in your browser settings.');
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
      // First validate QR code format
      if (!decodedText.includes(':')) {
        setScanError('Invalid QR code format. Please scan a valid restaurant QR code.');
        return;
      }

      const [restaurantId, tableQrCode] = decodedText.split(':');
      
      if (!restaurantId || !tableQrCode) {
        setScanError('Invalid QR code format. The QR code is missing required information.');
        return;
      }
      
      const restaurant = await getRestaurantById(restaurantId);
      if (!restaurant) {
        setScanError('Restaurant not found. Please check if you are scanning the correct QR code.');
        return;
      }

      const table = await getTableByQRCode(tableQrCode);
      if (!table) {
        setScanError('Table not found. This table may no longer be active.');
        return;
      }
      
      // If we get here, both restaurant and table were found
      setCurrentRestaurant(restaurant);
      setCurrentTable(table);
      setScanError(null);
      stopScanner();
      navigate('/');
      
    } catch (error) {
      console.error('Error processing QR code:', error);
      setScanError('An unexpected error occurred. Please try scanning again.');
    }
  };

  const onScanFailure = (error: string) => {
    // Only log errors that are not related to QR code detection
    if (!error.includes('No QR code found') && !error.includes('NotFoundException')) {
      console.error('QR scan error:', error);
    }
  };
  
  const simulateScan = async () => {
    const restaurant = await getRestaurantById('rest-1');
    const table = await getTableByQRCode('table-1-qr');
    
    if (restaurant && table) {
      setCurrentRestaurant(restaurant);
      setCurrentTable(table);
      stopScanner();
      navigate('/');
    }
  };

  const handleAuthClick = () => {
    if (isLoggedIn) {
      // Handle logout
      navigate('/');
    } else {
      navigate('/auth');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="bg-white shadow-md">
        <div className="max-w-lg mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <button 
                onClick={() => navigate('/')}
                className="p-2 -ml-2 rounded-full hover:bg-gray-100"
              >
                <ArrowLeft className="w-6 h-6" />
              </button>
              <h1 className="text-xl font-bold ml-2">Scan QR Code</h1>
            </div>
            <button
              onClick={handleAuthClick}
              className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
            >
              {isLoggedIn ? (
                <>
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </>
              ) : (
                <>
                  <LogIn className="w-4 h-4 mr-2" />
                  Login
                </>
              )}
            </button>
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
                <div className="mt-4 p-4 bg-red-100 text-red-800 rounded-md flex items-start">
                  <AlertCircle className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium">Scanning Error</p>
                    <p className="text-sm mt-1">{scanError}</p>
                  </div>
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
              
              {cameraPermission === 'denied' ? (
                <div className="mb-6 p-4 bg-red-100 text-red-800 rounded-md flex items-start">
                  <AlertCircle className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5" />
                  <div className="text-left">
                    <p className="font-medium">Camera Access Required</p>
                    <p className="text-sm mt-1">
                      Please enable camera access in your browser settings to scan QR codes.
                    </p>
                  </div>
                </div>
              ) : (
                <button
                  onClick={cameraPermission === 'granted' ? () => {
                    setIsScanning(true);
                    setStoreScanningState(true);
                    setScanError(null);
                  } : requestCameraPermission}
                  className="w-full py-3 bg-indigo-600 text-white rounded-lg font-medium shadow-sm hover:bg-indigo-700 transition-colors mb-4"
                >
                  {cameraPermission === 'prompt' ? 'Allow Camera & Start Scanning' : 'Start Scanning'}
                </button>
              )}

              <button
                onClick={() => navigate('/search')}
                className="w-full py-3 bg-white text-indigo-600 border border-indigo-600 rounded-lg font-medium shadow-sm hover:bg-indigo-50 transition-colors mb-4 flex items-center justify-center"
              >
                <Search className="w-5 h-5 mr-2" />
                Search Restaurants
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