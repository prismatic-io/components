import { input, util } from "@prismatic-io/spectral";
import { connection, fields } from "./shared";
import { FIELDS_IMAGE_MODEL } from "../constants";
import { cleanBooleanInput, cleanStringInput } from "../utils";

const fieldsImage = input({ ...fields, model: FIELDS_IMAGE_MODEL });

export const listImagesInputs = {
  connection,
  fieldsImage,
};

const imageUrl = input({
  label: "Image URL",
  comments:
    "An existing image url to import the image from. Alternatively, you may specify a base-64 encoded data-uri (`data:image/...`). Supported image formats: jpeg,png,gif. Maximum image size: 5MB. Use this field or File Data.",
  type: "string",
  example: "https://example.com/image.jpg",
  placeholder: "https://example.com/image.jpg",
  required: false,
  clean: cleanStringInput,
});

const imageName = input({
  label: "Image Name",
  comments:
    "A name for the image. Defaults to the filename if not provided. If the name matches an existing image, a suffix will be added.",
  type: "string",
  example: "My Image",
  placeholder: "My Image",
  required: false,
  clean: cleanStringInput,
});

const fileData = input({
  label: "File Data",
  placeholder: "Output data from previous step. Use this field or Image URL.",
  type: "data",
  required: false,
  comments:
    "The contents to write to a file. Binary data generated from a previous step.",
  clean: util.types.toData,
});

export const uploadImageInputs = {
  connection,
  imageUrl,
  imageName,
  fileData,
};

const imageId = input({
  label: "Image ID",
  comments: "The ID of the image.",
  type: "string",
  example: "155463624",
  placeholder: "155463624",
  required: true,
  clean: cleanStringInput,
  dataSource: "selectImage",
});

export const getImageInputs = {
  connection,
  imageId,
  fieldsImage,
};

export const imageHidden = input({
  label: "Image Hidden",
  type: "string",
  required: false,
  default: undefined,
  model: ["True", "False"].map((choice) => ({
    label: choice,
    value: choice.toLowerCase(),
  })),
  clean: cleanBooleanInput,
});

export const updateImageInputs = {
  connection,
  imageId,
  imageName,
  imageHidden,
};
