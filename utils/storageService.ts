import { supabase } from "./supabase";

export const storageService = {
  getPublicUrl: (bucket: string, path: string) => {
    return supabase.storage.from(bucket).getPublicUrl(path);
  },

  getVideoUrl: (videoPath: string) => {
    return supabase.storage.from("fitness-exercise").getPublicUrl(videoPath);
  },

  uploadFile: async (bucket: string, path: string, file: File) => {
    return await supabase.storage.from(bucket).upload(path, file);
  },
};
