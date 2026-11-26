#!/usr/bin/env node
/**
 * IndexNow: notify Bing, Yandex, Seznam, Naver, Yep and others about new or changed URLs
 * (Google does not participate). Run by hand after a production deploy:
 *
 *   node scripts/indexnow.mjs                      # every URL from the live sitemap.xml
 *   node scripts/indexnow.mjs <url> [<url> ...]    # only the given URLs
 *
 * The key is public by design; the key file is public/<key>.txt.
 * Docs: https://www.indexnow.org/documentation
 */
const HOST = "piotrkulbacki.com";
const ORIGIN = `https://${HOST}`;
const KEY = "d450f943222b72c9f0463a9644ad5187";
const ENDPOINT = "https://api.indexnow.org/indexnow";
const MAX_URLS = 10_000;

async function sitemapUrls() {
  const response = await fetch(`${ORIGIN}/sitemap.xml`);
  if (!response.ok) throw new Error(`sitemap.xml: HTTP ${response.status}`);
  const xml = await response.text();
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1].trim());
}

const args = process.argv.slice(2);
const urls = args.length > 0 ? args : await sitemapUrls();
const foreign = urls.filter((url) => new URL(url).host !== HOST);
if (foreign.length > 0) throw new Error(`URLs outside ${HOST}: ${foreign.join(", ")}`);
if (urls.length === 0 || urls.length > MAX_URLS) {
  throw new Error(`Expected 1-${MAX_URLS} URLs, got ${urls.length}`);
}

const response = await fetch(ENDPOINT, {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({
    host: HOST,
    key: KEY,
    keyLocation: `${ORIGIN}/${KEY}.txt`,
    urlList: urls,
  }),
});

console.log(`IndexNow: ${urls.length} URLs -> HTTP ${response.status} ${response.statusText}`);
if (!response.ok) {
  console.error(await response.text());
  process.exitCode = 1;
}
