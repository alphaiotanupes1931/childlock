import { Home, Users, User, Scan, Bell } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { colors } from "@/lib/colors";

const BottomNavigation = () => {
  const location = useLocation();

  const navItems = [
    {
      path: "/dashboard",
      icon: Home,
      label: "Home",
    },
    {
      path: "/dashboard?tab=children",
      icon: Users,
      label: "Children",
    },
    {
      path: "/verification",
      icon: Scan,
      label: "Verify",
    },
    {
      path: "/alerts",
      icon: Bell,
      label: "Alerts",
    },
    {
      path: "/profile",
      icon: User,
      label: "Profile",
    },
  ];

  const isActive = (path: string) => {
    if (path.includes("?")) {
      const [basePath] = path.split("?");
      return location.pathname === basePath;
    }
    return location.pathname === path;
  };

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 z-50 md:hidden"
      style={{ borderTopColor: colors.border }}
    >
      <div className="flex justify-around items-center">
        {navItems.map((item) => {
          const IconComponent = item.icon;
          const active = isActive(item.path);

          return (
            <Link
              key={item.path}
              to={item.path}
              className="flex flex-col items-center py-2 px-3 rounded-lg transition-colors duration-200"
              style={{
                color: active ? colors.primary : colors.muted,
                backgroundColor: active ? `${colors.primary}10` : "transparent",
              }}
            >
              <IconComponent className="h-5 w-5 mb-1" />
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNavigation;
