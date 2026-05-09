import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { isAdmin } from "@/lib/admin";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { LogOut, Search, RefreshCw } from "lucide-react";

type Contact = {
  id: string;
  name: string;
  email: string;
  message: string;
  status: string;
  created_at: string;
};

const STATUSES = ["New", "Contacted", "Closed"] as const;

const statusVariant = (s: string) =>
  s === "Closed" ? "secondary" : s === "Contacted" ? "default" : "outline";

export default function Admin() {
  const navigate = useNavigate();
  const [ready, setReady] = useState(false);
  const [rows, setRows] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  useEffect(() => {
    document.title = "Admin · Inquiries";
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
      if (!isAdmin(session?.user.email)) navigate("/admin/login", { replace: true });
    });
    supabase.auth.getSession().then(({ data }) => {
      if (!isAdmin(data.session?.user.email)) {
        navigate("/admin/login", { replace: true });
      } else {
        setReady(true);
      }
    });
    return () => sub.subscription.unsubscribe();
  }, [navigate]);

  const load = async () => {
    setLoading(true);
    const { data, error } = await (supabase as any)
      .from("contacts")
      .select("*")
      .order("created_at", { ascending: false });
    setLoading(false);
    if (error) return toast.error(error.message);
    setRows((data ?? []) as Contact[]);
  };

  useEffect(() => {
    if (ready) load();
  }, [ready]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return rows.filter((r) => {
      if (statusFilter !== "all" && r.status !== statusFilter) return false;
      if (!q) return true;
      return (
        r.name.toLowerCase().includes(q) ||
        r.email.toLowerCase().includes(q) ||
        r.message.toLowerCase().includes(q)
      );
    });
  }, [rows, search, statusFilter]);

  const updateStatus = async (id: string, status: string) => {
    const prev = rows;
    setRows((r) => r.map((x) => (x.id === id ? { ...x, status } : x)));
    const { error } = await supabase.from("contacts").update({ status }).eq("id", id);
    if (error) {
      setRows(prev);
      toast.error("Failed to update status.");
    } else {
      toast.success("Status updated.");
    }
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    navigate("/admin/login", { replace: true });
  };

  if (!ready) return null;

  return (
    <main className="min-h-screen container py-8">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-semibold text-primary-glow">Inquiries</h1>
          <p className="text-sm text-muted-foreground">{filtered.length} of {rows.length}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={load} disabled={loading}>
            <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} /> Refresh
          </Button>
          <Button variant="outline" size="sm" onClick={signOut}>
            <LogOut className="h-4 w-4" /> Sign out
          </Button>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search name, email, message..."
            className="pl-9 bg-background/40 border-white/10"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-48 bg-background/40 border-white/10">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All statuses</SelectItem>
            {STATUSES.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>

      <div className="glass-strong rounded-2xl overflow-hidden border border-white/10">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead className="min-w-[260px]">Message</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Created</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="text-center text-muted-foreground py-10">
                    {loading ? "Loading..." : "No inquiries found."}
                  </TableCell>
                </TableRow>
              )}
              {filtered.map((r) => (
                <TableRow key={r.id}>
                  <TableCell className="font-medium">{r.name}</TableCell>
                  <TableCell><a href={`mailto:${r.email}`} className="hover:underline">{r.email}</a></TableCell>
                  <TableCell className="max-w-md">
                    <p className="line-clamp-3 text-sm text-muted-foreground">{r.message}</p>
                  </TableCell>
                  <TableCell>
                    <Select value={r.status} onValueChange={(v) => updateStatus(r.id, v)}>
                      <SelectTrigger className="w-32 h-8 bg-background/40 border-white/10">
                        <SelectValue>
                          <Badge variant={statusVariant(r.status) as any}>{r.status}</Badge>
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        {STATUSES.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell className="whitespace-nowrap text-sm text-muted-foreground">
                    {new Date(r.created_at).toLocaleString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </main>
  );
}
