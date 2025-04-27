import React, { useEffect, useState, useRef } from 'react';
import { Camera, X, ArrowLeft, LogIn, LogOut, Search, AlertCircle, RefreshCw } from 'lucide-react';
import { Html5Qrcode } from 'html5-qrcode';
import useStore from '../store';
import { getRestaurantById, getTableByQRCode } from '../data/mockData';
import { useNavigate, useLocation } from 'react-router-dom';

const QRScanner: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isScanning, setIsScanning] = useState(false);
  const [scanError, setScanError] = useState<string | null>(null);
  const [cameraPermission, setCameraPermission] = useState<'granted' | 'denied' | 'prompt'>('prompt');
  const [debugInfo, setDebugInfo] = useState<string>('');
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const mountedRef = useRef(true);
  
  const { 
    setCurrentRestaurant, 
    setCurrentTable, 
    setScanning: setStoreScanningState,
    isLoggedIn
  } = useStore();

  useEffect(() => {
    mountedRef.current = true;

    const params = new URLSearchParams(location.search);
    const merchantId = params.get('merchant');
    const tableId = params.get('table');

    if (merchantId) {
      console.log('URL Parameters:', { merchantId, tableId });
      handleMerchantAndTable(merchantId, tableId || null);
    }

    navigator.permissions.query({ name: 'camera' as PermissionName })
      .then(permissionStatus => {
        if (mountedRef.current) {
          setCameraPermission(permissionStatus.state as 'granted' | 'denied' | 'prompt');
          
          permissionStatus.onchange = () => {
            if (mountedRef.current) {
              setCameraPermission(permissionStatus.state as 'granted' | 'denied' | 'prompt');
            }
          };
        }
      });

    return () => {
      mountedRef.current = false;
      stopScanner();
    };
  }, [location]);

  const handleMerchantAndTable = async (merchantId: string, tableId: string | null) => {
    try {
      console.log('Processing merchant and table:', { merchantId, tableId });
      setDebugInfo(`Processing: merchant=${merchantId}, table=${tableId}`);

      const restaurant = await getRestaurantById(merchantId);
      console.log('Restaurant result:', restaurant);
      
      if (!restaurant) {
        const error = 'Restaurant not found. Please check if you are scanning the correct QR code or try searching for the restaurant instead.';
        // console.error(error);
        console.log(error);
        setDebugInfo(prev => `${prev}\nError: Restaurant not found`);
        setScanError(error);
        return;
      }

      let table = null;
      if (tableId) {
        table = await getTableByQRCode(tableId);
        console.log('Table result:', table);
      }

      setDebugInfo(prev => `${prev}\nSuccess: Found restaurant${table ? ' and table' : ''}`);
      setCurrentRestaurant(restaurant);
      if (table) {
        setCurrentTable(table);
      } else {
        // If no table is found, use the first available table
        const firstAvailableTable = restaurant.tables.find(t => t.isAvailable && !t.isLocked);
        if (firstAvailableTable) {
          setCurrentTable(firstAvailableTable);
        }
      }

      // Stop scanning and camera before navigation
      await stopScanner();
      setScanError(null);
      navigate('/');
    } catch (error) {
      console.error('Error processing merchant and table:', error);
      setDebugInfo(prev => `${prev}\nError: ${error}`);
      setScanError('An unexpected error occurred. Please try scanning again.');
    }
  };

  const stopScanner = async () => {
    try {
      if (scannerRef.current) {
        if (scannerRef.current.isScanning) {
          await scannerRef.current.stop();
        }
        await scannerRef.current.clear();
        scannerRef.current = null;
      }
    } catch (error) {
      console.error('Failed to stop QR scanner:', error);
    } finally {
      if (mountedRef.current) {
        setIsScanning(false);
        setStoreScanningState(false);
      }
    }
  };

  useEffect(() => {
    if (cameraPermission === 'granted' && isScanning) {
      const qrScanner = new Html5Qrcode('qr-reader');
      scannerRef.current = qrScanner;
      
      const config = { 
        fps: 10, 
        qrbox: { 
          width: Math.min(window.innerWidth * 0.9, 300),
          height: Math.min(window.innerWidth * 0.9, 300)
        } 
      };
      
      qrScanner.start(
        { facingMode: 'environment' },
        config,
        onScanSuccess,
        onScanFailure
      ).catch(error => {
        console.error('Failed to start QR scanner:', error);
        setDebugInfo(prev => `${prev}\nScanner Error: ${error}`);
        setScanError('Could not access camera. Please check permissions.');
        if (mountedRef.current) {
          setIsScanning(false);
          setStoreScanningState(false);
        }
      });

      return () => {
        stopScanner();
      };
    }
  }, [cameraPermission, isScanning]);

  const requestCameraPermission = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      stream.getTracks().forEach(track => track.stop());
      if (mountedRef.current) {
        setCameraPermission('granted');
        setIsScanning(true);
        setStoreScanningState(true);
        setScanError(null);
      }
    } catch (error) {
      console.error('Camera permission denied:', error);
      if (mountedRef.current) {
        setCameraPermission('denied');
        setScanError('Camera access denied. Please enable camera access in your browser settings.');
      }
    }
  };

  const onScanSuccess = async (decodedText: string) => {
    try {
      console.log('Scanned QR content:', decodedText);
      setDebugInfo(`Scanned content: ${decodedText}`);

      // Stop the scanner immediately after a successful scan
      await stopScanner();

      // Handle URL format
      if (decodedText.includes('http')) {
        try {
          const url = new URL(decodedText);
          const merchantId = url.searchParams.get('merchant');
          const tableId = url.searchParams.get('table');
          
          if (merchantId) {
            await handleMerchantAndTable(merchantId, tableId);
            return;
          }
        } catch (error) {
          console.error('Invalid URL format:', error);
        }
      }

      // Handle direct format (rest-1:table-1-qr)
      if (decodedText.includes(':')) {
        const [restaurantId, tableQrCode] = decodedText.split(':');
        console.log('Parsed content:', { restaurantId, tableQrCode });
        
        if (!restaurantId) {
          setScanError('Invalid QR code format. Please scan a QR code from a restaurant table.');
          return;
        }
        
        await handleMerchantAndTable(restaurantId, tableQrCode || null);
      } else {
        setScanError('Invalid QR code format. Please scan a valid restaurant QR code.');
      }
    } catch (error) {
      console.error('Error processing QR code:', error);
      setDebugInfo(prev => `${prev}\nError: ${error}`);
      setScanError('Something went wrong while processing the QR code. Please try scanning again.');
    }
  };

  const onScanFailure = (error: string) => {
    if (!error.includes('No QR code found') && !error.includes('NotFoundException')) {
      console.error('QR scan error:', error);
      setDebugInfo(prev => `${prev}\nScan error: ${error}`);
    }
  };

  const handleAuthClick = () => {
    if (isLoggedIn) {
      navigate('/');
    } else {
      navigate('/auth');
    }
  };

  const retryScanning = () => {
    setScanError(null);
    setDebugInfo('');
    setIsScanning(true);
    setStoreScanningState(true);
  };

  // Error message component
  const ErrorMessage = ({ error }: { error: string }) => (
    <div className="mt-4 p-4 bg-red-50 rounded-lg border border-red-100">
      <div className="flex items-start">
        <AlertCircle className="w-5 h-5 text-red-600 mr-3 flex-shrink-0 mt-0.5" />
        <div className="flex-1">
          <h3 className="text-red-800 font-medium mb-1">Unable to Process QR Code</h3>
          <div className="text-red-700 text-sm whitespace-pre-line">{error}</div>
          
          <div className="mt-4 flex gap-3">
            <button
              onClick={retryScanning}
              className="flex items-center px-4 py-2 bg-red-100 text-red-700 rounded-md hover:bg-red-200 transition-colors"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Try Again
            </button>
            <button
              onClick={() => navigate('/search')}
              className="flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
            >
              <Search className="w-4 h-4 mr-2" />
              Search Instead
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
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
          {/* Show error message even when not scanning */}
          {scanError && !isScanning && (
            <ErrorMessage error={scanError} />
          )}
          
          {isScanning ? (
            <div className="relative">
              <div id="qr-reader" className="w-full h-96 overflow-hidden rounded-lg bg-gray-100" />
              <button 
                onClick={stopScanner}
                className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md"
                aria-label="Close scanner"
              >
                <X className="w-5 h-5 text-gray-700" />
              </button>
              
              {/* Show error message while scanning */}
              {scanError && <ErrorMessage error={scanError} />}
            </div>
          ) : !scanError && (
            <div className="text-center">
              <div className="w-64 h-64 bg-gray-100 flex items-center justify-center rounded-lg mx-auto mb-6">
                <Camera className="w-24 h-24 text-gray-400" />
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
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QRScanner;