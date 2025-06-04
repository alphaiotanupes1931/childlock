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
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Plus,
  Calendar,
  Clock,
  User,
  MapPin,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Edit,
  Trash2,
} from "lucide-react";
import { format, addDays } from "date-fns";
import Header from "@/components/Header";
import BottomNavigation from "@/components/BottomNavigation";
import { colors } from "@/lib/colors";
import { mockChildren } from "@/lib/mockData";

interface TravelPermission {
  id: string;
  childId: string;
  childName: string;
  guardianName: string;
  guardianPhone: string;
  guardianEmail: string;
  startDate: Date;
  endDate: Date;
  destination: string;
  purpose: string;
  notes?: string;
  status: "active" | "expired" | "pending" | "revoked";
  createdAt: Date;
}

const TravelPermissions = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedChild, setSelectedChild] = useState("");

  // Mock travel permissions data
  const [permissions, setPermissions] = useState<TravelPermission[]>([
    {
      id: "1",
      childId: "c1",
      childName: "Emma Johnson",
      guardianName: "Mike Thompson",
      guardianPhone: "+1-555-0150",
      guardianEmail: "mike.thompson@email.com",
      startDate: new Date(),
      endDate: addDays(new Date(), 3),
      destination: "Disney World, Orlando",
      purpose: "Family vacation",
      notes: "Traveling with Thompson family for spring break",
      status: "active",
      createdAt: new Date("2024-12-15"),
    },
    {
      id: "2",
      childId: "c2",
      childName: "Liam Johnson",
      guardianName: "Sarah Miller",
      guardianPhone: "+1-555-0151",
      guardianEmail: "sarah.miller@email.com",
      startDate: addDays(new Date(), -10),
      endDate: addDays(new Date(), -5),
      destination: "School Field Trip - Science Museum",
      purpose: "Educational trip",
      status: "expired",
      createdAt: new Date("2024-12-05"),
    },
  ]);

  const activePermissions = permissions.filter((p) => p.status === "active");
  const expiredPermissions = permissions.filter((p) => p.status === "expired");
  const pendingPermissions = permissions.filter((p) => p.status === "pending");

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return colors.success;
      case "expired":
        return colors.muted;
      case "pending":
        return colors.warning;
      case "revoked":
        return colors.danger;
      default:
        return colors.muted;
    }
  };

  const handleCreatePermission = () => {
    // Handle form submission
    setIsDialogOpen(false);
  };

  const handleRevokePermission = (permissionId: string) => {
    setPermissions((prev) =>
      prev.map((p) =>
        p.id === permissionId ? { ...p, status: "revoked" as const } : p,
      ),
    );
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
            <h1 className="text-3xl font-bold text-gray-900">
              Travel Permissions
            </h1>
            <p className="text-lg text-gray-600 mt-1">
              Manage temporary guardian permissions for your children
            </p>
          </div>

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button style={{ backgroundColor: colors.primary }}>
                <Plus className="h-4 w-4 mr-2" />
                New Permission
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Create Travel Permission</DialogTitle>
                <DialogDescription>
                  Grant temporary guardian access to a trusted person
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="child">Select Child</Label>
                  <Select
                    value={selectedChild}
                    onValueChange={setSelectedChild}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Choose a child" />
                    </SelectTrigger>
                    <SelectContent>
                      {mockChildren.map((child) => (
                        <SelectItem key={child.id} value={child.id}>
                          {child.name} (Age {child.age})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="startDate">Start Date</Label>
                    <Input
                      id="startDate"
                      type="date"
                      defaultValue={format(new Date(), "yyyy-MM-dd")}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="endDate">End Date</Label>
                    <Input
                      id="endDate"
                      type="date"
                      defaultValue={format(
                        addDays(new Date(), 1),
                        "yyyy-MM-dd",
                      )}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="guardianName">Guardian Name</Label>
                  <Input
                    id="guardianName"
                    placeholder="Full name of temporary guardian"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="guardianPhone">Phone</Label>
                    <Input id="guardianPhone" placeholder="+1-555-0123" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="guardianEmail">Email</Label>
                    <Input
                      id="guardianEmail"
                      type="email"
                      placeholder="email@example.com"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="destination">Destination</Label>
                  <Input
                    id="destination"
                    placeholder="Where will they be going?"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="purpose">Purpose</Label>
                  <Input id="purpose" placeholder="Reason for travel" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes">Special Instructions (Optional)</Label>
                  <Textarea
                    id="notes"
                    placeholder="Any special notes or instructions"
                    rows={3}
                  />
                </div>

                <div className="flex space-x-2">
                  <Button
                    onClick={handleCreatePermission}
                    className="flex-1"
                    style={{ backgroundColor: colors.primary }}
                  >
                    Create Permission
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setIsDialogOpen(false)}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Active
                  </p>
                  <p className="text-2xl font-bold">
                    {activePermissions.length}
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
                    Pending
                  </p>
                  <p className="text-2xl font-bold">
                    {pendingPermissions.length}
                  </p>
                </div>
                <Clock className="h-8 w-8" style={{ color: colors.warning }} />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Expired
                  </p>
                  <p className="text-2xl font-bold">
                    {expiredPermissions.length}
                  </p>
                </div>
                <XCircle className="h-8 w-8" style={{ color: colors.muted }} />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Total
                  </p>
                  <p className="text-2xl font-bold">{permissions.length}</p>
                </div>
                <User className="h-8 w-8" style={{ color: colors.primary }} />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="active" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="active">Active Permissions</TabsTrigger>
            <TabsTrigger value="expired">Expired</TabsTrigger>
            <TabsTrigger value="all">All Permissions</TabsTrigger>
          </TabsList>

          <TabsContent value="active" className="space-y-4">
            {activePermissions.length > 0 ? (
              <div className="grid gap-4">
                {activePermissions.map((permission) => (
                  <Card key={permission.id}>
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <h3 className="text-lg font-semibold">
                              {permission.childName}
                            </h3>
                            <Badge
                              style={{
                                backgroundColor: getStatusColor(
                                  permission.status,
                                ),
                              }}
                            >
                              {permission.status}
                            </Badge>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                            <div>
                              <p className="flex items-center text-gray-600 mb-1">
                                <User className="h-4 w-4 mr-2" />
                                Guardian: {permission.guardianName}
                              </p>
                              <p className="flex items-center text-gray-600 mb-1">
                                <MapPin className="h-4 w-4 mr-2" />
                                Destination: {permission.destination}
                              </p>
                              <p className="text-gray-600">
                                Purpose: {permission.purpose}
                              </p>
                            </div>

                            <div>
                              <p className="flex items-center text-gray-600 mb-1">
                                <Calendar className="h-4 w-4 mr-2" />
                                {format(permission.startDate, "MMM dd")} -{" "}
                                {format(permission.endDate, "MMM dd, yyyy")}
                              </p>
                              <p className="text-gray-600">
                                Phone: {permission.guardianPhone}
                              </p>
                              <p className="text-gray-600">
                                Email: {permission.guardianEmail}
                              </p>
                            </div>
                          </div>

                          {permission.notes && (
                            <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                              <p className="text-sm text-gray-700">
                                <strong>Notes:</strong> {permission.notes}
                              </p>
                            </div>
                          )}
                        </div>

                        <div className="flex space-x-2 ml-4">
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() =>
                              handleRevokePermission(permission.id)
                            }
                          >
                            <Trash2 className="h-4 w-4 text-red-600" />
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
                  <User className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    No Active Permissions
                  </h3>
                  <p className="text-gray-600 mb-4">
                    You don't have any active travel permissions for your
                    children.
                  </p>
                  <Button
                    onClick={() => setIsDialogOpen(true)}
                    style={{ backgroundColor: colors.primary }}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Create First Permission
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="expired" className="space-y-4">
            {expiredPermissions.length > 0 ? (
              <div className="grid gap-4">
                {expiredPermissions.map((permission) => (
                  <Card key={permission.id} className="opacity-75">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <h3 className="text-lg font-semibold">
                              {permission.childName}
                            </h3>
                            <Badge variant="secondary">expired</Badge>
                          </div>
                          <p className="text-sm text-gray-600">
                            Guardian: {permission.guardianName} •{" "}
                            {permission.destination}
                          </p>
                          <p className="text-sm text-gray-500">
                            {format(permission.startDate, "MMM dd")} -{" "}
                            {format(permission.endDate, "MMM dd, yyyy")}
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
                  <Clock className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    No Expired Permissions
                  </h3>
                  <p className="text-gray-600">
                    No expired travel permissions to display.
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="all" className="space-y-4">
            <div className="grid gap-4">
              {permissions.map((permission) => (
                <Card
                  key={permission.id}
                  className={
                    permission.status === "expired" ? "opacity-75" : ""
                  }
                >
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h3 className="text-lg font-semibold">
                            {permission.childName}
                          </h3>
                          <Badge
                            style={{
                              backgroundColor: getStatusColor(
                                permission.status,
                              ),
                            }}
                          >
                            {permission.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600">
                          Guardian: {permission.guardianName} •{" "}
                          {permission.destination}
                        </p>
                        <p className="text-sm text-gray-500">
                          {format(permission.startDate, "MMM dd")} -{" "}
                          {format(permission.endDate, "MMM dd, yyyy")}
                        </p>
                      </div>

                      {permission.status === "active" && (
                        <div className="flex space-x-2 ml-4">
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() =>
                              handleRevokePermission(permission.id)
                            }
                          >
                            <Trash2 className="h-4 w-4 text-red-600" />
                          </Button>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <BottomNavigation />
    </div>
  );
};

export default TravelPermissions;
