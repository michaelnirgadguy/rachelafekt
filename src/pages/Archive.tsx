import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Search } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { formatHebrewDate, readingTime } from "@/lib/articles";

interface Article {
  id: string;
  title: string;
  excerpt: string;
  slug: string;
  content: string;
  created_at: string;
  image_url: string | null;
}

const CATEGORIES = ["הכל", "פוליטיקה", "דעות", "בשטח", "תרבות", "חברה"];

const Archive = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("הכל");

  useEffect(() => {
    const fetch = async () => {
      const { data } = await (supabase as any)
        .from("articles")
        .select("id, title, excerpt, slug, content, created_at, image_url")
        .eq("published", true)
        .order("created_at", { ascending: false });
      if (data) setArticles(data as Article[]);
      setLoading(false);
    };
    fetch();
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return articles;
    return articles.filter(
      (a) =>
        a.title.toLowerCase().includes(q) ||
        a.excerpt.toLowerCase().includes(q) ||
        a.content.replace(/<[^>]+>/g, " ").toLowerCase().includes(q)
    );
  }, [articles, query]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <section className="border-b border-border">
          <div className="container-wide px-6 lg:px-20 py-16 text-center">
            <p className="eyebrow mb-4">הארכיון</p>
            <h1 className="heading-xl text-foreground mb-5">כל המאמרים</h1>
            <p className="body-md text-muted-foreground max-w-xl mx-auto">
              כל המאמרים שפורסמו. השתמשו בחיפוש או סננו לפי נושא כדי
              למצוא את הקריאה הבאה שלכן.
            </p>
          </div>
        </section>

        <section className="border-b border-border bg-secondary/50">
          <div className="container-wide px-6 lg:px-20 py-8">
            <div className="relative max-w-xl mx-auto mb-6">
              <Search className="w-4 h-4 text-muted-foreground absolute right-3 top-1/2 -translate-y-1/2" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="חיפוש במאמרים..."
                className="pr-10 h-11 bg-background border-border"
              />
            </div>
            <div className="flex flex-wrap gap-2 justify-center">
              {CATEGORIES.map((c) => (
                <button
                  key={c}
                  onClick={() => setActiveCategory(c)}
                  className={`text-xs px-3 py-1.5 rounded-sm border transition-colors ${
                    activeCategory === c
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-background text-foreground/70 border-border hover:border-primary/40"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="section-padding">
          <div className="container-wide container-prose">
            {loading ? (
              <p className="text-muted-foreground text-center">טוען...</p>
            ) : filtered.length === 0 ? (
              <p className="text-muted-foreground text-center">
                לא נמצאו תוצאות עבור "{query}".
              </p>
            ) : (
              <ul className="space-y-10">
                {filtered.map((a) => (
                  <li key={a.id} className="border-b border-border pb-10">
                    <Link to={`/articles/${a.slug}`} className="group block md:grid md:grid-cols-12 md:gap-8">
                      {a.image_url && (
                        <div className="md:col-span-4 mb-4 md:mb-0 overflow-hidden aspect-[4/3]">
                          <img
                            src={a.image_url}
                            alt={a.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            loading="lazy"
                          />
                        </div>
                      )}
                      <div className={a.image_url ? "md:col-span-8" : "md:col-span-12"}>
                        <p className="eyebrow mb-3">
                          {formatHebrewDate(a.created_at)} · {readingTime(a.content)}
                        </p>
                        <h2 className="heading-lg text-foreground mb-3 group-hover:text-primary transition-colors">
                          {a.title}
                        </h2>
                        <p className="body-md text-foreground/75">{a.excerpt}</p>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Archive;
