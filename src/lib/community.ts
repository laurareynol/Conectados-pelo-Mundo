"use client";

import { useMemo } from "react";
import { posts as demoPosts } from "@/data/posts";
import { getUser } from "@/data/users";
import type { DemoUser, Post } from "@/data/types";
import { useStore } from "@/store/AppStore";
import type { UserProfile } from "@/store/types";

export interface Author {
  id: string;
  name: string;
  color: string;
  avatar?: string;
  mentor: boolean;
  isMe: boolean;
  user?: DemoUser;
}

export function resolveAuthor(id: string, profile: UserProfile | null, youLabel: string): Author {
  if (id === "me") {
    return { id, name: profile?.name || youLabel, color: profile?.avatarColor ?? "#6B7280", avatar: profile?.avatar, mentor: !!profile?.mentor, isMe: true };
  }
  const u = getUser(id);
  return { id, name: u?.name ?? "—", color: u?.color ?? "#6B7280", mentor: !!u?.mentor, isMe: false, user: u };
}

export interface FeedPost extends Post {
  liked: boolean;
  reported: boolean;
  likeCount: number;
}

/** Combina publicações de demonstração com as criadas localmente, comentários, curtidas e denúncias. */
export function useFeed(): FeedPost[] {
  const { state } = useStore();
  return useMemo(() => {
    const all = [...state.userPosts, ...demoPosts];
    return all.map((p) => {
      const liked = state.likes.includes(p.id);
      return {
        ...p,
        comments: [...p.comments, ...(state.postComments[p.id] ?? [])],
        liked,
        reported: state.reported.includes(p.id),
        likeCount: p.likes + (liked ? 1 : 0),
      };
    });
  }, [state.userPosts, state.likes, state.postComments, state.reported]);
}

/** Regra simples de moderação de demonstração: links, contatos e pedidos de pagamento vão para revisão. */
export function needsModeration(text: string) {
  return /(https?:\/\/|www\.|\S+@\S+\.\S+|\+?\d[\d\s().-]{8,}\d|\bpix\b|whats ?app|telegram|transfer[êe]ncia|dep[óo]sito|pague|pagamento antecipado|wire transfer|pay upfront|pago por adelantado)/i.test(text);
}
