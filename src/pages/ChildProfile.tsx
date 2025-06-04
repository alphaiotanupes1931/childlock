import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  ArrowLeft,
  Edit,
  QrCode,
  Download,
  Calendar,
  Phone,
  FileText,
  MapPin,
  CheckCircle,
  Clock,
  AlertTriangle,
  User,
} from "lucide-react";
import { format } from "date-fns";
import Header from "@/components/Header";
import {
  mockChildren,
  mockVerificationRecords,
  mockParents,
} from "@/lib/mockData";

const ChildProfile = () => {
  const { childId } = useParams();
  const [qrDialogOpen, setQrDialogOpen] = useState(false);

  // Find the child and related data
  const child = mockChildren.find((c) => c.id === childId);
  const parent = mockParents.find((p) => p.id === child?.parentId);
  const childVerifications = mockVerificationRecords
    .filter((record) => record.childId === childId)
    .sort(
      (a, b) =>
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime(),
    );

  if (!child) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-12">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Child Not Found
            </h1>
            <p className="text-gray-600 mb-4">
              The requested child profile could not be found.
            </p>
            <Link to="/dashboard">
              <Button>Return to Dashboard</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const stats = [
    {
      title: "Total Verifications",
      value: childVerifications.length,
      icon: <CheckCircle className="h-4 w-4" />,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Successful",
      value: childVerifications.filter((r) => r.status === "verified").length,
      icon: <CheckCircle className="h-4 w-4" />,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "Days Since Registration",
      value: Math.floor(
        (new Date().getTime() - child.createdAt.getTime()) /
          (1000 * 60 * 60 * 24),
      ),
      icon: <Calendar className="h-4 w-4" />,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      title: "Last Verified",
      value: child.lastVerified
        ? Math.floor(
            (new Date().getTime() - child.lastVerified.getTime()) /
              (1000 * 60 * 60 * 24),
          ) + "d ago"
        : "Never",
      icon: <Clock className="h-4 w-4" />,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center space-x-4 mb-8">
          <Link to="/dashboard">
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
          </Link>
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-900">{child.name}</h1>
            <p className="text-lg text-gray-600 mt-1">Child Profile</p>
          </div>
          <Badge
            variant={child.isActive ? "default" : "secondary"}
            className="text-sm"
          >
            {child.isActive ? "Active" : "Inactive"}
          </Badge>
        </div>

        {/* Profile Header */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
              <Avatar className="h-24 w-24">
                <AvatarImage src={child.photo} alt={child.name} />
                <AvatarFallback className="text-2xl font-semibold">
                  {child.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1">
                <h2 className="text-2xl font-bold text-gray-900">
                  {child.name}
                </h2>
                <p className="text-lg text-gray-600">Age {child.age}</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <FileText className="h-4 w-4 mr-2" />
                    <span>Government ID: {child.governmentId}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Phone className="h-4 w-4 mr-2" />
                    <span>Emergency: {child.emergencyContact}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>
                      Registered: {format(child.createdAt, "MMM dd, yyyy")}
                    </span>
                  </div>
                  {child.lastVerified && (
                    <div className="flex items-center text-sm text-gray-600">
                      <CheckCircle className="h-4 w-4 mr-2" />
                      <span>
                        Last verified:{" "}
                        {format(child.lastVerified, "MMM dd, yyyy")}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex flex-col space-y-2">
                <Dialog open={qrDialogOpen} onOpenChange={setQrDialogOpen}>
                  <DialogTrigger asChild>
                    <Button>
                      <QrCode className="h-4 w-4 mr-2" />
                      Generate QR Code
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle>QR Code for {child.name}</DialogTitle>
                      <DialogDescription>
                        This QR code can be used for instant verification at
                        checkpoints.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="flex items-center justify-center p-8">
                      <div className="w-48 h-48 bg-gray-100 border border-gray-300 rounded-lg flex items-center justify-center">
                        <div className="text-center">
                          <QrCode className="h-16 w-16 text-gray-400 mx-auto mb-2" />
                          <p className="text-sm text-gray-500">
                            QR Code for {child.name}
                          </p>
                          <p className="text-xs text-gray-400 mt-1">
                            ID: {child.governmentId}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-center space-x-2">
                      <Button size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setQrDialogOpen(false)}
                      >
                        Close
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>

                <Button variant="outline">
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Profile
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Medical Information Alert */}
        {child.medicalInfo && (
          <Card className="mb-8 border-yellow-200 bg-yellow-50">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-yellow-800">
                <AlertTriangle className="h-5 w-5" />
                <span>Important Medical Information</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-yellow-700">{child.medicalInfo}</p>
            </CardContent>
          </Card>
        )}

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      {stat.title}
                    </p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                  </div>
                  <div className={`p-2 rounded-full ${stat.bgColor}`}>
                    <div className={stat.color}>{stat.icon}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs defaultValue="verifications" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="verifications">
              Verification History
            </TabsTrigger>
            <TabsTrigger value="parent">Parent Information</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="verifications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Verification History</CardTitle>
                <CardDescription>
                  Complete history of checkpoint verifications for {child.name}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {childVerifications.length > 0 ? (
                  <div className="space-y-4">
                    {childVerifications.map((record) => (
                      <div
                        key={record.id}
                        className="flex items-center justify-between p-4 border rounded-lg"
                      >
                        <div className="flex items-center space-x-4">
                          <div
                            className={`p-2 rounded-full ${
                              record.status === "verified"
                                ? "bg-green-100"
                                : record.status === "failed"
                                  ? "bg-red-100"
                                  : "bg-yellow-100"
                            }`}
                          >
                            {record.status === "verified" ? (
                              <CheckCircle className="h-4 w-4 text-green-600" />
                            ) : record.status === "failed" ? (
                              <AlertTriangle className="h-4 w-4 text-red-600" />
                            ) : (
                              <Clock className="h-4 w-4 text-yellow-600" />
                            )}
                          </div>
                          <div>
                            <p className="font-medium">
                              {record.checkpointName}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              Officer: {record.officerName}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {format(
                                record.timestamp,
                                "MMM dd, yyyy HH:mm:ss",
                              )}
                            </p>
                            {record.notes && (
                              <p className="text-xs text-gray-600 mt-1 p-2 bg-gray-50 rounded">
                                Notes: {record.notes}
                              </p>
                            )}
                          </div>
                        </div>
                        <Badge
                          variant={
                            record.status === "verified"
                              ? "default"
                              : record.status === "failed"
                                ? "destructive"
                                : "secondary"
                          }
                        >
                          {record.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      No verifications yet
                    </h3>
                    <p className="text-gray-600">
                      Verification records will appear here when {child.name} is
                      verified at checkpoints.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="parent" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Parent/Guardian Information</CardTitle>
                <CardDescription>
                  Linked parent information for {child.name}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {parent && (
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4">
                      <div className="p-3 bg-blue-50 rounded-full">
                        <User className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold">{parent.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          Verified Parent/Guardian
                        </p>
                      </div>
                      <Badge
                        variant={parent.verified ? "default" : "secondary"}
                      >
                        {parent.verified ? "Verified" : "Pending"}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <p className="text-sm font-medium text-gray-700">
                          Contact Information
                        </p>
                        <div className="text-sm text-gray-600 space-y-1">
                          <p>Email: {parent.email}</p>
                          <p>Phone: {parent.phone}</p>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <p className="text-sm font-medium text-gray-700">
                          Government ID
                        </p>
                        <div className="text-sm text-gray-600">
                          <p>{parent.governmentId}</p>
                        </div>
                      </div>

                      <div className="space-y-2 md:col-span-2">
                        <p className="text-sm font-medium text-gray-700">
                          Address
                        </p>
                        <div className="text-sm text-gray-600">
                          <p>{parent.address}</p>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <p className="text-sm font-medium text-gray-700">
                          Registration Date
                        </p>
                        <div className="text-sm text-gray-600">
                          <p>{format(parent.createdAt, "MMM dd, yyyy")}</p>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <p className="text-sm font-medium text-gray-700">
                          Total Children
                        </p>
                        <div className="text-sm text-gray-600">
                          <p>{parent.children.length} registered</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Profile Settings</CardTitle>
                <CardDescription>
                  Manage {child.name}'s profile settings and status
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h3 className="font-medium">Active Status</h3>
                    <p className="text-sm text-muted-foreground">
                      {child.isActive
                        ? "Profile is active and can be verified"
                        : "Profile is inactive"}
                    </p>
                  </div>
                  <Button
                    variant={child.isActive ? "destructive" : "default"}
                    size="sm"
                  >
                    {child.isActive ? "Deactivate" : "Activate"}
                  </Button>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h3 className="font-medium">Download QR Code</h3>
                    <p className="text-sm text-muted-foreground">
                      Download printable QR code for {child.name}
                    </p>
                  </div>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h3 className="font-medium">Update Medical Information</h3>
                    <p className="text-sm text-muted-foreground">
                      Modify emergency medical information
                    </p>
                  </div>
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                </div>

                <div className="flex items-center justify-between p-4 border border-red-200 rounded-lg bg-red-50">
                  <div>
                    <h3 className="font-medium text-red-800">Remove Child</h3>
                    <p className="text-sm text-red-600">
                      Permanently remove {child.name} from the Child Link system
                    </p>
                  </div>
                  <Button variant="destructive" size="sm">
                    Remove
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ChildProfile;
