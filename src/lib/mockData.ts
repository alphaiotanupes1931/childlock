import { Child, Parent, VerificationRecord, Checkpoint } from "./types";

export const mockParents: Parent[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    email: "sarah.johnson@email.com",
    phone: "+1-555-0123",
    governmentId: "DL-1234567890",
    address: "123 Main St, Anytown, ST 12345",
    children: [],
    verified: true,
    createdAt: new Date("2024-01-15"),
  },
  {
    id: "2",
    name: "Michael Chen",
    email: "michael.chen@email.com",
    phone: "+1-555-0124",
    governmentId: "PP-9876543210",
    address: "456 Oak Ave, Somewhere, ST 67890",
    children: [],
    verified: true,
    createdAt: new Date("2024-02-20"),
  },
];

export const mockChildren: Child[] = [
  {
    id: "c1",
    name: "Emma Johnson",
    age: 8,
    photo: "/placeholder.svg",
    governmentId: "BC-2020123456",
    parentId: "1",
    emergencyContact: "+1-555-0125",
    medicalInfo: "No known allergies",
    createdAt: new Date("2024-01-16"),
    lastVerified: new Date("2024-12-20"),
    isActive: true,
  },
  {
    id: "c2",
    name: "Liam Johnson",
    age: 6,
    photo: "/placeholder.svg",
    governmentId: "BC-2022567890",
    parentId: "1",
    emergencyContact: "+1-555-0125",
    medicalInfo: "Asthma - carries inhaler",
    createdAt: new Date("2024-01-16"),
    lastVerified: new Date("2024-12-19"),
    isActive: true,
  },
  {
    id: "c3",
    name: "Sophia Chen",
    age: 10,
    photo: "/placeholder.svg",
    governmentId: "BC-2018345678",
    parentId: "2",
    emergencyContact: "+1-555-0126",
    createdAt: new Date("2024-02-21"),
    lastVerified: new Date("2024-12-18"),
    isActive: true,
  },
];

export const mockCheckpoints: Checkpoint[] = [
  {
    id: "cp1",
    name: "Sunny Elementary School",
    location: "Main Entrance",
    type: "school",
    verified: true,
  },
  {
    id: "cp2",
    name: "City Airport",
    location: "Security Checkpoint A",
    type: "airport",
    verified: true,
  },
  {
    id: "cp3",
    name: "Central Mall",
    location: "Security Office",
    type: "mall",
    verified: true,
  },
];

export const mockVerificationRecords: VerificationRecord[] = [
  {
    id: "v1",
    childId: "c1",
    checkpointId: "cp1",
    checkpointName: "Sunny Elementary School",
    officerId: "off1",
    officerName: "Officer Martinez",
    timestamp: new Date("2024-12-20T08:30:00"),
    status: "verified",
    notes: "Child safely picked up by verified parent",
  },
  {
    id: "v2",
    childId: "c2",
    checkpointId: "cp1",
    checkpointName: "Sunny Elementary School",
    officerId: "off1",
    officerName: "Officer Martinez",
    timestamp: new Date("2024-12-19T15:45:00"),
    status: "verified",
    notes: "Routine verification completed",
  },
  {
    id: "v3",
    childId: "c3",
    checkpointId: "cp3",
    checkpointName: "Central Mall",
    officerId: "off2",
    officerName: "Security Guard Thompson",
    timestamp: new Date("2024-12-18T14:20:00"),
    status: "verified",
    notes: "Child with verified guardian",
  },
];

// Update parent records to include their children
mockParents[0].children = [mockChildren[0], mockChildren[1]];
mockParents[1].children = [mockChildren[2]];
