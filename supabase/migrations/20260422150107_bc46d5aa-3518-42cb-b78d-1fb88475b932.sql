ALTER TABLE public.articles
ADD COLUMN IF NOT EXISTS sort_order integer;

WITH ordered_articles AS (
  SELECT id, row_number() OVER (ORDER BY created_at DESC, id DESC) AS new_sort_order
  FROM public.articles
)
UPDATE public.articles AS a
SET sort_order = oa.new_sort_order
FROM ordered_articles AS oa
WHERE a.id = oa.id
  AND a.sort_order IS NULL;

ALTER TABLE public.articles
ALTER COLUMN sort_order SET DEFAULT 0;

CREATE INDEX IF NOT EXISTS idx_articles_sort_order_created_at
ON public.articles (sort_order ASC, created_at DESC);