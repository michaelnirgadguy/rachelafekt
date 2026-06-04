import { useParams, Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { formatHebrewDate, readingTime } from "@/lib/articles";

interface Article {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  created_at: string;
  image_url: string | null;
}

const ArticlePage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticle = async () => {
      if (!slug) return;
      setLoading(true);
      const { data } = await supabase
        .from("articles")
        .select("id, title, excerpt, content, created_at")
        .eq("slug", slug)
        .eq("published", true)
        .maybeSingle();
      setArticle(data);
      setLoading(false);
    };
    fetchArticle();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <p className="text-muted-foreground">טוען...</p>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="heading-lg text-foreground mb-4">המאמר לא נמצא</h1>
            <Link to="/archive" className="text-primary link-underline">
              לארכיון
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <article className="section-padding">
          <div className="container-prose">
            <Link
              to="/archive"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-10"
            >
              <ArrowRight className="w-4 h-4" />
              חזרה לארכיון
            </Link>

            <p className="eyebrow mb-5">
              {formatHebrewDate(article.created_at)} · {readingTime(article.content)}
            </p>
            <h1 className="heading-xl text-foreground mb-6">{article.title}</h1>
            <p className="body-lg text-foreground/75 mb-8">{article.excerpt}</p>
            <div className="divider-thin mb-12" />

            <div
              className="prose-article"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />

            <div className="mt-16 pt-8 border-t border-border text-center">
              <p className="eyebrow mb-3">המשך קריאה</p>
              <Link to="/archive" className="text-primary link-underline">
                לכל המאמרים בארכיון
              </Link>
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
};

export default ArticlePage;
