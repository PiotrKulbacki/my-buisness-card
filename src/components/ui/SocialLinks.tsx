import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

type SocialKey = keyof typeof siteConfig.social;

const icons: Record<SocialKey, { label: string; path: string }> = {
  linkedin: {
    label: "LinkedIn",
    path: "M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.5 8.5h4V23h-4V8.5zm7.5 0h3.8v2h.1c.5-1 1.8-2.1 3.8-2.1 4 0 4.8 2.7 4.8 6.1V23h-4v-7.1c0-1.7 0-3.9-2.4-3.9s-2.7 1.8-2.7 3.8V23h-4V8.5z",
  },
  facebook: {
    label: "Facebook",
    path: "M14 2h-3a5 5 0 0 0-5 5v3H3v4h3v8h4v-8h3.2L14 10H10V7a1 1 0 0 1 1-1h3V2z",
  },
  github: {
    label: "GitHub",
    path: "M12 .5a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2.1c-3.3.7-4-1.6-4-1.6-.5-1.3-1.3-1.7-1.3-1.7-1-.7.1-.7.1-.7 1.1.1 1.7 1.2 1.7 1.2 1 .1.7 1.7 2.7 1.2.1-.8.4-1.3.7-1.6-2.7-.3-5.5-1.3-5.5-6a4.7 4.7 0 0 1 1.2-3.2 4.3 4.3 0 0 1 .1-3.2s1-.3 3.3 1.2a11.3 11.3 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2a4.3 4.3 0 0 1 .1 3.2 4.7 4.7 0 0 1 1.2 3.2c0 4.7-2.8 5.7-5.5 6 .4.4.8 1.1.8 2.2v3.2c0 .3.2.7.8.6A12 12 0 0 0 12 .5z",
  },
  instagram: {
    label: "Instagram",
    path: "M12 2.2c3.2 0 3.6 0 4.9.1 1.2.1 1.9.3 2.3.5.6.2 1 .5 1.5 1 .4.4.7.9 1 1.5.2.4.4 1.1.5 2.3.1 1.3.1 1.7.1 4.9s0 3.6-.1 4.9c-.1 1.2-.3 1.9-.5 2.3-.2.6-.5 1-1 1.5-.4.4-.9.7-1.5 1-.4.2-1.1.4-2.3.5-1.3.1-1.7.1-4.9.1s-3.6 0-4.9-.1c-1.2-.1-1.9-.3-2.3-.5-.6-.2-1-.5-1.5-1-.4-.4-.7-.9-1-1.5-.2-.4-.4-1.1-.5-2.3C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.9c.1-1.2.3-1.9.5-2.3.2-.6.5-1 1-1.5.4-.4.9-.7 1.5-1 .4-.2 1.1-.4 2.3-.5C8.4 2.2 8.8 2.2 12 2.2zm0 2.2c-3.1 0-3.5 0-4.7.1-1 .1-1.6.2-2 .4-.5.2-.8.4-1.2.8-.4.4-.6.7-.8 1.2-.2.4-.3 1-.4 2-.1 1.2-.1 1.6-.1 4.7s0 3.5.1 4.7c.1 1 .2 1.6.4 2 .2.5.4.8.8 1.2.4.4.7.6 1.2.8.4.2 1 .3 2 .4 1.2.1 1.6.1 4.7.1s3.5 0 4.7-.1c1-.1 1.6-.2 2-.4.5-.2.8-.4 1.2-.8.4-.4.6-.7.8-1.2.2-.4.3-1 .4-2 .1-1.2.1-1.6.1-4.7s0-3.5-.1-4.7c-.1-1-.2-1.6-.4-2-.2-.5-.4-.8-.8-1.2-.4-.4-.7-.6-1.2-.8-.4-.2-1-.3-2-.4-1.2-.1-1.6-.1-4.7-.1zm0 3.7a5.9 5.9 0 1 1 0 11.8 5.9 5.9 0 0 1 0-11.8zm0 2.2a3.7 3.7 0 1 0 0 7.4 3.7 3.7 0 0 0 0-7.4zm6-2.5a1.4 1.4 0 1 1 0 2.8 1.4 1.4 0 0 1 0-2.8z",
  },
  youtube: {
    label: "YouTube",
    path: "M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2 31.5 31.5 0 0 0 0 12a31.5 31.5 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1A31.5 31.5 0 0 0 24 12a31.5 31.5 0 0 0-.5-5.8zM9.8 15.5v-7l6.3 3.5-6.3 3.5z",
  },
};

export function SocialLinks({ className, keys }: { className?: string; keys?: SocialKey[] }) {
  const list = keys ?? (Object.keys(icons) as SocialKey[]);

  return (
    <ul className={cn("flex flex-wrap items-center gap-3", className)}>
      {list.map((key) => {
        const item = icons[key];
        return (
          <li key={key}>
            <a
              href={siteConfig.social[key]}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={item.label}
              className="focus-ring border-line text-fg hover:border-accent hover:text-accent inline-flex size-10 items-center justify-center rounded-full border transition-colors"
            >
              <svg viewBox="0 0 24 24" className="size-4 fill-current" aria-hidden>
                <path d={item.path} />
              </svg>
            </a>
          </li>
        );
      })}
    </ul>
  );
}
