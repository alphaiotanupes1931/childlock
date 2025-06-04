import { Shield, Menu, User, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Link to="/" className="flex items-center space-x-2">
          <Shield className="h-6 w-6 text-blue-600" />
          <span className="text-xl font-bold text-gray-900">Child Link</span>
        </Link>

        <nav className="hidden md:flex flex-1 items-center justify-center space-x-6">
          <Link
            to="/"
            className={`text-sm font-medium transition-colors hover:text-primary ${
              isActive("/") ? "text-foreground" : "text-muted-foreground"
            }`}
          >
            Home
          </Link>
          <Link
            to="/dashboard"
            className={`text-sm font-medium transition-colors hover:text-primary ${
              isActive("/dashboard")
                ? "text-foreground"
                : "text-muted-foreground"
            }`}
          >
            Dashboard
          </Link>
          <Link
            to="/verification"
            className={`text-sm font-medium transition-colors hover:text-primary ${
              isActive("/verification")
                ? "text-foreground"
                : "text-muted-foreground"
            }`}
          >
            Verification
          </Link>
        </nav>

        <div className="flex items-center space-x-4">
          <Link to="/register" className="hidden md:block">
            <Button variant="outline" size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Add Child
            </Button>
          </Link>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="md:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>Navigation</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link to="/">Home</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/dashboard">Dashboard</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/verification">Verification</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link to="/register">Add Child</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                <User className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>Sarah Johnson</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Sign out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default Header;
