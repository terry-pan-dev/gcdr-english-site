const logo = "/assets/logo.png";

type FooterLink = {
  href: string;
  label: string;
  external?: boolean;
};

export function Footer() {
  const footerLinks: FooterLink[] = [
    { href: "/", label: "Home" },
    //{ href: "/about", label: "About" },
    //{ href: "/teachings", label: "Chan Meditation" },
    //{ href: "/visit", label: "Visit" },
    { href: "https://gcdrchinese.com", label: "Chinese Site" },
  ];

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
              A Mahayana Buddhist monastery in the Gold Coast hinterland, affiliated with the Dharma
              Realm Buddhist Association (founded by the Venerable Master Hsuan Hua).
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4" style={{ color: "var(--color-dark-text)" }}>
              Links
            </h3>
            <ul className="space-y-2" style={{ color: "var(--color-dark-text)", opacity: 0.85 }}>
              {footerLinks.map(({ href, label, external }) => (
                <li key={href}>
                  <a
                    href={href}
                    className="footer-link transition-colors duration-0.01"
                    {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="mb-4" style={{ color: "var(--color-dark-text)" }}>
              Contact
            </h3>
            <p style={{ color: "var(--color-dark-text)", opacity: 0.85 }} className="mb-2">
              Phone: +61 (07) 5522-8788
            </p>
            <p style={{ color: "var(--color-dark-text)", opacity: 0.85 }} className="mb-4">
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
