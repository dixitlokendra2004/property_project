import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Home, User, Info } from "lucide-react";

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeLink, setActiveLink] = useState(location.pathname);
  const [bgColor, setBgColor] = useState("bg-transparent");
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
        setBgColor("bg-black");
      } else {
        setIsScrolled(false);
        setBgColor(location.pathname === "/" ? "bg-transparent" : "bg-black");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [location.pathname]);

  useEffect(() => {
    setBgColor(
      location.pathname === "/" && !isScrolled ? "bg-transparent" : "bg-black"
    );
  }, [location.pathname, isScrolled]);

  return (
    <>
      {/* Desktop Navbar */}
      <nav
        style={{ fontFamily: "initial" }}
        className={`${bgColor} w-full fixed top-0 left-0 z-50 transition-colors duration-300 hidden sm:flex`}
      >
        <div className="flex justify-between items-center h-16 px-4 sm:px-8 w-full">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <Home className="h-10 w-6 text-white sm:h-14 sm:w-7" />
            <span className="text-lg sm:text-xl font-bold text-white">
              PROPERTIES
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="flex items-center space-x-8">
            {[
              { name: "Home", path: "/", icon: <Home /> },
              { name: "About Us", path: "/about", icon: <Info /> },
              { name: "Contact Us", path: "/contact", icon: <User /> },
            ].map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`${
                  activeLink === link.path
                    ? "text-purple-400 font-bold"
                    : "text-white hover:text-indigo-400"
                } transition-colors text-sm sm:text-base`}
                onClick={() => setActiveLink(link.path)}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </nav>

      {/* Bottom Navigation Bar (Visible only on small screens) */}
      <div
        className="fixed bottom-0 left-0 w-full bg-white sm:hidden flex justify-around items-center py-3 text-black border-t border-gray-300 z-50"
        style={{ fontFamily: "initial" }}
      >
        {[
          { name: "Home", path: "/", icon: <Home className="h-6 w-6" /> },
          { name: "About", path: "/about", icon: <Info className="h-6 w-6" /> },
          {
            name: "Contact",
            path: "/contact",
            icon: <User className="h-6 w-6" />,
          },
        ].map((item) => (
          <button
            key={item.path}
            onClick={() => {
              navigate(item.path);
              setActiveLink(item.path);
            }}
            className={`flex flex-col items-center ${
              activeLink === item.path
                ? "text-purple-400"
                : "text-gray-700 hover:text-indigo-400"
            } transition-colors`}
          >
            {item.icon}
            <span className="text-xs">{item.name}</span>
          </button>
        ))}
      </div>
    </>
  );
}

export default Navbar;
