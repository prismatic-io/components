import type {
  GetTemplateDndResponse,
  GetTemplateDndResponseCollection,
  PatchTemplateDndResponse,
  PostTemplateDndResponse,
} from "klaviyo-api";

export const createTemplateExamplePayload: { data: PostTemplateDndResponse } = {
  data: {
    data: {
      type: "template",
      id: "string",
      attributes: {
        name: "string",
        editorType: "string",
        html: "string",
        text: "string",
        created: new Date("2022-11-08T00:00:00+00:00"),
        updated: new Date("2022-11-08T00:00:00+00:00"),
      },
      links: {
        self: "string",
      },
    },
  },
};

export const deleteTemplateExamplePayload: { data: string } = {
  data: "Template deleted successfully.",
};

export const getTemplateExamplePayload: { data: GetTemplateDndResponse } = {
  data: {
    data: {
      type: "template",
      id: "string",
      attributes: {
        name: "string",
        editorType: "string",
        html: "string",
        text: "string",
        created: new Date("2022-11-08T00:00:00+00:00"),
        updated: new Date("2022-11-08T00:00:00+00:00"),
      },
      links: {
        self: "string",
      },
    },
  },
};

export const listTemplatesExamplePayload: {
  data: GetTemplateDndResponseCollection;
} = {
  data: {
    data: [
      {
        type: "template",
        id: "string",
        attributes: {
          name: "string",
          editorType: "string",
          html: "string",
          text: "string",
          created: new Date("2022-11-08T00:00:00+00:00"),
          updated: new Date("2022-11-08T00:00:00+00:00"),
        },
        links: {
          self: "string",
        },
      },
    ],
    links: {
      self: "string",
      prev: "string",
      next: "string",
    },
  },
};

export const updateTemplateExamplePayload: { data: PatchTemplateDndResponse } =
  {
    data: {
      data: {
        type: "template",
        id: "string",
        attributes: {
          name: "string",
          editorType: "string",
          html: "string",
          text: "string",
          created: new Date("2022-11-08T00:00:00+00:00"),
          updated: new Date("2022-11-08T00:00:00+00:00"),
        },
        links: {
          self: "string",
        },
      },
    },
  };

export const selectTemplateExamplePayload = {
  result: [{ label: "Welcome Email", key: "01HABCDEF012345678TEMPLATE" }],
};
