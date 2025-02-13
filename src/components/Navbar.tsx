
import { Button } from "@/components/ui/button";
import { Laptop, Menu, Lock } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";

type NavigationItem = {
  name: string;
  href: string;
  requiresAuth?: boolean;
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const publicNavigation: NavigationItem[] = [
    { name: "Home", href: "/" },
    { name: "Courses", href: "/courses" },
  ];

  const protectedNavigation: NavigationItem[] = [
    { name: "Practice", href: "/practice", requiresAuth: true },
    { name: "Discussion", href: "/discussion", requiresAuth: true },
  ];

  const navigation = [...publicNavigation, ...protectedNavigation];

  const handleNavigation = (href: string, requiresAuth?: boolean) => {
    if (requiresAuth && !user) {
      navigate("/login");
      return;
    }
    navigate(href);
    setIsOpen(false);
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate("/");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const isActive = (href: string) => location.pathname === href;

  return (
    <nav className="border-b">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center cursor-pointer" onClick={() => navigate("/")}>
            <Laptop className="h-8 w-8" />
            <span className="ml-2 text-xl font-semibold">CodeNinja</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <button
                key={item.name}
                onClick={() => handleNavigation(item.href, item.requiresAuth)}
                className={`nav-link font-medium inline-flex items-center ${
                  isActive(item.href) ? "text-primary" : "text-muted-foreground"
                }`}
              >
                {item.name}
                {item.requiresAuth && !user && (
                  <Lock className="ml-1 h-4 w-4 text-muted-foreground" />
                )}
              </button>
            ))}
            {user ? (
              <Button onClick={handleSignOut}>Sign Out</Button>
            ) : (
              <Button onClick={() => navigate("/login")}>Get Started</Button>
            )}
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <div className="flex flex-col space-y-4 mt-4">
                  {navigation.map((item) => (
                    <button
                      key={item.name}
                      onClick={() => handleNavigation(item.href, item.requiresAuth)}
                      className={`nav-link font-medium inline-flex items-center ${
                        isActive(item.href) ? "text-primary" : "text-muted-foreground"
                      }`}
                    >
                      {item.name}
                      {item.requiresAuth && !user && (
                        <Lock className="ml-1 h-4 w-4 text-muted-foreground" />
                      )}
                    </button>
                  ))}
                  {user ? (
                    <Button onClick={handleSignOut}>Sign Out</Button>
                  ) : (
                    <Button onClick={() => navigate("/login")}>Get Started</Button>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
