import type { Metadata } from "next";
import { ContactForm } from "@/components/contact/ContactForm";
import { author } from "@/lib/author";

export const metadata: Metadata = {
  title: "Contact",
  description: "Write to Leigh Arreane — notes, events, signed copies, and press.",
};

export default function ContactPage() {
  return (
    <div className="mx-auto grid max-w-6xl gap-12 px-6 py-16 lg:grid-cols-2">
      <div>
        <p className="text-xs uppercase tracking-[0.2em] text-muted">Get in touch</p>
        <h1 className="mt-3 font-display text-5xl tracking-tight">Write to Leigh</h1>
        <p className="mt-4 max-w-md text-lg leading-relaxed text-muted">
          For signed copies, events, press, or a quiet hello. Instagram is fastest for
          Philippine orders; email is welcome for everything else.
        </p>
        <ul className="mt-8 space-y-2 text-sm">
          <li>
            <a className="hover:text-accent" href={author.socialLinks.email}>
              {author.email}
            </a>
          </li>
          <li>
            <a className="hover:text-accent" href={author.socialLinks.instagram} target="_blank" rel="noreferrer">
              Instagram @leigharreane
            </a>
          </li>
          <li>
            <a className="hover:text-accent" href={author.socialLinks.tiktok} target="_blank" rel="noreferrer">
              TikTok @leigharreane
            </a>
          </li>
          <li>
            <a className="hover:text-accent" href={author.socialLinks.facebook} target="_blank" rel="noreferrer">
              Facebook
            </a>
          </li>
        </ul>
      </div>
      <ContactForm />
    </div>
  );
}
