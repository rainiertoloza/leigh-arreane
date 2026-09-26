import type { Metadata } from "next";
import Image from "next/image";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SectionReveal } from "@/components/shared/SectionReveal";
import { author } from "@/lib/author";

export const metadata: Metadata = {
  title: "About",
  description: author.bio,
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <SectionReveal>
        <div className="grid items-start gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <Image
            src={author.portraitImage}
            alt={`Portrait of ${author.name}`}
            width={720}
            height={900}
            priority
            className="w-full rounded-[1.8rem] object-cover shadow-[0_40px_80px_-30px_rgba(31,25,22,0.5)]"
          />
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-muted">About the author</p>
            <h1 className="mt-3 font-display text-5xl tracking-tight md:text-6xl">
              {author.name}
            </h1>
            <p className="mt-4 font-display text-2xl italic text-muted">
              {author.tagline}
            </p>
            <div className="mt-8 space-y-4 text-[1.05rem] leading-8 text-ink/85">
              {author.longBio.split("\n\n").map((para) => (
                <p key={para.slice(0, 20)}>{para}</p>
              ))}
            </div>
          </div>
        </div>
      </SectionReveal>
      <SectionReveal>
        <section className="mt-20 grid gap-8 md:grid-cols-3">
          {author.timeline.map((item) => (
            <article key={item.title} className="rounded-[1.3rem] border border-line bg-paper p-6">
              <p className="text-xs uppercase tracking-[0.18em] text-accent">{item.year}</p>
              <h2 className="mt-2 font-display text-2xl">{item.title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted">{item.body}</p>
            </article>
          ))}
        </section>
      </SectionReveal>
      <SectionReveal>
        <section className="mt-20">
          <h2 className="font-display text-4xl">Questions, quietly answered</h2>
          <Accordion type="single" collapsible className="mt-6">
            {author.faqs.map((item, index) => (
              <AccordionItem key={item.q} value={`item-${index}`}>
                <AccordionTrigger>{item.q}</AccordionTrigger>
                <AccordionContent>{item.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>
      </SectionReveal>
    </div>
  );
}
