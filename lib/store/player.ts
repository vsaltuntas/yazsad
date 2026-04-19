"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export type QueueTrack = {
  id: string;
  title: string;
  artist: string;
  artistId: string;
  duration: string;
  durationSec: number;
  g1: string;
  g2: string;
  g3: string;
  aiModel?: string;
  aiPrompt?: string;
};

type Repeat = "off" | "all" | "one";

type State = {
  current: QueueTrack | null;
  queue: QueueTrack[];
  index: number;
  playing: boolean;
  progress: number; // 0..100
  shuffle: boolean;
  repeat: Repeat;
  fullPlayer: boolean;
  queueDrawer: boolean;

  play: (t: QueueTrack) => void;
  toggle: () => void;
  next: () => void;
  prev: () => void;
  addToQueue: (t: QueueTrack) => void;
  playNextUp: (t: QueueTrack) => void;
  setProgress: (p: number) => void;
  setShuffle: (b: boolean) => void;
  cycleRepeat: () => void;
  openFull: () => void;
  closeFull: () => void;
  toggleDrawer: () => void;
};

export const usePlayer = create<State>()(
  persist(
    (set, get) => ({
      current: null,
      queue: [],
      index: -1,
      playing: false,
      progress: 0,
      shuffle: false,
      repeat: "off",
      fullPlayer: false,
      queueDrawer: false,

      play: (t) => {
        const q = get().queue;
        const i = q.findIndex((x) => x.id === t.id);
        if (i >= 0) set({ current: t, index: i, playing: true, progress: 0 });
        else set({ current: t, queue: [t, ...q], index: 0, playing: true, progress: 0 });
      },
      toggle: () => set((s) => ({ playing: !s.playing })),
      next: () => {
        const { queue, index, repeat } = get();
        if (queue.length === 0) return;
        let i = index + 1;
        if (i >= queue.length) {
          if (repeat === "all") i = 0;
          else return set({ playing: false });
        }
        const next = queue[i]!;
        set({ index: i, current: next, progress: 0 });
      },
      prev: () => {
        const { queue, index } = get();
        if (queue.length === 0) return;
        const i = Math.max(0, index - 1);
        set({ index: i, current: queue[i]!, progress: 0 });
      },
      addToQueue: (t) => set((s) => ({ queue: [...s.queue, t] })),
      playNextUp: (t) =>
        set((s) => {
          const q = [...s.queue];
          q.splice(s.index + 1, 0, t);
          return { queue: q };
        }),
      setProgress: (p) => set({ progress: Math.max(0, Math.min(100, p)) }),
      setShuffle: (b) => set({ shuffle: b }),
      cycleRepeat: () =>
        set((s) => ({
          repeat: s.repeat === "off" ? "all" : s.repeat === "all" ? "one" : "off",
        })),
      openFull: () => set({ fullPlayer: true }),
      closeFull: () => set({ fullPlayer: false }),
      toggleDrawer: () => set((s) => ({ queueDrawer: !s.queueDrawer })),
    }),
    {
      name: "yazsad-player",
      partialize: (s) => ({ queue: s.queue, current: s.current, index: s.index, repeat: s.repeat, shuffle: s.shuffle }),
    },
  ),
);
