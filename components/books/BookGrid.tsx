"use client";

import { useMemo, useState } from "react";
import { BookCard } from "@/components/books/BookCard";
import type { Book, BookFormatType } from "@/lib/books";

const formatFilters: { value: "all" | BookFormatType; label: string }[] = [
  { value: "all", label: "All formats" },
  { value: "paperback", label: "Paperback" },
  { value: "hardcover", label: "Hardcover" },
  { value: "ebook", label: "eBook" },
];

export function BookGrid({ books }: { books: Book[] }) {
  const genres = useMemo(
    () => ["all", ...new Set(books.flatMap((book) => book.genres))],
    [books],
  );
  const [genre, setGenre] = useState("all");
  const [format, setFormat] = useState<(typeof formatFilters)[number]["value"]>(
    "all",
  );

  const filtered = books.filter((book) => {
    const genreOk = genre === "all" || book.genres.includes(genre);
    const formatOk =
      format === "all" || book.formats.some((item) => item.type === format);
    return genreOk && formatOk;
  });

  return (
    <div>
      <div className="mb-8 flex flex-wrap gap-3">
        <label className="text-xs uppercase tracking-[0.16em] text-muted">
          Genre
          <select
            className="ml-2 rounded-full border border-line bg-paper px-3 py-2 text-sm text-ink"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
          >
            {genres.map((item) => (
              <option key={item} value={item}>
                {item === "all" ? "All genres" : item}
              </option>
            ))}
          </select>
        </label>
        <label className="text-xs uppercase tracking-[0.16em] text-muted">
          Format
          <select
            className="ml-2 rounded-full border border-line bg-paper px-3 py-2 text-sm text-ink"
            value={format}
            onChange={(e) =>
              setFormat(e.target.value as (typeof formatFilters)[number]["value"])
            }
          >
            {formatFilters.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
        </label>
      </div>
      {filtered.length === 0 ? (
        <p className="text-muted">No books match those filters yet.</p>
      ) : (
        <div className="grid gap-8 md:grid-cols-2">
          {filtered.map((book) => (
            <BookCard key={book.slug} book={book} />
          ))}
        </div>
      )}
    </div>
  );
}
