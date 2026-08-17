import type { BriefDraftValues } from "@/lib/schemas/brief";
import { hasCurrentWebsite } from "@/lib/schemas/brief";

type BriefSummaryProps = {
  values: BriefDraftValues;
  emptyLabel: string;
  label: (key: string) => string;
  optionLabel: (group: string, value: string) => string;
};

function join(
  values: readonly string[],
  group: string,
  optionLabel: (group: string, value: string) => string,
  empty: string,
) {
  if (!values.length) return empty;
  return values.map((value) => optionLabel(group, value)).join(" · ");
}

export function BriefSummary({ values, emptyLabel, label, optionLabel }: BriefSummaryProps) {
  const rows: { key: string; value: string }[] = [
    { key: "name", value: values.name || emptyLabel },
    { key: "company", value: values.company || emptyLabel },
    { key: "email", value: values.email || emptyLabel },
    { key: "phone", value: values.phone || emptyLabel },
    { key: "currentWebsite", value: values.currentWebsite || emptyLabel },
    {
      key: "projectType",
      value: values.projectType ? optionLabel("projectTypes", values.projectType) : emptyLabel,
    },
    { key: "goals", value: join(values.goals, "goals", optionLabel, emptyLabel) },
    { key: "goalDescription", value: values.goalDescription || emptyLabel },
  ];

  if (values.projectType === "website") {
    rows.push({ key: "pages", value: join(values.pages, "pages", optionLabel, emptyLabel) });
  }
  if (values.projectType === "app") {
    rows.push({
      key: "appFeatures",
      value: join(values.appFeatures, "appFeatures", optionLabel, emptyLabel),
    });
  }

  rows.push(
    { key: "scopeExtra", value: join(values.scopeExtra, "scopeExtra", optionLabel, emptyLabel) },
    { key: "scopeNotes", value: values.scopeNotes || emptyLabel },
    {
      key: "hasLogo",
      value: values.hasLogo ? optionLabel("material", values.hasLogo) : emptyLabel,
    },
    {
      key: "hasPhotos",
      value: values.hasPhotos ? optionLabel("material", values.hasPhotos) : emptyLabel,
    },
    {
      key: "hasCopy",
      value: values.hasCopy ? optionLabel("material", values.hasCopy) : emptyLabel,
    },
    { key: "inspiration", value: values.inspiration || emptyLabel },
  );

  if (hasCurrentWebsite(values)) {
    rows.push(
      {
        key: "rebuild",
        value: values.rebuild ? optionLabel("rebuild", values.rebuild) : emptyLabel,
      },
      {
        key: "existingNeeds",
        value: join(values.existingNeeds, "existingNeeds", optionLabel, emptyLabel),
      },
      { key: "existingNotes", value: values.existingNotes || emptyLabel },
    );
  }

  rows.push(
    {
      key: "languages",
      value: join(values.languages, "siteLanguages", optionLabel, emptyLabel),
    },
    {
      key: "translations",
      value: values.translations ? optionLabel("translations", values.translations) : emptyLabel,
    },
    {
      key: "integrations",
      value: join(values.integrations, "integrations", optionLabel, emptyLabel),
    },
    { key: "timeline", value: values.timeline || emptyLabel },
  );

  return (
    <dl className="space-y-4">
      {rows.map((row) => (
        <div key={row.key} className="border-line border-b pb-4 last:border-b-0 last:pb-0">
          <dt className="text-fg-muted text-sm">{label(row.key)}</dt>
          <dd className="mt-1 whitespace-pre-wrap">{row.value}</dd>
        </div>
      ))}
    </dl>
  );
}
