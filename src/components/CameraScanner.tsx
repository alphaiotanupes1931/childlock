import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Camera,
  Scan,
  CheckCircle,
  XCircle,
  RotateCcw,
  AlertTriangle,
} from "lucide-react";
import { colors } from "@/lib/colors";

interface CameraScannerProps {
  title?: string;
  description?: string;
  onScanResult?: (result: ScanResult) => void;
  scanType?: "qr" | "id";
}

interface ScanResult {
  success: boolean;
  data?: any;
  error?: string;
  type: "qr" | "id";
}

const CameraScanner = ({
  title = "Document Scanner",
  description = "Position the document within the frame",
  onScanResult,
  scanType = "qr",
}: CameraScannerProps) => {
  const [isScanning, setIsScanning] = useState(false);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanResult, setScanResult] = useState<ScanResult | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    checkCameraPermission();
    return () => {
      stopCamera();
    };
  }, []);

  const checkCameraPermission = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      setHasPermission(true);
      stream.getTracks().forEach((track) => track.stop());
    } catch (error) {
      setHasPermission(false);
    }
  };

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: "environment", // Use back camera on mobile
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
        setIsScanning(true);
      }
    } catch (error) {
      console.error("Error accessing camera:", error);
      setHasPermission(false);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    setIsScanning(false);
  };

  const simulateScan = async () => {
    setIsProcessing(true);

    // Simulate scanning delay
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Simulate scan result (80% success rate)
    const success = Math.random() > 0.2;
    const result: ScanResult = {
      success,
      type: scanType,
      data: success
        ? {
            id: "BC-2020123456",
            name: "Emma Johnson",
            age: 8,
            verified: true,
          }
        : undefined,
      error: success ? undefined : "Document not recognized or invalid",
    };

    setScanResult(result);
    setIsProcessing(false);
    stopCamera();

    if (onScanResult) {
      onScanResult(result);
    }
  };

  const resetScan = () => {
    setScanResult(null);
    setIsProcessing(false);
  };

  if (hasPermission === null) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center p-8">
          <div className="text-center">
            <Camera className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">Checking camera permissions...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (hasPermission === false) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <AlertTriangle className="h-5 w-5 text-red-600" />
            <span>Camera Access Required</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Alert>
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              Camera access is required for document scanning. Please allow
              camera permissions and try again.
            </AlertDescription>
          </Alert>
          <Button
            onClick={checkCameraPermission}
            className="w-full mt-4"
            style={{ backgroundColor: colors.primary }}
          >
            Grant Camera Access
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Scan className="h-5 w-5" style={{ color: colors.primary }} />
          <span>{title}</span>
        </CardTitle>
        <p className="text-sm text-gray-600">{description}</p>
      </CardHeader>
      <CardContent>
        {!isScanning && !scanResult && (
          <div className="text-center">
            <div
              className="w-full h-64 rounded-lg border-2 border-dashed flex items-center justify-center mb-4"
              style={{ borderColor: colors.border }}
            >
              <div className="text-center">
                <Camera className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 mb-4">
                  {scanType === "qr"
                    ? "Ready to scan QR code"
                    : "Ready to scan ID document"}
                </p>
                <Button
                  onClick={startCamera}
                  style={{ backgroundColor: colors.primary }}
                >
                  <Camera className="h-4 w-4 mr-2" />
                  Start Camera
                </Button>
              </div>
            </div>
          </div>
        )}

        {isScanning && (
          <div className="relative">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              className="w-full h-64 rounded-lg object-cover"
            />

            {/* Scanning overlay */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div
                className="w-48 h-32 border-2 rounded-lg"
                style={{ borderColor: colors.primary }}
              >
                <div
                  className="absolute top-0 left-0 w-6 h-6 border-t-4 border-l-4 rounded-tl-lg"
                  style={{ borderColor: colors.primary }}
                ></div>
                <div
                  className="absolute top-0 right-0 w-6 h-6 border-t-4 border-r-4 rounded-tr-lg"
                  style={{ borderColor: colors.primary }}
                ></div>
                <div
                  className="absolute bottom-0 left-0 w-6 h-6 border-b-4 border-l-4 rounded-bl-lg"
                  style={{ borderColor: colors.primary }}
                ></div>
                <div
                  className="absolute bottom-0 right-0 w-6 h-6 border-b-4 border-r-4 rounded-br-lg"
                  style={{ borderColor: colors.primary }}
                ></div>
              </div>
            </div>

            <div className="flex justify-center space-x-4 mt-4">
              <Button
                onClick={simulateScan}
                disabled={isProcessing}
                style={{ backgroundColor: colors.primary }}
              >
                {isProcessing ? "Processing..." : "Capture"}
              </Button>
              <Button variant="outline" onClick={stopCamera}>
                Cancel
              </Button>
            </div>
          </div>
        )}

        {scanResult && (
          <div className="space-y-4">
            <div
              className={`p-4 rounded-lg border ${
                scanResult.success
                  ? "border-green-200 bg-green-50"
                  : "border-red-200 bg-red-50"
              }`}
            >
              <div className="flex items-center space-x-2 mb-2">
                {scanResult.success ? (
                  <CheckCircle className="h-5 w-5 text-green-600" />
                ) : (
                  <XCircle className="h-5 w-5 text-red-600" />
                )}
                <span
                  className={`font-medium ${
                    scanResult.success ? "text-green-800" : "text-red-800"
                  }`}
                >
                  {scanResult.success ? "Scan Successful" : "Scan Failed"}
                </span>
              </div>

              {scanResult.success && scanResult.data && (
                <div className="text-sm space-y-1">
                  <p>
                    <strong>ID:</strong> {scanResult.data.id}
                  </p>
                  <p>
                    <strong>Name:</strong> {scanResult.data.name}
                  </p>
                  <p>
                    <strong>Age:</strong> {scanResult.data.age}
                  </p>
                  <p>
                    <strong>Status:</strong>
                    <span className="text-green-600 ml-1">Verified</span>
                  </p>
                </div>
              )}

              {!scanResult.success && scanResult.error && (
                <p className="text-sm text-red-700">{scanResult.error}</p>
              )}
            </div>

            <div className="flex space-x-2">
              <Button
                onClick={resetScan}
                className="flex-1"
                style={{ backgroundColor: colors.primary }}
              >
                <RotateCcw className="h-4 w-4 mr-2" />
                Scan Again
              </Button>
              {scanResult.success && (
                <Button variant="outline" className="flex-1">
                  Continue
                </Button>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CameraScanner;
