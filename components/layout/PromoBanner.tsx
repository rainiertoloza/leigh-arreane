import Link from "next/link";
import { author } from "@/lib/author";

export function PromoBanner() {
  return (
    <div className="bg-accent text-accent-foreground">
      <p className="mx-auto flex max-w-6xl flex-col items-center justify-center gap-1 px-4 py-2.5 text-center text-xs tracking-wide sm:flex-row sm:gap-3 sm:text-[13px]">
        <span className="font-medium uppercase tracking-[0.16em]">
          Signed copies
        </span>
        <span className="hidden text-accent-foreground/50 sm:inline">·</span>
        <span>
          Message{" "}
          <Link
            href={author.socialLinks.instagram}
            className="underline underline-offset-4"
            target="_blank"
            rel="noreferrer"
          >
            @leigharreane
          </Link>{" "}
          on Instagram — especially if you are in the Philippines.
        </span>
      </p>
    </div>
  );
}
