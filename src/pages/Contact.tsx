import { useState } from "react";
import { z } from "zod";
import { Mail } from "lucide-react";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const schema = z.object({
  name: z.string().trim().min(1, "נא להזין שם").max(100, "שם ארוך מדי"),
  email: z.string().trim().email("כתובת מייל לא תקינה").max(255),
  message: z.string().trim().min(1, "נא להזין הודעה").max(2000, "הודעה ארוכה מדי"),
});

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      const errs: Record<string, string> = {};
      parsed.error.issues.forEach((i) => {
        if (i.path[0]) errs[String(i.path[0])] = i.message;
      });
      setErrors(errs);
      return;
    }
    setErrors({});
    const subject = encodeURIComponent(`פנייה מהאתר — ${parsed.data.name}`);
    const body = encodeURIComponent(`${parsed.data.message}\n\n—\n${parsed.data.name}\n${parsed.data.email}`);
    window.location.href = `mailto:rchlafek@gmail.com?subject=${subject}&body=${body}`;
    toast.success("פותח את תוכנת הדואר שלך...");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <section className="section-padding">
          <div className="container-prose">
            <p className="eyebrow mb-5">צרו קשר</p>
            <h1 className="heading-xl text-foreground mb-6">לכתוב חזרה</h1>
            <div className="divider-thin mb-10" />
            <p className="body-md text-muted-foreground mb-10">
              אשמח לקבל מכם תגובה, הערה או הצעה לנושא חדש. ניתן לפנות אליי
              באמצעות הטופס למטה או ישירות במייל.
            </p>

            <div className="flex items-center gap-3 mb-10 text-foreground/85">
              <Mail className="w-4 h-4 text-primary" />
              <a href="mailto:rchlafek@gmail.com" className="link-underline">
                rchlafek@gmail.com
              </a>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <Label htmlFor="name">שם</Label>
                <Input
                  id="name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="mt-2"
                  maxLength={100}
                />
                {errors.name && <p className="text-destructive text-sm mt-1">{errors.name}</p>}
              </div>
              <div>
                <Label htmlFor="email">דוא"ל</Label>
                <Input
                  id="email"
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="mt-2"
                  maxLength={255}
                />
                {errors.email && <p className="text-destructive text-sm mt-1">{errors.email}</p>}
              </div>
              <div>
                <Label htmlFor="message">הודעה</Label>
                <Textarea
                  id="message"
                  rows={6}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="mt-2"
                  maxLength={2000}
                />
                {errors.message && <p className="text-destructive text-sm mt-1">{errors.message}</p>}
              </div>
              <Button type="submit" className="rounded-sm">שליחה</Button>
            </form>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
