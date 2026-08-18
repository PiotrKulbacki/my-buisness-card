import {
  EMAIL_BRAND,
  escapeHtml,
  inkCss,
  mutedParagraphHtml,
  wrapEmailHtml,
} from "@/lib/email/layout";
import {
  fillTemplate,
  getBriefMessages,
  getEmailMessages,
  resolveLocale,
} from "@/lib/email/messages";
import { resolveInboxReplyUrl } from "@/lib/reply-token";
import { joinNameIdeas, type BriefPayload } from "@/lib/schemas/brief";

function joinLabels(values: string[] | undefined, labels: Record<string, string>, empty: string) {
  if (!values?.length) return empty;
  return values.map((value) => labels[value] ?? value).join(", ");
}

function singleLabel(value: string | undefined, labels: Record<string, string>, empty: string) {
  if (!value) return empty;
  return labels[value] ?? value;
}

export function buildBriefRows(params: BriefPayload, locale?: string | null) {
  const copy = getBriefMessages(locale);
  const empty = copy.empty;

  const rows: { label: string; value: string }[] = [
    { label: copy.fields.name, value: params.name },
    { label: copy.fields.company, value: params.company ?? empty },
    { label: copy.fields.email, value: params.email },
    { label: copy.fields.phone, value: params.phone ?? empty },
    { label: copy.fields.currentWebsite, value: params.currentWebsite ?? empty },
    {
      label: copy.fields.projectType,
      value: copy.projectTypes[params.projectType],
    },
    {
      label: copy.fields.nameIdeas,
      value: joinNameIdeas(params).join(", ") || empty,
    },
    {
      label: copy.fields.goals,
      value: joinLabels(params.goals, copy.goals, empty),
    },
    { label: copy.fields.goalDescription, value: params.goalDescription },
  ];

  if (params.projectType === "website") {
    rows.push({ label: copy.fields.pages, value: joinLabels(params.pages, copy.pages, empty) });
  }
  if (params.projectType === "app") {
    rows.push({
      label: copy.fields.appFeatures,
      value: joinLabels(params.appFeatures, copy.appFeatures, empty),
    });
  }

  rows.push(
    { label: copy.fields.scopeNotes, value: params.scopeNotes ?? empty },
    { label: copy.fields.hasLogo, value: singleLabel(params.hasLogo, copy.material, empty) },
    { label: copy.fields.hasPhotos, value: singleLabel(params.hasPhotos, copy.material, empty) },
    { label: copy.fields.hasCopy, value: singleLabel(params.hasCopy, copy.material, empty) },
    { label: copy.fields.inspiration, value: params.inspiration ?? empty },
  );

  if (params.currentWebsite) {
    rows.push(
      { label: copy.fields.rebuild, value: singleLabel(params.rebuild, copy.rebuild, empty) },
      {
        label: copy.fields.existingNeeds,
        value: joinLabels(params.existingNeeds, copy.existingNeeds, empty),
      },
      { label: copy.fields.existingNotes, value: params.existingNotes ?? empty },
    );
  }

  rows.push(
    {
      label: copy.fields.languages,
      value: joinLabels(params.languages, copy.siteLanguages, empty),
    },
    {
      label: copy.fields.translations,
      value: singleLabel(params.translations, copy.translations, empty),
    },
    {
      label: copy.fields.integrations,
      value: joinLabels(params.integrations, copy.integrations, empty),
    },
    { label: copy.fields.timeline, value: params.timeline ?? empty },
  );

  return rows;
}

export function buildBriefInboxEmail(params: BriefPayload): {
  subject: string;
  html: string;
  text: string;
} {
  const locale = resolveLocale(params.locale);
  const copy = getEmailMessages(locale);
  const rows = buildBriefRows(params, locale);
  const subject = fillTemplate(copy.briefInbox.subject, { name: params.name });
  const replyUrl = resolveInboxReplyUrl({
    to: params.email,
    name: params.name,
    locale,
    source: "brief",
  });

  const textLines = [copy.briefInbox.title, ""];
  for (const row of rows) {
    textLines.push(`${row.label}: ${row.value}`, "");
  }

  const bodyInk = inkCss(EMAIL_BRAND.text);
  const bodyParts = [
    `<h2 style="margin:0 0 20px;font-size:18px;font-weight:700;${bodyInk}">${escapeHtml(copy.briefInbox.title)}</h2>`,
    ...rows.map(
      (row) =>
        `<p style="margin:0 0 12px;${bodyInk}"><strong style="${bodyInk}">${escapeHtml(row.label)}:</strong><br /><span style="white-space:pre-wrap;${bodyInk}">${escapeHtml(row.value)}</span></p>`,
    ),
    mutedParagraphHtml(copy.briefInbox.replyHint),
  ];

  const html = wrapEmailHtml({
    locale,
    bodyHtml: bodyParts.join(""),
    cta: { label: copy.briefInbox.cta, url: replyUrl },
  });

  return { subject, html, text: textLines.join("\n").trim() };
}
