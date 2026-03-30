import Image from "next/image";
import { FilledButtonLink, OutlinedButtonLink } from "./ButtonLink";
import MobileNav from "./MobileNav";
import type { NavLink } from "./Data";

type SiteHeaderProps = {
  navLinks: NavLink[];
  instagramHref: string;
};

export default function SiteHeader({
  navLinks,
  instagramHref,
}: SiteHeaderProps) {
  return (
    <header className="salsa-header sticky top-0 z-20 border-b border-white/10 backdrop-blur">
      <div className="flex justify-center items-center gap-4 px-4 py-3">
        <Image src="/salsa-liverpool-logo.svg" width={120} height={120} alt="Salsa Liverpool" />
      </div>
      <div className="mx-auto grid max-w-6xl grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-4 py-3 lg:grid-cols-3">
        <div className="flex items-center gap-3 lg:justify-self-start">
          
          <div className="leading-tight">
            <div className="font-semibold">Salsa Liverpool</div>
            <div className="text-sm text-white/80">Cuban Salsa • Rueda de Casino • Liverpool</div>
          </div>
        </div>

        <nav className="hidden items-center justify-center gap-4 text-sm text-white/90 lg:flex">
          {navLinks.map((link) => (
            <a key={link.href} className="hover:text-white" href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:col-start-3 lg:flex lg:justify-self-end">
          <OutlinedButtonLink href={instagramHref} className="rounded-full px-3 py-2 text-sm">
            Instagram
          </OutlinedButtonLink>
          <FilledButtonLink href="/feedback" className="rounded-full px-4 py-2 text-sm">
            Feedback
          </FilledButtonLink>
        </div>

        <div className="col-start-2 flex items-center gap-2 justify-self-end lg:hidden">
          <FilledButtonLink href="/feedback" className="rounded-full px-4 py-2 text-sm">
            Feedback
          </FilledButtonLink>
          <MobileNav
            links={navLinks}
            instagramHref={instagramHref}
            primaryHref="/feedback"
            primaryLabel="Feedback"
          />
        </div>
      </div>
    </header>
  );
}
