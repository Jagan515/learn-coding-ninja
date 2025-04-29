
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
  
  // Use try-catch to handle cases where the component is rendered outside Router context
  let navigate;
  let location;
  try {
    navigate = useNavigate();
    location = useLocation();
  } catch (error) {
    console.error("Router context not available:", error);
    // Provide fallback values
    navigate = (path) => { window.location.href = path; };
    location = { pathname: window.location.pathname };
  }

  const publicNavigation: NavigationItem[] = [
    { name: "Home", href: "/" },
    { name: "Courses", href: "/courses" },
  ];

  const protectedNavigation: NavigationItem[] = [
    { name: "Terminal", href: "/terminal", requiresAuth: true },
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
    <nav className="border-b bg-white/80 backdrop-blur-md sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div 
            className="flex items-center gap-2 cursor-pointer transition-all hover:scale-105" 
            onClick={() => navigate("/")}
          >
            <div className="bg-gradient-to-r from-primary to-accent p-2 rounded-lg shadow-md">
              <Laptop className="h-6 w-6 text-white" />
            </div>
            <span className="ml-2 text-xl font-bold gradient-text">CodeNinja</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <button
                key={item.name}
                onClick={() => handleNavigation(item.href, item.requiresAuth)}
                className={`nav-link font-medium inline-flex items-center px-3 py-1.5 rounded-md transition-all ${
                  isActive(item.href) 
                    ? "text-primary relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-primary after:rounded-full bg-primary/5" 
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/40"
                }`}
              >
                {item.name}
                {item.requiresAuth && !user && (
                  <Lock className="ml-1 h-3.5 w-3.5 text-muted-foreground" />
                )}
              </button>
            ))}
            {user ? (
              <Button 
                onClick={handleSignOut} 
                className="bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity shadow-sm"
              >
                Sign Out
              </Button>
            ) : (
              <Button 
                onClick={() => navigate("/login")} 
                className="bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity shadow-sm"
              >
                Get Started
              </Button>
            )}
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="focus:ring-2 focus:ring-primary/20">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent className="glass-card">
                <div className="flex flex-col space-y-6 mt-8">
                  {navigation.map((item) => (
                    <button
                      key={item.name}
                      onClick={() => handleNavigation(item.href, item.requiresAuth)}
                      className={`nav-link font-medium inline-flex items-center text-lg p-2 rounded-md transition-all ${
                        isActive(item.href) 
                          ? "text-primary bg-primary/5 border-l-4 border-primary pl-4" 
                          : "text-muted-foreground hover:bg-muted/20"
                      }`}
                    >
                      {item.name}
                      {item.requiresAuth && !user && (
                        <Lock className="ml-1 h-4 w-4 text-muted-foreground" />
                      )}
                    </button>
                  ))}
                  <div className="pt-4 border-t border-border/40">
                    {user ? (
                      <Button
                        onClick={handleSignOut}
                        className="bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity w-full shadow-sm"
                      >
                        Sign Out
                      </Button>
                    ) : (
                      <Button
                        onClick={() => navigate("/login")}
                        className="bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity w-full shadow-sm"
                      >
                        Get Started
                      </Button>
                    )}
                  </div>
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
