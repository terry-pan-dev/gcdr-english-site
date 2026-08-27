import { useState, useEffect, useRef } from "react";
import { Menu, X, ChevronDown, ChevronRight, Globe } from "lucide-react";

const logo = "/assets/logo.png";

type NavLeaf = {
  name: string;
  href: string;
};

type NavGroup = {
  name: string;
  submenu: NavLeaf[];
};

type NavSubLink = NavLeaf | NavGroup;

type NavLink =
  | {
      name: string;
      href: string;
      submenu?: never;
    }
  | {
      name: string;
      href?: never;
      submenu: NavSubLink[];
    };

type NestedDropdownDirection = "left" | "right";

function normalizePathname(pathname: string) {
  if (!pathname || pathname === "/") {
    return "/";
  }
  return pathname.replace(/\/+$/, "");
}

function hasHref(item: NavSubLink): item is NavLeaf {
  return "href" in item;
}

function isSubLinkActive(item: NavSubLink, activeHash: string) {
  if (hasHref(item)) {
    return item.href === activeHash;
  }

  return item.submenu.some((child) => child.href === activeHash);
}

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const langRef = useRef<HTMLDivElement | null>(null);
  const [mobileOpenSubmenu, setMobileOpenSubmenu] = useState<string | null>(
    null,
  );
  const [mobileOpenNestedSubmenu, setMobileOpenNestedSubmenu] = useState<
    string | null
  >(null);
  const [openNestedDropdown, setOpenNestedDropdown] = useState<string | null>(
    null,
  );
  const [nestedDropdownDirections, setNestedDropdownDirections] = useState<
    Record<string, NestedDropdownDirection>
  >({});
  const dropdownRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const mobileMenuRef = useRef<HTMLDivElement | null>(null);
  const navRef = useRef<HTMLElement | null>(null);
  const [activeHash, setActiveHash] = useState("");
  const [isMounted, setIsMounted] = useState(false);
  const nestedCloseTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(
    null,
  );

  const clearNestedCloseTimeout = () => {
    if (nestedCloseTimeoutRef.current) {
      clearTimeout(nestedCloseTimeoutRef.current);
      nestedCloseTimeoutRef.current = null;
    }
  };

  const scheduleNestedClose = () => {
    clearNestedCloseTimeout();
    nestedCloseTimeoutRef.current = setTimeout(() => {
      setOpenNestedDropdown(null);
    }, 200);
  };

  useEffect(() => clearNestedCloseTimeout, []);

  const openNestedMenu = (nestedKey: string, triggerElement: HTMLElement) => {
    clearNestedCloseTimeout();
    const submenuWidth = 240;
    const viewportPadding = 16;
    const triggerRect = triggerElement.getBoundingClientRect();
    const direction =
      triggerRect.right + submenuWidth + viewportPadding > window.innerWidth
        ? "left"
        : "right";

    setNestedDropdownDirections((current) => ({
      ...current,
      [nestedKey]: direction,
    }));
    setOpenNestedDropdown(nestedKey);
  };

  useEffect(() => {
    setIsMounted(true);
    setActiveHash(normalizePathname(window.location.pathname));

    const handleNav = () =>
      setActiveHash(normalizePathname(window.location.pathname));
    document.addEventListener("astro:page-load", handleNav);
    return () => document.removeEventListener("astro:page-load", handleNav);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (openDropdown) {
        const dropdownElement = dropdownRefs.current[openDropdown];
        if (
          dropdownElement &&
          !dropdownElement.contains(event.target as Node)
        ) {
          setOpenDropdown(null);
          setOpenNestedDropdown(null);
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

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      if (openNestedDropdown) {
        clearNestedCloseTimeout();
        setOpenNestedDropdown(null);
        return;
      }
      if (openDropdown) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [openDropdown, openNestedDropdown]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (isMobileMenuOpen && navRef.current) {
        const target = event.target as Node;
        if (!navRef.current.contains(target)) {
          setIsMobileMenuOpen(false);
          setMobileOpenSubmenu(null);
          setMobileOpenNestedSubmenu(null);
        }
      }
    };
    if (isMobileMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("touchstart", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(event.target as Node)) {
        setIsLangOpen(false);
      }
    };
    if (isLangOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isLangOpen]);

  const navLinks: NavLink[] = [
    { name: "Visit", href: "/visit" },
    {
      name: "Events",
      submenu: [
        { name: "Events & Activities", href: "/events" },
        { name: "Noticeboard", href: "/noticeboard" },
        { name: "Yoga & Meditation", href: "/yoga" },
      ],
    },
    {
      name: "About",
      submenu: [
        { name: "GCDR", href: "/about" },
        { name: "Our Teachers", href: "/dharma-masters" },
        { name: "Volunteering", href: "/volunteering" },
      ],
    },
    {
      name: "Teachings",
      submenu: [
        //{ name: "Introduction to Buddhism", submenu: [] },
        //{ name: "Meditation", submenu: [] },
        {
          name: "Shurangama",
          submenu: [
            { name: "Shurangama Sutra", href: "/shurangama-sutra" },
            { name: "Shurangama Mantra", href: "/shurangama-mantra" },
            { name: "Talks on the Shurangama", href: "/shurangama-talks" },
          ],
        },
        { name: "Resources", href: "/resources" },
      ],
    },
    {
      name: "Founder & Lineage",
      submenu: [
        { name: "About Master Hsuan Hua", href: "/master-hua" },
        { name: "Master Hua's Vows", href: "/18-vows" },
        { name: "Master Hua's Core Teachings", href: "/six-principles" },
        { name: "The White Universe Poem", href: "/white-universe-poem" },
        //{ name: "Warning of the Century", href: "/warning-century" },
        { name: "Master Hua's Talks", href: "/master-hua-talks" },
      ],
    },
  ];

  const forceSolidNav = true;

  return (
    <nav
      ref={navRef}
      //className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${ //Sticky nav bar
      className={`ink-texture relative top-0 left-0 right-0 z-50 transition-all duration-300 ${
        //Regular nav bar
        forceSolidNav || isScrolled || isMobileMenuOpen
          ? "shadow-md"
          : "bg-gradient-to-b from-black/50 to-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-20">
          {/* ── Logo ── */}
          <a href="/" className="flex items-center h-full px-2 shrink-0">
            <img
              src={logo}
              alt="Gold Coast Dharma Realm"
              className="h-12 w-auto object-contain transition-all duration-300"
              style={{
                filter:
                  forceSolidNav || isScrolled
                    ? "brightness(1.5)"
                    : "drop-shadow(0 2px 4px rgba(0,0,0,0.8))",
                mixBlendMode:
                  forceSolidNav || isScrolled ? "normal" : "overlay",
              }}
            />
          </a>

          {/* ── Spacer — flex-1 eats all leftover space, pushing links right ── */}
          <div className="hidden min-[800px]:block flex-[1]" />

          {/* ── Spacer — flex-1 eats all leftover space, pushing links right ── */}
          <div className="hidden min-[800px]:block flex-[1]" />

          {/* ── Nav links ── */}
          <div className="hidden min-[800px]:flex items-center gap-6 shrink-0">
            {navLinks.map((link) => {
              const isActive =
                link.href === activeHash ||
                (link.href === "/" && activeHash === "/");
              const isSubmenuActive = link.submenu?.some((sub) =>
                isSubLinkActive(sub, activeHash),
              );
              const shouldHighlight =
                isMounted && (isActive || isSubmenuActive);

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
                        onClick={() => {
                          setOpenDropdown(
                            openDropdown === link.name ? null : link.name,
                          );
                          setOpenNestedDropdown(null);
                        }}
                        className="flex items-center gap-1 nav-link transition-colors"
                        style={{
                          color: shouldHighlight
                            ? "var(--color-accent-on-dark)"
                            : "var(--color-dark-text)",
                        }}
                      >
                        {link.name} <ChevronDown size={16} />
                      </button>
                      {openDropdown === link.name && (
                        <div
                          className="ink-texture-panel absolute left-0 top-full mt-2 min-w-[280px] rounded-lg shadow-lg overflow-visible"
                          style={{ backgroundColor: "var(--color-dark-card)" }}
                        >
                          {link.submenu.map((sublink) => {
                            const isSubActive =
                              isMounted && isSubLinkActive(sublink, activeHash);

                            if (!hasHref(sublink)) {
                              const nestedKey = `${link.name}:${sublink.name}`;
                              const nestedDirection =
                                nestedDropdownDirections[nestedKey] ?? "right";

                              return (
                                <div
                                  key={sublink.name}
                                  className="relative"
                                  onMouseEnter={(event) =>
                                    openNestedMenu(
                                      nestedKey,
                                      event.currentTarget,
                                    )
                                  }
                                  onMouseLeave={scheduleNestedClose}
                                >
                                  <button
                                    type="button"
                                    className="dropdown-link flex w-full items-center justify-between gap-4 py-3 px-6 text-left"
                                    style={{
                                      color: isSubActive
                                        ? "var(--color-accent-on-dark)"
                                        : undefined,
                                      backgroundColor: isSubActive
                                        ? "var(--color-accent-gold-10)"
                                        : "transparent",
                                      borderBottom:
                                        "1px solid var(--color-accent-gold-20)",
                                    }}
                                    onClick={(event) =>
                                      openNestedDropdown === nestedKey
                                        ? setOpenNestedDropdown(null)
                                        : openNestedMenu(
                                            nestedKey,
                                            event.currentTarget.parentElement ??
                                              event.currentTarget,
                                          )
                                    }
                                    aria-expanded={
                                      openNestedDropdown === nestedKey
                                    }
                                  >
                                    <span>{sublink.name}</span>
                                    <ChevronRight
                                      size={15}
                                      className={
                                        nestedDirection === "left"
                                          ? "rotate-180"
                                          : undefined
                                      }
                                    />
                                  </button>
                                  {openNestedDropdown === nestedKey &&
                                    sublink.submenu.length > 0 && (
                                      <div
                                        className={`ink-texture-panel absolute top-0 min-w-[240px] rounded-lg shadow-lg overflow-hidden ${
                                          nestedDirection === "left"
                                            ? "right-full"
                                            : "left-full"
                                        }`}
                                        style={{
                                          backgroundColor:
                                            "var(--color-dark-card)",
                                        }}
                                        onMouseEnter={clearNestedCloseTimeout}
                                        onMouseLeave={scheduleNestedClose}
                                      >
                                        {sublink.submenu.map((nestedLink) => {
                                          const isNestedActive =
                                            isMounted &&
                                            nestedLink.href === activeHash;

                                          return (
                                            <a
                                              key={nestedLink.name}
                                              href={nestedLink.href}
                                              className="dropdown-link block py-3 px-6"
                                              style={{
                                                color: isNestedActive
                                                  ? "var(--color-accent-on-dark)"
                                                  : undefined,
                                                backgroundColor: isNestedActive
                                                  ? "var(--color-accent-gold-10)"
                                                  : "transparent",
                                                borderBottom:
                                                  "1px solid var(--color-accent-gold-20)",
                                              }}
                                              onClick={() => {
                                                setOpenDropdown(null);
                                                setOpenNestedDropdown(null);
                                              }}
                                            >
                                              {nestedLink.name}
                                            </a>
                                          );
                                        })}
                                      </div>
                                    )}
                                </div>
                              );
                            }

                            return (
                              <a
                                key={sublink.name}
                                href={sublink.href}
                                className="dropdown-link block py-3 px-6"
                                style={{
                                  color: isSubActive
                                    ? "var(--color-accent-on-dark)"
                                    : undefined,
                                  backgroundColor: isSubActive
                                    ? "var(--color-accent-gold-10)"
                                    : "transparent",
                                  borderBottom:
                                    "1px solid var(--color-accent-gold-20)",
                                }}
                                onClick={() => {
                                  setOpenDropdown(null);
                                  setOpenNestedDropdown(null);
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
                      className="nav-link transition-colors"
                      style={{
                        color: isActive
                          ? "var(--color-accent-on-dark)"
                          : "var(--color-dark-text)",
                      }}
                    >
                      {link.name}
                    </a>
                  )}
                </div>
              );
            })}
          </div>

          {/* ── Spacer — flex-1 eats all leftover space, pushing links right ── */}
          <div className="hidden min-[800px]:block flex-[1]" />

          {/* ── Globe ── */}
          <div
            className="hidden min-[800px]:block relative shrink-0"
            ref={langRef}
          >
            <button
              onClick={() => setIsLangOpen(!isLangOpen)}
              className="flex items-center gap-1.5 nav-link transition-colors"
              style={{ color: "var(--color-dark-text)" }}
            >
              <Globe size={17} />
              <ChevronDown size={14} />
            </button>
            {isLangOpen && (
              <div
                className="ink-texture-panel absolute right-0 top-full mt-2 w-28 rounded-lg shadow-lg overflow-hidden"
                style={{ backgroundColor: "var(--color-dark-card)" }}
              >
                <button
                  className="w-full flex items-center gap-2 py-3 px-4 text-left"
                  style={{
                    color: "var(--color-accent-on-dark)",
                    borderBottom: "1px solid var(--color-accent-gold-20)",
                    cursor: "default",
                  }}
                >
                  English
                </button>
                <a
                  href="https://gcdrchinese.com"
                  className="dropdown-link flex items-center gap-2 py-3 px-4"
                  onClick={() => setIsLangOpen(false)}
                  style={{ color: "var(--color-dark-text)" }}
                >
                  中文
                </a>
              </div>
            )}
          </div>

          {/* ── Mobile menu button — visible below 800px ── */}
          <div className="min-[800px]:hidden flex flex-1 justify-end">
            <button
              style={{ color: "var(--color-dark-text)" }}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* ── Mobile Menu ── */}
        {isMobileMenuOpen && (
          <div
            ref={mobileMenuRef}
            className="ink-texture-panel min-[800px]:hidden pb-4 -mx-4 px-4 rounded-b-lg"
            style={{
              backdropFilter: "blur(24px)",
              WebkitBackdropFilter: "blur(24px)",
              backgroundColor: "var(--color-nav-overlay)",
            }}
          >
            {navLinks.map((link) => {
              const isActive =
                link.href === activeHash ||
                (link.href === "/" && activeHash === "/");
              const isSubmenuActive = link.submenu?.some((sub) =>
                isSubLinkActive(sub, activeHash),
              );
              const shouldHighlight =
                isMounted && (isActive || isSubmenuActive);

              return (
                <div key={link.name}>
                  {link.submenu ? (
                    <div>
                      <button
                        className="w-full flex items-center justify-between py-2 px-2 rounded transition-all hover:bg-white/10"
                        style={{
                          color: shouldHighlight
                            ? "var(--color-accent-on-dark)"
                            : "var(--color-dark-text)",
                        }}
                        onClick={() => {
                          setMobileOpenSubmenu(
                            mobileOpenSubmenu === link.name ? null : link.name,
                          );
                          setMobileOpenNestedSubmenu(null);
                        }}
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
                            backgroundColor: "var(--color-nav-overlay)",
                          }}
                        >
                          {link.submenu.map((sublink) => {
                            const isSubActive =
                              isMounted && isSubLinkActive(sublink, activeHash);

                            if (!hasHref(sublink)) {
                              const nestedKey = `${link.name}:${sublink.name}`;

                              return (
                                <div key={sublink.name}>
                                  <button
                                    type="button"
                                    className="w-full flex items-center justify-between py-2 px-4 rounded transition-all hover:bg-white/10"
                                    style={{
                                      color: isSubActive
                                        ? "var(--color-accent-on-dark)"
                                        : "var(--color-dark-text)",
                                      backgroundColor: isSubActive
                                        ? "var(--color-accent-gold-10)"
                                        : "transparent",
                                    }}
                                    onClick={() =>
                                      setMobileOpenNestedSubmenu(
                                        mobileOpenNestedSubmenu === nestedKey
                                          ? null
                                          : nestedKey,
                                      )
                                    }
                                    aria-expanded={
                                      mobileOpenNestedSubmenu === nestedKey
                                    }
                                  >
                                    <span>{sublink.name}</span>
                                    <ChevronDown
                                      size={15}
                                      className={`transition-transform ${
                                        mobileOpenNestedSubmenu === nestedKey
                                          ? "rotate-180"
                                          : ""
                                      }`}
                                    />
                                  </button>
                                  {mobileOpenNestedSubmenu === nestedKey &&
                                    sublink.submenu.length > 0 && (
                                      <div className="ml-4">
                                        {sublink.submenu.map((nestedLink) => {
                                          const isNestedActive =
                                            isMounted &&
                                            nestedLink.href === activeHash;

                                          return (
                                            <a
                                              key={nestedLink.name}
                                              href={nestedLink.href}
                                              className="block py-2 px-4 rounded transition-all hover:bg-white/10"
                                              style={{
                                                color: isNestedActive
                                                  ? "var(--color-accent-on-dark)"
                                                  : "var(--color-dark-text)",
                                                backgroundColor: isNestedActive
                                                  ? "var(--color-accent-gold-10)"
                                                  : "transparent",
                                              }}
                                              onClick={() => {
                                                setIsMobileMenuOpen(false);
                                                setMobileOpenSubmenu(null);
                                                setMobileOpenNestedSubmenu(
                                                  null,
                                                );
                                              }}
                                            >
                                              {nestedLink.name}
                                            </a>
                                          );
                                        })}
                                      </div>
                                    )}
                                </div>
                              );
                            }

                            return (
                              <a
                                key={sublink.name}
                                href={sublink.href}
                                className="block py-2 px-4 rounded transition-all hover:bg-white/10"
                                style={{
                                  color: isSubActive
                                    ? "var(--color-accent-on-dark)"
                                    : "var(--color-dark-text)",
                                  backgroundColor: isSubActive
                                    ? "var(--color-accent-gold-10)"
                                    : "transparent",
                                }}
                                onClick={() => {
                                  setIsMobileMenuOpen(false);
                                  setMobileOpenSubmenu(null);
                                  setMobileOpenNestedSubmenu(null);
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
                      style={{
                        color: isActive
                          ? "var(--color-accent-on-dark)"
                          : "var(--color-dark-text)",
                      }}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {link.name}
                    </a>
                  )}
                </div>
              );
            })}

            {/* Language Switcher - Mobile */}
            <div
              className="mt-2 pt-2 flex items-center gap-3"
              style={{ borderTop: "1px solid var(--color-accent-gold-20)" }}
            >
              <Globe
                size={15}
                style={{ color: "var(--color-dark-text)", opacity: 0.7 }}
              />
              <span
                style={{
                  color: "var(--color-accent-on-dark)",
                  fontSize: "0.875rem",
                }}
              >
                English
              </span>
              <span style={{ color: "var(--color-dark-text)", opacity: 0.3 }}>
                |
              </span>
              <a
                href="https://gcdrchinese.com"
                style={{
                  color: "var(--color-dark-text)",
                  opacity: 0.7,
                  fontSize: "0.875rem",
                }}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                中文
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
