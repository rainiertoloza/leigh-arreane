"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { Book } from "@/lib/books";
import { useCart } from "@/lib/cart";
import { formatPrice } from "@/lib/utils";

export function BookCard({ book }: { book: Book }) {
  const addItem = useCart((s) => s.addItem);
  const lowest = [...book.formats].sort((a, b) => a.price - b.price)[0];

  return (
    <article className="group overflow-hidden rounded-[1.4rem] border border-line bg-paper shadow-[0_20px_50px_-32px_rgba(31,25,22,0.45)]">
      <Link href={`/books/${book.slug}`} className="block overflow-hidden">
        <Image
          src={book.coverImage}
          alt={`${book.title} cover`}
          width={900}
          height={700}
          className="aspect-[5/4] w-full object-cover transition duration-500 group-hover:scale-[1.03]"
        />
      </Link>
      <div className="p-5">
        <div className="flex flex-wrap gap-2">
          {book.isNew ? <Badge>New release</Badge> : null}
          {book.isFeatured ? <Badge>Debut</Badge> : null}
        </div>
        <h3 className="mt-3 font-display text-2xl tracking-tight">
          <Link href={`/books/${book.slug}`}>{book.title}</Link>
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-muted">{book.hook}</p>
        <p className="mt-3 text-sm font-medium">From {formatPrice(lowest.price)}</p>
        <div className="mt-4 flex gap-2">
          <Button asChild variant="secondary" size="sm">
            <Link href={`/books/${book.slug}`}>View</Link>
          </Button>
          <Button
            size="sm"
            onClick={() =>
              addItem({
                slug: book.slug,
                title: book.title,
                coverImage: book.coverImage,
                format: lowest.type,
                formatLabel: lowest.label,
                price: lowest.price,
              })
            }
          >
            Add to cart
          </Button>
        </div>
      </div>
    </article>
  );
}
