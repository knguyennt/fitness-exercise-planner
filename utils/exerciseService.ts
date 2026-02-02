import { supabase } from "./supabase";

export interface Exercise {
  id?: string;
  created_at?: string;
  name: string;
  description?: string;
  image_url: string;
  video_url: string;
  user_id?: string;
}

export interface CreateExerciseData {
  name: string;
  description?: string;
  image_url: string;
  video_url: string;
}

export const exerciseService = {
  async getExercises(): Promise<Exercise[]> {
    try {
      const { data, error } = await supabase
        .from("Exercise")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        throw error;
      }

      return data || [];
    } catch (error) {
      console.error("Error fetching exercises:", error);
      throw error;
    }
  },

  async getExerciseById(id: string): Promise<Exercise | null> {
    try {
      const { data, error } = await supabase
        .from("Exercise")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        if (error.code === "PGRST116") {
          return null;
        }
        throw error;
      }

      return data;
    } catch (error) {
      console.error("Error fetching exercise:", error);
      throw error;
    }
  },
  async createExercise(exerciseData: CreateExerciseData): Promise<Exercise> {
    try {
      const { data, error } = await supabase
        .from("Exercise")
        .insert({
          ...exerciseData,
        })
        .select()
        .single();

      if (error) {
        throw error;
      }

      return data;
    } catch (error) {
      console.error("Error creating exercise:", error);
      throw error;
    }
  },

  async updateExercise(
    id: string,
    exerciseData: Partial<CreateExerciseData>,
  ): Promise<Exercise> {
    try {
      const { data, error } = await supabase
        .from("Exercise")
        .update(exerciseData)
        .eq("id", id)
        .select()
        .single();

      if (error) {
        throw error;
      }

      return data;
    } catch (error) {
      console.error("Error updating exercise:", error);
      throw error;
    }
  },

  // Delete an exercise
  async deleteExercise(id: string): Promise<void> {
    try {
      const { error } = await supabase.from("Exercise").delete().eq("id", id);

      if (error) {
        throw error;
      }
    } catch (error) {
      console.error("Error deleting exercise:", error);
      throw error;
    }
  },
};
