import { useParams, Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface Article {
  id: string;
  title: string;
  content: string;
  created_at: string;
}

const ArticlePage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticle = async () => {
      if (!slug) return;
      const { data } = await supabase
        .from("articles")
        .select("id, title, content, created_at")
        .eq("slug", slug)
        .eq("published", true)
        .maybeSingle();
      setArticle(data);
      setLoading(false);
    };
    fetchArticle();
  }, [slug]);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("he-IL", { month: "long", year: "numeric" });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">טוען...</p>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="heading-lg text-foreground mb-4">מאמר לא נמצא</h1>
          <Link to="/#articles" className="text-primary hover:underline">
            חזרה למאמרים
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <article className="pt-24 pb-16 px-6 md:px-12 lg:px-24">
        <div className="max-w-3xl mx-auto">
          <Link
            to="/#articles"
            className="inline-flex items-center gap-2 text-primary hover:underline mb-8 font-body text-sm"
          >
            <ArrowRight className="w-4 h-4" />
            חזרה למאמרים
          </Link>
          <span className="text-xs text-muted-foreground font-body block mb-4">
            {formatDate(article.created_at)}
          </span>
          <h1 className="heading-lg text-foreground mb-8">{article.title}</h1>
          <div className="w-16 h-0.5 bg-primary mb-8" />
          <div
            className="prose prose-lg max-w-none text-foreground [&_p]:mb-6 [&_p]:leading-relaxed [&_p]:text-foreground [&_li]:text-foreground [&_blockquote[data-type='pull-quote']]:border-r-4 [&_blockquote[data-type='pull-quote']]:border-primary [&_blockquote[data-type='pull-quote']]:pr-6 [&_blockquote[data-type='pull-quote']]:pl-0 [&_blockquote[data-type='pull-quote']]:italic [&_blockquote[data-type='pull-quote']]:text-xl [&_blockquote[data-type='pull-quote']]:text-primary/80 [&_blockquote[data-type='pull-quote']]:my-8 [&_blockquote[data-type='pull-quote']]:bg-primary/5 [&_blockquote[data-type='pull-quote']]:py-4 [&_blockquote[data-type='pull-quote']]:rounded-sm [&_blockquote:not([data-type])]:border-r-2 [&_blockquote:not([data-type])]:border-muted-foreground/30 [&_blockquote:not([data-type])]:pr-4 [&_blockquote:not([data-type])]:text-foreground/85"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
        </div>
      </article>
      <Footer />
    </div>
  );
};

export default ArticlePage;
