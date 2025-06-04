import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Shield } from "lucide-react";
import { colors, gradients } from "@/lib/colors";

const Splash = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/onboarding");
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{ background: gradients.hero }}
    >
      <div className="text-center text-white animate-pulse">
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-white/20 backdrop-blur-sm mb-6">
            <Shield className="h-12 w-12 text-white" />
          </div>
          <h1 className="text-4xl font-bold mb-2">Child Link</h1>
          <p className="text-xl text-white/90">Protecting Children Together</p>
        </div>

        <div className="flex items-center justify-center space-x-2">
          <div
            className="w-2 h-2 rounded-full bg-white animate-bounce"
            style={{ animationDelay: "0ms" }}
          ></div>
          <div
            className="w-2 h-2 rounded-full bg-white animate-bounce"
            style={{ animationDelay: "150ms" }}
          ></div>
          <div
            className="w-2 h-2 rounded-full bg-white animate-bounce"
            style={{ animationDelay: "300ms" }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Splash;
