import profilePic from "@/assets/profile-pic.png";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const learningCards = [
  {
    title: "היות אדם בעולם",
    content:
      "חלק עיקרי מהידע וההבנה המקצועיים שלי נרכש וממשיך להיות מוזן מהמגוון הרחב של חוויות והתנסויות שעברתי בחיי האישיים ובמיוחד מנסיון החיים של השתתפותי במערכות יחסים: כבן, כאח, כבן-זוג, כהורה, כחבר, וכמטופל בעצמי.",
    borderColor: "border-primary/50",
  },
  {
    title: "לימודים אקדמיים, הכשרות והסמכות",
    items: [
      "תואר ראשון בפסיכולוגיה מתמטיקה ופילוסופיה — אוניברסיטת ת״א",
      "לימודי תואר שני בפסיכולוגיה קלינית — אוניברסיטת בר אילן",
      "דוקטורט Psy.D בפסיכולוגיה קלינית — University of Denver School of Professional Psychology",
      "טיפול משפחתי — מכון ברקאי, Colorado Institute of Marital and Family Therapy",
      "מוסמך כפסיכולוג קליני מומחה, וכמטפל ומדריך בטיפול משפחתי וזוגי",
      "לימודי היפנוזה אצל הפסיכיאטר ג׳אן ריינק והפסיכולוגים סוזאן פופ ונחי אלון",
    ],
    borderColor: "border-accent/50",
  },
  {
    title: "ניסיון מקצועי",
    items: [
      "חבר סגל הוראה, מדריך ויועץ — בי״ס לרפואה UCSF",
      "מייסד שותף, מטפל ומדריך — מכון שינוי",
      "מרצה בחוג למדעי ההתנהגות בביה״ס לרפואה — אוניברסיטת ת״א",
      "מנהל קליני וראש תכנית הכשרה — מכון ברקאי",
      "מעל 45 שנה של עבודה בפרקטיקה פרטית בטיפול אישי, זוגי ומשפחתי",
    ],
    borderColor: "border-primary/50",
  },
  {
    title: "לימודי גוף נפש וגישות אלטרנטיביות",
    items: [
      "10 שנים לימודי קונג פו לאו חו — בי״ס שאמבלה, תל אביב",
      "16 שנה לימוד שיטת אלכסנדר אצל אור שחר",
      "מדיטציות הילינג אצל טובה אלדד",
      "לימודי NLP אצל ג'ון גרינדר ואצל ג'ון סטיבנס וקוניריי אנדראס ממכון בולדר",
    ],
    borderColor: "border-accent/50",
  },
];

const AboutSection = () => {
  return (
    <section id="about" className="section-padding bg-card">
      <div className="container mx-auto">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="heading-lg text-foreground mb-6">אודות</h2>
          <div className="w-16 h-0.5 bg-primary mx-auto" />
        </div>

        {/* Top: Photo + free text */}
        <div className="max-w-5xl mx-auto grid md:grid-cols-5 gap-12 items-start mb-16">
          <div className="md:col-span-2 flex justify-center">
            <div className="relative">
              <div className="absolute -inset-3 bg-primary/10 rounded-2xl rotate-2" />
              <img
                src={profilePic}
                alt="ד״ר דן גיא"
                className="relative rounded-xl shadow-lg w-full max-w-xs h-auto object-cover"
              />
            </div>
          </div>
          <div className="md:col-span-3 text-right space-y-5">
            <p className="font-body text-foreground/80 leading-relaxed text-[17px]">
              נולדתי אל משפחה אוהבת, ״נורמטיבית״ ועל פניו — תקינה ותומכת. אך
              בילדותי סבלתי מסימפטומים פסיכוסומטיים ובנעורי יצאתי מהבית אל חיים
              סוערים ורוויים בסבל, שניסתי לפוגג לשווא באמצעות הרפתקנות,
              אלכוהול, סמים ומפלטים אחרים.
            </p>
            <p className="font-body text-foreground/80 leading-relaxed text-[17px]">
              בגיל 26, לאחר נישואי בוסר וגירושים ומספר הרפתקאות כושלות בארץ
              ובחו״ל — הגעתי לטיפול הנפשי הראשון שלי בתחושה עמוקה ונואשת של
              אובדן דרך. במסגרת הטיפול למדתי לזהות את הגורמים המשפחתיים
              שהשפעתם עלי הייתה פוצעת ומגבילה, והתחלתי להצטייד בכלים להתגברות
              על הפגיעוֹת והמחסומים שלי.
            </p>
            <p className="font-body text-foreground/80 leading-relaxed text-[17px]">
              התהליך העוצמתי שעברתי בטיפול משך אותי לבחור בקריירה של מטפל:
              המצוקה והסבל שהיו נחלתי והחשיפה ל"עולמות" אנושיים שונים ומשונים,
              הפכו בתהליך אלכימי לכלים שמאפשרים לי להתחבר אל אנשים שונים ולהבין לנפשם.
            </p>
          </div>
        </div>

        {/* Lead-in paragraph */}
        <div className="max-w-5xl mx-auto text-right mb-6 mt-2">
          <p className="font-body text-foreground/80 leading-relaxed text-[17px] font-medium">
            יותר מארבעה עשורים חלפו, ואני ממשיך כתלמיד בלתי-נלאה של ריפוי והתפתחות אנושית. את הכלים והידע שלי אני שואב ממגוון מקורות:
          </p>
        </div>

        {/* 4 learning cards as accordion */}
        <div className="max-w-5xl mx-auto" dir="rtl">
          <Accordion type="multiple" className="space-y-3">
            {learningCards.map((card, index) => (
              <AccordionItem
                key={card.title}
                value={`item-${index}`}
                className={`rounded-xl bg-background border border-border/60 border-r-[4px] ${card.borderColor} px-6 overflow-hidden`}
              >
                <AccordionTrigger className="font-heading text-lg font-semibold text-foreground hover:no-underline text-right">
                  {card.title}
                </AccordionTrigger>
                <AccordionContent className="text-right">
                  {card.content && (
                    <p className="font-body text-foreground/75 leading-relaxed text-[15px]">
                      {card.content}
                    </p>
                  )}
                  {card.items && (
                    <ul className="space-y-1.5">
                      {card.items.map((item, i) => (
                        <li
                          key={i}
                          className="font-body text-foreground/75 leading-relaxed text-[15px] flex items-start gap-2"
                        >
                          <span className="text-primary/60 mt-1 shrink-0">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
