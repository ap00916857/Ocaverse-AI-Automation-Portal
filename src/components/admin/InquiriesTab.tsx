import { useState, useMemo } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { Search, Trash2 } from "lucide-react";
import { toast } from "sonner";

export type Contact = {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
  message: string;
  status: string;
  created_at: string;
};

const STATUSES = ["New", "Contacted", "Closed"] as const;
const statusVariant = (s: string) =>
  s === "Closed" ? "secondary" : s === "Contacted" ? "default" : "outline";

interface InquiriesTabProps {
  inquiries: Contact[];
  loading: boolean;
  setInquiries: React.Dispatch<React.SetStateAction<Contact[]>>;
}

export const InquiriesTab = ({ inquiries, loading, setInquiries }: InquiriesTabProps) => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const updateStatus = async (id: string, status: string) => {
    const prev = inquiries;
    setInquiries((r) => r.map((x) => (x.id === id ? { ...x, status } : x)));
    const { error } = await (supabase as any).from("contacts").update({ status }).eq("id", id);
    if (error) {
      setInquiries(prev);
      toast.error("Failed to update status.");
    } else {
      toast.success("Inquiry status updated.");
    }
  };

  const deleteInquiry = async (id: string) => {
    if (!confirm("Are you sure you want to delete this inquiry?")) return;
    const { error } = await (supabase as any).from("contacts").delete().eq("id", id);
    if (error) {
      toast.error(error.message);
    } else {
      setInquiries((prev) => prev.filter((item) => item.id !== id));
      toast.success("Inquiry deleted.");
    }
  };

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return inquiries.filter((r) => {
      if (statusFilter !== "all" && r.status !== statusFilter) return false;
      if (!q) return true;
      return (
        r.name.toLowerCase().includes(q) ||
        r.email.toLowerCase().includes(q) ||
        r.message.toLowerCase().includes(q)
      );
    });
  }, [inquiries, search, statusFilter]);

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by customer name, email, or message..."
            className="pl-9 bg-slate-900/50 border-white/10 text-sm"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-48 bg-slate-900/50 border-white/10">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            {STATUSES.map((s) => (
              <SelectItem key={s} value={s}>{s}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="glass-strong rounded-2xl overflow-hidden border border-white/10 bg-slate-950/40">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-white/10 hover:bg-transparent">
                <TableHead>Customer</TableHead>
                <TableHead>Contact Info</TableHead>
                <TableHead className="min-w-[280px]">Project Details</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Received</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="text-center text-slate-400 py-12">
                    {loading ? "Loading inquiries..." : "No matching inquiries found."}
                  </TableCell>
                </TableRow>
              )}
              {filtered.map((r) => (
                <TableRow key={r.id} className="border-white/5 hover:bg-slate-900/40">
                  <TableCell className="font-semibold text-white">{r.name}</TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-1 text-xs">
                      <a href={`mailto:${r.email}`} className="text-cyan-400 hover:underline">
                        {r.email}
                      </a>
                      {r.phone && <span className="text-slate-400">{r.phone}</span>}
                    </div>
                  </TableCell>
                  <TableCell className="max-w-md">
                    <p className="line-clamp-3 text-xs md:text-sm text-slate-300">{r.message}</p>
                  </TableCell>
                  <TableCell>
                    <Select value={r.status} onValueChange={(v) => updateStatus(r.id, v)}>
                      <SelectTrigger className="w-32 h-8 bg-slate-900/80 border-white/10 text-xs">
                        <SelectValue>
                          <Badge variant={statusVariant(r.status) as any}>{r.status}</Badge>
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        {STATUSES.map((s) => (
                          <SelectItem key={s} value={s}>{s}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell className="whitespace-nowrap text-xs text-slate-400">
                    {new Date(r.created_at).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-right">
                    <button
                      onClick={() => deleteInquiry(r.id)}
                      className="p-1.5 rounded-lg hover:bg-red-500/20 text-slate-400 hover:text-red-400 transition"
                      title="Delete inquiry"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};
