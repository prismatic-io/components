import { input, util } from "@prismatic-io/spectral";
import { LIST_PRODUCT_IMAGES_DATASOURCE_REFERENCE } from "../../constants";
import { cleanStringInput } from "../../util";

export const imageId = input({
  label: "Image ID",
  type: "string",
  required: true,
  comments: "The unique identifier for the product image.",
  example: "r84963704502935",
  placeholder: "Enter image ID",
  clean: util.types.toString,
  dataSource: LIST_PRODUCT_IMAGES_DATASOURCE_REFERENCE,
});

export const imageURL = input({
  label: "Image URL",
  type: "string",
  required: true,
  comments: "The URL of the product image to upload.",
  example: "https://example.com/rails_logo.gif",
  placeholder: "Enter image URL",
  clean: util.types.toString,
});

export const fileName = input({
  label: "File Name",
  type: "string",
  required: true,
  comments: "The filename for the image including its extension.",
  example: "logo.gif",
  placeholder: "Enter file name",
  clean: util.types.toString,
});

export const imagePosition = input({
  label: "Image Position",
  type: "string",
  required: false,
  comments:
    "The sort order position of the image. Position 1 sets the default image for the product.",
  example: "1",
  placeholder: "Enter position number",
  clean: cleanStringInput,
});

export const imageAlt = input({
  label: "Image Alt",
  type: "string",
  required: false,
  comments:
    "Alternative text displayed when the image cannot be loaded. Used for accessibility and SEO.",
  example: "This is example alt text.",
  placeholder: "Enter alt text",
  clean: cleanStringInput,
});
