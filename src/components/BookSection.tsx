import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

const BookSection = () => {
  const [articles, setArticles] = useState<{ slug: string }[]>([]);

  useEffect(() => {
    const fetchFirst = async () => {
      const { data } = await supabase
        .from("articles")
        .select("slug, sort_order")
        .eq("published", true)
        .order("sort_order", { ascending: true })
        .order("created_at", { ascending: false })
        .limit(1);
      if (data) setArticles(data);
    };
    fetchFirst();
  }, []);
  return (
    <section id="book" className="section-padding bg-background">
      <div className="container mx-auto">
        <div className="max-w-4xl mx-auto">
          {/* Section title */}
          <div className="text-center mb-10">
            <h2 className="heading-lg text-foreground mb-3">
              הרחם השלישי: תרפיה באימוץ עצמי
            </h2>
            <p className="text-primary font-body text-sm font-medium">
              SAT — Self Adoption Therapy
            </p>
          </div>

          {/* Top row: paragraphs on right, book cover on left */}
          <div className="grid md:grid-cols-[1fr_auto] gap-10 items-start mb-10">
            <div className="text-right space-y-6">
              {/* Paragraph 1 */}
              <div className="border-r-[3px] border-primary/40 pr-5">
                <p className="font-body text-foreground/80 leading-relaxed text-[17px]">
                  אילו פצעים סמויים הותירה בנו משפחתנו? לאיזה תפקיד היא גייסה
                  אותנו וכיצד ניתן להתפטר ממנו? ומדוע הצלילה האנליטית אל עולמנו
                  הפנימי אינה מצליחה לספק מזור למכאובינו?
                </p>
              </div>

              {/* Paragraph 2 */}
              <div className="border-r-[3px] border-accent/40 pr-5">
                <p className="font-body text-foreground/80 leading-relaxed text-[17px]">
                  אדם נולד בפעם הראשונה מרחם אמו אל רחם שני - התא המשפחתי. שם
                  הוא אמור לקבל את כל התנאים הנדרשים להתפתחותו: אהבה, קבלה,
                  השגחה, ועוד. אך רבים מאיתנו לא קיבלנו את כל התנאים האלו ואנו
                  מגיעים לבגרות עם פצע נפשי המסרב להגליד - תחושות של כאב, חרדה,
                  בדידות וחוסר ערך.
                </p>
              </div>

              {/* Paragraph 3 */}
              <div className="border-r-[3px] border-primary/40 pr-5">
                <p className="font-body text-foreground/80 leading-relaxed text-[17px]">
                  שיטת SAT - Self-Adoption Therapy מזמינה את המטופל לעבור לידה
                  נוספת: מהרחם השני, המשפחתי, אל הרחם השלישי - הוא עצמו. זו
                  גישה טיפולית של הורות עצמית מתקנת מתוך הכרה כי בבגרותנו, רק
                  אנחנו יכולים למלא עבור עצמנו את התפקיד ההורי המיטיב והאוהב
                  הדואג לכל צרכינו
                </p>
              </div>
            </div>

            <div className="flex justify-center md:mt-4">
              <div className="relative">
                <div className="absolute -inset-4 bg-primary/5 rounded-2xl -rotate-3" />
                <img
                  alt="כריכת הספר — הרחם השלישי"
                  className="relative rounded-lg shadow-lg max-w-[240px] w-full"
                  src="/lovable-uploads/bca498d1-a182-4965-95e9-67bfa894c11a.png"
                />
              </div>
            </div>
          </div>

          {/* Bottom paragraph — slightly prominent */}
          <div className="max-w-3xl mx-auto text-center mb-10 bg-accent/[0.05] rounded-xl py-6 px-8 border border-accent/10">
            <p className="font-body text-foreground leading-relaxed text-[17px] font-medium">
              הספר מציג את השיטה בבהירות בעזרת סיפורי מקרה ודימויים טיפוליים
              ומשרטט מפה מעשית לריפוי ולהתפתחות. מטפלים ימצאו בו מסגרת
              אינטגרטיבית לעבודתם, אך גם קוראים ללא ידע תאורטי מוקדם יוכלו
              להיעזר בו כמדריך להורות עצמית מיטיבה.
            </p>
          </div>

          {/* CTA */}
          <div className="text-center">
            {articles.length > 0 ? (
              <Link
                to={`/articles/${articles[0].slug}`}
                className="inline-block bg-primary text-primary-foreground px-8 py-3 rounded-md font-body text-sm hover:opacity-90 transition-opacity"
              >
                לקריאה נוספת
              </Link>
            ) : (
              <a
                href="#contact"
                className="inline-block bg-primary text-primary-foreground px-8 py-3 rounded-md font-body text-sm hover:opacity-90 transition-opacity"
              >
                לקריאה נוספת
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookSection;
