import {
  cursorLinksSchema,
  cursorMetaSchema,
  offsetPaginationProperties,
} from "./pagination";
export const sectionSchema = {
  type: "object" as const,
  properties: {
    category_id: { type: "integer" },
    created_at: { type: "string" },
    description: { type: "string" },
    html_url: { type: "string" },
    id: { type: "integer" },
    locale: { type: "string" },
    name: { type: "string" },
    outdated: { type: "boolean" },
    parent_section_id: { type: ["integer", "null"] },
    position: { type: "integer" },
    source_locale: { type: "string" },
    theme_template: { type: "string" },
    updated_at: { type: "string" },
    url: { type: "string" },
  },
  required: ["locale", "name"],
};
export const createSectionOutputSchema = {
  type: "object" as const,
  properties: { section: sectionSchema },
  required: ["section"],
};
export const deleteSectionOutputSchema = { type: "string" as const };
export const getSectionOutputSchema = {
  type: "object" as const,
  properties: { section: sectionSchema },
  required: ["section"],
};
export const listSectionsOutputSchema = {
  type: "object" as const,
  properties: {
    sections: { type: "array", items: sectionSchema },
    meta: cursorMetaSchema,
    links: cursorLinksSchema,
    ...offsetPaginationProperties,
  },
  required: ["sections"],
};
export const updateSectionOutputSchema = {
  type: "object" as const,
  properties: { section: sectionSchema },
  required: ["section"],
};
