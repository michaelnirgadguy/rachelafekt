import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { formatHebrewDate, readingTime } from "@/lib/articles";

interface Article {
  id: string;
  title: string;
  excerpt: string;
  slug: string;
  content: string;
  created_at: string;
  sort_order: number | null;
}

const Index = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      const { data } = await supabase
        .from("articles")
        .select("id, title, excerpt, slug, content, created_at, sort_order")
        .eq("published", true)
        .order("sort_order", { ascending: true })
        .order("created_at", { ascending: false });
      if (data) setArticles(data);
      setLoading(false);
    };
    fetch();
  }, []);

  const featured = articles[0];
  const rest = articles.slice(1);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Masthead */}
        <section className="border-b border-border">
          <div className="container-wide px-6 lg:px-20 py-16 md:py-24 text-center">
            <p className="eyebrow mb-5">בלוג אישי · מאמרי דעה</p>
            <h1 className="heading-display text-foreground mb-6">רחל אפק</h1>
            <p className="body-lg text-muted-foreground max-w-xl mx-auto">
              מחשבות, פרשנויות והגות על פוליטיקה, חברה, תרבות וענייני השעה.
              מגזין אישי, נכתב לאט, נקרא לאט.
            </p>
            <div className="divider-thin mx-auto mt-10" />
          </div>
        </section>

        {/* Featured */}
        {featured && (
          <section className="section-padding border-b border-border">
            <div className="container-wide">
              <div className="flex items-end justify-between mb-10">
                <div>
                  <p className="eyebrow mb-3">המאמר הבולט</p>
                  <h2 className="heading-md text-foreground">מומלץ לקריאה</h2>
                </div>
              </div>

              <Link
                to={`/articles/${featured.slug}`}
                className="block group"
              >
                <article className="grid md:grid-cols-12 gap-8 md:gap-12 items-start">
                  <div className="md:col-span-7">
                    <p className="eyebrow mb-4">{formatHebrewDate(featured.created_at)}</p>
                    <h3 className="heading-xl text-foreground mb-5 group-hover:text-primary transition-colors">
                      {featured.title}
                    </h3>
                    <p className="body-lg text-foreground/75 mb-6 line-clamp-4">
                      {featured.excerpt}
                    </p>
                    <span className="inline-flex items-center gap-2 text-primary font-body text-sm link-underline">
                      קריאת המאמר
                      <ArrowLeft className="w-4 h-4" />
                    </span>
                  </div>
                  <div className="md:col-span-5 md:border-r md:border-border md:pr-12">
                    <p className="text-sm text-muted-foreground mb-2">
                      {readingTime(featured.content)}
                    </p>
                    <p className="font-heading text-xl text-foreground/85 leading-relaxed">
                      {featured.excerpt.split(".")[0]}.
                    </p>
                  </div>
                </article>
              </Link>
            </div>
          </section>
        )}

        {/* Latest posts */}
        <section className="section-padding">
          <div className="container-wide">
            <div className="flex items-end justify-between mb-12">
              <div>
                <p className="eyebrow mb-3">מאמרים נוספים</p>
                <h2 className="heading-md text-foreground">פרסומים אחרונים</h2>
              </div>
              <Link
                to="/archive"
                className="hidden md:inline-flex items-center gap-2 text-sm text-primary link-underline"
              >
                לכל הארכיון <ArrowLeft className="w-4 h-4" />
              </Link>
            </div>

            {loading ? (
              <p className="text-muted-foreground">טוען...</p>
            ) : rest.length === 0 ? (
              <p className="text-muted-foreground">אין עדיין מאמרים נוספים.</p>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-12">
                {rest.map((a) => (
                  <Link
                    key={a.id}
                    to={`/articles/${a.slug}`}
                    className="group block border-t border-border pt-6"
                  >
                    <p className="eyebrow mb-3">
                      {formatHebrewDate(a.created_at)}
                    </p>
                    <h3 className="heading-md text-foreground mb-3 group-hover:text-primary transition-colors">
                      {a.title}
                    </h3>
                    <p className="body-md text-foreground/70 line-clamp-3">
                      {a.excerpt}
                    </p>
                    <p className="text-xs text-muted-foreground mt-4">
                      {readingTime(a.content)}
                    </p>
                  </Link>
                ))}
              </div>
            )}

            <div className="mt-12 md:hidden">
              <Link to="/archive" className="inline-flex items-center gap-2 text-sm text-primary link-underline">
                לכל הארכיון <ArrowLeft className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
