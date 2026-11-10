"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { defaultPlanner } from "@/data/planner";
import { storage } from "@/lib/storage";
import { uid } from "@/lib/utils";
import type { ChatMessage, Conversation, DestinationComment, Post, PostComment, Priority, TaskCategory } from "@/data/types";
import type { AppState, PlannerTask, SavedType, UserProfile } from "./types";

const STATE_KEY = "state";

export function createInitialState(): AppState {
  return {
    profile: null,
    planner: defaultPlanner(),
    saved: [],
    likes: [],
    reported: [],
    userPosts: [],
    postComments: {},
    destComments: {},
    messages: {},
    newConversations: [],
    reports: [],
    prefs: { bannerDismissed: false, welcomePending: false },
  };
}

interface Actions {
  setProfile: (p: UserProfile) => void;
  updateProfile: (patch: Partial<UserProfile>) => void;
  completeOnboarding: (p: UserProfile) => void;
  toggleTask: (id: string) => boolean;
  updateTask: (id: string, patch: Partial<PlannerTask>) => void;
  addTask: (title: string, category?: TaskCategory, priority?: Priority) => PlannerTask;
  removeTask: (id: string) => void;
  resetPlanner: () => void;
  toggleSaved: (type: SavedType, id: string) => boolean;
  isSaved: (type: SavedType, id: string) => boolean;
  toggleLike: (postId: string) => boolean;
  reportPost: (postId: string) => void;
  addPost: (post: Omit<Post, "id" | "createdAt" | "likes" | "comments" | "authorId">) => Post;
  removePost: (postId: string) => void;
  addPostComment: (postId: string, text: string, lang: PostComment["lang"]) => void;
  addDestComment: (destId: string, text: string, lang: DestinationComment["lang"]) => void;
  sendMessage: (conversationId: string, text: string, lang: ChatMessage["lang"]) => void;
  startConversation: (participantId: string) => string;
  addReport: (type: string) => string;
  dismissBanner: () => void;
  dismissWelcome: () => void;
  resetAll: () => void;
}

interface StoreValue extends Actions {
  state: AppState;
  hydrated: boolean;
}

const StoreContext = createContext<StoreValue | null>(null);

export function AppStoreProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AppState>(createInitialState);
  const [hydrated, setHydrated] = useState(false);
  const stateRef = useRef(state);
  stateRef.current = state;

  // Carrega do localStorage após a montagem (evita divergência entre servidor e cliente).
  useEffect(() => {
    const stored = storage.get<Partial<AppState> | null>(STATE_KEY, null);
    if (stored) setState({ ...createInitialState(), ...stored, prefs: { ...createInitialState().prefs, ...stored.prefs } });
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) storage.set(STATE_KEY, state);
  }, [state, hydrated]);

  const update = useCallback((fn: (s: AppState) => AppState) => setState((s) => fn(s)), []);

  const actions = useMemo<Actions>(() => ({
    setProfile: (p) => update((s) => ({ ...s, profile: p })),
    updateProfile: (patch) => update((s) => (s.profile ? { ...s, profile: { ...s.profile, ...patch } } : s)),
    completeOnboarding: (p) => update((s) => ({ ...s, profile: p, prefs: { ...s.prefs, welcomePending: true } })),

    toggleTask: (id) => {
      const task = stateRef.current.planner.find((t) => t.id === id);
      const nowDone = task ? !task.done : false;
      update((s) => ({
        ...s,
        planner: s.planner.map((t) =>
          t.id === id ? { ...t, done: !t.done, doneAt: !t.done ? new Date().toISOString() : undefined } : t,
        ),
      }));
      return nowDone;
    },
    updateTask: (id, patch) => update((s) => ({ ...s, planner: s.planner.map((t) => (t.id === id ? { ...t, ...patch } : t)) })),
    addTask: (title, category = "destination", priority = "medium") => {
      const task: PlannerTask = { id: uid("task"), title, category, priority, done: false, notes: "", custom: true };
      update((s) => ({ ...s, planner: [...s.planner, task] }));
      return task;
    },
    removeTask: (id) => update((s) => ({ ...s, planner: s.planner.filter((t) => t.id !== id) })),
    resetPlanner: () => update((s) => ({ ...s, planner: defaultPlanner() })),

    toggleSaved: (type, id) => {
      const exists = stateRef.current.saved.some((x) => x.type === type && x.id === id);
      update((s) => ({
        ...s,
        saved: exists
          ? s.saved.filter((x) => !(x.type === type && x.id === id))
          : [{ type, id, savedAt: new Date().toISOString() }, ...s.saved],
      }));
      return !exists;
    },
    isSaved: (type, id) => stateRef.current.saved.some((x) => x.type === type && x.id === id),

    toggleLike: (postId) => {
      const liked = stateRef.current.likes.includes(postId);
      update((s) => ({ ...s, likes: liked ? s.likes.filter((x) => x !== postId) : [...s.likes, postId] }));
      return !liked;
    },
    reportPost: (postId) => update((s) => ({ ...s, reported: s.reported.includes(postId) ? s.reported : [...s.reported, postId] })),
    addPost: (data) => {
      const post: Post = { ...data, id: uid("post"), authorId: "me", createdAt: new Date().toISOString(), likes: 0, comments: [] };
      update((s) => ({ ...s, userPosts: [post, ...s.userPosts] }));
      return post;
    },
    removePost: (postId) => update((s) => ({
      ...s,
      userPosts: s.userPosts.filter((p) => p.id !== postId),
      saved: s.saved.filter((x) => !(x.type === "post" && x.id === postId)),
    })),
    addPostComment: (postId, text, lang) => update((s) => ({
      ...s,
      postComments: {
        ...s.postComments,
        [postId]: [...(s.postComments[postId] ?? []), { id: uid("c"), authorId: "me", text, lang, createdAt: new Date().toISOString() }],
      },
    })),
    addDestComment: (destId, text, lang) => update((s) => ({
      ...s,
      destComments: {
        ...s.destComments,
        [destId]: [{ id: uid("dc"), authorId: "me", text, lang, createdAt: new Date().toISOString() }, ...(s.destComments[destId] ?? [])],
      },
    })),
    sendMessage: (conversationId, text, lang) => update((s) => ({
      ...s,
      messages: {
        ...s.messages,
        [conversationId]: [...(s.messages[conversationId] ?? []), { id: uid("m"), from: "me", text, lang, createdAt: new Date().toISOString() }],
      },
    })),
    startConversation: (participantId) => {
      const existing = stateRef.current.newConversations.find((c) => c.participantId === participantId);
      if (existing) return existing.id;
      const id = `conv_${participantId}`;
      update((s) => ({ ...s, newConversations: [...s.newConversations, { id, participantId, messages: [] }] }));
      return id;
    },
    addReport: (type) => {
      const code = `CPM-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`;
      update((s) => ({ ...s, reports: [{ code, type, createdAt: new Date().toISOString() }, ...s.reports] }));
      return code;
    },
    dismissBanner: () => update((s) => ({ ...s, prefs: { ...s.prefs, bannerDismissed: true } })),
    dismissWelcome: () => update((s) => ({ ...s, prefs: { ...s.prefs, welcomePending: false } })),
    resetAll: () => {
      storage.remove(STATE_KEY);
      setState(createInitialState());
    },
  }), [update]);

  const value = useMemo(() => ({ state, hydrated, ...actions, isSaved: (type: SavedType, id: string) => state.saved.some((x) => x.type === type && x.id === id) }), [state, hydrated, actions]);

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore deve ser usado dentro de <AppStoreProvider>");
  return ctx;
}

/** Progresso do planejador em porcentagem. */
export function usePlannerProgress() {
  const { state } = useStore();
  const total = state.planner.length;
  const done = state.planner.filter((t) => t.done).length;
  return { total, done, percent: total ? Math.round((done / total) * 100) : 0 };
}
