export interface Child {
  id: string;
  name: string;
  age: number;
  dateOfBirth: Date;
  gender: "male" | "female" | "other";
  photo: string;
  governmentId: string;
  parentId: string;
  emergencyContact: string;
  medicalInfo?: string;
  createdAt: Date;
  lastVerified?: Date;
  isActive: boolean;
  qrCode?: string;
  travelPermissions: string[]; // Array of permission IDs
}

export interface Parent {
  id: string;
  name: string;
  email: string;
  phone: string;
  governmentId: string;
  address: string;
  children: Child[];
  verified: boolean;
  createdAt: Date;
  profileImage?: string;
  notificationPreferences: NotificationPreferences;
}

export interface VerificationRecord {
  id: string;
  childId: string;
  checkpointId: string;
  checkpointName: string;
  officerId: string;
  officerName: string;
  timestamp: Date;
  status: "verified" | "failed" | "pending" | "unauthorized";
  notes?: string;
  location?: string;
  riskLevel: "low" | "medium" | "high";
}

export interface Checkpoint {
  id: string;
  name: string;
  location: string;
  type:
    | "school"
    | "airport"
    | "border"
    | "mall"
    | "hospital"
    | "transport"
    | "other";
  verified: boolean;
  coordinates?: { lat: number; lng: number };
  operatingHours?: string;
  contactInfo?: string;
}

export interface VerificationRequest {
  childId: string;
  checkpointId: string;
  requestedBy: string;
  timestamp: Date;
  urgency: "low" | "medium" | "high" | "emergency";
}

export interface TravelPermission {
  id: string;
  childId: string;
  guardianName: string;
  guardianPhone: string;
  guardianEmail: string;
  guardianId?: string;
  startDate: Date;
  endDate: Date;
  destination: string;
  purpose: string;
  notes?: string;
  status: "active" | "expired" | "pending" | "revoked";
  createdAt: Date;
  approvedBy: string;
}

export interface Alert {
  id: string;
  type:
    | "unauthorized_attempt"
    | "verification_failed"
    | "emergency"
    | "permission_expired"
    | "system";
  title: string;
  message: string;
  timestamp: Date;
  childId?: string;
  checkpointId?: string;
  severity: "low" | "medium" | "high" | "critical";
  status: "unread" | "read" | "dismissed" | "resolved";
  actionRequired: boolean;
}

export interface NotificationPreferences {
  emailAlerts: boolean;
  smsAlerts: boolean;
  pushNotifications: boolean;
  emergencyOnly: boolean;
  dailySummary: boolean;
}

export interface ActivityLogEntry {
  id: string;
  type:
    | "verification"
    | "permission_created"
    | "permission_expired"
    | "profile_updated"
    | "alert_generated";
  description: string;
  timestamp: Date;
  childId?: string;
  userId: string;
  metadata?: Record<string, any>;
}
