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
import { Input } from "@/components/ui/input";
import {
  Bell,
  AlertTriangle,
  Shield,
  Clock,
  CheckCircle,
  XCircle,
  Search,
  Filter,
  Eye,
  EyeOff,
} from "lucide-react";
import { format } from "date-fns";
import Header from "@/components/Header";
import BottomNavigation from "@/components/BottomNavigation";
import { colors } from "@/lib/colors";
import { Alert } from "@/lib/types";

const Alerts = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedAlert, setSelectedAlert] = useState<Alert | null>(null);

  // Mock alerts data
  const [alerts, setAlerts] = useState<Alert[]>([
    {
      id: "1",
      type: "unauthorized_attempt",
      title: "Unauthorized Verification Attempt",
      message:
        "Someone attempted to verify Emma Johnson at Central Mall without proper authorization. Verification was blocked.",
      timestamp: new Date("2024-12-20T14:30:00"),
      childId: "c1",
      checkpointId: "cp3",
      severity: "high",
      status: "unread",
      actionRequired: true,
    },
    {
      id: "2",
      type: "verification_failed",
      title: "Verification Failed",
      message:
        "Verification attempt for Liam Johnson failed due to expired QR code. Please generate a new QR code.",
      timestamp: new Date("2024-12-20T10:15:00"),
      childId: "c2",
      checkpointId: "cp1",
      severity: "medium",
      status: "read",
      actionRequired: true,
    },
    {
      id: "3",
      type: "emergency",
      title: "Emergency Alert",
      message:
        "Emergency verification protocol activated for Sophia Chen at City Airport. Law enforcement has been notified.",
      timestamp: new Date("2024-12-19T16:45:00"),
      childId: "c3",
      checkpointId: "cp2",
      severity: "critical",
      status: "resolved",
      actionRequired: false,
    },
    {
      id: "4",
      type: "permission_expired",
      title: "Travel Permission Expired",
      message:
        "Travel permission for Emma Johnson with Mike Thompson has expired. Please create a new permission if needed.",
      timestamp: new Date("2024-12-19T09:00:00"),
      childId: "c1",
      severity: "low",
      status: "dismissed",
      actionRequired: false,
    },
    {
      id: "5",
      type: "system",
      title: "System Maintenance Complete",
      message:
        "Scheduled system maintenance has been completed. All verification services are now fully operational.",
      timestamp: new Date("2024-12-18T22:00:00"),
      severity: "low",
      status: "read",
      actionRequired: false,
    },
  ]);

  const unreadAlerts = alerts.filter((alert) => alert.status === "unread");
  const highPriorityAlerts = alerts.filter(
    (alert) => alert.severity === "high" || alert.severity === "critical",
  );
  const actionRequiredAlerts = alerts.filter(
    (alert) => alert.actionRequired && alert.status !== "resolved",
  );

  const getSeverityColor = (severity: Alert["severity"]) => {
    switch (severity) {
      case "critical":
        return colors.danger;
      case "high":
        return "#ff6b35";
      case "medium":
        return colors.warning;
      case "low":
        return colors.info;
      default:
        return colors.muted;
    }
  };

  const getTypeIcon = (type: Alert["type"]) => {
    switch (type) {
      case "unauthorized_attempt":
        return <Shield className="h-5 w-5" />;
      case "verification_failed":
        return <XCircle className="h-5 w-5" />;
      case "emergency":
        return <AlertTriangle className="h-5 w-5" />;
      case "permission_expired":
        return <Clock className="h-5 w-5" />;
      case "system":
        return <Bell className="h-5 w-5" />;
      default:
        return <Bell className="h-5 w-5" />;
    }
  };

  const handleMarkAsRead = (alertId: string) => {
    setAlerts((prev) =>
      prev.map((alert) =>
        alert.id === alertId ? { ...alert, status: "read" as const } : alert,
      ),
    );
  };

  const handleDismiss = (alertId: string) => {
    setAlerts((prev) =>
      prev.map((alert) =>
        alert.id === alertId
          ? { ...alert, status: "dismissed" as const }
          : alert,
      ),
    );
  };

  const handleMarkAllAsRead = () => {
    setAlerts((prev) =>
      prev.map((alert) =>
        alert.status === "unread"
          ? { ...alert, status: "read" as const }
          : alert,
      ),
    );
  };

  const filteredAlerts = alerts.filter(
    (alert) =>
      alert.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alert.message.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: colors.background }}
    >
      <Header />

      <div className="container mx-auto px-4 py-8 pb-24">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Alerts & Notifications
            </h1>
            <p className="text-lg text-gray-600 mt-1">
              Stay informed about your children's safety status
            </p>
          </div>

          {unreadAlerts.length > 0 && (
            <Button
              variant="outline"
              onClick={handleMarkAllAsRead}
              style={{ borderColor: colors.primary, color: colors.primary }}
            >
              <CheckCircle className="h-4 w-4 mr-2" />
              Mark All Read
            </Button>
          )}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Unread
                  </p>
                  <p className="text-2xl font-bold">{unreadAlerts.length}</p>
                </div>
                <Bell className="h-8 w-8" style={{ color: colors.primary }} />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    High Priority
                  </p>
                  <p className="text-2xl font-bold">
                    {highPriorityAlerts.length}
                  </p>
                </div>
                <AlertTriangle
                  className="h-8 w-8"
                  style={{ color: colors.danger }}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Action Required
                  </p>
                  <p className="text-2xl font-bold">
                    {actionRequiredAlerts.length}
                  </p>
                </div>
                <Shield className="h-8 w-8" style={{ color: colors.warning }} />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Total Alerts
                  </p>
                  <p className="text-2xl font-bold">{alerts.length}</p>
                </div>
                <CheckCircle
                  className="h-8 w-8"
                  style={{ color: colors.success }}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filter */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex items-center space-x-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search alerts..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="all" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all">All Alerts</TabsTrigger>
            <TabsTrigger value="unread">
              Unread ({unreadAlerts.length})
            </TabsTrigger>
            <TabsTrigger value="high-priority">High Priority</TabsTrigger>
            <TabsTrigger value="action-required">Action Required</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            {filteredAlerts.length > 0 ? (
              <div className="space-y-4">
                {filteredAlerts.map((alert) => (
                  <Card
                    key={alert.id}
                    className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
                      alert.status === "unread" ? "border-l-4" : ""
                    }`}
                    style={{
                      borderLeftColor:
                        alert.status === "unread" ? colors.primary : undefined,
                      backgroundColor:
                        alert.status === "unread"
                          ? `${colors.primary}05`
                          : undefined,
                    }}
                    onClick={() => setSelectedAlert(alert)}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-4 flex-1">
                          <div
                            className="p-2 rounded-full"
                            style={{
                              backgroundColor: `${getSeverityColor(alert.severity)}15`,
                              color: getSeverityColor(alert.severity),
                            }}
                          >
                            {getTypeIcon(alert.type)}
                          </div>

                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              <h3 className="text-lg font-semibold">
                                {alert.title}
                              </h3>
                              <Badge
                                style={{
                                  backgroundColor: getSeverityColor(
                                    alert.severity,
                                  ),
                                  color: "white",
                                }}
                              >
                                {alert.severity}
                              </Badge>
                              {alert.actionRequired && (
                                <Badge
                                  variant="outline"
                                  style={{
                                    borderColor: colors.warning,
                                    color: colors.warning,
                                  }}
                                >
                                  Action Required
                                </Badge>
                              )}
                            </div>
                            <p className="text-gray-600 mb-2">
                              {alert.message}
                            </p>
                            <p className="text-sm text-gray-500">
                              {format(alert.timestamp, "MMM dd, yyyy HH:mm")}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center space-x-2">
                          {alert.status === "unread" && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleMarkAsRead(alert.id);
                              }}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                          )}
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDismiss(alert.id);
                            }}
                          >
                            <EyeOff className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="text-center py-12">
                  <Bell className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    No alerts found
                  </h3>
                  <p className="text-gray-600">
                    {searchTerm
                      ? "Try adjusting your search terms."
                      : "All caught up! No new alerts to display."}
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="unread" className="space-y-4">
            {unreadAlerts.length > 0 ? (
              <div className="space-y-4">
                {unreadAlerts
                  .filter(
                    (alert) =>
                      alert.title
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase()) ||
                      alert.message
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase()),
                  )
                  .map((alert) => (
                    <Card
                      key={alert.id}
                      className="cursor-pointer border-l-4 transition-all duration-200 hover:shadow-md"
                      style={{
                        borderLeftColor: colors.primary,
                        backgroundColor: `${colors.primary}05`,
                      }}
                    >
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between">
                          <div className="flex items-start space-x-4 flex-1">
                            <div
                              className="p-2 rounded-full"
                              style={{
                                backgroundColor: `${getSeverityColor(alert.severity)}15`,
                                color: getSeverityColor(alert.severity),
                              }}
                            >
                              {getTypeIcon(alert.type)}
                            </div>

                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-2">
                                <h3 className="text-lg font-semibold">
                                  {alert.title}
                                </h3>
                                <Badge
                                  style={{
                                    backgroundColor: getSeverityColor(
                                      alert.severity,
                                    ),
                                    color: "white",
                                  }}
                                >
                                  {alert.severity}
                                </Badge>
                              </div>
                              <p className="text-gray-600 mb-2">
                                {alert.message}
                              </p>
                              <p className="text-sm text-gray-500">
                                {format(alert.timestamp, "MMM dd, yyyy HH:mm")}
                              </p>
                            </div>
                          </div>

                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleMarkAsRead(alert.id)}
                            style={{
                              borderColor: colors.primary,
                              color: colors.primary,
                            }}
                          >
                            Mark Read
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            ) : (
              <Card>
                <CardContent className="text-center py-12">
                  <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    All caught up!
                  </h3>
                  <p className="text-gray-600">You have no unread alerts.</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="high-priority" className="space-y-4">
            {highPriorityAlerts.length > 0 ? (
              <div className="space-y-4">
                {highPriorityAlerts
                  .filter(
                    (alert) =>
                      alert.title
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase()) ||
                      alert.message
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase()),
                  )
                  .map((alert) => (
                    <Card key={alert.id} className="border-red-200">
                      <CardContent className="p-6">
                        <div className="flex items-start space-x-4">
                          <div
                            className="p-2 rounded-full"
                            style={{
                              backgroundColor: `${getSeverityColor(alert.severity)}15`,
                              color: getSeverityColor(alert.severity),
                            }}
                          >
                            {getTypeIcon(alert.type)}
                          </div>

                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              <h3 className="text-lg font-semibold">
                                {alert.title}
                              </h3>
                              <Badge
                                style={{
                                  backgroundColor: getSeverityColor(
                                    alert.severity,
                                  ),
                                  color: "white",
                                }}
                              >
                                {alert.severity}
                              </Badge>
                            </div>
                            <p className="text-gray-600 mb-2">
                              {alert.message}
                            </p>
                            <p className="text-sm text-gray-500">
                              {format(alert.timestamp, "MMM dd, yyyy HH:mm")}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            ) : (
              <Card>
                <CardContent className="text-center py-12">
                  <Shield className="h-12 w-12 text-green-500 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    No high priority alerts
                  </h3>
                  <p className="text-gray-600">
                    Your children are safe with no urgent alerts.
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="action-required" className="space-y-4">
            {actionRequiredAlerts.length > 0 ? (
              <div className="space-y-4">
                {actionRequiredAlerts
                  .filter(
                    (alert) =>
                      alert.title
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase()) ||
                      alert.message
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase()),
                  )
                  .map((alert) => (
                    <Card key={alert.id} className="border-yellow-200">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between">
                          <div className="flex items-start space-x-4 flex-1">
                            <div
                              className="p-2 rounded-full"
                              style={{
                                backgroundColor: `${getSeverityColor(alert.severity)}15`,
                                color: getSeverityColor(alert.severity),
                              }}
                            >
                              {getTypeIcon(alert.type)}
                            </div>

                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-2">
                                <h3 className="text-lg font-semibold">
                                  {alert.title}
                                </h3>
                                <Badge
                                  style={{
                                    backgroundColor: getSeverityColor(
                                      alert.severity,
                                    ),
                                    color: "white",
                                  }}
                                >
                                  {alert.severity}
                                </Badge>
                                <Badge
                                  variant="outline"
                                  style={{
                                    borderColor: colors.warning,
                                    color: colors.warning,
                                  }}
                                >
                                  Action Required
                                </Badge>
                              </div>
                              <p className="text-gray-600 mb-2">
                                {alert.message}
                              </p>
                              <p className="text-sm text-gray-500">
                                {format(alert.timestamp, "MMM dd, yyyy HH:mm")}
                              </p>
                            </div>
                          </div>

                          <Button
                            style={{ backgroundColor: colors.primary }}
                            size="sm"
                          >
                            Take Action
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            ) : (
              <Card>
                <CardContent className="text-center py-12">
                  <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    No actions required
                  </h3>
                  <p className="text-gray-600">
                    All alerts have been addressed.
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>

      <BottomNavigation />
    </div>
  );
};

export default Alerts;
