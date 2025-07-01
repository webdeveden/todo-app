import { type SavedSession } from "../components/SavedTodos";

const STORAGE_KEY = "savedSessions";

export const loadSessionsFromStorage = (): SavedSession[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch (error) {
    console.error("Error loading sessions from localStorage:", error);
    return [];
  }
};

export const saveSessionsToStorage = (sessions: SavedSession[]) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions));
  } catch (error) {
    console.error("Error saving sessions to localStorage:", error);
  }
};
