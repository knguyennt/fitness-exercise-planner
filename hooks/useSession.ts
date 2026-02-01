import { sessionService } from "@/utils/sessionService";
import { useCallback, useState } from "react";

export const useSession = (): any => {
  const [session, setSession] = useState<any>(null);

  const createSession = useCallback(async (sessionData: any) => {
    const newSession = await sessionService.createSession(sessionData);
    setSession(newSession);
  }, []);

  const getSessionByDate = useCallback(async (date: string) => {
    const session = await sessionService.getSessionByDate(date);
    setSession(session);
    return session; // Return the session data
  }, []);

  return {
    session,
    createSession,
    getSessionByDate,
  };
};
