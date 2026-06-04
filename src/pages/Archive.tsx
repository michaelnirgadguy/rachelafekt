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
}

const Archive = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const fetch = async () => {
      const { data } = await supabase
        .from("articles")
        .select("id, title, excerpt, slug, content, created_at")
        .eq("published", true)
        .order("created_at", { ascending: false });
      if (data) setArticles(data);
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
              כל המאמרים שפורסמו, מהמוקדמים ועד החדשים ביותר. השתמשו בחיפוש כדי
              למצוא נושא, ביטוי או שם.
            </p>
          </div>
        </section>

        <section className="section-padding">
          <div className="container-wide">
            <div className="relative max-w-xl mx-auto mb-12">
              <Search className="w-4 h-4 text-muted-foreground absolute right-3 top-1/2 -translate-y-1/2" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="חיפוש במאמרים..."
                className="pr-10 h-11 bg-background border-border"
              />
            </div>

            {loading ? (
              <p className="text-muted-foreground text-center">טוען...</p>
            ) : filtered.length === 0 ? (
              <p className="text-muted-foreground text-center">
                לא נמצאו תוצאות עבור "{query}".
              </p>
            ) : (
              <ul className="container-prose space-y-10">
                {filtered.map((a) => (
                  <li key={a.id} className="border-b border-border pb-10">
                    <Link to={`/articles/${a.slug}`} className="group block">
                      <p className="eyebrow mb-3">
                        {formatHebrewDate(a.created_at)} · {readingTime(a.content)}
                      </p>
                      <h2 className="heading-lg text-foreground mb-3 group-hover:text-primary transition-colors">
                        {a.title}
                      </h2>
                      <p className="body-md text-foreground/75">{a.excerpt}</p>
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
