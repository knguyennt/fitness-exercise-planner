import { supabase } from "./supabase";

export interface SessionExercise {
  id?: string;
  session_id: string;
  exercise_id: string;
  sets?: number;
  reps?: number;
  break?: number;
  time?: number;
  notes?: string;
  created_at?: string;
}

export interface CreateSessionExerciseData {
  session_id: string;
  exercise_id: string;
  sets?: number;
  reps?: number;
  break?: number;
  time?: number;
  notes?: string;
}

export interface SessionExerciseWithDetails extends SessionExercise {
  Exercise?: {
    id: string;
    name: string;
    description?: string;
    image_url: string;
    video_url: string;
  };
}

export const sessionExerciseService = {
  async getSessionExercises(
    sessionId: string,
  ): Promise<SessionExerciseWithDetails[]> {
    try {
      const { data, error } = await supabase
        .from("SessionExercise")
        .select(
          `
          *,
          Exercise (
            id,
            name,
            description,
            image_url,
            video_url
          )
        `,
        )
        .eq("session_id", sessionId);

      if (error) {
        throw error;
      }

      return data || [];
    } catch (error) {
      console.error("Error fetching session exercises:", error);
      throw error;
    }
  },

  // Add exercise to session
  async addExerciseToSession(
    sessionExerciseData: CreateSessionExerciseData,
  ): Promise<SessionExercise> {
    try {
      const { data, error } = await supabase
        .from("SessionExercise")
        .insert(sessionExerciseData)
        .select()
        .single();

      if (error) {
        throw error;
      }

      return data;
    } catch (error) {
      console.error("Error adding exercise to session:", error);
      throw error;
    }
  },

  // Update session exercise (sets, reps, etc.)
  async updateSessionExercise(
    id: string,
    updateData: Partial<CreateSessionExerciseData>,
  ): Promise<SessionExercise> {
    try {
      const { data, error } = await supabase
        .from("SessionExercise")
        .update(updateData)
        .eq("id", id)
        .select()
        .single();

      if (error) {
        throw error;
      }

      return data;
    } catch (error) {
      console.error("Error updating session exercise:", error);
      throw error;
    }
  },

  // Mark exercise as completed/uncompleted
  async toggleExerciseCompletion(
    id: string,
    completed: boolean,
  ): Promise<SessionExercise> {
    try {
      const { data, error } = await supabase
        .from("SessionExercise")
        .update({ completed })
        .eq("id", id)
        .select()
        .single();

      if (error) {
        throw error;
      }

      return data;
    } catch (error) {
      console.error("Error toggling exercise completion:", error);
      throw error;
    }
  },

  // Remove exercise from session
  async removeExerciseFromSession(id: string): Promise<void> {
    try {
      const { error } = await supabase
        .from("SessionExercise")
        .delete()
        .eq("exercise_id", id);

      if (error) {
        throw error;
      }
    } catch (error) {
      console.error("Error removing exercise from session:", error);
      throw error;
    }
  },

  // Get all sessions that include a specific exercise
  async getSessionsWithExercise(
    exerciseId: string,
  ): Promise<SessionExercise[]> {
    try {
      const { data, error } = await supabase
        .from("SessionExercise")
        .select("*")
        .eq("exercise_id", exerciseId);

      if (error) {
        throw error;
      }

      return data || [];
    } catch (error) {
      console.error("Error fetching sessions with exercise:", error);
      throw error;
    }
  },

  // Bulk add exercises to session
  async addMultipleExercisesToSession(
    sessionId: string,
    exerciseIds: string[],
  ): Promise<SessionExercise[]> {
    try {
      const sessionExercises = exerciseIds.map((exerciseId) => ({
        session_id: sessionId,
        exercise_id: exerciseId,
      }));

      const { data, error } = await supabase
        .from("SessionExercise")
        .insert(sessionExercises)
        .select();

      if (error) {
        throw error;
      }

      return data || [];
    } catch (error) {
      console.error("Error adding multiple exercises to session:", error);
      throw error;
    }
  },
};
