
-- Articles table
CREATE TABLE public.articles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  excerpt TEXT NOT NULL DEFAULT '',
  content TEXT NOT NULL DEFAULT '',
  slug TEXT NOT NULL UNIQUE,
  published BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.articles ENABLE ROW LEVEL SECURITY;

-- Public can read published articles
CREATE POLICY "Anyone can read published articles"
ON public.articles
FOR SELECT
USING (published = true);

-- Authenticated users can do everything (you're the only admin)
CREATE POLICY "Authenticated users can manage articles"
ON public.articles
FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

-- Insert sample articles
INSERT INTO public.articles (title, excerpt, content, slug, published, created_at) VALUES
(
  'הקשר בין גוף לנפש בטיפול פסיכולוגי',
  'כיצד הגוף משתתף בתהליך הטיפולי ולמה חשוב להקשיב לו? מאמר על הממשק בין חוויה גופנית לתהליך נפשי.',
  'לורם איפסום דולור סיט אמט, קונסקטטור אדיפיסינג אלית. סד עס לא מקמט, קולורס מעמידים. מנחם, אד מינימום, סד אלימנטום סדום ניסי.

לורם איפסום דולור סיט אמט, קונסקטטור אדיפיסינג אלית. הראשעמ, קולורס מעמידים. תוחלמ, מנחם לימא, גזמך, שקקש.

בעל סמך לראות. תאדה, קולהמ. לורם איפסום דולור סיט אמט, קונסקטטור אדיפיסינג אלית.',
  'body-mind-connection',
  true,
  '2026-01-15'
),
(
  'חרדה בעידן המודרני — מבט פסיכולוגי',
  'מדוע החרדה הפכה למגפה של הדור שלנו, ומה אפשר לעשות עם זה? תובנות מהקליניקה.',
  'לורם איפסום דולור סיט אמט, קונסקטטור אדיפיסינג אלית. סד עס לא מקמט, קולורס מעמידים. מנחם, אד מינימום, סד אלימנטום סדום ניסי.

לורם איפסום דולור סיט אמט, קונסקטטור אדיפיסינג אלית. הראשעמ, קולורס מעמידים. תוחלמ, מנחם לימא, גזמך, שקקש.',
  'modern-anxiety',
  true,
  '2025-11-10'
),
(
  'על השתיקה בחדר הטיפול',
  'השתיקה היא לא ריקנות — היא מרחב. מאמר על המקום של השתיקה בתהליך הטיפולי ומה היא מאפשרת.',
  'לורם איפסום דולור סיט אמט, קונסקטטור אדיפיסינג אלית. סד עס לא מקמט, קולורס מעמידים. מנחם, אד מינימום, סד אלימנטום סדום ניסי.

לורם איפסום דולור סיט אמט, קונסקטטור אדיפיסינג אלית. הראשעמ, קולורס מעמידים.',
  'silence-in-therapy',
  true,
  '2025-09-20'
);
