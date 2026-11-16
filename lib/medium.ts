// Reads the studio's Medium journal from its public RSS feed, on the server.
// Used by the homepage's getStaticProps, which refreshes it about once an hour.

export const MEDIUM_PROFILE = "https://medium.com/@waybertechnologies";
const FEED_URL = "https://medium.com/feed/@waybertechnologies";

export type Article = {
  title: string;
  url: string;
  /** ISO date. */
  date: string;
  /** Cover image (the first image in the post), if there is one. */
  image: string | null;
  excerpt: string;
};

const decode = (s: string) =>
  s
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&#x27;/g, "'")
    .replace(/&nbsp;/g, " ")
    .trim();

const tag = (xml: string, name: string) => {
  const m = xml.match(new RegExp(`<${name}[^>]*>([\\s\\S]*?)</${name}>`));
  return m ? decode(m[1]) : "";
};

/** Cuts text to about `max` characters, at a word boundary. */
function excerpt(text: string, max = 150) {
  if (text.length <= max) return text;
  return text.slice(0, text.lastIndexOf(" ", max)).replace(/[,;:.\s]+$/, "") + "…";
}

/** Latest articles, newest first. Returns [] if Medium can't be reached, so the page still builds. */
export async function getMediumArticles(limit = 8): Promise<Article[]> {
  try {
    const res = await fetch(FEED_URL, {
      headers: { "User-Agent": "Mozilla/5.0 (website build)" },
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) return [];
    const xml = await res.text();
    const items = xml.match(/<item>[\s\S]*?<\/item>/g) ?? [];
    return items.slice(0, limit).map((item) => {
      const body = tag(item, "content:encoded");
      const image = body.match(/<img[^>]+src="([^"]+)"/)?.[1] ?? null;
      const text = body
        .replace(/<figure[\s\S]*?<\/figure>/g, " ")
        .replace(/<[^>]+>/g, " ")
        .replace(/\s+/g, " ")
        .trim();
      return {
        title: tag(item, "title"),
        url: tag(item, "link").split("?")[0],
        date: new Date(tag(item, "pubDate")).toISOString(),
        image,
        excerpt: excerpt(decode(text)),
      };
    });
  } catch {
    return [];
  }
}
