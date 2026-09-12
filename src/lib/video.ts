/**
 * Video URL parsing and embedding utilities
 * Handles standard YouTube watch links, short links, shorts, embeds, and raw IDs,
 * converting them into safe, high-performance embed URLs that bypass iframe restrictions.
 */

export function extractYouTubeId(url: string | null | undefined): string | null {
  if (!url) return null;
  const clean = url.trim();

  // 1. Direct 11-char ID
  if (/^[a-zA-Z0-9_-]{11}$/.test(clean)) {
    return clean;
  }

  // 2. Standard watch URL: youtube.com/watch?v=ID (handles extra query params)
  const watchMatch = clean.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/|youtube\.com\/shorts\/|youtube\.com\/live\/)([a-zA-Z0-9_-]{11})/i);
  if (watchMatch && watchMatch[1]) {
    return watchMatch[1];
  }

  // 3. Fallback URL object parsing
  try {
    const parsed = new URL(clean);
    if (parsed.hostname.includes("youtube.com")) {
      const v = parsed.searchParams.get("v");
      if (v && v.length === 11) return v;
      const pathParts = parsed.pathname.split("/").filter(Boolean);
      const last = pathParts[pathParts.length - 1];
      if (last && last.length === 11) return last;
    }
    if (parsed.hostname === "youtu.be") {
      const pathParts = parsed.pathname.split("/").filter(Boolean);
      const first = pathParts[0];
      if (first && first.length === 11) return first;
    }
  } catch {
    // Ignore URL parse error
  }

  return null;
}

export function getYouTubeEmbedUrl(urlOrId: string | null | undefined, autoplay = true): string {
  if (!urlOrId) return "";
  const id = extractYouTubeId(urlOrId);

  if (id) {
    const params = new URLSearchParams({
      autoplay: autoplay ? "1" : "0",
      rel: "0",
      modestbranding: "1",
      playsinline: "1",
      enablejsapi: "1",
    });
    return `https://www.youtube-nocookie.com/embed/${id}?${params.toString()}`;
  }

  // If it's already an embed link (e.g. Vimeo or custom host)
  if (urlOrId.includes("/embed/")) {
    const sep = urlOrId.includes("?") ? "&" : "?";
    return autoplay ? `${urlOrId}${sep}autoplay=1&playsinline=1` : urlOrId;
  }

  // Vimeo support
  const vimeoMatch = urlOrId.match(/vimeo\.com\/(?:channels\/(?:\w+\/)?|groups\/(?:[^\/]*)\/videos\/|album\/(?:\d+)\/video\/|video\/|)(\d+)/);
  if (vimeoMatch && vimeoMatch[1]) {
    return `https://player.vimeo.com/video/${vimeoMatch[1]}?autoplay=${autoplay ? 1 : 0}&dnt=1`;
  }

  return urlOrId;
}

export function getYouTubeWatchUrl(urlOrId: string | null | undefined): string {
  const id = extractYouTubeId(urlOrId);
  if (id) {
    return `https://www.youtube.com/watch?v=${id}`;
  }
  return urlOrId || "";
}
