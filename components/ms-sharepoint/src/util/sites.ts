import type { Element } from "@prismatic-io/spectral";
import type { Site } from "../types";

export const mapToElement = (site: Site): Element => ({
  key: site.id,
  label: site.displayName,
});
