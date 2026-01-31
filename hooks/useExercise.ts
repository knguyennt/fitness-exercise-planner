import { useCallback, useEffect, useState } from "react";
import {
    CreateExerciseData,
    Exercise,
    exerciseService,
} from "../utils/exerciseService";

export interface UseExerciseReturn {
  exercises: Exercise[];
  loading: boolean;
  error: string | null;
  createExercise: (exerciseData: CreateExerciseData) => Promise<void>;
  updateExercise: (
    id: string,
    exerciseData: Partial<CreateExerciseData>,
  ) => Promise<void>;
  deleteExercise: (id: string) => Promise<void>;
  refreshExercises: () => Promise<void>;
  getExerciseById: (id: string) => Promise<Exercise | null>;
}

export const useExercise = (): UseExerciseReturn => {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch all exercises
  const fetchExercises = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await exerciseService.getExercises();
      setExercises(data);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to fetch exercises";
      setError(errorMessage);
      console.error("Error in useExercise.fetchExercises:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  const createExercise = useCallback(
    async (exerciseData: CreateExerciseData) => {
      try {
        setLoading(true);
        setError(null);
        const newExercise = await exerciseService.createExercise(exerciseData);
        setExercises((prev) => [newExercise, ...prev]);
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to create exercise";
        setError(errorMessage);
        console.error("Error in useExercise.createExercise:", err);
        throw err; // Re-throw so the UI can handle it
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  const updateExercise = useCallback(
    async (id: string, exerciseData: Partial<CreateExerciseData>) => {
      try {
        setLoading(true);
        setError(null);
        const updatedExercise = await exerciseService.updateExercise(
          id,
          exerciseData,
        );
        setExercises((prev) =>
          prev.map((exercise) =>
            exercise.id === id ? updatedExercise : exercise,
          ),
        );
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to update exercise";
        setError(errorMessage);
        console.error("Error in useExercise.updateExercise:", err);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  const deleteExercise = useCallback(async (id: string) => {
    try {
      setLoading(true);
      setError(null);
      await exerciseService.deleteExercise(id);
      setExercises((prev) => prev.filter((exercise) => exercise.id !== id));
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to delete exercise";
      setError(errorMessage);
      console.error("Error in useExercise.deleteExercise:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Get a single exercise by ID
  const getExerciseById = useCallback(
    async (id: string): Promise<Exercise | null> => {
      try {
        return await exerciseService.getExerciseById(id);
      } catch (err) {
        console.error("Error in useExercise.getExerciseById:", err);
        return null;
      }
    },
    [],
  );

  const refreshExercises = useCallback(async () => {
    await fetchExercises();
  }, [fetchExercises]);

  useEffect(() => {
    fetchExercises();
  }, [fetchExercises]);

  return {
    exercises,
    loading,
    error,
    createExercise,
    updateExercise,
    deleteExercise,
    refreshExercises,
    getExerciseById,
  };
};
