import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { isAdmin } from "@/lib/admin";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { LogOut, RefreshCw, MessageSquare, Wrench, Flame } from "lucide-react";
import { InquiriesTab, type Contact } from "@/components/admin/InquiriesTab";
import { ToolsTab } from "@/components/admin/ToolsTab";
import { ArrivalsTab } from "@/components/admin/ArrivalsTab";
import type { ToolItem } from "./ProductsPage";
import type { NewArrivalItem } from "@/components/NewArrival";

export default function Admin() {
  const navigate = useNavigate();
  const [ready, setReady] = useState(false);
  const [activeTab, setActiveTab] = useState("inquiries");

  // Inquiries State
  const [inquiries, setInquiries] = useState<Contact[]>([]);
  const [loadingInquiries, setLoadingInquiries] = useState(false);

  // Tools CMS State
  const [tools, setTools] = useState<ToolItem[]>([]);

  // New Arrivals CMS State
  const [newArrivals, setNewArrivals] = useState<NewArrivalItem[]>([]);

  // Auth Protection
  useEffect(() => {
    document.title = "Admin Portal · OcaVerse";
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

  const loadInquiries = async () => {
    setLoadingInquiries(true);
    const { data, error } = await (supabase as any)
      .from("contacts")
      .select("*")
      .order("created_at", { ascending: false });
    setLoadingInquiries(false);
    if (error) return toast.error(error.message);
    setInquiries((data ?? []) as Contact[]);
  };

  const loadTools = async () => {
    try {
      const { data, error } = await (supabase as any)
        .from("tools_items")
        .select("*")
        .order("created_at", { ascending: false });
      if (!error && data) setTools(data as ToolItem[]);
    } catch (err) {
      console.warn("Could not load tools_items:", err);
    }
  };

  const loadNewArrivals = async () => {
    try {
      const { data, error } = await (supabase as any)
        .from("new_arrivals_items")
        .select("*")
        .order("created_at", { ascending: false });
      if (!error && data) setNewArrivals(data as NewArrivalItem[]);
    } catch (err) {
      console.warn("Could not load new_arrivals_items:", err);
    }
  };

  useEffect(() => {
    if (ready) {
      loadInquiries();
      loadTools();
      loadNewArrivals();
    }
  }, [ready]);

  const handleMediaUpload = async (file: File): Promise<string | null> => {
    try {
      const fileExt = file.name.split(".").pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 7)}.${fileExt}`;
      const filePath = `cms/${fileName}`;
      const { error: uploadError } = await supabase.storage.from("media").upload(filePath, file);
      if (uploadError) throw uploadError;
      const { data } = supabase.storage.from("media").getPublicUrl(filePath);
      return data.publicUrl;
    } catch (err: any) {
      toast.error(`Storage bucket error: ${err.message}. You can paste a direct URL.`);
      return null;
    }
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    navigate("/admin/login", { replace: true });
  };

  if (!ready) return null;

  return (
    <main className="min-h-screen container mx-auto py-8 px-4 max-w-7xl">
      {/* Top Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-6 border-b border-white/10">
        <div>
          <h1 className="text-3xl font-extrabold text-cyan-400 flex items-center gap-2">
            <span>OcaVerse</span>
            <span className="text-white text-xl font-normal">| Admin CMS</span>
          </h1>
          <p className="text-xs md:text-sm text-slate-400 mt-1">
            Dynamic content control center for Inquiries, Tools & Products, and New Arrivals.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              loadInquiries();
              loadTools();
              loadNewArrivals();
              toast.success("Refreshed all CMS data.");
            }}
            className="border-white/10 bg-slate-900/60"
          >
            <RefreshCw className="h-4 w-4 mr-1.5" /> Refresh
          </Button>
          <Button
            variant="destructive"
            size="sm"
            onClick={signOut}
            className="bg-red-500/20 text-red-300 hover:bg-red-500/30 border border-red-500/30"
          >
            <LogOut className="h-4 w-4 mr-1.5" /> Sign out
          </Button>
        </div>
      </div>

      {/* Main Tab Navigation */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="bg-slate-900/80 p-1.5 border border-white/10 rounded-2xl flex flex-wrap gap-2 w-auto max-w-md">
          <TabsTrigger
            value="inquiries"
            className="rounded-xl flex items-center gap-2 data-[state=active]:bg-cyan-500 data-[state=active]:text-slate-950"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Inquiries ({inquiries.length})</span>
          </TabsTrigger>
          <TabsTrigger
            value="tools"
            className="rounded-xl flex items-center gap-2 data-[state=active]:bg-cyan-500 data-[state=active]:text-slate-950"
          >
            <Wrench className="w-4 h-4" />
            <span>Tools & Products ({tools.length})</span>
          </TabsTrigger>
          <TabsTrigger
            value="arrivals"
            className="rounded-xl flex items-center gap-2 data-[state=active]:bg-cyan-500 data-[state=active]:text-slate-950"
          >
            <Flame className="w-4 h-4" />
            <span>New Arrivals ({newArrivals.length})</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="inquiries" className="space-y-4 m-0">
          <InquiriesTab
            inquiries={inquiries}
            loading={loadingInquiries}
            setInquiries={setInquiries}
          />
        </TabsContent>

        <TabsContent value="tools" className="space-y-6 m-0">
          <ToolsTab
            tools={tools}
            loadTools={loadTools}
            handleMediaUpload={handleMediaUpload}
          />
        </TabsContent>

        <TabsContent value="arrivals" className="space-y-6 m-0">
          <ArrivalsTab
            newArrivals={newArrivals}
            loadNewArrivals={loadNewArrivals}
            handleMediaUpload={handleMediaUpload}
          />
        </TabsContent>
      </Tabs>
    </main>
  );
}
