import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Shield,
  Mail,
  Lock,
  User,
  Phone,
  FileText,
  Eye,
  EyeOff,
  ArrowLeft,
} from "lucide-react";
import { Link } from "react-router-dom";
import { colors } from "@/lib/colors";
import {
  login,
  register,
  LoginCredentials,
  RegistrationData,
  UserType,
} from "@/lib/auth";
import { toast } from "sonner";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const registerSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    phone: z.string().min(10, "Phone number must be at least 10 digits"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
    governmentId: z.string().optional(),
    agreeToTerms: z
      .boolean()
      .refine((val) => val === true, "You must agree to the terms"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type LoginFormData = z.infer<typeof loginSchema>;
type RegisterFormData = z.infer<typeof registerSchema>;

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [activeTab, setActiveTab] = useState("login");
  const navigate = useNavigate();

  const selectedUserType =
    (localStorage.getItem("selectedUserType") as UserType) || "parent";

  const loginForm = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const registerForm = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onLogin = async (data: LoginFormData) => {
    setIsLoading(true);
    try {
      const user = await login(data);
      toast.success("Welcome back!");
      navigate("/dashboard");
    } catch (error) {
      toast.error("Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const onRegister = async (data: RegisterFormData) => {
    setIsLoading(true);
    try {
      const registrationData: RegistrationData = {
        ...data,
        userType: selectedUserType,
      };
      const user = await register(registrationData);
      toast.success("Account created successfully!");
      navigate("/dashboard");
    } catch (error) {
      toast.error("Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: colors.background }}
    >
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <Link
              to="/user-type-selection"
              className="inline-flex items-center text-sm text-gray-600 mb-4"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Change role
            </Link>
            <div className="flex items-center justify-center mb-4">
              <Shield
                className="h-8 w-8 mr-2"
                style={{ color: colors.primary }}
              />
              <h1 className="text-2xl font-bold text-gray-900">Child Link</h1>
            </div>
            <p className="text-gray-600">
              {selectedUserType === "parent"
                ? "Parent/Guardian Access"
                : selectedUserType === "official"
                  ? "Official/Authority Access"
                  : "Third-party Guardian Access"}
            </p>
          </div>

          <Card>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">Sign In</TabsTrigger>
                <TabsTrigger value="register">Sign Up</TabsTrigger>
              </TabsList>

              <TabsContent value="login">
                <CardHeader>
                  <CardTitle>Welcome back</CardTitle>
                  <CardDescription>
                    Sign in to your Child Link account
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form
                    onSubmit={loginForm.handleSubmit(onLogin)}
                    className="space-y-4"
                  >
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="email"
                          type="email"
                          placeholder="your.email@example.com"
                          className="pl-10"
                          {...loginForm.register("email")}
                        />
                      </div>
                      {loginForm.formState.errors.email && (
                        <p className="text-sm text-red-600">
                          {loginForm.formState.errors.email.message}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="password">Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter your password"
                          className="pl-10 pr-10"
                          {...loginForm.register("password")}
                        />
                        <button
                          type="button"
                          className="absolute right-3 top-3 h-4 w-4 text-gray-400"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <EyeOff /> : <Eye />}
                        </button>
                      </div>
                      {loginForm.formState.errors.password && (
                        <p className="text-sm text-red-600">
                          {loginForm.formState.errors.password.message}
                        </p>
                      )}
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="remember" />
                        <Label htmlFor="remember" className="text-sm">
                          Remember me
                        </Label>
                      </div>
                      <a
                        href="#"
                        className="text-sm"
                        style={{ color: colors.primary }}
                      >
                        Forgot password?
                      </a>
                    </div>

                    <Button
                      type="submit"
                      className="w-full"
                      disabled={isLoading}
                      style={{ backgroundColor: colors.primary }}
                    >
                      {isLoading ? "Signing in..." : "Sign In"}
                    </Button>
                  </form>
                </CardContent>
              </TabsContent>

              <TabsContent value="register">
                <CardHeader>
                  <CardTitle>Create account</CardTitle>
                  <CardDescription>
                    Join Child Link to protect your children
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form
                    onSubmit={registerForm.handleSubmit(onRegister)}
                    className="space-y-4"
                  >
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="name"
                          placeholder="Your full name"
                          className="pl-10"
                          {...registerForm.register("name")}
                        />
                      </div>
                      {registerForm.formState.errors.name && (
                        <p className="text-sm text-red-600">
                          {registerForm.formState.errors.name.message}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="registerEmail">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="registerEmail"
                          type="email"
                          placeholder="your.email@example.com"
                          className="pl-10"
                          {...registerForm.register("email")}
                        />
                      </div>
                      {registerForm.formState.errors.email && (
                        <p className="text-sm text-red-600">
                          {registerForm.formState.errors.email.message}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="phone"
                          placeholder="+1-555-0123"
                          className="pl-10"
                          {...registerForm.register("phone")}
                        />
                      </div>
                      {registerForm.formState.errors.phone && (
                        <p className="text-sm text-red-600">
                          {registerForm.formState.errors.phone.message}
                        </p>
                      )}
                    </div>

                    {selectedUserType !== "third-party-guardian" && (
                      <div className="space-y-2">
                        <Label htmlFor="governmentId">
                          Government ID (Optional)
                        </Label>
                        <div className="relative">
                          <FileText className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <Input
                            id="governmentId"
                            placeholder="Driver's License, Passport, etc."
                            className="pl-10"
                            {...registerForm.register("governmentId")}
                          />
                        </div>
                      </div>
                    )}

                    <div className="space-y-2">
                      <Label htmlFor="registerPassword">Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="registerPassword"
                          type={showPassword ? "text" : "password"}
                          placeholder="Create a strong password"
                          className="pl-10 pr-10"
                          {...registerForm.register("password")}
                        />
                        <button
                          type="button"
                          className="absolute right-3 top-3 h-4 w-4 text-gray-400"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <EyeOff /> : <Eye />}
                        </button>
                      </div>
                      {registerForm.formState.errors.password && (
                        <p className="text-sm text-red-600">
                          {registerForm.formState.errors.password.message}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirm Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="confirmPassword"
                          type={showPassword ? "text" : "password"}
                          placeholder="Confirm your password"
                          className="pl-10"
                          {...registerForm.register("confirmPassword")}
                        />
                      </div>
                      {registerForm.formState.errors.confirmPassword && (
                        <p className="text-sm text-red-600">
                          {
                            registerForm.formState.errors.confirmPassword
                              .message
                          }
                        </p>
                      )}
                    </div>

                    <div className="flex items-start space-x-2">
                      <Checkbox
                        id="agreeToTerms"
                        onCheckedChange={(checked) =>
                          registerForm.setValue(
                            "agreeToTerms",
                            checked as boolean,
                          )
                        }
                      />
                      <Label
                        htmlFor="agreeToTerms"
                        className="text-sm leading-relaxed"
                      >
                        I agree to the{" "}
                        <a href="#" style={{ color: colors.primary }}>
                          Terms of Service
                        </a>{" "}
                        and{" "}
                        <a href="#" style={{ color: colors.primary }}>
                          Privacy Policy
                        </a>
                      </Label>
                    </div>
                    {registerForm.formState.errors.agreeToTerms && (
                      <p className="text-sm text-red-600">
                        {registerForm.formState.errors.agreeToTerms.message}
                      </p>
                    )}

                    <Button
                      type="submit"
                      className="w-full"
                      disabled={isLoading}
                      style={{ backgroundColor: colors.primary }}
                    >
                      {isLoading ? "Creating account..." : "Create Account"}
                    </Button>
                  </form>
                </CardContent>
              </TabsContent>
            </Tabs>
          </Card>

          {/* Security Notice */}
          <Alert className="mt-6">
            <Shield className="h-4 w-4" />
            <AlertDescription>
              Your data is protected with bank-level encryption and
              government-grade security protocols.
            </AlertDescription>
          </Alert>
        </div>
      </div>
    </div>
  );
};

export default Login;
