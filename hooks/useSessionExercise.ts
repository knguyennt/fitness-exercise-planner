import { useCallback, useState } from "react";
import {
    CreateSessionExerciseData,
    SessionExerciseWithDetails,
    sessionExerciseService,
} from "../utils/sessionExerciseService";

export interface UseSessionExerciseReturn {
  sessionExercises: SessionExerciseWithDetails[];
  loading: boolean;
  error: string | null;
  fetchSessionExercises: (
    sessionId: string,
  ) => Promise<SessionExerciseWithDetails[]>;
  addExerciseToSession: (
    sessionExerciseData: CreateSessionExerciseData,
  ) => Promise<void>;
  updateSessionExercise: (
    id: string,
    updateData: Partial<CreateSessionExerciseData>,
  ) => Promise<void>;
  toggleExerciseCompletion: (id: string, completed: boolean) => Promise<void>;
  removeExerciseFromSession: (id: string) => Promise<void>;
  addMultipleExercisesToSession: (
    sessionId: string,
    exerciseIds: string[],
  ) => Promise<void>;
}

export const useSessionExercise = (): UseSessionExerciseReturn => {
  const [sessionExercises, setSessionExercises] = useState<
    SessionExerciseWithDetails[]
  >([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch all exercises for a specific session
  const fetchSessionExercises = useCallback(async (sessionId: string) => {
    try {
      setLoading(true);
      setError(null);
      const data = await sessionExerciseService.getSessionExercises(sessionId);
      setSessionExercises(data);
      return data;
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : "Failed to fetch session exercises";
      setError(errorMessage);
      console.error("Error in useSessionExercise.fetchSessionExercises:", err);
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  // Add exercise to session
  const addExerciseToSession = useCallback(
    async (sessionExerciseData: CreateSessionExerciseData) => {
      try {
        setLoading(true);
        setError(null);
        await sessionExerciseService.addExerciseToSession(sessionExerciseData);
        // Refresh the session exercises after adding
        await fetchSessionExercises(sessionExerciseData.session_id);
      } catch (err) {
        const errorMessage =
          err instanceof Error
            ? err.message
            : "Failed to add exercise to session";
        setError(errorMessage);
        console.error("Error in useSessionExercise.addExerciseToSession:", err);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [fetchSessionExercises],
  );

  // Update session exercise
  const updateSessionExercise = useCallback(
    async (id: string, updateData: Partial<CreateSessionExerciseData>) => {
      try {
        setLoading(true);
        setError(null);
        const updatedExercise =
          await sessionExerciseService.updateSessionExercise(id, updateData);

        // Update local state
        setSessionExercises((prev) =>
          prev.map((exercise) =>
            exercise.id === id ? { ...exercise, ...updatedExercise } : exercise,
          ),
        );
      } catch (err) {
        const errorMessage =
          err instanceof Error
            ? err.message
            : "Failed to update session exercise";
        setError(errorMessage);
        console.error(
          "Error in useSessionExercise.updateSessionExercise:",
          err,
        );
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  // Toggle exercise completion
  const toggleExerciseCompletion = useCallback(
    async (id: string, completed: boolean) => {
      try {
        setLoading(true);
        setError(null);
        const updatedExercise =
          await sessionExerciseService.toggleExerciseCompletion(id, completed);

        // Update local state
        setSessionExercises((prev) =>
          prev.map((exercise) =>
            exercise.id === id ? { ...exercise, ...updatedExercise } : exercise,
          ),
        );
      } catch (err) {
        const errorMessage =
          err instanceof Error
            ? err.message
            : "Failed to toggle exercise completion";
        setError(errorMessage);
        console.error(
          "Error in useSessionExercise.toggleExerciseCompletion:",
          err,
        );
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  // Remove exercise from session
  const removeExerciseFromSession = useCallback(async (id: string) => {
    try {
      setLoading(true);
      setError(null);
      await sessionExerciseService.removeExerciseFromSession(id);

      // Update local state
      setSessionExercises((prev) =>
        prev.filter((exercise) => exercise.id !== id),
      );
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : "Failed to remove exercise from session";
      setError(errorMessage);
      console.error(
        "Error in useSessionExercise.removeExerciseFromSession:",
        err,
      );
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Add multiple exercises to session
  const addMultipleExercisesToSession = useCallback(
    async (sessionId: string, exerciseIds: string[]) => {
      try {
        setLoading(true);
        setError(null);
        await sessionExerciseService.addMultipleExercisesToSession(
          sessionId,
          exerciseIds,
        );

        // Refresh session exercises after adding multiple
        await fetchSessionExercises(sessionId);
      } catch (err) {
        const errorMessage =
          err instanceof Error
            ? err.message
            : "Failed to add multiple exercises to session";
        setError(errorMessage);
        console.error(
          "Error in useSessionExercise.addMultipleExercisesToSession:",
          err,
        );
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [fetchSessionExercises],
  );

  return {
    sessionExercises,
    loading,
    error,
    fetchSessionExercises,
    addExerciseToSession,
    updateSessionExercise,
    toggleExerciseCompletion,
    removeExerciseFromSession,
    addMultipleExercisesToSession,
  };
};
