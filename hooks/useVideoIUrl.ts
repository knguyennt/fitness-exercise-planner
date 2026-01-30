import { storageService } from "@/utils/storageService";
import { useEffect, useState } from "react";

export const useVideoUrl = (videoPath: string) => {
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVideoUrl = () => {
      try {
        const { data } = storageService.getVideoUrl(videoPath);
        setVideoUrl(data?.publicUrl || null);
      } catch (err) {
        setError("Failed to load video URL");
        console.error("Video URL error:", err);
      } finally {
        setLoading(false);
      }
    };

    if (videoPath) {
      fetchVideoUrl();
    }
  }, [videoPath]);

  return { videoUrl, loading, error };
};
