"use client";

import { Heart } from "lucide-react";
import { useState } from "react";

type LikeToggleButtonProps = {
  likeableType: "BLOG" | "COMMENT";
  likeableId: string;
  initialCount: number;
  initialLiked: boolean;
  disabled?: boolean;
};

export function LikeToggleButton({
  likeableType,
  likeableId,
  initialCount,
  initialLiked,
  disabled = false,
}: LikeToggleButtonProps) {
  const [liked, setLiked] = useState(initialLiked);
  const [count, setCount] = useState(initialCount);
  const [loading, setLoading] = useState(false);

  async function handleClick() {
    if (disabled || loading) {
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/likes/toggle", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          likeableType,
          likeableId,
        }),
      });

      if (!response.ok) {
        return;
      }

      const payload = (await response.json()) as { liked: boolean; count: number };
      setLiked(payload.liked);
      setCount(payload.count);
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={disabled || loading}
      className={[
        "inline-flex items-center gap-2 rounded-full border px-3 py-2 text-sm transition",
        liked
          ? "border-primary bg-primary/10 text-primary"
          : "border-border bg-card text-muted-foreground hover:text-foreground",
      ].join(" ")}
    >
      <Heart className={liked ? "size-4 fill-current" : "size-4"} />
      {count}
    </button>
  );
}
