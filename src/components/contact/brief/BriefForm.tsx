"use client";

import { Turnstile, type TurnstileInstance } from "@marsidev/react-turnstile";
import { useLocale, useTranslations } from "next-intl";
import {
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type FormEvent,
  type KeyboardEvent,
} from "react";
import { toast } from "sonner";
import { Link } from "@/i18n/navigation";
import { locales } from "@/i18n/routing";
import {
  clearBriefDraft,
  getBriefDraftServerSnapshot,
  getBriefDraftSnapshot,
  saveBriefDraft,
  subscribeBriefDraft,
} from "@/lib/brief-draft";
import { resolveValidationMessage } from "@/lib/form-validation";
import {
  BRIEF_STEP_COUNT,
  appFeatureOptions,
  briefPayloadSchema,
  briefStep1Schema,
  briefStep2Schema,
  draftToPayload,
  existingNeedOptions,
  goalOptions,
  hasCurrentWebsite,
  integrationOptions,
  isBriefDraftDirty,
  languageOptions,
  materialOptions,
  pageOptions,
  projectTypes,
  rebuildOptions,
  translationOptions,
  type BriefDraftValues,
} from "@/lib/schemas/brief";
import { BriefChoiceGroup, OptionalHint, RequiredMark, fieldClassName } from "./BriefChoiceGroup";
import { BriefProgress } from "./BriefProgress";
import { BriefStepNav } from "./BriefStepNav";
import { BriefSuccess } from "./BriefSuccess";
import { BriefSummary } from "./BriefSummary";

function optionsFrom(
  ids: readonly string[],
  translate: (id: string) => string,
): { value: string; label: string }[] {
  return ids.map((id) => ({ value: id, label: translate(id) }));
}

function scrollPageToTop() {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const behavior: ScrollBehavior = reduce ? "auto" : "smooth";
  document.getElementById("site-scroll")?.scrollTo({ top: 0, behavior });
  window.scrollTo({ top: 0, behavior });
}

export function BriefForm() {
  const t = useTranslations("brief");
  const locale = useLocale();
  const snapshot = useSyncExternalStore(
    subscribeBriefDraft,
    getBriefDraftSnapshot,
    getBriefDraftServerSnapshot,
  );
  const { step, values } = snapshot;
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const turnstileTokenRef = useRef<string | null>(null);
  const turnstileRef = useRef<TurnstileInstance | null>(null);
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY?.trim() || null;

  function updateTurnstileToken(token: string | null) {
    turnstileTokenRef.current = token;
  }

  useEffect(() => {
    const onLeave = (event: BeforeUnloadEvent) => {
      if (success || !isBriefDraftDirty(values)) return;
      event.preventDefault();
    };
    window.addEventListener("beforeunload", onLeave);
    return () => window.removeEventListener("beforeunload", onLeave);
  }, [success, values]);

  useEffect(() => {
    if (step === BRIEF_STEP_COUNT) return;
    turnstileTokenRef.current = null;
  }, [step]);

  function patch(next: Partial<BriefDraftValues>) {
    saveBriefDraft(step, { ...values, ...next });
  }

  function goTo(nextStep: number) {
    saveBriefDraft(Math.min(BRIEF_STEP_COUNT, Math.max(1, nextStep)), values);
    requestAnimationFrame(() => {
      requestAnimationFrame(scrollPageToTop);
    });
  }

  function goNext() {
    if (step === 1) {
      const parsed = briefStep1Schema.safeParse({
        name: values.name,
        email: values.email,
        projectType: values.projectType,
      });
      if (!parsed.success) {
        toast.error(resolveValidationMessage(parsed.error, t));
        return;
      }
    }
    if (step === 2) {
      const parsed = briefStep2Schema.safeParse({
        goals: values.goals,
        goalDescription: values.goalDescription,
      });
      if (!parsed.success) {
        toast.error(resolveValidationMessage(parsed.error, t));
        return;
      }
    }
    goTo(step + 1);
  }

  function onKeyDown(event: KeyboardEvent<HTMLFormElement>) {
    if (event.key !== "Enter") return;
    const target = event.target as HTMLElement;
    if (target.tagName === "TEXTAREA" || target.tagName === "BUTTON") return;
    event.preventDefault();
  }

  async function waitForTurnstileToken(timeoutMs = 10_000) {
    if (!siteKey) return true;
    const startedAt = Date.now();
    while (!turnstileTokenRef.current && Date.now() - startedAt < timeoutMs) {
      await new Promise((resolve) => window.setTimeout(resolve, 150));
    }
    return Boolean(turnstileTokenRef.current);
  }

  async function submitBrief() {
    if (step !== BRIEF_STEP_COUNT || loading) return;

    setLoading(true);
    const resolvedLocale = locales.includes(locale as (typeof locales)[number])
      ? (locale as (typeof locales)[number])
      : undefined;

    const captchaReady = await waitForTurnstileToken();
    if (siteKey && !captchaReady) {
      toast.error(t("captchaError"));
      setLoading(false);
      return;
    }

    const parsed = briefPayloadSchema.safeParse(
      draftToPayload(values, {
        locale: resolvedLocale,
        turnstileToken: turnstileTokenRef.current ?? undefined,
      }),
    );
    if (!parsed.success) {
      toast.error(resolveValidationMessage(parsed.error, t));
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/brief", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });

      if (response.status === 429) {
        toast.error(t("rateLimited"));
        return;
      }

      if (response.status === 400) {
        const body = (await response.json().catch(() => null)) as { error?: string } | null;
        if (body?.error === "Captcha failed") {
          toast.error(t("captchaError"));
          turnstileRef.current?.reset();
          updateTurnstileToken(null);
          return;
        }
        toast.error(t("validationError"));
        return;
      }

      if (!response.ok) throw new Error("Request failed");
      toast.success(t("successToast"));
      clearBriefDraft();
      setSuccess(true);
      turnstileRef.current?.reset();
      updateTurnstileToken(null);
    } catch {
      toast.error(t("error"));
    } finally {
      setLoading(false);
    }
  }

  if (success) {
    return (
      <BriefSuccess
        title={t("successTitle")}
        body={t("successBody")}
        contactLabel={t("successContact")}
        homeLabel={t("successHome")}
      />
    );
  }

  const disabled = loading;

  return (
    <form
      onSubmit={(event: FormEvent<HTMLFormElement>) => event.preventDefault()}
      onKeyDown={onKeyDown}
      className="max-w-3xl space-y-8 p-1.5 md:p-2"
    >
      <BriefProgress
        current={step}
        total={BRIEF_STEP_COUNT}
        label={t("progress", { current: step, total: BRIEF_STEP_COUNT })}
        stepTitle={t(`steps.${step}`)}
      />

      {step === 1 ? (
        <div className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <label className="flex flex-col gap-3 text-sm">
              <span className="leading-none">
                {t("fields.name")}
                <RequiredMark />
                <OptionalHint label={t("validation.nameHint")} />
              </span>
              <input
                name="name"
                autoComplete="name"
                disabled={disabled}
                value={values.name}
                onChange={(event) => patch({ name: event.target.value })}
                className={fieldClassName}
                aria-required
              />
            </label>
            <label className="flex flex-col gap-3 text-sm">
              <span className="leading-none">
                {t("fields.company")}
                <OptionalHint label={t("optional")} />
              </span>
              <input
                name="company"
                autoComplete="organization"
                disabled={disabled}
                value={values.company}
                onChange={(event) => patch({ company: event.target.value })}
                className={fieldClassName}
              />
            </label>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <label className="flex flex-col gap-3 text-sm">
              <span className="leading-none">
                {t("fields.email")}
                <RequiredMark />
              </span>
              <input
                type="email"
                name="email"
                autoComplete="email"
                disabled={disabled}
                value={values.email}
                onChange={(event) => patch({ email: event.target.value })}
                className={fieldClassName}
                aria-required
              />
            </label>
            <label className="flex flex-col gap-3 text-sm">
              <span className="leading-none">
                {t("fields.phone")}
                <OptionalHint label={t("optional")} />
              </span>
              <input
                type="tel"
                name="phone"
                autoComplete="tel"
                disabled={disabled}
                value={values.phone}
                onChange={(event) => patch({ phone: event.target.value })}
                className={fieldClassName}
              />
            </label>
          </div>
          <label className="flex flex-col gap-3 text-sm">
            <span className="leading-none">
              {t("fields.currentWebsite")}
              <OptionalHint label={t("optional")} />
            </span>
            <input
              type="text"
              name="currentWebsite"
              inputMode="url"
              autoComplete="url"
              disabled={disabled}
              value={values.currentWebsite}
              onChange={(event) => patch({ currentWebsite: event.target.value })}
              className={fieldClassName}
            />
          </label>
          <BriefChoiceGroup
            legend={t("fields.projectType")}
            required
            hint={t("validation.projectTypeHint")}
            name="projectType"
            type="radio"
            disabled={disabled}
            value={values.projectType}
            options={optionsFrom(projectTypes, (id) => t(`projectTypes.${id}`))}
            onChange={(next) => patch({ projectType: next as BriefDraftValues["projectType"] })}
          />
          <fieldset className="min-w-0">
            <legend className="float-left mb-3 w-full px-0 text-sm leading-none">
              {t("fields.nameIdeas")}
              <OptionalHint label={t("optional")} />
            </legend>
            <p className="text-fg-muted clear-both mb-3 text-sm leading-snug">
              {t("fields.nameIdeasHint")}
            </p>
            <div className="grid gap-4 sm:grid-cols-3">
              {(["nameIdea1", "nameIdea2", "nameIdea3"] as const).map((field, index) => (
                <label key={field} className="flex flex-col gap-3 text-sm">
                  <span className="leading-none">{t("fields.nameIdeaN", { n: index + 1 })}</span>
                  <input
                    name={field}
                    maxLength={80}
                    disabled={disabled}
                    value={values[field]}
                    onChange={(event) => patch({ [field]: event.target.value })}
                    className={fieldClassName}
                    autoComplete="off"
                  />
                </label>
              ))}
            </div>
          </fieldset>
        </div>
      ) : null}

      {step === 2 ? (
        <div className="space-y-4">
          <BriefChoiceGroup
            legend={t("fields.goals")}
            required
            hint={t("validation.goalsHint")}
            name="goals"
            type="checkbox"
            disabled={disabled}
            value={values.goals}
            options={optionsFrom(goalOptions, (id) => t(`goals.${id}`))}
            onChange={(next) => patch({ goals: next as BriefDraftValues["goals"] })}
          />
          <label className="flex flex-col gap-3 text-sm">
            <span className="leading-none">
              {t("fields.goalDescription")}
              <RequiredMark />
              <OptionalHint label={t("validation.goalDescriptionHint")} />
            </span>
            <textarea
              name="goalDescription"
              rows={6}
              disabled={disabled}
              value={values.goalDescription}
              onChange={(event) => patch({ goalDescription: event.target.value })}
              className={`${fieldClassName} resize-y`}
              aria-required
            />
          </label>
        </div>
      ) : null}

      {step === 3 ? (
        <div className="space-y-4">
          {values.projectType === "website" ? (
            <BriefChoiceGroup
              legend={t("fields.pages")}
              optionalLabel={t("optional")}
              name="pages"
              type="checkbox"
              disabled={disabled}
              value={values.pages}
              options={optionsFrom(pageOptions, (id) => t(`pages.${id}`))}
              onChange={(next) => patch({ pages: next as BriefDraftValues["pages"] })}
            />
          ) : null}
          {values.projectType === "app" ? (
            <BriefChoiceGroup
              legend={t("fields.appFeatures")}
              optionalLabel={t("optional")}
              name="appFeatures"
              type="checkbox"
              disabled={disabled}
              value={values.appFeatures}
              options={optionsFrom(appFeatureOptions, (id) => t(`appFeatures.${id}`))}
              onChange={(next) => patch({ appFeatures: next as BriefDraftValues["appFeatures"] })}
            />
          ) : null}
          <label className="flex flex-col gap-3 text-sm">
            <span className="leading-none">
              {t("fields.scopeNotes")}
              <OptionalHint label={t("optional")} />
            </span>
            <textarea
              name="scopeNotes"
              rows={4}
              disabled={disabled}
              value={values.scopeNotes}
              onChange={(event) => patch({ scopeNotes: event.target.value })}
              className={`${fieldClassName} resize-y`}
            />
          </label>
        </div>
      ) : null}

      {step === 4 ? (
        <div className="space-y-4">
          <BriefChoiceGroup
            legend={t("fields.hasLogo")}
            optionalLabel={t("optional")}
            name="hasLogo"
            type="radio"
            disabled={disabled}
            value={values.hasLogo}
            options={optionsFrom(materialOptions, (id) => t(`material.${id}`))}
            onChange={(next) => patch({ hasLogo: next as BriefDraftValues["hasLogo"] })}
          />
          <BriefChoiceGroup
            legend={t("fields.hasPhotos")}
            optionalLabel={t("optional")}
            name="hasPhotos"
            type="radio"
            disabled={disabled}
            value={values.hasPhotos}
            options={optionsFrom(materialOptions, (id) => t(`material.${id}`))}
            onChange={(next) => patch({ hasPhotos: next as BriefDraftValues["hasPhotos"] })}
          />
          <BriefChoiceGroup
            legend={t("fields.hasCopy")}
            optionalLabel={t("optional")}
            name="hasCopy"
            type="radio"
            disabled={disabled}
            value={values.hasCopy}
            options={optionsFrom(materialOptions, (id) => t(`material.${id}`))}
            onChange={(next) => patch({ hasCopy: next as BriefDraftValues["hasCopy"] })}
          />
          <label className="flex flex-col gap-3 text-sm">
            <span className="leading-none">
              {t("fields.inspiration")}
              <OptionalHint label={t("optional")} />
            </span>
            <textarea
              name="inspiration"
              rows={4}
              disabled={disabled}
              value={values.inspiration}
              onChange={(event) => patch({ inspiration: event.target.value })}
              className={`${fieldClassName} resize-y`}
            />
          </label>
          {hasCurrentWebsite(values) ? (
            <>
              <BriefChoiceGroup
                legend={t("fields.rebuild")}
                optionalLabel={t("optional")}
                name="rebuild"
                type="radio"
                disabled={disabled}
                value={values.rebuild}
                options={optionsFrom(rebuildOptions, (id) => t(`rebuild.${id}`))}
                onChange={(next) => patch({ rebuild: next as BriefDraftValues["rebuild"] })}
              />
              <BriefChoiceGroup
                legend={t("fields.existingNeeds")}
                optionalLabel={t("optional")}
                name="existingNeeds"
                type="checkbox"
                disabled={disabled}
                value={values.existingNeeds}
                options={optionsFrom(existingNeedOptions, (id) => t(`existingNeeds.${id}`))}
                onChange={(next) =>
                  patch({ existingNeeds: next as BriefDraftValues["existingNeeds"] })
                }
              />
              <label className="flex flex-col gap-3 text-sm">
                <span className="leading-none">
                  {t("fields.existingNotes")}
                  <OptionalHint label={t("optional")} />
                </span>
                <textarea
                  name="existingNotes"
                  rows={4}
                  disabled={disabled}
                  value={values.existingNotes}
                  onChange={(event) => patch({ existingNotes: event.target.value })}
                  className={`${fieldClassName} resize-y`}
                />
              </label>
            </>
          ) : null}
        </div>
      ) : null}

      {step === 5 ? (
        <div className="space-y-4">
          <BriefChoiceGroup
            legend={t("fields.languages")}
            optionalLabel={t("optional")}
            name="languages"
            type="checkbox"
            disabled={disabled}
            value={values.languages}
            options={optionsFrom(languageOptions, (id) => t(`siteLanguages.${id}`))}
            onChange={(next) => patch({ languages: next as BriefDraftValues["languages"] })}
          />
          <BriefChoiceGroup
            legend={t("fields.translations")}
            optionalLabel={t("optional")}
            name="translations"
            type="radio"
            disabled={disabled}
            value={values.translations}
            options={optionsFrom(translationOptions, (id) => t(`translations.${id}`))}
            onChange={(next) => patch({ translations: next as BriefDraftValues["translations"] })}
          />
          <BriefChoiceGroup
            legend={t("fields.integrations")}
            optionalLabel={t("optional")}
            name="integrations"
            type="checkbox"
            disabled={disabled}
            value={values.integrations}
            options={optionsFrom(integrationOptions, (id) => t(`integrations.${id}`))}
            onChange={(next) => patch({ integrations: next as BriefDraftValues["integrations"] })}
          />
          <label className="flex flex-col gap-3 text-sm">
            <span className="leading-none">
              {t("fields.timeline")}
              <OptionalHint label={t("optional")} />
            </span>
            <input
              name="timeline"
              disabled={disabled}
              value={values.timeline}
              onChange={(event) => patch({ timeline: event.target.value })}
              className={fieldClassName}
            />
          </label>
        </div>
      ) : null}

      {step === 6 ? (
        <div className="space-y-6">
          <BriefSummary
            values={values}
            emptyLabel={t("empty")}
            label={(key) => t(`fields.${key}`)}
            optionLabel={(group, value) => t(`${group}.${value}`)}
          />
          <input
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            value={values.website}
            onChange={(event) => patch({ website: event.target.value })}
            className="absolute left-[-9999px] h-0 w-0 opacity-0"
            aria-hidden
          />
          {siteKey ? (
            <div className="w-full min-w-0 [&_iframe]:max-w-full">
              <Turnstile
                ref={turnstileRef}
                siteKey={siteKey}
                options={{ theme: "dark", size: "flexible" }}
                onSuccess={updateTurnstileToken}
                onExpire={() => updateTurnstileToken(null)}
                onError={() => updateTurnstileToken(null)}
              />
            </div>
          ) : null}
          <p className="text-fg-muted text-sm">
            {t("privacyNote")}{" "}
            <Link href="/privacy" className="underline underline-offset-4">
              {t("privacyLink")}
            </Link>
            .
          </p>
        </div>
      ) : null}

      <BriefStepNav
        step={step}
        loading={loading}
        backLabel={t("back")}
        nextLabel={t("next")}
        submitLabel={t("submit")}
        sendingLabel={t("sending")}
        onBack={() => goTo(step - 1)}
        onNext={goNext}
        onSubmit={() => void submitBrief()}
      />
    </form>
  );
}
