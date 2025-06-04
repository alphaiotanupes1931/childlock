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
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Scan,
  Search,
  CheckCircle,
  XCircle,
  Clock,
  Shield,
  AlertTriangle,
  User,
  MapPin,
} from "lucide-react";
import { format } from "date-fns";
import Header from "@/components/Header";
import VerificationScanner from "@/components/VerificationScanner";
import { mockVerificationRecords, mockCheckpoints } from "@/lib/mockData";

const Verification = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCheckpoint] = useState(mockCheckpoints[0]); // Mock current checkpoint

  const todayVerifications = mockVerificationRecords.filter((record) => {
    const recordDate = new Date(record.timestamp);
    const today = new Date();
    return recordDate.toDateString() === today.toDateString();
  });

  const stats = [
    {
      title: "Today's Verifications",
      value: todayVerifications.length,
      icon: <CheckCircle className="h-4 w-4" />,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "Successful",
      value: todayVerifications.filter((r) => r.status === "verified").length,
      icon: <Shield className="h-4 w-4" />,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Failed",
      value: todayVerifications.filter((r) => r.status === "failed").length,
      icon: <XCircle className="h-4 w-4" />,
      color: "text-red-600",
      bgColor: "bg-red-50",
    },
    {
      title: "Pending",
      value: todayVerifications.filter((r) => r.status === "pending").length,
      icon: <Clock className="h-4 w-4" />,
      color: "text-yellow-600",
      bgColor: "bg-yellow-50",
    },
  ];

  const filteredVerifications = mockVerificationRecords.filter(
    (record) =>
      record.checkpointName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.officerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.childId.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Child Verification
            </h1>
            <p className="text-lg text-gray-600 mt-1">
              Checkpoint verification system
            </p>
          </div>
          <Badge variant="outline" className="text-lg px-4 py-2">
            <MapPin className="h-4 w-4 mr-2" />
            {selectedCheckpoint.name}
          </Badge>
        </div>

        {/* Checkpoint Info */}
        <Alert className="mb-6 border-blue-200 bg-blue-50">
          <Shield className="h-4 w-4 text-blue-600" />
          <AlertDescription className="text-blue-800">
            <strong>Active Checkpoint:</strong> {selectedCheckpoint.name} -{" "}
            {selectedCheckpoint.location}
            <br />
            <strong>Status:</strong>{" "}
            {selectedCheckpoint.verified ? "Verified" : "Pending Verification"}
          </AlertDescription>
        </Alert>

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

        <Tabs defaultValue="scanner" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="scanner">QR Scanner</TabsTrigger>
            <TabsTrigger value="manual">Manual Search</TabsTrigger>
            <TabsTrigger value="history">Verification History</TabsTrigger>
          </TabsList>

          <TabsContent value="scanner" className="space-y-6">
            <VerificationScanner />
          </TabsContent>

          <TabsContent value="manual" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Manual Child Lookup</CardTitle>
                <CardDescription>
                  Search for child records using government ID or name
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="childId">Child Government ID</Label>
                    <Input
                      id="childId"
                      placeholder="Enter government ID (BC-2020123456)"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="childName">Child Name</Label>
                    <Input
                      id="childName"
                      placeholder="Enter child's full name"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="parentId">
                    Parent Government ID (Optional)
                  </Label>
                  <Input
                    id="parentId"
                    placeholder="Enter parent's government ID for verification"
                  />
                </div>

                <Button className="w-full">
                  <Search className="h-4 w-4 mr-2" />
                  Search Child Records
                </Button>

                <Alert className="mt-4">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription>
                    Manual search requires additional verification steps. Always
                    verify parent identity before releasing a child.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="history" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Verification History</CardTitle>
                    <CardDescription>
                      Recent verification records from this checkpoint
                    </CardDescription>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Label htmlFor="search">Search:</Label>
                    <Input
                      id="search"
                      placeholder="Search records..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-64"
                    />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {filteredVerifications.length > 0 ? (
                  <div className="space-y-4">
                    {filteredVerifications.slice(0, 10).map((record) => (
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
                              <XCircle className="h-4 w-4 text-red-600" />
                            ) : (
                              <Clock className="h-4 w-4 text-yellow-600" />
                            )}
                          </div>
                          <div>
                            <p className="font-medium">
                              Child ID: {record.childId}
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
                              <p className="text-xs text-muted-foreground mt-1">
                                Notes: {record.notes}
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="text-right">
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
                          <p className="text-xs text-muted-foreground mt-1">
                            {record.checkpointName}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      No verification records found
                    </h3>
                    <p className="text-gray-600">
                      {searchTerm
                        ? "Try adjusting your search terms."
                        : "Verification records will appear here once children are verified."}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Emergency Contacts */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <AlertTriangle className="h-5 w-5 text-red-600" />
              <span>Emergency Procedures</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-lg mb-2">
                  In Case of Verification Failure:
                </h3>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>• Do not release the child</li>
                  <li>• Contact local authorities immediately</li>
                  <li>• Document all details in the system</li>
                  <li>• Follow your facility's security protocols</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">
                  Emergency Contacts:
                </h3>
                <div className="text-sm space-y-1">
                  <p>
                    <strong>Local Police:</strong> 911
                  </p>
                  <p>
                    <strong>Child Link Support:</strong> 1-800-CHILD-LINK
                  </p>
                  <p>
                    <strong>Technical Support:</strong> 1-800-TECH-HELP
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Verification;
