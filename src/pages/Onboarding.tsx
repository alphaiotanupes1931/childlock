import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Shield, Users, Scan, Bell, CheckCircle, Lock } from "lucide-react";
import OnboardingStep from "@/components/OnboardingStep";

const Onboarding = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const navigate = useNavigate();
  const totalSteps = 4;

  const onboardingSteps = [
    {
      icon: <Shield className="h-10 w-10" />,
      title: "Welcome to Child Link",
      description:
        "The most trusted child safety verification system used by families and institutions worldwide to prevent child abduction.",
      illustration: (
        <div className="w-64 h-48 bg-blue-50 rounded-xl flex items-center justify-center mb-4">
          <div className="text-center">
            <Shield className="h-16 w-16 text-blue-600 mx-auto mb-2" />
            <p className="text-sm text-blue-600 font-medium">
              Secure Protection
            </p>
          </div>
        </div>
      ),
    },
    {
      icon: <Users className="h-10 w-10" />,
      title: "Government ID Verification",
      description:
        "Link your children to your verified government ID for instant, secure verification at checkpoints, schools, and public spaces.",
      illustration: (
        <div className="w-64 h-48 bg-green-50 rounded-xl flex items-center justify-center mb-4">
          <div className="text-center">
            <Users className="h-16 w-16 text-green-600 mx-auto mb-2" />
            <p className="text-sm text-green-600 font-medium">
              Family Protection
            </p>
          </div>
        </div>
      ),
    },
    {
      icon: <Scan className="h-10 w-10" />,
      title: "Real-Time Verification",
      description:
        "Security personnel can instantly verify your child's identity and your relationship using secure QR codes and government databases.",
      illustration: (
        <div className="w-64 h-48 bg-purple-50 rounded-xl flex items-center justify-center mb-4">
          <div className="text-center">
            <Scan className="h-16 w-16 text-purple-600 mx-auto mb-2" />
            <p className="text-sm text-purple-600 font-medium">
              Instant Verification
            </p>
          </div>
        </div>
      ),
    },
    {
      icon: <Bell className="h-10 w-10" />,
      title: "24/7 Alert System",
      description:
        "Receive instant notifications for any verification attempts and emergency alerts to keep your children safe at all times.",
      illustration: (
        <div className="w-64 h-48 bg-red-50 rounded-xl flex items-center justify-center mb-4">
          <div className="text-center">
            <Bell className="h-16 w-16 text-red-600 mx-auto mb-2" />
            <p className="text-sm text-red-600 font-medium">Real-Time Alerts</p>
          </div>
        </div>
      ),
    },
  ];

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      navigate("/user-type-selection");
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSkip = () => {
    navigate("/user-type-selection");
  };

  const currentStepData = onboardingSteps[currentStep - 1];

  return (
    <OnboardingStep
      icon={currentStepData.icon}
      title={currentStepData.title}
      description={currentStepData.description}
      illustration={currentStepData.illustration}
      step={currentStep}
      totalSteps={totalSteps}
      onNext={handleNext}
      onPrev={handlePrev}
      onSkip={handleSkip}
      isLastStep={currentStep === totalSteps}
      primaryActionText={currentStep === totalSteps ? "Get Started" : "Next"}
    />
  );
};

export default Onboarding;
