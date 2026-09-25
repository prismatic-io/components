import {
  type Element,
  type InputFieldDefinition,
  input,
} from "@prismatic-io/spectral";
export const convertBooleanInputIntoUpdateInput = (
  definition: InputFieldDefinition,
) =>
  input({
    label: definition.label,
    comments: definition.comments,
    type: "string",
    required: false,
    model: ["True", "False"].map((choice) => ({
      label: choice,
      value: choice.toLowerCase(),
    })),
    clean: (value: unknown): boolean | undefined => {
      if (value === "true") {
        return true;
      }
      if (value === "false") {
        return false;
      }
      return undefined;
    },
  });
export const byElementLabel = (a: Element, b: Element) =>
  (a.label ?? "") < (b.label ?? "") ? -1 : 1;
