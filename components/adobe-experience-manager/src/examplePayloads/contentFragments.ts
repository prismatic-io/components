import type { Element } from "@prismatic-io/spectral";
import type {
  ContentFragment,
  ContentFragmentModel,
  ContentFragmentVariation,
  CursorPageResponse,
} from "../types";

const exampleContentFragment: ContentFragment = {
  id: "4f2b6c1e-8d3a-4b5c-9e7f-0a1b2c3d4e5f",
  path: "/content/dam/wknd-shared/en/adventures/surf-camp-in-costa-rica/surf-camp-in-costa-rica",
  title: "Surf Camp in Costa Rica",
  description: "A week of surfing on the Pacific coast.",
  status: "PUBLISHED",
  created: { at: "2026-03-02T15:04:11.000Z", by: "admin", fullName: "Admin User" },
  modified: { at: "2026-09-18T09:21:44.000Z", by: "jdoe", fullName: "Jane Doe" },
  published: { at: "2026-09-18T09:25:02.000Z", by: "jdoe", fullName: "Jane Doe" },
  model: {
    id: "L2NvbmYvd2tuZC1zaGFyZWQvc2V0dGluZ3MvZGFtL2NmbS9tb2RlbHMvYWR2ZW50dXJl",
    path: "/conf/wknd-shared/settings/dam/cfm/models/adventure",
    name: "adventure",
    title: "Adventure",
  },
  tags: [
    {
      id: "wknd-shared:activity/surfing",
      title: "Surfing",
      titlePath: "WKND Shared : Activity / Surfing",
    },
  ],
  fields: [
    { name: "title", type: "text", multiple: false, values: ["Surf Camp in Costa Rica"] },
    {
      name: "description",
      type: "long-text",
      multiple: false,
      mimeType: "text/html",
      values: ["<p>A week of surfing on the Pacific coast.</p>"],
    },
  ],
};

export const listContentFragmentsExamplePayload = {
  data: {
    items: [exampleContentFragment],
    cursor: "eyJsYXN0SWQiOiI0ZjJiNmMxZSJ9",
  },
};

export const searchContentFragmentsExamplePayload = {
  data: {
    items: [exampleContentFragment],
    cursor: "eyJsYXN0SWQiOiI0ZjJiNmMxZSJ9",
  },
};

export const getContentFragmentExamplePayload = { data: exampleContentFragment };

export const listContentFragmentVariationsExamplePayload: {
  data: CursorPageResponse<ContentFragmentVariation>;
} = {
  data: {
    items: [
      {
        name: "summer",
        title: "Summer",
        description: "Seasonal variation for the summer campaign.",
        fields: [{ name: "title", type: "text", multiple: false, values: ["Summer Surf Camp"] }],
        tags: [],
        modified: { at: "2026-09-10T12:00:00.000Z", by: "jdoe" },
      },
    ],
  },
};

const exampleContentFragmentModel: ContentFragmentModel = {
  id: "L2NvbmYvd2tuZC1zaGFyZWQvc2V0dGluZ3MvZGFtL2NmbS9tb2RlbHMvYWR2ZW50dXJl",
  path: "/conf/wknd-shared/settings/dam/cfm/models/adventure",
  name: "Adventure",
  description: "An adventure offered by WKND.",
};

export const listContentFragmentModelsExamplePayload = {
  data: { items: [exampleContentFragmentModel] },
};

export const selectContentFragmentModelExamplePayload: { result: Element[] } = {
  result: [
    {
      key: "L2NvbmYvd2tuZC1zaGFyZWQvc2V0dGluZ3MvZGFtL2NmbS9tb2RlbHMvYWR2ZW50dXJl",
      label: "Adventure",
    },
  ],
};

export const selectContentFragmentExamplePayload: { result: Element[] } = {
  result: [
    {
      key: exampleContentFragment.id,
      label: `${exampleContentFragment.title} (${exampleContentFragment.path})`,
    },
  ],
};
