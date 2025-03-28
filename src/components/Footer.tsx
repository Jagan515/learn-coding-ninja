
import { Laptop } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t bg-slate-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <div 
              className="flex items-center gap-2 cursor-pointer transition-all hover:scale-105 mb-4" 
              onClick={() => navigate("/")}
            >
              <div className="bg-gradient-purple text-white p-2 rounded-lg">
                <Laptop className="h-6 w-6" />
              </div>
              <span className="text-xl font-bold gradient-text">CodeNinja</span>
            </div>
            <p className="text-muted-foreground">
              Your path to becoming a programming master starts here.
            </p>
          </div>
          
          <div>
            <h3 className="font-medium text-lg mb-4">Learn</h3>
            <ul className="space-y-2">
              {["Python", "JavaScript", "Java", "C++", "Data Structures"].map((item) => (
                <li key={item}>
                  <a href="#" className="text-muted-foreground hover:text-foreground">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium text-lg mb-4">Company</h3>
            <ul className="space-y-2">
              {["About Us", "Careers", "Blog", "Contact", "Press"].map((item) => (
                <li key={item}>
                  <a href="#" className="text-muted-foreground hover:text-foreground">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium text-lg mb-4">Legal</h3>
            <ul className="space-y-2">
              {["Terms", "Privacy", "Cookies", "Licenses", "Settings"].map((item) => (
                <li key={item}>
                  <a href="#" className="text-muted-foreground hover:text-foreground">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="border-t mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground text-sm">
            © {year} CodeNinja. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {["Twitter", "GitHub", "YouTube", "Discord"].map((social) => (
              <a 
                key={social} 
                href="#" 
                className="text-muted-foreground hover:text-foreground text-sm"
              >
                {social}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
