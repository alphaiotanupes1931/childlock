import { Child } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar, Phone, FileText, Eye, QrCode } from "lucide-react";
import { format } from "date-fns";

interface ChildCardProps {
  child: Child;
  onViewDetails?: () => void;
  onGenerateQR?: () => void;
}

const ChildCard = ({ child, onViewDetails, onGenerateQR }: ChildCardProps) => {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader className="pb-4">
        <div className="flex items-center space-x-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={child.photo} alt={child.name} />
            <AvatarFallback className="text-lg font-semibold">
              {child.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <CardTitle className="text-lg">{child.name}</CardTitle>
            <p className="text-sm text-muted-foreground">Age {child.age}</p>
            <Badge
              variant={child.isActive ? "default" : "secondary"}
              className="mt-1"
            >
              {child.isActive ? "Active" : "Inactive"}
            </Badge>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center text-sm text-muted-foreground">
            <FileText className="h-4 w-4 mr-2" />
            <span>ID: {child.governmentId}</span>
          </div>

          <div className="flex items-center text-sm text-muted-foreground">
            <Phone className="h-4 w-4 mr-2" />
            <span>Emergency: {child.emergencyContact}</span>
          </div>

          {child.lastVerified && (
            <div className="flex items-center text-sm text-muted-foreground">
              <Calendar className="h-4 w-4 mr-2" />
              <span>
                Last verified: {format(child.lastVerified, "MMM dd, yyyy")}
              </span>
            </div>
          )}
        </div>

        {child.medicalInfo && (
          <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-md">
            <p className="text-sm font-medium text-yellow-800">Medical Info:</p>
            <p className="text-sm text-yellow-700">{child.medicalInfo}</p>
          </div>
        )}

        <div className="flex space-x-2">
          {onViewDetails && (
            <Button
              variant="outline"
              size="sm"
              className="flex-1"
              onClick={onViewDetails}
            >
              <Eye className="h-4 w-4 mr-2" />
              Details
            </Button>
          )}
          {onGenerateQR && (
            <Button
              variant="outline"
              size="sm"
              className="flex-1"
              onClick={onGenerateQR}
            >
              <QrCode className="h-4 w-4 mr-2" />
              QR Code
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ChildCard;
