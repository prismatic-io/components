import { action } from "@prismatic-io/spectral";
import {
  categoryId,
  connectionInput,
  locale,
  parentSectionId,
  position,
  sectionDescription,
  sectionId,
  sectionName,
} from "../../inputs";
import { rawHttpClient } from "../../auth";
import type { Section } from "../../types";
import { updateSectionPayload } from "../../examplePayloads";

export const updateSection = action({
  display: {
    label: "Update Section",
    description: "Update a section in the Help Center.",
  },
  perform: async (
    context,
    {
      categoryId,
      parentSectionId,
      position,
      sectionDescription,
      sectionName,
      locale,
      sectionId,
      zendeskConnection,
    },
  ) => {
    const client = rawHttpClient(zendeskConnection, context.debug.enabled);
    const payload = {
      section: {
        category_id: categoryId || undefined,
        name: sectionName || undefined,
        description: sectionDescription || undefined,
        position: position || undefined,
        parent_section_id: parentSectionId || undefined,
      },
    };

    const { data } = await client.put<{ section: Section }>(
      `/help_center/${locale}/sections/${sectionId}`,
      payload,
    );

    return { data };
  },
  inputs: {
    zendeskConnection: connectionInput,
    locale,
    sectionId,
    sectionName: {
      ...sectionName,
      required: false,
      comments: "Name of the Section to update.",
    },
    sectionDescription: {
      ...sectionDescription,
      comments: "Description of the Section to update.",
    },
    position: {
      ...position,
      comments: "Position of the Section to update.",
    },
    categoryId: {
      ...categoryId,
      required: false,
      comments: "Category ID of the Section to update.",
    },
    parentSectionId: {
      ...parentSectionId,
      comments: "Parent Section ID of the Section to update.",
    },
  },
  examplePayload: { data: updateSectionPayload },
});
