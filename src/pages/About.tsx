import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const About = () => (
  <div className="min-h-screen flex flex-col">
    <Navbar />
    <main className="flex-1">
      <section className="section-padding">
        <div className="container-prose">
          <p className="eyebrow mb-5">אודות</p>
          <h1 className="heading-xl text-foreground mb-8">רחל אפק</h1>
          <div className="divider-thin mb-10" />
          <div className="prose-article">
            <p>
              רחל אפק היא כותבת ומסאית. כאן, במגזין האישי הזה, היא מפרסמת
              מאמרי דעה והגות על פוליטיקה, חברה, תרבות וענייני השעה.
            </p>
            <p>
              הבלוג נכתב מתוך אמונה שגם בעידן הרעש, יש מקום לקול שכותב לאט,
              קורא לאט, ומסרב לוותר על המורכבות. הטקסטים נכתבים כפי שאני מדברת
              עם חברים קרובים — בכנות, בלי שיווק ובלי כותרות מתחרות על קליק.
            </p>
            <h2>מה תמצאו כאן</h2>
            <p>
              מאמרים שמנסים להבין את ההווה דרך התבוננות פרטית, קריאות שונות
              של אירועים ציבוריים, והרהורים על תרבות, שפה ויחסים בין־אישיים
              בעידן הזה.
            </p>
            <h2>צרו קשר</h2>
            <p>
              אני שמחה לקרוא תגובות, הצעות והערות. ניתן לפנות אליי במייל בכתובת{" "}
              <a href="mailto:rchlafek@gmail.com">rchlafek@gmail.com</a>.
            </p>
          </div>
        </div>
      </section>
    </main>
    <Footer />
  </div>
);

export default About;
