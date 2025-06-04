import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Users,
  Plus,
  CheckCircle,
  Clock,
  AlertTriangle,
  Calendar,
  QrCode,
  Download,
  Bell,
} from "lucide-react";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import Header from "@/components/Header";
import ChildCard from "@/components/ChildCard";
import {
  mockChildren,
  mockVerificationRecords,
  mockParents,
} from "@/lib/mockData";

const Dashboard = () => {
  const [selectedChild, setSelectedChild] = useState<string | null>(null);

  // Get current user's data (mock)
  const currentParent = mockParents[0];
  const userChildren = mockChildren.filter(
    (child) => child.parentId === currentParent.id,
  );
  const recentVerifications = mockVerificationRecords
    .filter((record) =>
      userChildren.some((child) => child.id === record.childId),
    )
    .sort(
      (a, b) =>
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime(),
    )
    .slice(0, 5);

  const stats = [
    {
      title: "Registered Children",
      value: userChildren.length,
      icon: <Users className="h-4 w-4" />,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Recent Verifications",
      value: recentVerifications.length,
      icon: <CheckCircle className="h-4 w-4" />,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "Active Status",
      value: userChildren.filter((child) => child.isActive).length,
      icon: <Clock className="h-4 w-4" />,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
    {
      title: "Alerts",
      value: 0,
      icon: <AlertTriangle className="h-4 w-4" />,
      color: "text-red-600",
      bgColor: "bg-red-50",
    },
  ];

  const handleViewDetails = (childId: string) => {
    setSelectedChild(childId);
  };

  const handleGenerateQR = (childId: string) => {
    // Mock QR generation
    alert(`QR Code generated for child ID: ${childId}`);
  };

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: colors.background }}
    >
      <Header />

      <div className="container mx-auto px-4 py-8 pb-24">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-lg text-gray-600 mt-1">
              Welcome back, {currentParent.name}
            </p>
          </div>
          <Link to="/register">
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Child
            </Button>
          </Link>
        </div>

        {/* Account Status Alert */}
        {currentParent.verified ? (
          <Alert className="mb-6 border-green-200 bg-green-50">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-800">
              Your account is verified and active. All registered children are
              protected under the Child Link system.
            </AlertDescription>
          </Alert>
        ) : (
          <Alert className="mb-6 border-yellow-200 bg-yellow-50">
            <Clock className="h-4 w-4 text-yellow-600" />
            <AlertDescription className="text-yellow-800">
              Your account verification is pending. Children will be protected
              once verification is complete.
            </AlertDescription>
          </Alert>
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

        <Tabs defaultValue="children" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="children">My Children</TabsTrigger>
            <TabsTrigger value="verifications">
              Recent Verifications
            </TabsTrigger>
            <TabsTrigger value="alerts">Alerts & Notifications</TabsTrigger>
          </TabsList>

          <TabsContent value="children" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Registered Children</CardTitle>
                <CardDescription>
                  Manage your children's profiles and generate verification
                  codes
                </CardDescription>
              </CardHeader>
              <CardContent>
                {userChildren.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {userChildren.map((child) => (
                      <ChildCard
                        key={child.id}
                        child={child}
                        onViewDetails={() => handleViewDetails(child.id)}
                        onGenerateQR={() => handleGenerateQR(child.id)}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      No children registered
                    </h3>
                    <p className="text-gray-600 mb-4">
                      Start protecting your children by registering them in the
                      Child Link system.
                    </p>
                    <Link to="/register">
                      <Button>
                        <Plus className="h-4 w-4 mr-2" />
                        Register Your First Child
                      </Button>
                    </Link>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="verifications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Verifications</CardTitle>
                <CardDescription>
                  View recent checkpoint verifications for your children
                </CardDescription>
              </CardHeader>
              <CardContent>
                {recentVerifications.length > 0 ? (
                  <div className="space-y-4">
                    {recentVerifications.map((record) => {
                      const child = userChildren.find(
                        (c) => c.id === record.childId,
                      );
                      return (
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
                              <p className="font-medium">{child?.name}</p>
                              <p className="text-sm text-muted-foreground">
                                {record.checkpointName} • {record.officerName}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {format(record.timestamp, "MMM dd, yyyy HH:mm")}
                              </p>
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
                      );
                    })}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      No verifications yet
                    </h3>
                    <p className="text-gray-600">
                      Verification records will appear here when your children
                      are verified at checkpoints.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="alerts" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Alerts & Notifications</CardTitle>
                <CardDescription>
                  Important notifications about your children's safety status
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Bell className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    No new alerts
                  </h3>
                  <p className="text-gray-600">
                    You'll receive notifications here for important updates
                    about your children's safety status.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Quick Actions */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Button variant="outline" className="h-auto p-4">
                <div className="text-center">
                  <QrCode className="h-6 w-6 mx-auto mb-2" />
                  <div className="font-medium">Generate QR Codes</div>
                  <div className="text-sm text-muted-foreground">
                    Create verification codes for all children
                  </div>
                </div>
              </Button>

              <Link to="/travel-permissions" className="block">
                <Button variant="outline" className="h-auto p-4 w-full">
                  <div className="text-center">
                    <MapPin className="h-6 w-6 mx-auto mb-2" />
                    <div className="font-medium">Travel Permissions</div>
                    <div className="text-sm text-muted-foreground">
                      Manage guardian permissions
                    </div>
                  </div>
                </Button>
              </Link>

              <Link to="/activity-log" className="block">
                <Button variant="outline" className="h-auto p-4 w-full">
                  <div className="text-center">
                    <Activity className="h-6 w-6 mx-auto mb-2" />
                    <div className="font-medium">Activity Log</div>
                    <div className="text-sm text-muted-foreground">
                      View activity history
                    </div>
                  </div>
                </Button>
              </Link>

              <Link to="/register" className="block">
                <Button variant="outline" className="h-auto p-4 w-full">
                  <div className="text-center">
                    <Plus className="h-6 w-6 mx-auto mb-2" />
                    <div className="font-medium">Add Another Child</div>
                    <div className="text-sm text-muted-foreground">
                      Register additional children
                    </div>
                  </div>
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>

      <BottomNavigation />
    </div>
  );
};

export default Dashboard;
