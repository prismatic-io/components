import { input, util } from "@prismatic-io/spectral";
import { cleanCodeInputEmptyObject } from "../utils";

export const connection = input({
  label: "Connection",
  type: "connection",
  required: true,
});

export const restaurantExternalId = input({
  label: "Restaurant External ID",
  comments:
    "The GUID of the restaurant that is the context of the request. Use the List Accessible Restaurants action to get the external ID of a restaurant.",
  type: "string",
  required: true,
  example: "12345678-1234-1234-1234-123456789012",
  placeholder: "12345678-1234-1234-1234-123456789012",
  clean: util.types.toString,
});

export const additionalFields = input({
  label: "Additional Fields",
  type: "code",
  language: "json",
  required: false,
  comments:
    "Additional fields that might not be covered by the standard inputs. This is a JSON object.",
  clean: (value) => cleanCodeInputEmptyObject(value, "Additional Fields"),
});
