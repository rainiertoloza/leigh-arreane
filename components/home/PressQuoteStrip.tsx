import { author } from "@/lib/author";

export function PressQuoteStrip() {
  return (
    <section className="border-y border-line bg-paper/70">
      <div className="mx-auto grid max-w-6xl gap-8 px-6 py-10 md:grid-cols-3 md:gap-12 md:py-12">
        {author.pressMentions.map((mention) => (
          <figure key={mention.source} className="min-w-0">
            <blockquote className="font-display text-xl leading-snug italic tracking-tight md:text-[1.35rem]">
              “{mention.quote}”
            </blockquote>
            <figcaption className="mt-3 text-[11px] uppercase tracking-[0.18em] text-muted">
              {mention.source}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
