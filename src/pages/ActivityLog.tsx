import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Search,
  Filter,
  Download,
  CheckCircle,
  UserPlus,
  Bell,
  Edit,
  Shield,
  Clock,
  Calendar,
  MapPin,
} from "lucide-react";
import { format, subDays } from "date-fns";
import Header from "@/components/Header";
import BottomNavigation from "@/components/BottomNavigation";
import { colors } from "@/lib/colors";
import { ActivityLogEntry } from "@/lib/types";

const ActivityLog = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [dateFilter, setDateFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");

  // Mock activity log data
  const [activities] = useState<ActivityLogEntry[]>([
    {
      id: "1",
      type: "verification",
      description:
        "Emma Johnson verified at Sunny Elementary School by Officer Martinez",
      timestamp: new Date("2024-12-20T08:30:00"),
      childId: "c1",
      userId: "1",
      metadata: {
        checkpointName: "Sunny Elementary School",
        officerName: "Officer Martinez",
        status: "success",
      },
    },
    {
      id: "2",
      type: "permission_created",
      description:
        "Travel permission created for Emma Johnson with Mike Thompson",
      timestamp: new Date("2024-12-19T14:20:00"),
      childId: "c1",
      userId: "1",
      metadata: {
        guardianName: "Mike Thompson",
        destination: "Disney World, Orlando",
        duration: "3 days",
      },
    },
    {
      id: "3",
      type: "verification",
      description:
        "Liam Johnson verification failed at School Security - QR code expired",
      timestamp: new Date("2024-12-19T10:15:00"),
      childId: "c2",
      userId: "1",
      metadata: {
        checkpointName: "School Security",
        status: "failed",
        reason: "expired_qr",
      },
    },
    {
      id: "4",
      type: "profile_updated",
      description: "Updated emergency contact information for Liam Johnson",
      timestamp: new Date("2024-12-18T16:45:00"),
      childId: "c2",
      userId: "1",
      metadata: {
        field: "emergency_contact",
        oldValue: "+1-555-0125",
        newValue: "+1-555-0126",
      },
    },
    {
      id: "5",
      type: "alert_generated",
      description:
        "Unauthorized verification attempt for Sophia Chen at Central Mall",
      timestamp: new Date("2024-12-18T12:30:00"),
      childId: "c3",
      userId: "1",
      metadata: {
        checkpointName: "Central Mall",
        alertType: "unauthorized_attempt",
        severity: "high",
      },
    },
    {
      id: "6",
      type: "verification",
      description: "Sophia Chen successfully verified at City Airport Security",
      timestamp: new Date("2024-12-17T09:20:00"),
      childId: "c3",
      userId: "1",
      metadata: {
        checkpointName: "City Airport Security",
        officerName: "Security Team Alpha",
        status: "success",
      },
    },
    {
      id: "7",
      type: "permission_expired",
      description:
        "Travel permission expired for Emma Johnson with Sarah Miller",
      timestamp: new Date("2024-12-16T23:59:00"),
      childId: "c1",
      userId: "1",
      metadata: {
        guardianName: "Sarah Miller",
        destination: "School Field Trip",
      },
    },
    {
      id: "8",
      type: "profile_updated",
      description: "Updated medical information for Emma Johnson",
      timestamp: new Date("2024-12-15T11:10:00"),
      childId: "c1",
      userId: "1",
      metadata: {
        field: "medical_info",
        newValue: "No known allergies (updated)",
      },
    },
  ]);

  const getActivityIcon = (type: ActivityLogEntry["type"]) => {
    switch (type) {
      case "verification":
        return <CheckCircle className="h-4 w-4" />;
      case "permission_created":
        return <UserPlus className="h-4 w-4" />;
      case "permission_expired":
        return <Clock className="h-4 w-4" />;
      case "profile_updated":
        return <Edit className="h-4 w-4" />;
      case "alert_generated":
        return <Bell className="h-4 w-4" />;
      default:
        return <Shield className="h-4 w-4" />;
    }
  };

  const getActivityColor = (type: ActivityLogEntry["type"]) => {
    switch (type) {
      case "verification":
        return colors.success;
      case "permission_created":
        return colors.primary;
      case "permission_expired":
        return colors.warning;
      case "profile_updated":
        return colors.info;
      case "alert_generated":
        return colors.danger;
      default:
        return colors.muted;
    }
  };

  const getStatusColor = (status?: string) => {
    switch (status) {
      case "success":
        return colors.success;
      case "failed":
        return colors.danger;
      case "pending":
        return colors.warning;
      default:
        return colors.muted;
    }
  };

  const filterActivities = () => {
    let filtered = activities;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter((activity) =>
        activity.description.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }

    // Filter by type
    if (typeFilter !== "all") {
      filtered = filtered.filter((activity) => activity.type === typeFilter);
    }

    // Filter by date
    if (dateFilter !== "all") {
      const days = parseInt(dateFilter);
      const cutoffDate = subDays(new Date(), days);
      filtered = filtered.filter(
        (activity) => activity.timestamp >= cutoffDate,
      );
    }

    return filtered;
  };

  const filteredActivities = filterActivities();

  const activityStats = {
    total: activities.length,
    verifications: activities.filter((a) => a.type === "verification").length,
    permissions: activities.filter((a) => a.type === "permission_created")
      .length,
    alerts: activities.filter((a) => a.type === "alert_generated").length,
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
            <h1 className="text-3xl font-bold text-gray-900">Activity Log</h1>
            <p className="text-lg text-gray-600 mt-1">
              Track all activities and changes related to your children's safety
            </p>
          </div>

          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Log
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Total Activities
                  </p>
                  <p className="text-2xl font-bold">{activityStats.total}</p>
                </div>
                <Shield className="h-8 w-8" style={{ color: colors.primary }} />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Verifications
                  </p>
                  <p className="text-2xl font-bold">
                    {activityStats.verifications}
                  </p>
                </div>
                <CheckCircle
                  className="h-8 w-8"
                  style={{ color: colors.success }}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Permissions
                  </p>
                  <p className="text-2xl font-bold">
                    {activityStats.permissions}
                  </p>
                </div>
                <UserPlus className="h-8 w-8" style={{ color: colors.info }} />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Alerts
                  </p>
                  <p className="text-2xl font-bold">{activityStats.alerts}</p>
                </div>
                <Bell className="h-8 w-8" style={{ color: colors.warning }} />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search activities..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="verification">Verifications</SelectItem>
                  <SelectItem value="permission_created">
                    Permissions
                  </SelectItem>
                  <SelectItem value="profile_updated">
                    Profile Updates
                  </SelectItem>
                  <SelectItem value="alert_generated">Alerts</SelectItem>
                </SelectContent>
              </Select>

              <Select value={dateFilter} onValueChange={setDateFilter}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Filter by date" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Time</SelectItem>
                  <SelectItem value="1">Last 24 hours</SelectItem>
                  <SelectItem value="7">Last 7 days</SelectItem>
                  <SelectItem value="30">Last 30 days</SelectItem>
                  <SelectItem value="90">Last 3 months</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Activity List */}
        <Card>
          <CardHeader>
            <CardTitle>Activity Timeline</CardTitle>
            <CardDescription>
              Chronological list of all activities ({filteredActivities.length}{" "}
              items)
            </CardDescription>
          </CardHeader>
          <CardContent>
            {filteredActivities.length > 0 ? (
              <div className="space-y-4">
                {filteredActivities.map((activity) => (
                  <div
                    key={activity.id}
                    className="flex items-start space-x-4 p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div
                      className="p-2 rounded-full flex-shrink-0"
                      style={{
                        backgroundColor: `${getActivityColor(activity.type)}15`,
                        color: getActivityColor(activity.type),
                      }}
                    >
                      {getActivityIcon(activity.type)}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-1">
                        <p className="text-sm font-medium text-gray-900">
                          {activity.description}
                        </p>
                        <Badge
                          variant="outline"
                          style={{
                            borderColor: getActivityColor(activity.type),
                          }}
                        >
                          {activity.type.replace("_", " ")}
                        </Badge>
                      </div>

                      <div className="flex items-center space-x-4 text-xs text-gray-500">
                        <span className="flex items-center">
                          <Calendar className="h-3 w-3 mr-1" />
                          {format(activity.timestamp, "MMM dd, yyyy")}
                        </span>
                        <span className="flex items-center">
                          <Clock className="h-3 w-3 mr-1" />
                          {format(activity.timestamp, "HH:mm")}
                        </span>
                        {activity.metadata?.checkpointName && (
                          <span className="flex items-center">
                            <MapPin className="h-3 w-3 mr-1" />
                            {activity.metadata.checkpointName}
                          </span>
                        )}
                      </div>

                      {/* Additional metadata */}
                      {activity.metadata && (
                        <div className="mt-2 text-xs text-gray-600 space-y-1">
                          {activity.metadata.status && (
                            <div className="flex items-center space-x-2">
                              <span>Status:</span>
                              <Badge
                                variant="outline"
                                style={{
                                  borderColor: getStatusColor(
                                    activity.metadata.status,
                                  ),
                                  color: getStatusColor(
                                    activity.metadata.status,
                                  ),
                                }}
                              >
                                {activity.metadata.status}
                              </Badge>
                            </div>
                          )}
                          {activity.metadata.officerName && (
                            <div>Officer: {activity.metadata.officerName}</div>
                          )}
                          {activity.metadata.guardianName && (
                            <div>
                              Guardian: {activity.metadata.guardianName}
                            </div>
                          )}
                          {activity.metadata.destination && (
                            <div>
                              Destination: {activity.metadata.destination}
                            </div>
                          )}
                          {activity.metadata.reason && (
                            <div>Reason: {activity.metadata.reason}</div>
                          )}
                        </div>
                      )}
                    </div>

                    <div className="text-right text-xs text-gray-500 flex-shrink-0">
                      {format(activity.timestamp, "HH:mm")}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Shield className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No activities found
                </h3>
                <p className="text-gray-600">
                  {searchTerm || typeFilter !== "all" || dateFilter !== "all"
                    ? "Try adjusting your filters to see more results."
                    : "Activity log is empty. Activities will appear here as you use the app."}
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <BottomNavigation />
    </div>
  );
};

export default ActivityLog;
