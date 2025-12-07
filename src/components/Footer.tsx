const logo = "/assets/logo.png";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-stone-900 py-12" style={{ color: "#EBE9CF" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* About */}
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <a href="/">
                <img
                  src={logo}
                  alt="Gold Coast Dharma Realm"
                  className="h-12 w-auto object-contain"
                />
              </a>
            </div>
            <p style={{ color: "#EBE9CF", opacity: 0.7 }}>
              A sanctuary of peace, wisdom, and spiritual awakening for all who
              seek the path to enlightenment.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4">Quick Links</h3>
            <ul
              className="space-y-2"
              style={{ color: "#EBE9CF", opacity: 0.7 }}
            >
              <li>
                <a href="/" className="hover:text-amber-400 transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a
                  href="/about"
                  className="hover:text-amber-400 transition-colors"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="/teachings"
                  className="hover:text-amber-400 transition-colors"
                >
                  Chan Meditation
                </a>
              </li>
              <li>
                <a
                  href="/visit"
                  className="hover:text-amber-400 transition-colors"
                >
                  Visit
                </a>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="mb-4">Connect</h3>
            <p style={{ color: "#EBE9CF", opacity: 0.7 }} className="mb-2">
              Phone: +61 (07) 5522-8788
            </p>
            <p style={{ color: "#EBE9CF", opacity: 0.7 }} className="mb-4">
              Email: gcdr.australia@gmail.com
            </p>
            <p style={{ color: "#EBE9CF", opacity: 0.7 }}>
              106 Bonogin Road
              <br />
              Bonogin, Queensland
              <br />
              4213 Australia
            </p>
          </div>
        </div>

        <div
          className="border-t border-white/10 pt-8 text-center"
          style={{ color: "#EBE9CF", opacity: 0.6 }}
        >
          <p>© {currentYear} Gold Coast Dharma Realm. All rights reserved.</p>
          <p className="mt-2 text-sm">
            May all beings be happy. May all beings be free from suffering.
          </p>
        </div>
      </div>
    </footer>
  );
}
