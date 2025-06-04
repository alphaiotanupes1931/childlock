import { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { colors } from "@/lib/colors";

interface OnboardingStepProps {
  icon: ReactNode;
  title: string;
  description: string;
  illustration?: ReactNode;
  step: number;
  totalSteps: number;
  onNext?: () => void;
  onPrev?: () => void;
  onSkip?: () => void;
  isLastStep?: boolean;
  primaryActionText?: string;
}

const OnboardingStep = ({
  icon,
  title,
  description,
  illustration,
  step,
  totalSteps,
  onNext,
  onPrev,
  onSkip,
  isLastStep = false,
  primaryActionText = "Next",
}: OnboardingStepProps) => {
  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ backgroundColor: colors.background }}
    >
      {/* Progress bar */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="text-sm text-gray-500">
            {step} of {totalSteps}
          </div>
          {onSkip && (
            <Button variant="ghost" size="sm" onClick={onSkip}>
              Skip
            </Button>
          )}
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="h-2 rounded-full transition-all duration-300"
            style={{
              backgroundColor: colors.primary,
              width: `${(step / totalSteps) * 100}%`,
            }}
          />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
        <div className="mb-8">
          <div
            className="inline-flex items-center justify-center w-20 h-20 rounded-full mb-6"
            style={{ backgroundColor: `${colors.primary}15` }}
          >
            <div style={{ color: colors.primary }}>{icon}</div>
          </div>

          {illustration && <div className="mb-6">{illustration}</div>}

          <h1 className="text-3xl font-bold text-gray-900 mb-4">{title}</h1>
          <p className="text-lg text-gray-600 max-w-md mx-auto leading-relaxed">
            {description}
          </p>
        </div>
      </div>

      {/* Navigation */}
      <div className="p-6">
        <div className="flex justify-between items-center">
          {step > 1 ? (
            <Button variant="outline" onClick={onPrev}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
          ) : (
            <div></div>
          )}

          <Button
            onClick={onNext}
            className="px-8"
            style={{ backgroundColor: colors.primary }}
          >
            {primaryActionText}
            {!isLastStep && <ArrowRight className="h-4 w-4 ml-2" />}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OnboardingStep;
