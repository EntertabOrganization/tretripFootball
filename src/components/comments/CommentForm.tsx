"use client";

import { useActionState } from "react";
import { createCommentAction } from "@/app/[locale]/actions";
import type { ActionState } from "@/types";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const initialState: ActionState = {};

type CommentFormProps = {
  locale: string;
  slug: string;
  blogId: string;
  title: string;
  placeholder: string;
  submitLabel: string;
};

export function CommentForm({
  locale,
  slug,
  blogId,
  title,
  placeholder,
  submitLabel,
}: CommentFormProps) {
  const [state, formAction, pending] = useActionState(createCommentAction, initialState);

  return (
    <form action={formAction} className="glass-card space-y-4 p-6">
      <input type="hidden" name="locale" value={locale} />
      <input type="hidden" name="slug" value={slug} />
      <input type="hidden" name="blogId" value={blogId} />
      <div>
        <h3 className="text-xl font-semibold">{title}</h3>
      </div>
      <textarea name="commentText" placeholder={placeholder} />
      {state.errors?.commentText ? <p className="text-sm text-destructive">{state.errors.commentText[0]}</p> : null}
      {state.message ? (
        <p className={state.success ? "text-sm text-primary" : "text-sm text-destructive"}>{state.message}</p>
      ) : null}
      <button
        type="submit"
        disabled={pending}
        className={cn(buttonVariants({ variant: "default" }))}
      >
        {pending ? "..." : submitLabel}
      </button>
    </form>
  );
}
