export type BookFormatType = "hardcover" | "paperback" | "ebook" | "audiobook";

export type RetailerLink = {
  label: string;
  url: string;
};

export type BookFormat = {
  type: BookFormatType;
  label: string;
  price: number;
  currency: "usd";
  stock: number;
  priceNote?: string;
  retailerLinks?: RetailerLink[];
};

export type BookReview = {
  source: string;
  quote: string;
  url?: string;
};

export type Book = {
  slug: string;
  title: string;
  series?: string;
  coverImage: string;
  gallery: string[];
  hook: string;
  synopsis: string;
  pullQuote: string;
  formats: BookFormat[];
  publishDate: string;
  isbn?: string;
  pageCount?: number;
  genres: string[];
  isFeatured: boolean;
  isNew: boolean;
  contentWarning?: string;
  retailerLinks: RetailerLink[];
  reviews: BookReview[];
};

export const books: Book[] = [
  {
    slug: "dreams-we-once-lost",
    title: "Dreams We Once Lost",
    coverImage: "/images/books/dreams-we-once-lost.png",
    gallery: ["/images/books/dreams-we-once-lost.png"],
    hook: "Will you find your sun if you’re looking at the moon?",
    pullQuote:
      "This is the lost dream. As simple as that. But I do not trust my memory too well.",
    synopsis: `Laura Wills dreams like the rest of us — but hers became a prelude to her realities, until she loses them, including the stranger that resembled a lost friend in the null. Sam.

She blamed herself for all the mishaps in her life — her pappa’s death, the uncertainties of her post-graduate studies, her interracial struggles and an almost love. While finding the identity she lost in Sweden and the Philippines, she falls into a series of life-changing decisions which will push her to find the missing pieces of her life in her old hometown, with an old friend.

Everything seems to adhere to her plan until one day, she meets the stranger she had pushed deeper into her memories — in broad daylight.

In her quest to break the chains binding her and rebuild her life, she realizes the interconnected experiences that will force her to make drastic decisions — decisions that will make her choose between finding and losing what truly matters. Most importantly, to find the space she could call her own.

This debut novel by Leigh Arreane is a story about self-discovery, courage to love, and remembering what it feels like to live beyond boundaries.`,
    formats: [
      {
        type: "paperback",
        label: "Paperback",
        price: 1599,
        currency: "usd",
        stock: 24,
        retailerLinks: [
          {
            label: "Centralbooks (PH) · ₱895",
            url: "https://central.com.ph/product/arreane-dreams-we-once-lost/",
          },
        ],
      },
      {
        type: "hardcover",
        label: "Hardcover",
        price: 2299,
        currency: "usd",
        stock: 8,
        priceNote: "Placeholder USD price — confirm before going live.",
      },
      {
        type: "ebook",
        label: "eBook (Kindle)",
        price: 899,
        currency: "usd",
        stock: 99,
        retailerLinks: [
          {
            label: "Amazon Kindle",
            url: "https://www.amazon.com/dp/B09P5B3XDG",
          },
        ],
      },
    ],
    publishDate: "2022-02-20",
    isbn: "978-621-06-0135-0",
    pageCount: 358,
    genres: [
      "contemporary fiction",
      "drama",
      "self-discovery",
      "coming-of-age",
    ],
    isFeatured: true,
    isNew: false,
    contentWarning: "This book contains scenes depicting harassment and bullying.",
    retailerLinks: [
      {
        label: "Amazon",
        url: "https://www.amazon.com/dp/B09P5B3XDG",
      },
      {
        label: "Centralbooks",
        url: "https://central.com.ph/product/arreane-dreams-we-once-lost/",
      },
    ],
    reviews: [
      {
        source: "From the pages",
        quote:
          "Whenever I cannot sleep at night, I fabricate scenarios in my head that never existed. I alter the story because of pain, or maybe I do it because of its absence.",
      },
      {
        source: "The novel",
        quote:
          "A story about self-discovery, courage to love, and remembering what it feels like to live beyond boundaries.",
      },
    ],
  },
];

export function getBook(slug: string) {
  return books.find((book) => book.slug === slug);
}

export function getFeaturedBook() {
  return books.find((book) => book.isFeatured) ?? books[0];
}

export const formatLabels: Record<BookFormatType, string> = {
  hardcover: "Hardcover",
  paperback: "Paperback",
  ebook: "eBook",
  audiobook: "Audiobook",
};
