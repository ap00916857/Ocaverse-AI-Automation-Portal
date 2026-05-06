import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { isAdmin } from "@/lib/admin";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.title = "Admin Login";
    supabase.auth.getSession().then(({ data }) => {
      if (isAdmin(data.session?.user.email)) navigate("/admin", { replace: true });
    });
  }, [navigate]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) return toast.error(error.message);
    if (!isAdmin(data.user?.email)) {
      await supabase.auth.signOut();
      return toast.error("This account is not authorized.");
    }
    navigate("/admin", { replace: true });
  };

  return (
    <main className="min-h-screen grid place-items-center px-4">
      <form onSubmit={onSubmit} className="glass-strong rounded-3xl p-6 w-full max-w-sm space-y-4 shadow-elegant">
        <h1 className="text-xl font-semibold text-primary-glow">Admin Login</h1>
        <div className="space-y-2">
          <label className="text-xs text-primary-glow">Email</label>
          <Input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="bg-background/40 border-white/10" />
        </div>
        <div className="space-y-2">
          <label className="text-xs text-primary-glow">Password</label>
          <Input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className="bg-background/40 border-white/10" />
        </div>
        <Button type="submit" variant="hero" className="w-full" disabled={loading}>
          {loading ? "Signing in..." : "Sign in"}
        </Button>
      </form>
    </main>
  );
}
