import { Phone, Mail, MapPin } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const ContactSection = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const message = formData.get("message") as string;

    if (!name || !email || !message) {
      toast({
        title: "שגיאה",
        description: "אנא מלא את כל השדות הנדרשים",
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    }

    // For now, open mailto link as fallback until Cloud is set up
    const subject = encodeURIComponent(`פנייה מהאתר מאת ${name}`);
    const body = encodeURIComponent(`שם: ${name}\nאימייל: ${email}\nטלפון: ${phone}\n\n${message}`);
    window.location.href = `mailto:dahn.guy@gmail.com?subject=${subject}&body=${body}`;

    toast({
      title: "תודה!",
      description: "ההודעה נשלחה בהצלחה. אחזור אליך בהקדם.",
    });

    (e.target as HTMLFormElement).reset();
    setIsSubmitting(false);
  };

  return (
    <section id="contact" className="section-padding bg-background">
      <div className="container mx-auto">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="heading-lg text-foreground mb-6">צור קשר</h2>
          <div className="w-16 h-0.5 bg-primary mx-auto mb-8" />
          <p className="body-lg text-muted-foreground">
            מוזמנים ליצור קשר לשאלות, בירורים או לקביעת פגישת היכרות
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {[
              {
                icon: Phone,
                label: "טלפון",
                value: "050-5267891",
                href: "tel:0505267891",
              },
              {
                icon: Mail,
                label: "אימייל",
                value: "dahn.guy@gmail.com",
                href: "mailto:dahn.guy@gmail.com",
              },
              {
                icon: MapPin,
                label: "קליניקה",
                value: "רחוב יוסף קארו, תל אביב",
                href: undefined,
              },
            ].map((item) => (
              <div key={item.label} className="text-center">
                <item.icon className="w-6 h-6 text-primary mx-auto mb-3" />
                <p className="font-heading font-semibold text-foreground mb-1">
                  {item.label}
                </p>
                {item.href ? (
                  <a
                    href={item.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {item.value}
                  </a>
                ) : (
                  <p className="text-sm text-muted-foreground">{item.value}</p>
                )}
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid md:grid-cols-2 gap-5">
              <input
                type="text"
                name="name"
                placeholder="שם מלא"
                required
                className="w-full px-4 py-3 rounded-md bg-card border border-border text-foreground font-body text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
              <input
                type="email"
                name="email"
                placeholder="אימייל"
                required
                className="w-full px-4 py-3 rounded-md bg-card border border-border text-foreground font-body text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>
            <input
              type="tel"
              name="phone"
              placeholder="טלפון"
              className="w-full px-4 py-3 rounded-md bg-card border border-border text-foreground font-body text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
            <textarea
              rows={5}
              name="message"
              placeholder="הודעה"
              required
              className="w-full px-4 py-3 rounded-md bg-card border border-border text-foreground font-body text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none"
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-primary text-primary-foreground px-8 py-3 rounded-md font-body text-sm hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {isSubmitting ? "שולח..." : "שליחת הודעה"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
