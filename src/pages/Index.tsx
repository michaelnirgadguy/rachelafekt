import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Mail, Instagram, Facebook } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { formatHebrewDate, readingTime } from "@/lib/articles";
import { toast } from "@/hooks/use-toast";

interface Article {
  id: string;
  title: string;
  excerpt: string;
  slug: string;
  content: string;
  created_at: string;
  sort_order: number | null;
  image_url: string | null;
}

const Index = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");

  useEffect(() => {
    const fetch = async () => {
      const { data } = await supabase
        .from("articles")
        .select("id, title, excerpt, slug, content, created_at, sort_order, image_url")
        .eq("published", true)
        .order("sort_order", { ascending: true })
        .order("created_at", { ascending: false });
      if (data) setArticles(data as Article[]);
      setLoading(false);
    };
    fetch();
  }, []);

  const latest = articles[0];
  const featured = latest;
  const recent = articles.slice(1, 4);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    toast({
      title: "תודה שנרשמת",
      description: "נשלח אלייך עדכון על מאמרים חדשים.",
    });
    setEmail("");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        {/* 1. Hero — split layout */}
        <section className="border-b border-border">
          <div className="container-wide px-6 lg:px-20 py-16 md:py-24">
            <div className="grid md:grid-cols-12 gap-10 md:gap-16 items-center">
              <div className="md:col-span-5 order-1 md:order-2">
                <div className="relative mx-auto md:mx-0 w-56 h-56 md:w-72 md:h-72 lg:w-80 lg:h-80">
                  <div className="absolute inset-0 rounded-full bg-secondary border border-border" />
                  <div className="absolute inset-0 rounded-full flex items-center justify-center">
                    <span className="font-heading text-6xl md:text-7xl text-primary/70">
                      ר״א
                    </span>
                  </div>
                  <div className="absolute -bottom-3 -right-3 w-24 h-24 rounded-full bg-primary/10 -z-10 hidden md:block" />
                </div>
              </div>
              <div className="md:col-span-7 order-2 md:order-1 text-center md:text-right">
                <p className="eyebrow mb-5">בלוג אישי · מאמרי דעה</p>
                <h1 className="heading-display text-foreground mb-6">רחל אפק</h1>
                <p className="body-lg text-foreground/75 mb-8 max-w-xl md:max-w-none">
                  כותבת על פוליטיקה, חברה ותרבות. מחשבות בקצב אנושי,
                  במרחב אישי שאינו ממהר לעמוד הראשון של החדשות —
                  אלא לעמוד הראשון של השיחה.
                </p>
                <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                  {latest && (
                    <Button asChild size="lg" className="rounded-sm">
                      <Link to={`/articles/${latest.slug}`}>
                        קראי את הפוסט האחרון
                        <ArrowLeft className="w-4 h-4 mr-2" />
                      </Link>
                    </Button>
                  )}
                  <Button asChild size="lg" variant="outline" className="rounded-sm">
                    <Link to="/blog">לכל המאמרים</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 2. Mission Statement */}
        <section className="bg-secondary border-b border-border">
          <div className="container-wide px-6 lg:px-20 py-20 md:py-28 text-center">
            <div className="divider-thin mx-auto mb-8" />
            <blockquote className="font-heading text-3xl md:text-4xl lg:text-5xl leading-snug text-foreground/90 max-w-4xl mx-auto">
              ״לכתוב פירושו להאט. במקום שבו כולם צועקים, הקול השקט הוא
              המהפכני באמת.״
            </blockquote>
            <p className="eyebrow mt-8">— ההצהרה של הבלוג</p>
          </div>
        </section>

        {/* 3. Featured Post */}
        {featured && (
          <section className="section-padding border-b border-border">
            <div className="container-wide">
              <p className="eyebrow mb-3 text-center md:text-right">המאמר הבולט</p>
              <div className="divider-thin mb-10 hidden md:block" />

              <Link to={`/articles/${featured.slug}`} className="block group">
                <article className="grid md:grid-cols-12 gap-8 md:gap-12 items-start">
                  <div className="md:col-span-8">
                    <p className="eyebrow mb-4">
                      {formatHebrewDate(featured.created_at)} · {readingTime(featured.content)}
                    </p>
                    <h2 className="heading-xl text-foreground mb-5 group-hover:text-primary transition-colors">
                      {featured.title}
                    </h2>
                    <p className="body-lg text-foreground/75 mb-6">
                      {featured.excerpt}
                    </p>
                    <span className="inline-flex items-center gap-2 text-primary font-body text-base link-underline">
                      קריאת המאמר המלא
                      <ArrowLeft className="w-4 h-4" />
                    </span>
                  </div>
                  <div className="md:col-span-4 md:border-r md:border-border md:pr-10">
                    <p className="font-heading text-xl text-foreground/85 leading-relaxed">
                      {featured.excerpt.split(".")[0]}.
                    </p>
                  </div>
                </article>
              </Link>
            </div>
          </section>
        )}

        {/* 4. Recent Posts — 3 column grid */}
        <section className="section-padding border-b border-border">
          <div className="container-wide">
            <div className="flex items-end justify-between mb-12">
              <div>
                <p className="eyebrow mb-3">מאמרים אחרונים</p>
                <h2 className="heading-md text-foreground">פרסומים נוספים</h2>
              </div>
              <Link
                to="/blog"
                className="hidden md:inline-flex items-center gap-2 text-sm text-primary link-underline"
              >
                לכל הארכיון <ArrowLeft className="w-4 h-4" />
              </Link>
            </div>

            {loading ? (
              <p className="text-muted-foreground">טוען...</p>
            ) : recent.length === 0 ? (
              <p className="text-muted-foreground">אין עדיין מאמרים נוספים.</p>
            ) : (
              <div className="grid md:grid-cols-3 gap-8 md:gap-10">
                {recent.map((a) => (
                  <Link
                    key={a.id}
                    to={`/articles/${a.slug}`}
                    className="group block border-t-2 border-foreground/10 pt-5 hover:border-primary transition-colors"
                  >
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="inline-flex items-center text-[11px] uppercase tracking-wider px-2 py-1 bg-secondary text-foreground/70 rounded-sm">
                        {formatHebrewDate(a.created_at)}
                      </span>
                      <span className="inline-flex items-center text-[11px] uppercase tracking-wider px-2 py-1 border border-border text-foreground/70 rounded-sm">
                        {readingTime(a.content)}
                      </span>
                    </div>
                    <h3 className="heading-md text-foreground mb-3 group-hover:text-primary transition-colors">
                      {a.title}
                    </h3>
                    <p className="body-md text-foreground/70 line-clamp-3">
                      {a.excerpt}
                    </p>
                  </Link>
                ))}
              </div>
            )}

            <div className="mt-10 md:hidden">
              <Link to="/blog" className="inline-flex items-center gap-2 text-sm text-primary link-underline">
                לכל הארכיון <ArrowLeft className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* 5. About Snippet */}
        <section className="bg-muted border-b border-border">
          <div className="container-wide px-6 lg:px-20 py-20 md:py-24">
            <div className="grid md:grid-cols-12 gap-10 items-center">
              <div className="md:col-span-4">
                <p className="eyebrow mb-3">אודות</p>
                <h2 className="heading-lg text-foreground">מי כותבת כאן</h2>
                <div className="divider-thin mt-6" />
              </div>
              <div className="md:col-span-8">
                <p className="body-lg text-foreground/80 mb-5">
                  אני רחל אפק. מתבוננת, קוראת, וכותבת על המקומות שבהם
                  הפוליטי פוגש את האישי — בין כותרות לבין מטבחים, בין
                  אידיאולוגיה לבין שגרה.
                </p>
                <p className="body-md text-foreground/70 mb-6">
                  המרחב הזה הוא ניסיון להציע קריאה איטית בעידן ממהר. לא
                  עוד תגובה לוויראליות של היום, אלא הזמנה לחשוב יחד.
                </p>
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 text-primary font-body link-underline"
                >
                  הכירו אותי לעומק <ArrowLeft className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* 6. Footer / Contact + Newsletter */}
        <section className="section-padding">
          <div className="container-wide">
            <div className="grid md:grid-cols-12 gap-12">
              <div className="md:col-span-6">
                <p className="eyebrow mb-3">הישארו מעודכנות</p>
                <h2 className="heading-lg text-foreground mb-4">
                  הצטרפו לרשימת התפוצה
                </h2>
                <p className="body-md text-foreground/70 mb-6 max-w-md">
                  פעם בחודש, מאמר חדש ישלח ישירות לתיבה שלכן. בלי רעש,
                  בלי ספאם.
                </p>
                <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md">
                  <Input
                    type="email"
                    required
                    placeholder="כתובת המייל שלך"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-11 bg-background"
                  />
                  <Button type="submit" className="rounded-sm h-11">
                    הרשמה
                  </Button>
                </form>
              </div>
              <div className="md:col-span-6 md:border-r md:border-border md:pr-12">
                <p className="eyebrow mb-3">צרו קשר</p>
                <h2 className="heading-lg text-foreground mb-4">
                  שיחה אישית
                </h2>
                <p className="body-md text-foreground/70 mb-6">
                  לפניות, הזמנות לכתיבה או תגובה למאמר — אשמח לשמוע ממך.
                </p>
                <div className="space-y-3">
                  <a
                    href="mailto:rchlafek@gmail.com"
                    className="inline-flex items-center gap-2 text-foreground hover:text-primary"
                  >
                    <Mail className="w-4 h-4" />
                    rchlafek@gmail.com
                  </a>
                  <div className="flex items-center gap-4 pt-2">
                    <a
                      href="#"
                      aria-label="Instagram"
                      className="text-foreground/70 hover:text-primary"
                    >
                      <Instagram className="w-5 h-5" />
                    </a>
                    <a
                      href="#"
                      aria-label="Facebook"
                      className="text-foreground/70 hover:text-primary"
                    >
                      <Facebook className="w-5 h-5" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
