import type {
  GetImageResponse,
  GetImageResponseCollection,
  PatchImageResponse,
  PostImageResponse,
} from "klaviyo-api";

export const getImageExamplePayload: { data: GetImageResponse } = {
  data: {
    data: {
      type: "image",
      id: "7",
      attributes: {
        name: "string",
        imageUrl: "string",
        format: "string",
        size: 0,
        hidden: true,
        updatedAt: new Date("2022-11-08T00:00:00+00:00"),
      },
      links: {
        self: "string",
      },
    },
  },
};

export const listImagesExamplePayload: { data: GetImageResponseCollection } = {
  data: {
    data: [
      {
        type: "image",
        id: "7",
        attributes: {
          name: "string",
          imageUrl: "string",
          format: "string",
          size: 0,
          hidden: true,
          updatedAt: new Date("2022-11-08T00:00:00+00:00"),
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

export const updateImageExamplePayload: { data: PatchImageResponse } = {
  data: {
    data: {
      type: "image",
      id: "7",
      attributes: {
        name: "string",
        imageUrl: "string",
        format: "string",
        size: 0,
        hidden: true,
        updatedAt: new Date("2022-11-08T00:00:00+00:00"),
      },
      links: {
        self: "string",
      },
    },
  },
};

export const uploadImageExamplePayload: { data: PostImageResponse } = {
  data: {
    data: {
      type: "image",
      id: "7",
      attributes: {
        name: "string",
        imageUrl: "string",
        format: "string",
        size: 0,
        hidden: true,
        updatedAt: new Date("2022-11-08T00:00:00+00:00"),
      },
      links: {
        self: "string",
      },
    },
  },
};

export const selectImageExamplePayload = {
  result: [{ label: "Example Image", key: "155463624" }],
};
