export const createContentTypeExamplePayload = {
  sys: {
    type: "ContentType",
    id: "3ORKIAOaJqQWWg86MWkyOs",
    version: 1,
    space: {
      sys: {
        type: "Link",
        linkType: "Space",
        id: "yadj1kx9rmg0",
      },
    },
    environment: {
      sys: {
        type: "Link",
        linkType: "Environment",
        id: "staging",
      },
    },
    createdAt: "2015-05-18T11:29:46.809Z",
    createdBy: {
      sys: {
        type: "Link",
        linkType: "User",
        id: "7BslKh9TdKGOK41VmLDjFZ",
      },
    },
    updatedAt: "2015-05-18T11:29:46.809Z",
    updatedBy: {
      sys: {
        type: "Link",
        linkType: "User",
        id: "4FLrUHftHW3v2BLi9fzfjU",
      },
    },
  },
  displayField: "title",
  name: "Blog Post",
  description: "A blog post",
  fields: [
    {
      id: "title",
      name: "Title",
      type: "Text",
      localized: true,
      required: true,
      validations: [],
      disabled: false,
      omitted: false,
    },
    {
      id: "body",
      name: "Body",
      type: "Text",
      localized: true,
      required: true,
      validations: [],
      disabled: false,
      omitted: false,
    },
  ],
};

export const listContentTypesExamplePayload = [createContentTypeExamplePayload];

export const updateContentTypeExamplePayload = createContentTypeExamplePayload;
