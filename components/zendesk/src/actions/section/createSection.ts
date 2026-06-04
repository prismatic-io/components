import { action } from "@prismatic-io/spectral";
import {
  categoryId,
  connectionInput,
  locale,
  position,
  sectionDescription,
  sectionName,
} from "../../inputs";
import { rawHttpClient } from "../../auth";
import type { Section } from "../../types";
import { createSectionPayload } from "../../examplePayloads";

export const createSection = action({
  display: {
    label: "Create Section",
    description: "Create a section in the Help Center.",
  },
  perform: async (
    context,
    {
      sectionName,
      sectionDescription,
      position,
      categoryId,
      locale,
      zendeskConnection,
    },
  ) => {
    const client = rawHttpClient(zendeskConnection, context.debug.enabled);
    const payload = {
      section: {
        name: sectionName,
        description: sectionDescription,
        locale,
        position,
      },
    };

    const { data } = await client.post<{ section: Section }>(
      `/help_center/categories/${categoryId}/sections`,
      payload,
    );

    return {
      data,
    };
  },
  inputs: {
    zendeskConnection: connectionInput,
    locale,
    categoryId,
    sectionName,
    sectionDescription,
    position: {
      ...position,
      comments: "The position of the section.",
    },
  },
  examplePayload: {
    data: createSectionPayload,
  },
});
