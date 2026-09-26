"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { Book } from "@/lib/books";
import { formatPrice } from "@/lib/utils";

export function Hero({ book }: { book: Book }) {
  const from = book.formats[0];

  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-16 md:grid-cols-[1.05fr_0.95fr] md:py-24">
        <div>
          <Badge>Debut novel · 2022</Badge>
          <h1 className="mt-6 max-w-xl font-display text-5xl leading-[1.05] tracking-tight text-ink sm:text-6xl md:text-7xl">
            Will you find your sun if you’re looking at the moon?
          </h1>
          <p className="mt-6 max-w-lg text-lg leading-relaxed text-muted">
            <em className="text-ink">{book.title}</em> — a contemporary novel of
            memory, almost-love, and the long way home between Sweden and the
            Philippines.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button asChild size="lg">
              <Link href={`/books/${book.slug}`}>Get the book</Link>
            </Button>
            <Button asChild variant="secondary" size="lg">
              <Link href="/about">Meet Leigh</Link>
            </Button>
          </div>
          <p className="mt-5 text-sm text-muted">
            From {formatPrice(from.price)} · Paperback, hardcover & Kindle
          </p>
        </div>
        <motion.div
          className="relative"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="absolute -inset-8 -z-10 rounded-[2.5rem] bg-accent-soft/70 blur-2xl" />
          <Image
            src={book.coverImage}
            alt={`${book.title} promotional cover by Leigh Arreane`}
            width={1200}
            height={900}
            priority
            className="w-full rounded-[1.6rem] object-cover shadow-[0_40px_80px_-28px_rgba(31,25,22,0.45)]"
          />
        </motion.div>
      </div>
    </section>
  );
}
