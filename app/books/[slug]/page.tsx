import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BookDetail } from "@/components/books/BookDetail";
import { books, getBook } from "@/lib/books";
import { author } from "@/lib/author";

export function generateStaticParams() {
  return books.map((book) => ({ slug: book.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const book = getBook(slug);
  if (!book) return { title: "Book" };
  return {
    title: book.title,
    description: book.hook,
    openGraph: {
      title: `${book.title} — ${author.name}`,
      description: book.hook,
      type: "book",
      images: [book.coverImage],
    },
  };
}

export default async function BookPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const book = getBook(slug);
  if (!book) notFound();
  return <BookDetail book={book} />;
}
