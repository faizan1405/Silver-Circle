import { Link } from "@tanstack/react-router";
import logo from "@/assets/logo.png.asset.json";
import { SITE, whatsappUrl, DEFAULT_ENQUIRY } from "@/lib/site";

export function Footer() {
  return (
    <footer className="bg-navy-deep text-white/85">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 lg:grid-cols-4 lg:px-8">
        <div className="lg:col-span-2">
          <div className="hover-glow inline-flex rounded-3xl bg-white/95 p-4">
            <img src={logo.url} alt="Silver Circle Travel" width={200} height={200} loading="lazy" className="h-24 w-auto object-contain" />
          </div>
          <p className="mt-6 max-w-md font-display text-2xl text-white">{SITE.tagline}</p>
          <p className="mt-3 max-w-md text-white/70">
            Curated international journeys designed around the comfort, pace and peace of mind of
            travellers 60+ and their families.
          </p>
        </div>

        <div>
          <h3 className="text-xl text-white">Explore</h3>
          <ul className="mt-4 space-y-3">
            {[
              { to: "/", label: "Home" },
              { to: "/destinations", label: "Destinations" },
              { to: "/about", label: "About Us" },
              { to: "/contact", label: "Contact Us" },
            ].map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="inline-block text-white/75 transition-all duration-500 hover:translate-x-1 hover:text-gold">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-xl text-white">Reach Us</h3>
          <ul className="mt-4 space-y-3 text-white/75">
            <li>
              <a href={`tel:${SITE.phone}`} className="inline-block transition-all duration-500 hover:translate-x-1 hover:text-gold">
                {SITE.phoneDisplay}
              </a>
            </li>
            <li>
              <a href={`mailto:${SITE.email}`} className="inline-block transition-all duration-500 hover:translate-x-1 hover:text-gold">
                {SITE.email}
              </a>
            </li>
            <li>
              <a
                href={whatsappUrl(DEFAULT_ENQUIRY)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block transition-all duration-500 hover:translate-x-1 hover:text-gold"
              >
                WhatsApp us
              </a>
            </li>
            <li className="pt-2 leading-relaxed">{SITE.address}</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-5 py-6 text-sm text-white/55 sm:flex-row sm:items-center sm:justify-between lg:px-8">
          <p>© {new Date().getFullYear()} Silver Circle Travel. All rights reserved.</p>
          <p>Gurugram, India</p>
        </div>
      </div>
    </footer>
  );
}
