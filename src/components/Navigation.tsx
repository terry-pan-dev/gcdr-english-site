import { useState, useEffect, useRef } from "react";
import { Menu, X, ChevronDown } from "lucide-react";

const logo = "/assets/logo.png";

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileOpenSubmenu, setMobileOpenSubmenu] = useState<string | null>(
    null
  );
  const [activeHash, setActiveHash] = useState("");
  const dropdownRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handlePathChange = () => {
      setActiveHash(window.location.pathname);
    };

    // Set initial pathname
    setActiveHash(window.location.pathname);

    window.addEventListener("popstate", handlePathChange);
    return () => window.removeEventListener("popstate", handlePathChange);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (openDropdown) {
        const dropdownElement = dropdownRefs.current[openDropdown];
        if (
          dropdownElement &&
          !dropdownElement.contains(event.target as Node)
        ) {
          setOpenDropdown(null);
        }
      }
    };

    if (openDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openDropdown]);

  // Navigation links configuration
  const navLinks = [
    { name: "Home", href: "/" },
    {
      name: "About",
      href: "/about",
      submenu: [
        {
          name: "GCDR",
          href: "/gcdr",
        },
        {
          name: "Our Dharma Masters",
          href: "/dharma-masters",
        },
      ],
    },
    {
      name: "Meditation",
      href: "#",
      submenu: [
        {
          name: "Chan Meditation",
          href: "/teachings",
        },
      ],
    },
    { name: "Blog", href: "/blog" },
    {
      name: "Master Hsuan Hua",
      href: "#",
      submenu: [
        {
          name: "About Master Hsuan Hua",
          href: "/master-about",
        },
        { name: "The 18 Vows", href: "/18-vows" },
        {
          name: "The Six Great Guiding Principles",
          href: "/six-principles",
        },
        {
          name: "The White Universe Poem",
          href: "/white-universe-poem",
        },
        {
          name: "Warning of the Century",
          href: "/warning-century",
        },
      ],
    },
    { name: "Visit", href: "/visit" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || isMobileMenuOpen
          ? "shadow-md backdrop-blur-md"
          : "bg-gradient-to-b from-black/50 to-transparent"
      }`}
      style={{
        backgroundColor:
          isScrolled || isMobileMenuOpen
            ? "rgba(28, 25, 23, 0.95)"
            : "transparent",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center space-x-3 transition-all duration-300">
            <a href="/" className="cursor-pointer">
              <img
                src={logo}
                alt="Gold Coast Dharma Realm"
                className="h-12 w-auto object-contain transition-all duration-300"
                style={{
                  filter: isScrolled
                    ? "brightness(1.5)"
                    : "drop-shadow(0 2px 4px rgba(0,0,0,0.8))",
                  mixBlendMode: isScrolled ? "normal" : "overlay",
                }}
              />
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => {
              const isActive =
                link.href === activeHash ||
                (link.href === "/" && activeHash === "/");
              const isSubmenuActive = link.submenu?.some(
                (sub) => sub.href === activeHash
              );
              const shouldHighlight = isActive || isSubmenuActive;

              return (
                <div key={link.name} className="relative">
                  {link.submenu ? (
                    <div
                      className="relative group"
                      ref={(el) => {
                        dropdownRefs.current[link.name] = el;
                      }}
                    >
                      <button
                        onClick={() =>
                          setOpenDropdown(
                            openDropdown === link.name ? null : link.name
                          )
                        }
                        className="flex items-center gap-1 transition-colors hover:text-amber-600"
                        style={{
                          color: shouldHighlight ? "#c9a050" : "#EBE9CF",
                        }}
                      >
                        {link.name} <ChevronDown size={16} />
                      </button>
                      {openDropdown === link.name && (
                        <div
                          className="absolute left-0 top-full mt-2 min-w-[280px] rounded-lg shadow-lg overflow-hidden"
                          style={{ backgroundColor: "#1c1917" }}
                        >
                          {link.submenu.map((sublink) => {
                            const isSubActive = sublink.href === activeHash;
                            return (
                              <a
                                key={sublink.name}
                                href={sublink.href}
                                className="block py-3 px-6 transition-all hover:pl-8"
                                style={{
                                  color: isSubActive ? "#EBE9CF" : "#c9a050",
                                  backgroundColor: isSubActive
                                    ? "rgba(201, 160, 80, 0.1)"
                                    : "transparent",
                                  borderBottom:
                                    "1px solid rgba(201, 160, 80, 0.2)",
                                }}
                                onClick={() => setOpenDropdown(null)}
                              >
                                {sublink.name}
                              </a>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  ) : (
                    <a
                      href={link.href}
                      className="transition-colors hover:text-amber-600"
                      style={{ color: isActive ? "#c9a050" : "#EBE9CF" }}
                    >
                      {link.name}
                    </a>
                  )}
                </div>
              );
            })}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            style={{
              color: "#EBE9CF",
            }}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div
            className="md:hidden pb-4 -mx-4 px-4 rounded-b-lg"
            style={{
              backdropFilter: "blur(24px)",
              WebkitBackdropFilter: "blur(24px)",
              backgroundColor: "rgba(255, 255, 255, 0.05)",
            }}
          >
            {navLinks.map((link) => {
              const isActive =
                link.href === activeHash ||
                (link.href === "/" && activeHash === "/");
              const isSubmenuActive = link.submenu?.some(
                (sub) => sub.href === activeHash
              );
              const shouldHighlight = isActive || isSubmenuActive;

              return (
                <div key={link.name}>
                  {link.submenu ? (
                    <div>
                      <button
                        className="w-full flex items-center justify-between py-2 px-2 rounded transition-all hover:bg-white/10"
                        style={{
                          color: shouldHighlight ? "#c9a050" : "#EBE9CF",
                        }}
                        onClick={() =>
                          setMobileOpenSubmenu(
                            mobileOpenSubmenu === link.name ? null : link.name
                          )
                        }
                      >
                        <span>{link.name}</span>
                        <ChevronDown
                          size={16}
                          className={`transition-transform ${
                            mobileOpenSubmenu === link.name ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                      {mobileOpenSubmenu === link.name && (
                        <div
                          className="ml-4 mt-1 rounded-lg overflow-hidden"
                          style={{
                            backdropFilter: "blur(24px)",
                            WebkitBackdropFilter: "blur(24px)",
                            backgroundColor: "rgba(255, 255, 255, 0.05)",
                          }}
                        >
                          {link.submenu.map((sublink) => {
                            const isSubActive = sublink.href === activeHash;
                            return (
                              <a
                                key={sublink.name}
                                href={sublink.href}
                                className="block py-2 px-4 rounded transition-all hover:bg-white/10"
                                style={{
                                  color: isSubActive ? "#c9a050" : "#EBE9CF",
                                  backgroundColor: isSubActive
                                    ? "rgba(201, 160, 80, 0.1)"
                                    : "transparent",
                                }}
                                onClick={() => {
                                  setIsMobileMenuOpen(false);
                                  setMobileOpenSubmenu(null);
                                }}
                              >
                                {sublink.name}
                              </a>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  ) : (
                    <a
                      href={link.href}
                      className="block py-2 px-2 rounded transition-all hover:bg-white/10"
                      style={{ color: isActive ? "#c9a050" : "#EBE9CF" }}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {link.name}
                    </a>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </nav>
  );
}
