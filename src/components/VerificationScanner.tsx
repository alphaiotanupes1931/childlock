import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import {
  Scan,
  CheckCircle,
  XCircle,
  Clock,
  Phone,
  FileText,
} from "lucide-react";
import { Child } from "@/lib/types";
import { mockChildren } from "@/lib/mockData";

interface VerificationResult {
  status: "scanning" | "verified" | "failed" | "pending";
  child?: Child;
  message: string;
}

const VerificationScanner = () => {
  const [result, setResult] = useState<VerificationResult>({
    status: "scanning",
    message: "Point camera at QR code or enter child ID manually",
  });
  const [notes, setNotes] = useState("");
  const [isScanning, setIsScanning] = useState(false);

  const handleScan = () => {
    setIsScanning(true);
    setResult({ status: "scanning", message: "Scanning..." });

    // Simulate scanning process
    setTimeout(() => {
      // Randomly select a child for demo
      const randomChild =
        mockChildren[Math.floor(Math.random() * mockChildren.length)];

      setResult({
        status: "verified",
        child: randomChild,
        message: "Child successfully verified with parent record",
      });
      setIsScanning(false);
    }, 2000);
  };

  const handleVerify = (approved: boolean) => {
    setResult((prevResult) => ({
      ...prevResult,
      status: approved ? "verified" : "failed",
      message: approved
        ? "Verification completed successfully"
        : "Verification failed - unauthorized access",
    }));
  };

  const handleReset = () => {
    setResult({
      status: "scanning",
      message: "Point camera at QR code or enter child ID manually",
    });
    setNotes("");
  };

  const getStatusIcon = () => {
    switch (result.status) {
      case "verified":
        return <CheckCircle className="h-8 w-8 text-green-600" />;
      case "failed":
        return <XCircle className="h-8 w-8 text-red-600" />;
      case "pending":
        return <Clock className="h-8 w-8 text-yellow-600" />;
      default:
        return <Scan className="h-8 w-8 text-blue-600" />;
    }
  };

  const getStatusColor = () => {
    switch (result.status) {
      case "verified":
        return "bg-green-50 border-green-200";
      case "failed":
        return "bg-red-50 border-red-200";
      case "pending":
        return "bg-yellow-50 border-yellow-200";
      default:
        return "bg-blue-50 border-blue-200";
    }
  };

  return (
    <div className="space-y-6">
      {/* Scanner Interface */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Scan className="h-5 w-5" />
            <span>Child Verification Scanner</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div
            className={`p-8 rounded-lg border-2 border-dashed text-center ${getStatusColor()}`}
          >
            <div className="flex flex-col items-center space-y-4">
              {getStatusIcon()}
              <p className="text-lg font-medium">{result.message}</p>

              {result.status === "scanning" && !isScanning && (
                <Button onClick={handleScan} className="mt-4">
                  <Scan className="h-4 w-4 mr-2" />
                  Start Scanning
                </Button>
              )}

              {isScanning && (
                <div className="mt-4">
                  <div className="animate-pulse">
                    <div className="h-32 w-32 bg-blue-200 rounded-lg"></div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Verification Result */}
      {result.child && (
        <Card>
          <CardHeader>
            <CardTitle>Child Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src={result.child.photo} alt={result.child.name} />
                <AvatarFallback className="text-lg font-semibold">
                  {result.child.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h3 className="text-xl font-semibold">{result.child.name}</h3>
                <p className="text-muted-foreground">Age {result.child.age}</p>
                <Badge
                  variant={result.child.isActive ? "default" : "secondary"}
                >
                  {result.child.isActive ? "Active" : "Inactive"}
                </Badge>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-center text-sm">
                  <FileText className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span className="font-medium">Government ID:</span>
                  <span className="ml-2">{result.child.governmentId}</span>
                </div>

                <div className="flex items-center text-sm">
                  <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span className="font-medium">Emergency Contact:</span>
                  <span className="ml-2">{result.child.emergencyContact}</span>
                </div>
              </div>

              {result.child.medicalInfo && (
                <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-md">
                  <p className="text-sm font-medium text-yellow-800">
                    Medical Information:
                  </p>
                  <p className="text-sm text-yellow-700">
                    {result.child.medicalInfo}
                  </p>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Verification Notes:</label>
              <Textarea
                placeholder="Add any notes about this verification..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>

            {result.status === "pending" && (
              <div className="flex space-x-2">
                <Button onClick={() => handleVerify(true)} className="flex-1">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Approve
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => handleVerify(false)}
                  className="flex-1"
                >
                  <XCircle className="h-4 w-4 mr-2" />
                  Deny
                </Button>
              </div>
            )}

            {(result.status === "verified" || result.status === "failed") && (
              <Button
                onClick={handleReset}
                variant="outline"
                className="w-full"
              >
                Scan Another Child
              </Button>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default VerificationScanner;
