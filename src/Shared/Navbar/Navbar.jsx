import React, { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import useAuth from "../../Hooks/useAuth";
import { resumeAPI } from "../../utils/api";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [resumeLink, setResumeLink] = useState("");
  const location = useLocation();
  const { user } = useAuth();

  // Fetch resume link
  useEffect(() => {
    const fetchResumeLink = async () => {
      try {
        const response = await resumeAPI.get("/");
        console.log("Resume API response:", response.data);

        // ধরে নিচ্ছি তোমার backend response এরকম:
        // { success: true, data: { link: "https://..." } }
        if (response.data?.success && response.data?.data?.link) {
          setResumeLink(response.data.data.link);
        } else {
          setResumeLink(
            "https://drive.google.com/file/d/1U7a114FAAzKGMwtNmvyGizdHo7lK-szo/view?usp=drivesdk"
          );
        }
      } catch (error) {
        console.error("Error fetching resume link:", error);
        setResumeLink(
          "https://drive.google.com/file/d/1U7a114FAAzKGMwtNmvyGizdHo7lK-szo/view?usp=drivesdk"
        );
      }
    };

    fetchResumeLink();
  }, []);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Education", path: "/education" },
    { name: "Contact", path: "/contact" },
    { name: "Projects", path: "/projects" },
    { name: "Dashboard", path: "/dashboard", protected: true },
  ];

  // Only show protected routes if user has access
  const hasAccess =
    user && user.email === "shakilahamed.s2000@gmail.com";

  return (
    <nav className="shadow-lg sticky top-0 z-50 backdrop-blur-sm bg-opacity-95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left side - Brand */}
          <div className="flex-shrink-0">
            <NavLink
              to="/"
              className="text-2xl font-bold text-transparent bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text hover:from-cyan-300 hover:to-blue-400 transition-all duration-300"
            >
              Shakil Ahamed
            </NavLink>
          </div>

          {/* Center - Desktop Nav */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-6">
              {navItems.map((item) => {
                if (item.protected && !hasAccess) return null;
                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    className={({ isActive }) =>
                      `px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                        isActive
                          ? "bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg"
                          : "text-gray-300 hover:text-white hover:bg-slate-800 hover:shadow-md"
                      }`
                    }
                  >
                    {item.name}
                  </NavLink>
                );
              })}
            </div>
          </div>

          {/* Resume button - Desktop */}
          <div className="hidden md:flex items-center">
            {resumeLink && (
              <a
                href={resumeLink}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-400 text-white font-semibold shadow-lg hover:from-cyan-400 hover:to-blue-500 transition-all duration-300 text-sm"
              >
                Resume
              </a>
            )}
          </div>

          {/* Mobile menu toggle */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-lg text-gray-300 hover:text-white hover:bg-slate-800 transition-all duration-300"
            >
              {isMenuOpen ? (
                <HiX className="h-6 w-6" />
              ) : (
                <HiMenuAlt3 className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden transition-all duration-300 ease-in-out ${
          isMenuOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0 overflow-hidden"
        }`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 border border-t border-slate-700">
          {navItems.map((item) => {
            if (item.protected && !hasAccess) return null;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setIsMenuOpen(false)}
                className={({ isActive }) =>
                  `block px-4 py-3 rounded-lg text-base font-medium transition-all duration-300 ${
                    isActive
                      ? "bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg"
                      : "text-gray-300 hover:text-white hover:bg-slate-700"
                  }`
                }
              >
                {item.name}
              </NavLink>
            );
          })}

          {/* Resume Button - Mobile */}
          {resumeLink && (
            <div className="px-4 py-3 border-t border-slate-600">
              <a
                href={resumeLink}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center px-5 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-400 text-white font-semibold shadow-lg hover:from-cyan-400 hover:to-blue-500 transition-all duration-300 text-base"
              >
                Resume
              </a>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
