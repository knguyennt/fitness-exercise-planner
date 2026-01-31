import { supabase } from "./supabase";

export interface Session {
  id?: string;
  created_at?: string;
  name: string;
}

export interface CreateSessionData {
  name: string;
}

export const sessionService = {
  async getSessions(): Promise<Session[]> {
    try {
      const { data, error } = await supabase
        .from("Session")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        throw error;
      }

      return data || [];
    } catch (error) {
      console.error("Error fetching sessions:", error);
      throw error;
    }
  },

  async getSessionByDate(date: string): Promise<Session[]> {
    try {
      const { data, error } = await supabase
        .from("Session")
        .select("*")
        .eq("date", date)
        .order("created_at", { ascending: false });

      if (error) {
        throw error;
      }

      console.log("data from getSessionByDate:", data);
      return data || [];
    } catch (error) {
      console.error("Error fetching sessions by date:", error);
      throw error;
    }
  },

  async getSessionById(id: string): Promise<Session | null> {
    try {
      const { data, error } = await supabase
        .from("Session")
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
      console.error("Error fetching session:", error);
      throw error;
    }
  },
  async createSession(sessionData: CreateSessionData): Promise<Session> {
    try {
      const { data, error } = await supabase
        .from("Session")
        .insert({
          ...sessionData,
        })
        .select()
        .single();

      if (error) {
        throw error;
      }

      return data;
    } catch (error) {
      console.error("Error creating session:", error);
      throw error;
    }
  },

  async updateSession(
    id: string,
    sessionData: Partial<CreateSessionData>,
  ): Promise<Session> {
    try {
      const { data, error } = await supabase
        .from("Session")
        .update(sessionData)
        .eq("id", id)
        .select()
        .single();

      if (error) {
        throw error;
      }

      return data;
    } catch (error) {
      console.error("Error updating session:", error);
      throw error;
    }
  },

  async deleteSession(id: string): Promise<void> {
    try {
      const { error } = await supabase.from("Session").delete().eq("id", id);

      if (error) {
        throw error;
      }
    } catch (error) {
      console.error("Error deleting session:", error);
      throw error;
    }
  },
};
