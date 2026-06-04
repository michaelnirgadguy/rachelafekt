import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

interface Article {
  id: string;
  title: string;
  excerpt: string;
  slug: string;
  created_at: string;
  sort_order: number | null;
}

const ArticlesSection = () => {
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    const fetchArticles = async () => {
      const { data } = await supabase
        .from("articles")
        .select("id, title, excerpt, slug, created_at, sort_order")
        .eq("published", true)
        .order("sort_order", { ascending: true })
        .order("created_at", { ascending: false });
      if (data) setArticles(data);
    };
    fetchArticles();
  }, []);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("he-IL", { month: "long", year: "numeric" });
  };

  if (articles.length === 0) return null;

  return (
    <section id="articles" className="section-padding bg-card">
      <div className="container mx-auto">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="heading-lg text-foreground mb-6">מאמרים</h2>
          <div className="w-16 h-0.5 bg-primary mx-auto" />
        </div>

        <div className="max-w-4xl mx-auto grid gap-6">
          {articles.map((article) => (
            <Link to={`/articles/${article.slug}`} key={article.id}>
              <article className="bg-background rounded-lg p-8 hover:shadow-md transition-shadow group cursor-pointer">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-heading text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
                      {article.title}
                    </h3>
                    <p className="body-md text-muted-foreground text-sm">
                      {article.excerpt}
                    </p>
                  </div>
                  <ArrowLeft className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors mt-8 shrink-0" />
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ArticlesSection;
