"use client";

import { useActionState } from "react";
import { loginAction, registerAction } from "@/app/[locale]/actions";
import type { ActionState } from "@/types";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Link } from "@/i18n/routing";

const initialState: ActionState = {};

type AuthFormProps = {
  locale: string;
  mode: "login" | "register";
  labels: {
    title: string;
    subtitle: string;
    fullName: string;
    email: string;
    phoneNumber: string;
    password: string;
    submit: string;
    alternatePrompt: string;
    alternateAction: string;
    alternateHref: "/login" | "/register";
  };
};

export function AuthForm({ locale, mode, labels }: AuthFormProps) {
  const action = mode === "login" ? loginAction : registerAction;
  const [state, formAction, pending] = useActionState(action, initialState);

  return (
    <div className="glass-card mx-auto max-w-xl p-8 sm:p-10">
      <div className="space-y-3">
        <div className="section-kicker">{mode === "login" ? "Account access" : "Create account"}</div>
        <h1 className="section-title">{labels.title}</h1>
        <p className="text-sm leading-6 text-muted-foreground">{labels.subtitle}</p>
      </div>

      <form action={formAction} className="mt-8 space-y-5">
        <input type="hidden" name="locale" value={locale} />

        {mode === "register" ? (
          <div>
            <label className="mb-2 block text-sm font-medium">{labels.fullName}</label>
            <input name="fullName" placeholder={labels.fullName} />
            {state.errors?.fullName ? <p className="mt-2 text-sm text-destructive">{state.errors.fullName[0]}</p> : null}
          </div>
        ) : null}

        <div>
          <label className="mb-2 block text-sm font-medium">{labels.email}</label>
          <input name="email" type="email" placeholder={labels.email} />
          {state.errors?.email ? <p className="mt-2 text-sm text-destructive">{state.errors.email[0]}</p> : null}
        </div>

        {mode === "register" ? (
          <div>
            <label className="mb-2 block text-sm font-medium">{labels.phoneNumber}</label>
            <input name="phoneNumber" type="tel" placeholder={labels.phoneNumber} />
            {state.errors?.phoneNumber ? <p className="mt-2 text-sm text-destructive">{state.errors.phoneNumber[0]}</p> : null}
          </div>
        ) : null}

        <div>
          <label className="mb-2 block text-sm font-medium">{labels.password}</label>
          <input name="password" type="password" placeholder={labels.password} />
          {state.errors?.password ? <p className="mt-2 text-sm text-destructive">{state.errors.password[0]}</p> : null}
        </div>

        {state.message ? <p className="text-sm text-destructive">{state.message}</p> : null}

        <button
          type="submit"
          disabled={pending}
          className={cn(buttonVariants({ variant: "default", size: "lg" }), "w-full")}
        >
          {pending ? "..." : labels.submit}
        </button>
      </form>

      <p className="mt-6 text-sm text-muted-foreground">
        {labels.alternatePrompt}{" "}
        <Link href={labels.alternateHref} className="font-semibold text-primary">
          {labels.alternateAction}
        </Link>
      </p>
    </div>
  );
}
