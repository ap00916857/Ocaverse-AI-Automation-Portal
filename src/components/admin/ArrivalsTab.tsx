import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter,
} from "@/components/ui/dialog";
import { Plus, Edit, Trash2, CheckCircle2, ExternalLink, Upload, Image as ImageIcon } from "lucide-react";
import { toast } from "sonner";
import type { NewArrivalItem } from "@/components/NewArrival";

interface ArrivalsTabProps {
  newArrivals: NewArrivalItem[];
  loadNewArrivals: () => Promise<void>;
  handleMediaUpload: (file: File) => Promise<string | null>;
}

export const ArrivalsTab = ({ newArrivals, loadNewArrivals, handleMediaUpload }: ArrivalsTabProps) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [editingArrival, setEditingArrival] = useState<Partial<NewArrivalItem> | null>(null);
  const [featuresInput, setFeaturesInput] = useState("");
  const [uploadingImage, setUploadingImage] = useState(false);

  const openNewModal = () => {
    setEditingArrival({
      title: "",
      subtitle: "",
      description: "",
      badge: "JUST LAUNCHED",
      category: "SaaS & Automation",
      early_bird_price: "?10,000",
      standard_price: "?15,000",
      image_url: "/lead-gen-preview.png",
      video_url: "https://www.youtube-nocookie.com/embed/m6f9HBKB2Ls",
      is_active: true,
    });
    setFeaturesInput("");
    setModalOpen(true);
  };

  const openEditModal = (item: NewArrivalItem) => {
    setEditingArrival(item);
    setFeaturesInput((item.features || []).join("\n"));
    setModalOpen(true);
  };

  const saveArrival = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingArrival?.title) return toast.error("Title is required");

    const features = featuresInput
      .split("\n")
      .map((f) => f.trim())
      .filter(Boolean);

    const payload = {
      title: editingArrival.title,
      subtitle: editingArrival.subtitle || "",
      description: editingArrival.description || "",
      badge: editingArrival.badge || "JUST LAUNCHED",
      category: editingArrival.category || "SaaS & Automation",
      early_bird_price: editingArrival.early_bird_price || "",
      standard_price: editingArrival.standard_price || "",
      image_url: editingArrival.image_url || "",
      video_url: editingArrival.video_url || "",
      is_active: editingArrival.is_active ?? true,
      features,
    };

    try {
      if (payload.is_active) {
        await (supabase as any)
          .from("new_arrivals_items")
          .update({ is_active: false })
          .neq("id", editingArrival.id || "00000000-0000-0000-0000-000000000000");
      }

      if (editingArrival.id) {
        const { error } = await (supabase as any)
          .from("new_arrivals_items")
          .update(payload)
          .eq("id", editingArrival.id);
        if (error) throw error;
        toast.success("New Arrival updated!");
      } else {
        const { error } = await (supabase as any)
          .from("new_arrivals_items")
          .insert(payload);
        if (error) throw error;
        toast.success("New Arrival showcase added!");
      }
      setModalOpen(false);
      loadNewArrivals();
    } catch (err: any) {
      toast.error(err.message || "Failed to save arrival showcase.");
    }
  };

  const deleteArrival = async (id: string) => {
    if (!confirm("Are you sure you want to delete this showcase item?")) return;
    try {
      const { error } = await (supabase as any).from("new_arrivals_items").delete().eq("id", id);
      if (error) throw error;
      toast.success("Showcase deleted.");
      loadNewArrivals();
    } catch (err: any) {
      toast.error(err.message || "Failed to delete showcase item.");
    }
  };

  const toggleArrivalActive = async (id: string, current: boolean) => {
    try {
      if (!current) {
        await (supabase as any).from("new_arrivals_items").update({ is_active: false }).neq("id", id);
      }
      const { error } = await (supabase as any)
        .from("new_arrivals_items")
        .update({ is_active: !current })
        .eq("id", id);
      if (error) throw error;
      loadNewArrivals();
      toast.success(!current ? "Set as live active showcase!" : "Deactivated showcase.");
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white">New Arrival Showcases</h2>
          <p className="text-xs text-slate-400">Controls the hero software showcase, video player, and pricing on /new-arrival.</p>
        </div>
        <Button
          onClick={openNewModal}
          className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold shadow-[0_0_15px_rgba(6,182,212,0.3)]"
        >
          <Plus className="w-4 h-4 mr-1.5" /> Add Showcase
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {newArrivals.map((a) => (
          <div
            key={a.id}
            className={`rounded-2xl border p-6 flex flex-col justify-between transition ${
              a.is_active
                ? "border-cyan-500 bg-cyan-950/20 shadow-[0_0_25px_rgba(6,182,212,0.15)]"
                : "border-white/10 bg-slate-900/40"
            }`}
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-cyan-500 text-slate-950">
                    {a.badge || "JUST LAUNCHED"}
                  </span>
                  {a.is_active && (
                    <span className="flex items-center gap-1 text-xs font-semibold text-green-400 bg-green-950/50 border border-green-500/30 px-2.5 py-0.5 rounded-full">
                      <CheckCircle2 className="w-3 h-3" /> Live on Site
                    </span>
                  )}
                </div>
                <Button
                  size="sm"
                  variant={a.is_active ? "secondary" : "outline"}
                  onClick={() => toggleArrivalActive(a.id, !!a.is_active)}
                  className="text-xs"
                >
                  {a.is_active ? "Deactivate" : "Make Live"}
                </Button>
              </div>

              <h3 className="text-xl font-bold text-white mb-1">{a.title}</h3>
              <p className="text-xs text-slate-300 mb-3">{a.subtitle}</p>

              <div className="relative aspect-video rounded-xl overflow-hidden mb-4 bg-slate-950 border border-white/10">
                <img src={a.image_url || "/lead-gen-preview.png"} alt={a.title} className="w-full h-full object-contain" />
              </div>

              <div className="flex gap-4 text-xs mb-4">
                <div className="p-2.5 rounded-xl bg-slate-950/60 flex-1">
                  <span className="text-slate-400 block text-[10px]">Early Bird</span>
                  <span className="font-bold text-cyan-300">{a.early_bird_price || "?10,000"}</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-950/60 flex-1">
                  <span className="text-slate-400 block text-[10px]">Standard</span>
                  <span className="font-bold text-white">{a.standard_price || "?15,000"}</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 flex items-center justify-between">
              <a
                href="/new-arrival"
                target="_blank"
                className="text-xs text-cyan-400 hover:underline flex items-center gap-1"
              >
                <span>View Public Page</span>
                <ExternalLink className="w-3 h-3" />
              </a>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => openEditModal(a)}
                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition"
                  title="Edit showcase"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  onClick={() => deleteArrival(a.id)}
                  className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 transition"
                  title="Delete showcase"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="max-w-xl bg-slate-900 border-white/10 text-white max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-cyan-400">
              {editingArrival?.id ? "Edit New Arrival Showcase" : "Create New Arrival Showcase"}
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={saveArrival} className="space-y-4 py-2">
            <div>
              <label className="text-xs text-slate-300 font-medium">Software Headline *</label>
              <Input
                required
                value={editingArrival?.title || ""}
                onChange={(e) => setEditingArrival({ ...editingArrival, title: e.target.value })}
                placeholder="e.g. Lead Generator Pro"
                className="bg-slate-950 border-white/10 mt-1 text-sm"
              />
            </div>

            <div>
              <label className="text-xs text-slate-300 font-medium">Subtitle</label>
              <Textarea
                rows={2}
                value={editingArrival?.subtitle || ""}
                onChange={(e) => setEditingArrival({ ...editingArrival, subtitle: e.target.value })}
                placeholder="Your AI-powered sales agent that never sleeps..."
                className="bg-slate-950 border-white/10 mt-1 text-xs"
              />
            </div>

            <div>
              <label className="text-xs text-slate-300 font-medium">Description (Target Audience)</label>
              <Input
                value={editingArrival?.description || ""}
                onChange={(e) => setEditingArrival({ ...editingArrival, description: e.target.value })}
                placeholder="e.g. Built for Real Estate · Medical · Legal · Restaurant"
                className="bg-slate-950 border-white/10 mt-1 text-xs"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-slate-300 font-medium">Badge</label>
                <Input
                  value={editingArrival?.badge || ""}
                  onChange={(e) => setEditingArrival({ ...editingArrival, badge: e.target.value })}
                  placeholder="e.g. JUST LAUNCHED"
                  className="bg-slate-950 border-white/10 mt-1 text-xs"
                />
              </div>
              <div>
                <label className="text-xs text-slate-300 font-medium">Category</label>
                <Input
                  value={editingArrival?.category || ""}
                  onChange={(e) => setEditingArrival({ ...editingArrival, category: e.target.value })}
                  placeholder="e.g. AI Sales Agent"
                  className="bg-slate-950 border-white/10 mt-1 text-xs"
                />
              </div>
            </div>

            <div>
              <label className="text-xs text-slate-300 font-medium">YouTube Video Demo URL</label>
              <Input
                value={editingArrival?.video_url || ""}
                onChange={(e) => setEditingArrival({ ...editingArrival, video_url: e.target.value })}
                placeholder="https://www.youtube.com/embed/... or https://youtu.be/..."
                className="bg-slate-950 border-white/10 mt-1 text-xs"
              />
            </div>

            <div className="space-y-2 p-3 rounded-xl bg-slate-950/60 border border-white/5">
              <label className="text-xs text-cyan-300 font-semibold flex items-center gap-1.5">
                <ImageIcon className="w-3.5 h-3.5" /> High-Resolution Thumbnail Image
              </label>
              <div className="flex gap-2 items-center">
                <Input
                  value={editingArrival?.image_url || ""}
                  onChange={(e) => setEditingArrival({ ...editingArrival, image_url: e.target.value })}
                  placeholder="Paste thumbnail URL (e.g. /lead-gen-preview.png)"
                  className="bg-slate-900 border-white/10 text-xs"
                />
                <label className="cursor-pointer px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold whitespace-nowrap flex items-center gap-1 border border-white/10">
                  <Upload className="w-3.5 h-3.5" />
                  <span>{uploadingImage ? "Uploading..." : "Upload File"}</span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    disabled={uploadingImage}
                    onChange={async (e) => {
                      const file = e.target.files?.[0];
                      if (!file) return;
                      setUploadingImage(true);
                      const url = await handleMediaUpload(file);
                      if (url) {
                        setEditingArrival({ ...editingArrival, image_url: url });
                        toast.success("Thumbnail uploaded!");
                      }
                      setUploadingImage(false);
                    }}
                  />
                </label>
              </div>
              {editingArrival?.image_url && (
                <div className="w-full h-24 rounded-lg overflow-hidden mt-2 bg-slate-900">
                  <img src={editingArrival.image_url} alt="Preview" className="w-full h-full object-contain" />
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-slate-300 font-medium">Early Bird Price</label>
                <Input
                  value={editingArrival?.early_bird_price || ""}
                  onChange={(e) => setEditingArrival({ ...editingArrival, early_bird_price: e.target.value })}
                  placeholder="e.g. ?10,000"
                  className="bg-slate-950 border-white/10 mt-1 text-xs"
                />
              </div>
              <div>
                <label className="text-xs text-slate-300 font-medium">Standard Price</label>
                <Input
                  value={editingArrival?.standard_price || ""}
                  onChange={(e) => setEditingArrival({ ...editingArrival, standard_price: e.target.value })}
                  placeholder="e.g. ?15,000"
                  className="bg-slate-950 border-white/10 mt-1 text-xs"
                />
              </div>
            </div>

            <div>
              <label className="text-xs text-slate-300 font-medium">Feature Highlights (one per line)</label>
              <Textarea
                rows={3}
                value={featuresInput}
                onChange={(e) => setFeaturesInput(e.target.value)}
                placeholder="Up to 2000 leads/month&#10;WhatsApp AI Agent&#10;Full Analytics Dashboard"
                className="bg-slate-950 border-white/10 mt-1 text-xs font-mono"
              />
            </div>

            <div className="flex items-center gap-2 pt-1">
              <input
                type="checkbox"
                id="is_active"
                checked={editingArrival?.is_active ?? true}
                onChange={(e) => setEditingArrival({ ...editingArrival, is_active: e.target.checked })}
                className="rounded border-white/20 bg-slate-950 text-cyan-500 focus:ring-cyan-400"
              />
              <label htmlFor="is_active" className="text-xs text-slate-200 cursor-pointer">
                Set as live active showcase on /new-arrival
              </label>
            </div>

            <DialogFooter className="pt-3">
              <Button type="button" variant="ghost" onClick={() => setModalOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold">
                Save Showcase
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};
