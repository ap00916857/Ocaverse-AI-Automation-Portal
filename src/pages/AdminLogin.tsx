import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { ADMIN_EMAIL, isAdmin } from "@/lib/admin";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.title = "Admin Access";
    supabase.auth.getSession().then(({ data }) => {
      if (isAdmin(data.session?.user.email)) navigate("/admin", { replace: true });
    });
  }, [navigate]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;
    if (!isAdmin(email)) {
      return toast.error("This email is not authorized for admin access.");
    }
    setLoading(true);
    try {
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: `${window.location.origin}/admin` },
        });
        if (error) throw error;
        toast.success("Account created. You can now sign in.");
        setMode("signin");
      } else {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        if (!isAdmin(data.user?.email)) {
          await supabase.auth.signOut();
          throw new Error("This account is not authorized.");
        }
        navigate("/admin", { replace: true });
      }
    } catch (err: any) {
      toast.error(err.message ?? "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen grid place-items-center px-4">
      <div className="glass-strong rounded-3xl p-6 w-full max-w-sm shadow-elegant space-y-5">
        <div className="space-y-1">
          <h1 className="text-xl font-semibold text-primary-glow">Admin Access</h1>
          <p className="text-xs text-muted-foreground">
            Restricted to <span className="font-medium">{ADMIN_EMAIL}</span>
          </p>
        </div>

        <Tabs value={mode} onValueChange={(v) => setMode(v as typeof mode)}>
          <TabsList className="grid grid-cols-2 w-full">
            <TabsTrigger value="signin">Sign in</TabsTrigger>
            <TabsTrigger value="signup">Sign up</TabsTrigger>
          </TabsList>

          <form onSubmit={onSubmit} className="space-y-4 mt-4">
            <div className="space-y-2">
              <label className="text-xs text-primary-glow">Email</label>
              <Input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={ADMIN_EMAIL}
                className="bg-background/40 border-white/10"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs text-primary-glow">Password</label>
              <Input
                type="password"
                required
                minLength={8}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-background/40 border-white/10"
              />
            </div>
            <Button type="submit" variant="hero" className="w-full" disabled={loading}>
              {loading
                ? mode === "signup" ? "Creating..." : "Signing in..."
                : mode === "signup" ? "Create admin account" : "Sign in"}
            </Button>
            <TabsContent value="signin" className="m-0" />
            <TabsContent value="signup" className="m-0" />
          </form>
        </Tabs>
      </div>
    </main>
  );
}
