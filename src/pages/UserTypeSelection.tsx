import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { User, Shield, Users, ArrowRight, Check } from "lucide-react";
import { colors } from "@/lib/colors";
import { UserType } from "@/lib/auth";

const UserTypeSelection = () => {
  const [selectedType, setSelectedType] = useState<UserType | null>(null);
  const navigate = useNavigate();

  const userTypes = [
    {
      type: "parent" as UserType,
      icon: <User className="h-8 w-8" />,
      title: "Parent/Guardian",
      description: "Register and manage your children's safety profiles",
      features: [
        "Register multiple children",
        "Generate QR verification codes",
        "Manage travel permissions",
        "Receive real-time alerts",
        "Track verification history",
      ],
      popular: true,
    },
    {
      type: "official" as UserType,
      icon: <Shield className="h-8 w-8" />,
      title: "Official/Authority",
      description:
        "Verify children's identities at checkpoints and institutions",
      features: [
        "Scan and verify QR codes",
        "Access government databases",
        "Generate verification reports",
        "Emergency alert system",
        "Compliance tracking",
      ],
      popular: false,
    },
    {
      type: "third-party-guardian" as UserType,
      icon: <Users className="h-8 w-8" />,
      title: "Third-party Guardian",
      description: "Temporary guardian with limited access permissions",
      features: [
        "View assigned children",
        "Temporary verification access",
        "Emergency contact information",
        "Time-limited permissions",
        "Activity reporting",
      ],
      popular: false,
    },
  ];

  const handleContinue = () => {
    if (selectedType) {
      // Store selected user type in localStorage for registration
      localStorage.setItem("selectedUserType", selectedType);
      navigate("/login");
    }
  };

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: colors.background }}
    >
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Choose Your Role
            </h1>
            <p className="text-lg text-gray-600">
              Select how you'll be using Child Link to get started
            </p>
          </div>

          {/* User Type Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {userTypes.map((userType) => (
              <Card
                key={userType.type}
                className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
                  selectedType === userType.type
                    ? "ring-2 ring-offset-2"
                    : "hover:shadow-md"
                }`}
                style={{
                  borderColor:
                    selectedType === userType.type ? colors.primary : undefined,
                  ringColor:
                    selectedType === userType.type ? colors.primary : undefined,
                }}
                onClick={() => setSelectedType(userType.type)}
              >
                <CardHeader className="text-center pb-4">
                  {userType.popular && (
                    <Badge
                      className="mb-2 w-fit mx-auto"
                      style={{ backgroundColor: colors.primary }}
                    >
                      Most Popular
                    </Badge>
                  )}
                  <div
                    className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4"
                    style={{
                      backgroundColor:
                        selectedType === userType.type
                          ? colors.primary
                          : `${colors.primary}15`,
                      color:
                        selectedType === userType.type
                          ? "white"
                          : colors.primary,
                    }}
                  >
                    {userType.icon}
                  </div>
                  <CardTitle className="text-xl mb-2">
                    {userType.title}
                  </CardTitle>
                  <p className="text-sm text-gray-600">
                    {userType.description}
                  </p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {userType.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-sm">
                        <Check
                          className="h-4 w-4 mr-2 flex-shrink-0"
                          style={{ color: colors.success }}
                        />
                        <span className="text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {selectedType === userType.type && (
                    <div
                      className="mt-4 p-3 rounded-lg"
                      style={{ backgroundColor: `${colors.primary}10` }}
                    >
                      <div
                        className="flex items-center text-sm"
                        style={{ color: colors.primary }}
                      >
                        <Check className="h-4 w-4 mr-2" />
                        <span className="font-medium">Selected</span>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Continue Button */}
          <div className="text-center">
            <Button
              size="lg"
              onClick={handleContinue}
              disabled={!selectedType}
              className="px-8"
              style={{ backgroundColor: colors.primary }}
            >
              Continue
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>

            {selectedType && (
              <p className="text-sm text-gray-500 mt-4">
                You selected:{" "}
                <span className="font-medium">
                  {userTypes.find((t) => t.type === selectedType)?.title}
                </span>
              </p>
            )}
          </div>

          {/* Help Text */}
          <div className="mt-12 text-center">
            <p className="text-sm text-gray-500">
              Not sure which role fits you best?
              <a
                href="#"
                className="ml-1 font-medium"
                style={{ color: colors.primary }}
              >
                Learn more about each role
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserTypeSelection;
