import type { ReactNode } from "react";

const logo = "/assets/logo.png";

type FooterLink = {
  href: string;
  label: string;
  labelZh?: string;
  external?: boolean;
};

const footerLinks: FooterLink[] = [
  { href: "/", label: "Home" },
  //{ href: "/about", label: "About" },
  //{ href: "/teachings", label: "Chan Meditation" },
  //{ href: "/visit", label: "Visit" },
  {
    href: "https://gcdrchinese.com",
    label: "Chinese Site",
    labelZh: "中文網站",
    external: true,
  },
];

type SocialLink = {
  href: string;
  label: string;
  icon: ReactNode;
};

const svgProps = {
  xmlns: "http://www.w3.org/2000/svg",
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

const socialLinks: SocialLink[] = [
  {
    href: "https://www.facebook.com/GCDharmaRealm/",
    label: "Facebook",
    icon: (
      <svg {...svgProps}>
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
  },
  {
    href: "https://www.instagram.com/goldcoastdharmarealm/",
    label: "Instagram",
    icon: (
      <svg {...svgProps}>
        <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
      </svg>
    ),
  },
  {
    href: "https://www.youtube.com/@goldcoastdharmarealm106",
    label: "YouTube",
    icon: (
      <svg {...svgProps}>
        <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
        <path d="m10 15 5-3-5-3z" />
      </svg>
    ),
  },
];

export function Footer() {
  return (
    <footer
      className="ink-texture py-12"
      style={{
        backgroundColor: "var(--color-dark-bg)",
        color: "var(--color-dark-text)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* About */}
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <a href="/" className="cursor-pointer">
                <img
                  src={logo}
                  alt="Gold Coast Dharma Realm"
                  className="h-12 w-auto object-contain"
                />
              </a>
            </div>
            <p style={{ color: "var(--color-dark-text)", opacity: 0.85 }}>
              A Mahayana Buddhist monastery in the Gold Coast hinterland,
              affiliated with the Dharma Realm Buddhist Association (founded by
              the Venerable Master Hsuan Hua).
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4" style={{ color: "var(--color-dark-text)" }}>
              Links
            </h3>
            <ul
              className="space-y-2"
              style={{ color: "var(--color-dark-text)", opacity: 0.85 }}
            >
              {footerLinks.map(({ href, label, labelZh, external }) => (
                <li key={href}>
                  <a
                    href={href}
                    className="footer-link transition-colors duration-150"
                    {...(external
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                  >
                    {label}
                    {labelZh && (
                      <span lang="zh-Hant" className="ml-2 opacity-80">
                        {labelZh}
                      </span>
                    )}
                  </a>
                </li>
              ))}
            </ul>

            {/* Social */}
            <div
              className="mt-6 flex items-center gap-6"
              style={{
                color:
                  "color-mix(in srgb, var(--color-dark-text) 85%, transparent)",
              }}
            >
              {socialLinks.map(({ href, label, icon }) => (
                <a
                  key={href}
                  href={href}
                  aria-label={label}
                  title={label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-link transition-colors duration-200"
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Connect */}
          <div>
            <h3 className="mb-4" style={{ color: "var(--color-dark-text)" }}>
              Contact
            </h3>
            <p
              style={{ color: "var(--color-dark-text)", opacity: 0.85 }}
              className="mb-2"
            >
              Phone: +61 (07) 5522-8788
            </p>
            <p
              style={{ color: "var(--color-dark-text)", opacity: 0.85 }}
              className="mb-4"
            >
              Email: gcdr.australia@gmail.com
            </p>
            <p style={{ color: "var(--color-dark-text)", opacity: 0.85 }}>
              106 Bonogin Road
              <br />
              Bonogin, Queensland
              <br />
              4213 Australia
            </p>
          </div>
        </div>

        <div
          className="border-t pt-8 text-center"
          style={{
            borderColor: "var(--color-footer-border)",
            color: "var(--color-dark-text)",
            opacity: 0.75,
          }}
        >
          <p className="mt-2 text-sm">May all beings be free from suffering</p>
          <p className="mt-2 text-sm">May all beings be happy</p>
        </div>
      </div>
    </footer>
  );
}
