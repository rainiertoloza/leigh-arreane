import Image from "next/image";
import Link from "next/link";
import { author } from "@/lib/author";
import { Button } from "@/components/ui/button";

export function AuthorBioCard({ compact = false }: { compact?: boolean }) {
  return (
    <aside className="flex flex-col gap-6 overflow-hidden rounded-[1.5rem] border border-line bg-paper p-6 shadow-[0_20px_50px_-32px_rgba(31,25,22,0.4)] md:flex-row md:items-center">
      <Image
        src={author.portraitImage}
        alt={`Portrait of ${author.name}`}
        width={280}
        height={280}
        className="size-36 shrink-0 rounded-[1.2rem] object-cover md:size-44"
      />
      <div>
        <p className="text-xs uppercase tracking-[0.18em] text-muted">The author</p>
        <h2 className="mt-1 font-display text-3xl">{author.name}</h2>
        <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted md:text-base">
          {compact ? author.bio : author.bio}
        </p>
        <Button asChild variant="secondary" size="sm" className="mt-4">
          <Link href="/about">Read more</Link>
        </Button>
      </div>
    </aside>
  );
}
