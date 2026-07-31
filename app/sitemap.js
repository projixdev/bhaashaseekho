import { siteMeta } from "@/content";

const routes = ["", "/about", "/courses", "/contact", "/register", "/privacy-policy"];

export default function sitemap() {
  return routes.map((route) => ({
    url: `${siteMeta.url}${route}`,
    lastModified: new Date(),
  }));
}
