import type { Metadata } from "next";
import { BookGrid } from "@/components/books/BookGrid";
import { books } from "@/lib/books";

export const metadata: Metadata = {
  title: "Books",
  description: "Shop Leigh Arreane’s novels — paperback, hardcover, and Kindle.",
};

export default function BooksPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <p className="text-xs uppercase tracking-[0.2em] text-muted">The shop</p>
      <h1 className="mt-3 font-display text-5xl tracking-tight md:text-6xl">Books</h1>
      <p className="mt-4 max-w-xl text-lg text-muted">
        Contemporary fiction, drama, and self-discovery — beginning with the debut.
      </p>
      <div className="mt-12">
        <BookGrid books={books} />
      </div>
    </div>
  );
}
