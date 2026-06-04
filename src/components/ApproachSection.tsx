import { Leaf, Network, Target, Layers } from "lucide-react";

const principles = [
  {
    icon: Leaf,
    title: "הומניזם",
    desc: "שלילת המדיקליזציה של בעיות רגשיות ובין-אישיות. הכרה בפוטנציאל האנושי הבלתי נדלה. התייחסות למשמעות החיבור האנושי בין המטפל למטופל — המטפל מונכח כאדם ולא רק ככלי טכני.",
  },
  {
    icon: Network,
    title: "מערכתיות ואקולוגיה",
    desc: "הבנת המצוקות דורשת מיפוי של הפרט כשלם מורכב העשוי מחלקים, ובמקביל מיפוי של המערכות הבין-אישיות שאליהן הוא משתייך — בעיקר משפחתו — ושל הזיקה בין שתי המפות.",
  },
  {
    icon: Target,
    title: "פרגמטיות",
    desc: "הכרה בכך ש״הבנה״ לבדה אינה מספיקה לריפוי. שיפור מגיע כפרי של עבודה מכוונת היטב. המטפל פעיל, מתערב ומוביל את התהליך הטיפולי.",
  },
  {
    icon: Layers,
    title: "שילוב גישות",
    desc: "השיטה שואבת מהטיפול המשפחתי, הגישה הפסיכודינמית, CBT, גישות תמיכתיות והומניסטיות-אקזיסטנציאליסטיות, ומשלבת רעיונות מעולם המדיטציה והעבודה עם הגוף.",
  },
];

const ApproachSection = () => {
  return (
    <section id="approach" className="section-padding bg-background">
      <div className="container mx-auto">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="heading-lg text-foreground mb-6">הגישה המקצועית שלי</h2>
          <div className="w-16 h-0.5 bg-primary mx-auto mb-8" />
          <p className="body-lg text-muted-foreground">
            הגישה שלי לטיפול נפשי מבוססת על תפיסת עולם הומניסטית, מערכתית ופרגמטית.
            אני מאמין גדול ביכולות הריפוי וההתפתחות הטמונות בבני אדם — יכולות שניתן לממש בעבודה מכוונת היטב ובהינתן תנאים מתאימים.
          </p>
        </div>

        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6">
          {principles.map((p) => (
            <div
              key={p.title}
              className="bg-card rounded-xl p-8 hover:shadow-lg transition-all duration-300 border border-border/50 group"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                  <p.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-heading text-xl font-semibold text-foreground">
                  {p.title}
                </h3>
              </div>
              <p className="body-md text-muted-foreground text-sm leading-relaxed">
                {p.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ApproachSection;
