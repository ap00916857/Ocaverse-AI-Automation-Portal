import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter,
} from "@/components/ui/dialog";
import { Plus, Edit, Trash2, Upload, Image as ImageIcon } from "lucide-react";
import { toast } from "sonner";
import type { ToolItem } from "@/pages/ProductsPage";

interface ToolsTabProps {
  tools: ToolItem[];
  loadTools: () => Promise<void>;
  handleMediaUpload: (file: File) => Promise<string | null>;
}

export const ToolsTab = ({ tools, loadTools, handleMediaUpload }: ToolsTabProps) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [editingTool, setEditingTool] = useState<Partial<ToolItem> | null>(null);
  const [featuresInput, setFeaturesInput] = useState("");
  const [uploadingImage, setUploadingImage] = useState(false);

  const openNewModal = () => {
    setEditingTool({
      title: "",
      category: "AI Tools",
      badge: "NEW",
      description: "",
      price: "",
      demo_url: "",
      image_url: "",
      video_url: "",
    });
    setFeaturesInput("");
    setModalOpen(true);
  };

  const openEditModal = (tool: ToolItem) => {
    setEditingTool(tool);
    setFeaturesInput((tool.features || []).join("\n"));
    setModalOpen(true);
  };

  const saveTool = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingTool?.title) return toast.error("Title is required");

    const features = featuresInput
      .split("\n")
      .map((f) => f.trim())
      .filter(Boolean);

    const payload = {
      title: editingTool.title,
      category: editingTool.category || "AI Tools",
      badge: editingTool.badge || "",
      description: editingTool.description || "",
      price: editingTool.price || "",
      demo_url: editingTool.demo_url || "",
      image_url: editingTool.image_url || "",
      video_url: editingTool.video_url || "",
      features,
    };

    try {
      if (editingTool.id) {
        const { error } = await (supabase as any)
          .from("tools_items")
          .update(payload)
          .eq("id", editingTool.id);
        if (error) throw error;
        toast.success("Tool updated successfully!");
      } else {
        const { error } = await (supabase as any)
          .from("tools_items")
          .insert(payload);
        if (error) throw error;
        toast.success("New tool created successfully!");
      }
      setModalOpen(false);
      loadTools();
    } catch (err: any) {
      toast.error(err.message || "Failed to save tool.");
    }
  };

  const deleteTool = async (id: string) => {
    if (!confirm("Are you sure you want to delete this tool?")) return;
    try {
      const { error } = await (supabase as any).from("tools_items").delete().eq("id", id);
      if (error) throw error;
      toast.success("Tool removed.");
      loadTools();
    } catch (err: any) {
      toast.error(err.message || "Failed to delete tool.");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white">Dynamic Products & Tools</h2>
          <p className="text-xs text-slate-400">Items created here instantly render on the public /products page.</p>
        </div>
        <Button
          onClick={openNewModal}
          className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold shadow-[0_0_15px_rgba(6,182,212,0.3)]"
        >
          <Plus className="w-4 h-4 mr-1.5" /> Add Tool / Product
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tools.map((t) => (
          <div
            key={t.id}
            className="rounded-2xl border border-white/10 bg-slate-900/50 p-5 flex flex-col justify-between hover:border-cyan-500/40 transition"
          >
            <div>
              <div className="relative aspect-video rounded-xl overflow-hidden mb-4 bg-slate-950 border border-white/5">
                {t.image_url ? (
                  <img src={t.image_url} alt={t.title} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-600">
                    <ImageIcon className="w-8 h-8" />
                  </div>
                )}
                <span className="absolute top-2 left-2 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-cyan-500 text-slate-950">
                  {t.badge || t.category}
                </span>
              </div>

              <h3 className="text-lg font-bold text-white mb-1">{t.title}</h3>
              <p className="text-xs text-cyan-400 font-medium mb-2">{t.price || "Custom Pricing"}</p>
              <p className="text-xs text-slate-300 line-clamp-3 mb-4">{t.description}</p>
            </div>

            <div className="pt-3 border-t border-white/10 flex items-center justify-between">
              <span className="text-[11px] text-slate-400 bg-slate-800/80 px-2 py-1 rounded">
                {t.category}
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => openEditModal(t)}
                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition"
                  title="Edit tool"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  onClick={() => deleteTool(t.id)}
                  className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 transition"
                  title="Delete tool"
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
              {editingTool?.id ? "Edit Tool / Product" : "Create New Tool / Product"}
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={saveTool} className="space-y-4 py-2">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-slate-300 font-medium">Title *</label>
                <Input
                  required
                  value={editingTool?.title || ""}
                  onChange={(e) => setEditingTool({ ...editingTool, title: e.target.value })}
                  placeholder="e.g. WhatsApp AI Agent"
                  className="bg-slate-950 border-white/10 mt-1 text-sm"
                />
              </div>
              <div>
                <label className="text-xs text-slate-300 font-medium">Category</label>
                <Input
                  value={editingTool?.category || ""}
                  onChange={(e) => setEditingTool({ ...editingTool, category: e.target.value })}
                  placeholder="e.g. AI Automation"
                  className="bg-slate-950 border-white/10 mt-1 text-sm"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-slate-300 font-medium">Badge</label>
                <Input
                  value={editingTool?.badge || ""}
                  onChange={(e) => setEditingTool({ ...editingTool, badge: e.target.value })}
                  placeholder="e.g. NEW, HOT, POPULAR"
                  className="bg-slate-950 border-white/10 mt-1 text-sm"
                />
              </div>
              <div>
                <label className="text-xs text-slate-300 font-medium">Price Tag</label>
                <Input
                  value={editingTool?.price || ""}
                  onChange={(e) => setEditingTool({ ...editingTool, price: e.target.value })}
                  placeholder="e.g. ?8,000/mo or Free Preview"
                  className="bg-slate-950 border-white/10 mt-1 text-sm"
                />
              </div>
            </div>

            <div>
              <label className="text-xs text-slate-300 font-medium">Description</label>
              <Textarea
                rows={3}
                value={editingTool?.description || ""}
                onChange={(e) => setEditingTool({ ...editingTool, description: e.target.value })}
                placeholder="Explain what the tool does and who it is built for..."
                className="bg-slate-950 border-white/10 mt-1 text-sm"
              />
            </div>

            <div className="space-y-2 p-3 rounded-xl bg-slate-950/60 border border-white/5">
              <label className="text-xs text-cyan-300 font-semibold flex items-center gap-1.5">
                <ImageIcon className="w-3.5 h-3.5" /> Image / Thumbnail
              </label>
              <div className="flex gap-2 items-center">
                <Input
                  value={editingTool?.image_url || ""}
                  onChange={(e) => setEditingTool({ ...editingTool, image_url: e.target.value })}
                  placeholder="Paste image URL (or upload below)"
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
                        setEditingTool({ ...editingTool, image_url: url });
                        toast.success("Image uploaded!");
                      }
                      setUploadingImage(false);
                    }}
                  />
                </label>
              </div>
              {editingTool?.image_url && (
                <div className="w-full h-24 rounded-lg overflow-hidden mt-2 bg-slate-900">
                  <img src={editingTool.image_url} alt="Preview" className="w-full h-full object-contain" />
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-slate-300 font-medium">Video URL (YouTube)</label>
                <Input
                  value={editingTool?.video_url || ""}
                  onChange={(e) => setEditingTool({ ...editingTool, video_url: e.target.value })}
                  placeholder="e.g. https://youtu.be/..."
                  className="bg-slate-950 border-white/10 mt-1 text-xs"
                />
              </div>
              <div>
                <label className="text-xs text-slate-300 font-medium">Demo / Action Link</label>
                <Input
                  value={editingTool?.demo_url || ""}
                  onChange={(e) => setEditingTool({ ...editingTool, demo_url: e.target.value })}
                  placeholder="e.g. /new-arrival or https://wa.me/..."
                  className="bg-slate-950 border-white/10 mt-1 text-xs"
                />
              </div>
            </div>

            <div>
              <label className="text-xs text-slate-300 font-medium">Features (one per line)</label>
              <Textarea
                rows={3}
                value={featuresInput}
                onChange={(e) => setFeaturesInput(e.target.value)}
                placeholder="24/7 Response time&#10;Google Calendar sync&#10;Automated lead scoring"
                className="bg-slate-950 border-white/10 mt-1 text-xs font-mono"
              />
            </div>

            <DialogFooter className="pt-3">
              <Button type="button" variant="ghost" onClick={() => setModalOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold">
                Save Tool
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};
