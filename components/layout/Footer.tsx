import Link from "next/link";
import { author } from "@/lib/author";

const nav = [
  { href: "/about", label: "About" },
  { href: "/books", label: "Books" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
  { href: "/cart", label: "Cart" },
];

export function Footer() {
  return (
    <footer className="border-t border-line bg-background">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-14 md:grid-cols-3">
        <div>
          <p className="font-display text-3xl">Leigh Arreane</p>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted">
            Filipino author of contemporary fiction, drama, and self-discovery.
            Words, colors, and the courage to try again.
          </p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-muted">Visit</p>
          <ul className="mt-4 space-y-2">
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-sm hover:text-accent">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-muted">Find me</p>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <a href={author.socialLinks.instagram} target="_blank" rel="noreferrer" className="hover:text-accent">
                Instagram
              </a>
            </li>
            <li>
              <a href={author.socialLinks.tiktok} target="_blank" rel="noreferrer" className="hover:text-accent">
                TikTok
              </a>
            </li>
            <li>
              <a href={author.socialLinks.facebook} target="_blank" rel="noreferrer" className="hover:text-accent">
                Facebook
              </a>
            </li>
            <li>
              <a href={author.socialLinks.amazon} target="_blank" rel="noreferrer" className="hover:text-accent">
                Amazon
              </a>
            </li>
            <li>
              <a href={author.socialLinks.email} className="hover:text-accent">
                {author.email}
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-line px-6 py-5 text-center text-xs text-muted">
        © {new Date().getFullYear()} Leigh Arreane. All rights reserved.
      </div>
    </footer>
  );
}
