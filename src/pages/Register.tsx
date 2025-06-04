import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import {
  User,
  FileText,
  Phone,
  MapPin,
  Upload,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import Header from "@/components/Header";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const formSchema = z.object({
  // Parent Information
  parentName: z.string().min(2, "Parent name must be at least 2 characters"),
  parentEmail: z.string().email("Invalid email address"),
  parentPhone: z.string().min(10, "Phone number must be at least 10 digits"),
  parentGovernmentId: z.string().min(5, "Government ID is required"),
  parentAddress: z.string().min(10, "Address must be at least 10 characters"),

  // Child Information
  childName: z.string().min(2, "Child name must be at least 2 characters"),
  childAge: z.coerce.number().min(0).max(18, "Age must be between 0 and 18"),
  childGovernmentId: z.string().min(5, "Child government ID is required"),
  emergencyContact: z.string().min(10, "Emergency contact is required"),
  medicalInfo: z.string().optional(),

  // Consent and Verification
  consentDataProcessing: z
    .boolean()
    .refine((val) => val === true, "Consent is required"),
  consentBackgroundCheck: z
    .boolean()
    .refine((val) => val === true, "Background check consent is required"),
});

type FormData = z.infer<typeof formSchema>;

const Register = () => {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    trigger,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const nextStep = async () => {
    let fieldsToValidate: (keyof FormData)[] = [];

    if (step === 1) {
      fieldsToValidate = [
        "parentName",
        "parentEmail",
        "parentPhone",
        "parentGovernmentId",
        "parentAddress",
      ];
    } else if (step === 2) {
      fieldsToValidate = [
        "childName",
        "childAge",
        "childGovernmentId",
        "emergencyContact",
      ];
    }

    const isValid = await trigger(fieldsToValidate);
    if (isValid) {
      setStep(step + 1);
    }
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      toast.success("Child registration submitted successfully!");
      navigate("/dashboard");
      setIsSubmitting(false);
    }, 2000);
  };

  const renderStepIndicator = () => (
    <div className="flex items-center justify-center mb-8">
      <div className="flex items-center space-x-4">
        {[1, 2, 3].map((stepNumber) => (
          <div key={stepNumber} className="flex items-center">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                step >= stepNumber
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-600"
              }`}
            >
              {step > stepNumber ? (
                <CheckCircle className="h-5 w-5" />
              ) : (
                stepNumber
              )}
            </div>
            {stepNumber < 3 && (
              <div
                className={`w-12 h-1 mx-2 ${
                  step > stepNumber ? "bg-blue-600" : "bg-gray-200"
                }`}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );

  const renderStep1 = () => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <User className="h-5 w-5" />
          <span>Parent/Guardian Information</span>
        </CardTitle>
        <CardDescription>
          Please provide your verified government information for secure child
          linkage.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="parentName">Full Name *</Label>
            <Input
              id="parentName"
              {...register("parentName")}
              placeholder="Enter your full legal name"
            />
            {errors.parentName && (
              <p className="text-sm text-red-600">
                {errors.parentName.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="parentEmail">Email Address *</Label>
            <Input
              id="parentEmail"
              type="email"
              {...register("parentEmail")}
              placeholder="your.email@example.com"
            />
            {errors.parentEmail && (
              <p className="text-sm text-red-600">
                {errors.parentEmail.message}
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="parentPhone">Phone Number *</Label>
            <Input
              id="parentPhone"
              {...register("parentPhone")}
              placeholder="+1-555-0123"
            />
            {errors.parentPhone && (
              <p className="text-sm text-red-600">
                {errors.parentPhone.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="parentGovernmentId">Government ID *</Label>
            <Input
              id="parentGovernmentId"
              {...register("parentGovernmentId")}
              placeholder="Driver's License, Passport, etc."
            />
            {errors.parentGovernmentId && (
              <p className="text-sm text-red-600">
                {errors.parentGovernmentId.message}
              </p>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="parentAddress">Address *</Label>
          <Textarea
            id="parentAddress"
            {...register("parentAddress")}
            placeholder="Enter your complete address"
            rows={3}
          />
          {errors.parentAddress && (
            <p className="text-sm text-red-600">
              {errors.parentAddress.message}
            </p>
          )}
        </div>

        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            All information will be verified against government databases for
            security purposes.
          </AlertDescription>
        </Alert>
      </CardContent>
    </Card>
  );

  const renderStep2 = () => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <FileText className="h-5 w-5" />
          <span>Child Information</span>
        </CardTitle>
        <CardDescription>
          Provide your child's information for secure registration and
          verification.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="childName">Child's Full Name *</Label>
            <Input
              id="childName"
              {...register("childName")}
              placeholder="Enter child's full legal name"
            />
            {errors.childName && (
              <p className="text-sm text-red-600">{errors.childName.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="childAge">Age *</Label>
            <Input
              id="childAge"
              type="number"
              min="0"
              max="18"
              {...register("childAge")}
              placeholder="0"
            />
            {errors.childAge && (
              <p className="text-sm text-red-600">{errors.childAge.message}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="childGovernmentId">Child's Government ID *</Label>
            <Input
              id="childGovernmentId"
              {...register("childGovernmentId")}
              placeholder="Birth Certificate, Passport, etc."
            />
            {errors.childGovernmentId && (
              <p className="text-sm text-red-600">
                {errors.childGovernmentId.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="emergencyContact">Emergency Contact *</Label>
            <Input
              id="emergencyContact"
              {...register("emergencyContact")}
              placeholder="+1-555-0124"
            />
            {errors.emergencyContact && (
              <p className="text-sm text-red-600">
                {errors.emergencyContact.message}
              </p>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="medicalInfo">Medical Information (Optional)</Label>
          <Textarea
            id="medicalInfo"
            {...register("medicalInfo")}
            placeholder="Any important medical conditions, allergies, or medications"
            rows={3}
          />
        </div>

        <div className="space-y-2">
          <Label>Child's Photo</Label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
            <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
            <p className="text-sm text-gray-600">
              Upload a recent photo of your child
            </p>
            <Button variant="outline" size="sm" className="mt-2">
              Choose File
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const renderStep3 = () => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <CheckCircle className="h-5 w-5" />
          <span>Review & Consent</span>
        </CardTitle>
        <CardDescription>
          Please review your information and provide necessary consents.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold text-lg mb-2">Parent Information</h3>
            <div className="space-y-1 text-sm">
              <p>
                <strong>Name:</strong> {watch("parentName")}
              </p>
              <p>
                <strong>Email:</strong> {watch("parentEmail")}
              </p>
              <p>
                <strong>Phone:</strong> {watch("parentPhone")}
              </p>
              <p>
                <strong>Government ID:</strong> {watch("parentGovernmentId")}
              </p>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-2">Child Information</h3>
            <div className="space-y-1 text-sm">
              <p>
                <strong>Name:</strong> {watch("childName")}
              </p>
              <p>
                <strong>Age:</strong> {watch("childAge")}
              </p>
              <p>
                <strong>Government ID:</strong> {watch("childGovernmentId")}
              </p>
              <p>
                <strong>Emergency Contact:</strong> {watch("emergencyContact")}
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-start space-x-2">
            <Checkbox
              id="consentDataProcessing"
              onCheckedChange={(checked) =>
                setValue("consentDataProcessing", checked as boolean)
              }
            />
            <Label htmlFor="consentDataProcessing" className="text-sm">
              I consent to the processing of my personal data and my child's
              data for the purpose of child safety verification. I understand
              this data will be securely stored and used only for verification
              purposes.
            </Label>
          </div>
          {errors.consentDataProcessing && (
            <p className="text-sm text-red-600">
              {errors.consentDataProcessing.message}
            </p>
          )}

          <div className="flex items-start space-x-2">
            <Checkbox
              id="consentBackgroundCheck"
              onCheckedChange={(checked) =>
                setValue("consentBackgroundCheck", checked as boolean)
              }
            />
            <Label htmlFor="consentBackgroundCheck" className="text-sm">
              I consent to background verification checks against government
              databases to ensure the authenticity of provided information and
              eligibility for the Child Link program.
            </Label>
          </div>
          {errors.consentBackgroundCheck && (
            <p className="text-sm text-red-600">
              {errors.consentBackgroundCheck.message}
            </p>
          )}
        </div>

        <Alert>
          <CheckCircle className="h-4 w-4" />
          <AlertDescription>
            Your registration will be reviewed within 24-48 hours. You'll
            receive an email notification once your child is successfully linked
            to your government ID.
          </AlertDescription>
        </Alert>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Register Your Child
            </h1>
            <p className="text-lg text-gray-600">
              Secure your child's safety with government-verified identity
              linkage
            </p>
            <div className="flex justify-center mt-4">
              <Badge variant="outline">Step {step} of 3</Badge>
            </div>
          </div>

          {renderStepIndicator()}

          <form onSubmit={handleSubmit(onSubmit)}>
            {step === 1 && renderStep1()}
            {step === 2 && renderStep2()}
            {step === 3 && renderStep3()}

            <div className="flex justify-between mt-8">
              {step > 1 && (
                <Button type="button" variant="outline" onClick={prevStep}>
                  Previous
                </Button>
              )}

              <div className="ml-auto">
                {step < 3 ? (
                  <Button type="button" onClick={nextStep}>
                    Next
                  </Button>
                ) : (
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Submitting..." : "Submit Registration"}
                  </Button>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
