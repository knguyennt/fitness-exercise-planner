import { sessionService } from "@/utils/sessionService";
import { useState } from "react";

export const useSession = (): any => {
  const [session, setSession] = useState<any>(null);
  const createSession = async (sessionData: any) => {
    const newSession = await sessionService.createSession(sessionData);
    setSession(newSession);
  };

  const getSessionByDate = async (date: string) => {
    const session = await sessionService.getSessionByDate(date);
    setSession(session);
  };

  return {
    session,
    createSession,
    getSessionByDate,
  };
};
