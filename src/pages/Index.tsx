import {
  Shield,
  Users,
  CheckCircle,
  QrCode,
  Smartphone,
  Lock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import Header from "@/components/Header";

const Index = () => {
  const features = [
    {
      icon: <Shield className="h-8 w-8 text-blue-600" />,
      title: "Government ID Verification",
      description:
        "Secure linkage between children and parents using official government identification documents.",
    },
    {
      icon: <QrCode className="h-8 w-8 text-green-600" />,
      title: "Real-time QR Scanning",
      description:
        "Instant verification at checkpoints using secure QR codes linked to government databases.",
    },
    {
      icon: <Smartphone className="h-8 w-8 text-purple-600" />,
      title: "Mobile-First Design",
      description:
        "Easy-to-use mobile app for parents and checkpoint personnel with offline capabilities.",
    },
    {
      icon: <Lock className="h-8 w-8 text-red-600" />,
      title: "Advanced Security",
      description:
        "End-to-end encryption and multi-layer authentication to protect sensitive information.",
    },
  ];

  const stats = [
    { number: "50,000+", label: "Children Protected" },
    { number: "1,200+", label: "Verified Checkpoints" },
    { number: "99.9%", label: "Verification Accuracy" },
    { number: "24/7", label: "System Availability" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-4xl mx-auto">
          <Badge variant="outline" className="mb-4">
            Trusted by families nationwide
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Protecting Children with{" "}
            <span className="text-blue-600">Smart Verification</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Child Link prevents abductions by securely linking children to their
            parents' government IDs, enabling instant verification at
            checkpoints worldwide.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register">
              <Button size="lg" className="w-full sm:w-auto">
                <Users className="h-5 w-5 mr-2" />
                Register Your Child
              </Button>
            </Link>
            <Link to="/verification">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                <QrCode className="h-5 w-5 mr-2" />
                Checkpoint Verification
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-blue-50 py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            How Child Link Works
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Our comprehensive safety system provides multiple layers of
            protection for your children through advanced technology and
            government integration.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="text-center h-full">
              <CardHeader>
                <div className="mx-auto mb-4 p-3 bg-gray-50 rounded-full w-fit">
                  {feature.icon}
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Process Section */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Simple 3-Step Process
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="text-xl font-semibold mb-2">Register & Verify</h3>
              <p className="text-gray-600">
                Submit your government ID and child's information for secure
                verification
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="text-xl font-semibold mb-2">Generate QR Code</h3>
              <p className="text-gray-600">
                Receive a unique QR code for each child linked to your verified
                identity
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="text-xl font-semibold mb-2">
                Instant Verification
              </h3>
              <p className="text-gray-600">
                Security personnel can instantly verify child-parent
                relationships
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Start Protecting Your Children Today
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of families who trust Child Link to keep their
            children safe. Registration is free and takes less than 5 minutes.
          </p>
          <Link to="/register">
            <Button size="lg" variant="secondary">
              <Shield className="h-5 w-5 mr-2" />
              Get Started Now
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Shield className="h-6 w-6 text-blue-400" />
                <span className="text-xl font-bold">Child Link</span>
              </div>
              <p className="text-gray-400">
                Protecting children through secure verification technology.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link to="/dashboard" className="hover:text-white">
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link to="/verification" className="hover:text-white">
                    Verification
                  </Link>
                </li>
                <li>
                  <Link to="/register" className="hover:text-white">
                    Register
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Contact Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Security
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Compliance
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Child Link. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
