export const richTextItemSchema = {
  type: "object" as const,
  properties: {
    type: { type: "string" },
    plain_text: { type: "string" },
    href: { type: ["string", "null"] },
    text: {
      type: "object" as const,
      properties: {
        content: { type: "string" },
        link: { type: ["object", "null"] },
      },
      required: [],
    },
    annotations: {
      type: "object" as const,
      properties: {
        bold: { type: "boolean" },
        italic: { type: "boolean" },
        strikethrough: { type: "boolean" },
        underline: { type: "boolean" },
        code: { type: "boolean" },
        color: { type: "string" },
      },
      required: [],
    },
  },
  required: [],
};
export const userReferenceSchema = {
  type: "object" as const,
  properties: {
    object: { type: "string" },
    id: { type: "string" },
  },
  required: [],
};
export const iconSchema = {
  type: ["object", "null"],
  properties: {
    type: { type: "string" },
    emoji: { type: "string" },
  },
  required: [],
};
export const coverSchema = {
  type: ["object", "null"],
  properties: {
    type: { type: "string" },
    external: {
      type: "object" as const,
      properties: { url: { type: "string" } },
      required: [],
    },
  },
  required: [],
};
export const propertySchemaEntrySchema = {
  type: "object" as const,
  properties: {
    id: { type: "string" },
    name: { type: "string" },
    type: { type: "string" },
    title: { type: "object" as const },
    rich_text: { type: "object" as const },
    checkbox: { type: "object" as const },
    date: { type: "object" as const },
    people: { type: "object" as const },
    files: { type: "object" as const },
    number: {
      type: "object" as const,
      properties: { format: { type: "string" } },
      required: [],
    },
    select: {
      type: "object" as const,
      properties: {
        options: { type: "array", items: { type: "object" as const } },
      },
      required: [],
    },
    multi_select: {
      type: "object" as const,
      properties: {
        options: { type: "array", items: { type: "object" as const } },
      },
      required: [],
    },
    relation: {
      type: "object" as const,
      properties: {
        database_id: { type: "string" },
        synced_property_name: { type: "string" },
        single_property: { type: "object" as const },
      },
      required: [],
    },
    rollup: {
      type: "object" as const,
      properties: {
        function: { type: "string" },
        relation_property_id: { type: "string" },
        relation_property_name: { type: "string" },
        rollup_property_id: { type: "string" },
        rollup_property_name: { type: "string" },
      },
      required: [],
    },
  },
  required: [],
};
export const pagePropertyValueSchema = {
  type: "object" as const,
  properties: {
    id: { type: "string" },
    type: { type: "string" },
    title: { type: "array", items: { type: "object" as const } },
    rich_text: { type: "array", items: { type: "object" as const } },
    checkbox: { type: "boolean" },
    number: { type: "number" },
    url: { type: "string" },
    multi_select: { type: "array", items: { type: "object" as const } },
    people: { type: "array", items: { type: "object" as const } },
    relation: { type: "array", items: { type: "object" as const } },
    has_more: { type: "boolean" },
    select: {
      type: "object" as const,
      properties: {
        id: { type: "string" },
        name: { type: "string" },
        color: { type: "string" },
      },
      required: [],
    },
    date: {
      type: "object" as const,
      properties: {
        start: { type: "string", format: "date-time" },
        end: { type: ["string", "null"] },
        time_zone: { type: ["string", "null"] },
      },
      required: [],
    },
    formula: {
      type: "object" as const,
      properties: {
        type: { type: "string" },
        number: { type: "number" },
      },
      required: [],
    },
    rollup: {
      type: "object" as const,
      properties: {
        type: { type: "string" },
        function: { type: "string" },
        number: { type: "number" },
      },
      required: [],
    },
  },
  required: [],
};
