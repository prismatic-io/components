export const createEnvironmentTemplateExamplePayload = {
  sys: {
    id: "2nZrYQn7N7xijNAOhkKUrH",
    type: "EnvironmentTemplate",
    createdAt: "2022-02-01T06:43:57.044Z",
    updatedAt: "2022-02-01T06:43:57.044Z",
    version: "1",
    createdBy: {
      sys: {
        type: "Link",
        linkType: "User",
        id: "75cxRYbSLlWMlCrN1tZGdP",
      },
    },
    updatedBy: {
      sys: {
        type: "Link",
        linkType: "User",
        id: "75cxRYbSLlWMlCrN1tZGdP",
      },
    },
    organization: {
      sys: {
        type: "Link",
        linkType: "Organization",
        id: "75gbeC7tWNTERE55diMpCN",
      },
    },
  },
  name: "my-template",
  description: "My Template",
  versionName: "First Version",
  versionDescription: "First Version",
  entities: {
    contentTypeTemplates: [
      {
        name: "Blogpost",
        description: "A blogpost content type",
        displayField: "title",
        fields: [
          {
            id: "title",
            name: "title",
            type: "Text",
          },
        ],
        id: "blogpost",
      },
    ],
    editorInterfaceTemplates: [
      {
        contentTypeTemplate: {
          sys: {
            id: "blogpost",
            linkType: "ContentTypeTemplate",
            type: "Link",
          },
        },
        controls: [
          {
            fieldId: "title",
            widgetId: "urlEditor",
            widgetNamespace: "builtin",
            settings: {
              helpText: "help text",
            },
          },
        ],
      },
    ],
  },
};

export const updateEnvironmentTemplateExamplePayload =
  createEnvironmentTemplateExamplePayload;

export const getEnvironmentTemplateExamplePayload =
  createEnvironmentTemplateExamplePayload;





export const installTemplateExamplePayload = {
  sys: {
    id: "8a428ae1",
    type: "EnvironmentTemplateInstallation",
    space: {
      sys: {
        type: "Link",
        linkType: "Space",
        id: "hx6fedvayan0",
      },
    },
    environment: {
      sys: {
        type: "Link",
        linkType: "Environment",
        id: "master",
      },
    },
    template: {
      sys: {
        type: "Link",
        linkType: "Template",
        id: "2nZrYQn7N7xijNAOhkKUrH",
        version: "1",
      },
    },
    status: "created",
    createdAt: "2022-02-01T06:58:31.644Z",
    updatedAt: "2022-02-01T06:58:31.644Z",
    createdBy: {
      sys: {
        type: "Link",
        linkType: "User",
        id: "75cxRYbSLlWMlCrN1tZGdP",
      },
    },
    updatedBy: {
      sys: {
        type: "Link",
        linkType: "User",
        id: "75cxRYbSLlWMlCrN1tZGdP",
      },
    },
  },
};
