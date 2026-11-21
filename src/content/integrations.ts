// Home integrations section. Copy from gofunnel-website-copy.md (Home, Section 6).
// The tiles are a sample of the integrations in the app (designer handoff, section 8), each shown with the
// tool's own production app icon, as joindex.com does: public/integrations/*.png are the 256px icons from
// each company's App Store listing (Meta Ads Manager for Facebook Ads, Zoom Workplace for Zoom). Slack
// connects in Settings; Claude and ChatGPT read GoFunnel through GoFunnel MCP; Vimeo is read by the
// tracking script. The full list of 53 lives on /integrations. Coming-soon tools (HubSpot, Pipedrive) are
// left out, and so are tools without an app icon that matches the brand (Typeform, ClickFunnels, Whop).
export type IntegrationTile = { name: string; icon: string };

const t = (name: string, slug: string): IntegrationTile => ({ name, icon: `/integrations/${slug}.png` });

export const integrations = {
  headline: "GoFunnel connects to the 50+ tools you already use",
  cta: { label: "See All Integrations", href: "/integrations" },
  // Top row: 14 tiles, running nearly the full frame and fading at both ends. Bottom row: 6 on each side
  // of the GoFunnel app icon.
  top: [
    t("Vimeo", "vimeo"),
    t("Stripe", "stripe"),
    t("Calendly", "calendly"),
    t("TikTok Ads", "tiktok"),
    t("Zoho CRM", "zoho-crm"),
    t("Salesforce", "salesforce"),
    t("Google Ads", "google-ads"),
    t("Shopify", "shopify"),
    t("Slack", "slack"),
    t("Zoom", "zoom"),
    t("YouTube", "youtube"),
    t("Discord", "discord"),
    t("Facebook Ads", "meta-ads"),
    t("Mercury", "mercury"),
  ],
  bottomLeft: [
    t("Fireflies", "fireflies"),
    t("PayPal", "paypal"),
    t("Snapchat Ads", "snapchat"),
    t("Google Meet", "google-meet"),
    t("Podio", "podio"),
    t("Close CRM", "close"),
  ],
  bottomRight: [
    t("ChatGPT", "chatgpt"),
    t("Claude", "claude"),
    t("Google Gemini", "gemini"),
    t("Wix Payments", "wix"),
    t("Fathom", "fathom"),
    t("Quo", "quo"),
  ],
};
