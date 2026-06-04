import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import RichTextEditor from "@/components/admin/RichTextEditor";
import { Switch } from "@/components/ui/switch";
import { Pencil, Trash2, Plus, LogOut } from "lucide-react";
import { toast } from "sonner";

interface Article {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  slug: string;
  published: boolean;
  sort_order: number | null;
  image_url?: string | null;
  created_at: string;
  updated_at: string;
}

const emptyArticle = {
  title: "",
  excerpt: "",
  content: "",
  slug: "",
  published: false,
  sort_order: 0,
  image_url: null as string | null,
};

const BUCKET = "article-images";

const Admin = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [editing, setEditing] = useState<Partial<Article> | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/admin/login");
        return;
      }
      fetchArticles();
    };
    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === "SIGNED_OUT") navigate("/admin/login");
    });
    return () => subscription.unsubscribe();
  }, [navigate]);

  const fetchArticles = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("articles")
      .select("*")
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: false });

    if (error) {
      toast.error("Failed to load articles");
    } else {
      setArticles(data || []);
    }
    setLoading(false);
  };

  const generateSlug = (title: string) =>
    title
      .toLowerCase()
      .replace(/[^\w\s\u0590-\u05FF-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .substring(0, 80);

  const handleSave = async () => {
    if (!editing) return;
    if (!editing.title || !editing.slug) {
      toast.error("Title and slug are required");
      return;
    }

    const payload = {
      title: editing.title,
      excerpt: editing.excerpt || "",
      content: editing.content || "",
      slug: editing.slug,
      published: editing.published ?? false,
      sort_order: Number.isFinite(editing.sort_order) ? Number(editing.sort_order) : 0,
      image_url: editing.image_url ?? null,
      updated_at: new Date().toISOString(),
    } as any;

    if (editing.id) {
      const { error } = await supabase
        .from("articles")
        .update(payload)
        .eq("id", editing.id);
      if (error) {
        toast.error("Failed to update article");
        return;
      }
      toast.success("Article updated");
    } else {
      const { error } = await supabase.from("articles").insert(payload);
      if (error) {
        toast.error("Failed to create article");
        return;
      }
      toast.success("Article created");
    }

    setEditing(null);
    fetchArticles();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this article?")) return;
    const { error } = await supabase.from("articles").delete().eq("id", id);
    if (error) {
      toast.error("Failed to delete");
      return;
    }
    toast.success("Article deleted");
    fetchArticles();
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background" dir="ltr">
      <header className="border-b border-border px-6 py-4 flex items-center justify-between">
        <h1 className="text-xl font-heading font-bold text-foreground">Articles CMS</h1>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" onClick={() => navigate("/")}>
            View Site
          </Button>
          <Button variant="ghost" size="sm" onClick={handleLogout}>
            <LogOut className="w-4 h-4 mr-1" /> Logout
          </Button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto p-6">
        {editing ? (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-heading font-semibold text-foreground">
                {editing.id ? "Edit Article" : "New Article"}
              </h2>
              <Button variant="ghost" onClick={() => setEditing(null)}>Cancel</Button>
            </div>

            <div>
              <Label>Title</Label>
              <Input
                value={editing.title || ""}
                onChange={(e) => {
                  const title = e.target.value;
                  setEditing((prev) => ({
                    ...prev,
                    title,
                    slug: prev?.id ? prev.slug : generateSlug(title),
                  }));
                }}
              />
            </div>

            <div>
              <Label>Slug</Label>
              <Input
                value={editing.slug || ""}
                onChange={(e) => setEditing((prev) => ({ ...prev, slug: e.target.value }))}
              />
            </div>

            <div>
              <Label>Sort order</Label>
              <Input
                type="number"
                inputMode="numeric"
                value={editing.sort_order ?? 0}
                onChange={(e) =>
                  setEditing((prev) => ({
                    ...prev,
                    sort_order: Number.parseInt(e.target.value || "0", 10) || 0,
                  }))
                }
              />
            </div>

            <div>
              <Label>Excerpt</Label>
              <Textarea
                rows={2}
                value={editing.excerpt || ""}
                onChange={(e) => setEditing((prev) => ({ ...prev, excerpt: e.target.value }))}
              />
            </div>

            <div>
              <Label>Content</Label>
              <RichTextEditor
                content={editing.content || ""}
                onChange={(html) => setEditing((prev) => ({ ...prev, content: html }))}
              />
            </div>

            <div className="flex items-center gap-2">
              <Switch
                checked={editing.published ?? false}
                onCheckedChange={(checked) => setEditing((prev) => ({ ...prev, published: checked }))}
              />
              <Label>Published</Label>
            </div>

            <Button onClick={handleSave}>Save</Button>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-heading font-semibold text-foreground">
                All Articles ({articles.length})
              </h2>
              <Button onClick={() => setEditing({ ...emptyArticle })}>
                <Plus className="w-4 h-4 mr-1" /> New Article
              </Button>
            </div>

            <div className="space-y-3">
              {articles.map((article) => (
                <div
                  key={article.id}
                  className="flex items-center justify-between p-4 bg-card rounded-lg border border-border"
                >
                  <div>
                    <h3 className="font-medium text-foreground">{article.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      #{article.sort_order ?? 0} · /{article.slug} · {article.published ? "Published" : "Draft"}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" onClick={() => setEditing(article)}>
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDelete(article.id)}>
                      <Trash2 className="w-4 h-4 text-destructive" />
                    </Button>
                  </div>
                </div>
              ))}

              {articles.length === 0 && (
                <p className="text-center text-muted-foreground py-8">
                  No articles yet. Create your first one!
                </p>
              )}
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default Admin;
