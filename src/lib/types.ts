export interface Child {
  id: string;
  name: string;
  age: number;
  photo: string;
  governmentId: string;
  parentId: string;
  emergencyContact: string;
  medicalInfo?: string;
  createdAt: Date;
  lastVerified?: Date;
  isActive: boolean;
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
}

export interface VerificationRecord {
  id: string;
  childId: string;
  checkpointId: string;
  checkpointName: string;
  officerId: string;
  officerName: string;
  timestamp: Date;
  status: "verified" | "failed" | "pending";
  notes?: string;
}

export interface Checkpoint {
  id: string;
  name: string;
  location: string;
  type: "school" | "airport" | "border" | "mall" | "other";
  verified: boolean;
}

export interface VerificationRequest {
  childId: string;
  checkpointId: string;
  requestedBy: string;
  timestamp: Date;
}
