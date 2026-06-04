import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import {
  connection,
  jsonData,
  themeUrl,
  title,
  type,
  workspaceUrl,
} from "../../inputs";
import { getFormResponse as createFormResponse } from "../../examplePayloads/forms";
import type { Form } from "../../interfaces/forms";
import {
  cuiSettingsInput,
  fieldsInput,
  hiddenInput,
  logicInput,
  settingsInput,
  thankyouScreensInput,
  variableInput,
  welcomeScreensInput,
} from "../../exampleInputs/forms";
import { formatCode, setHrefObject } from "../../util";

export const createForm = action({
  display: {
    label: "Create Form",
    description: "Create a form",
  },
  inputs: {
    title,
    type,
    theme: themeUrl,
    workspaceUrl,
    cuiSettings: {
      ...jsonData,
      label: "CUI Settings",
      example: formatCode(cuiSettingsInput),
      comments: "The CUI settings for the form.",
    },
    fields: {
      ...jsonData,
      label: "Fields",
      example: formatCode(fieldsInput),
      comments: "The fields for the form.",
    },
    hidden: {
      ...jsonData,
      label: "Hidden",
      example: formatCode(hiddenInput),
      comments: "The hidden fields for the form.",
    },
    logic: {
      ...jsonData,
      label: "Logic",
      example: formatCode(logicInput),
      comments: "The logic for the form.",
    },
    setting: {
      ...jsonData,
      label: "Settings",
      example: formatCode(settingsInput),
      comments: "The settings for the form.",
    },
    thankyouScreen: {
      ...jsonData,
      label: "Thank You Screens",
      example: formatCode(thankyouScreensInput),
      comments: "The thank you screens for the form.",
    },
    variables: {
      ...jsonData,
      label: "Variables",
      example: formatCode(variableInput),
      comments: "The variables for the form.",
    },
    welcomeScreens: {
      ...jsonData,
      label: "Welcome Screens",
      example: formatCode(welcomeScreensInput),
      comments: "The welcome screens for the form.",
    },
    connection,
  },
  perform: async (
    context,
    {
      connection,
      cuiSettings,
      fields,
      hidden,
      setting,
      thankyouScreen,
      theme,
      title,
      type,
      variables,
      welcomeScreens,
      workspaceUrl,
      logic,
    },
  ) => {
    const client = createClient(connection, context.debug.enabled);

    const { data } = await client.post<Form>(`/forms`, {
      cui_settings: cuiSettings,
      fields,
      hidden,
      logic,
      setting,
      thankyou_screens: thankyouScreen,
      theme: setHrefObject(theme),
      title,
      type,
      variables,
      welcome_screens: welcomeScreens,
      workspace: setHrefObject(workspaceUrl),
    });
    return {
      data,
    };
  },
  examplePayload: {
    data: createFormResponse,
  },
});
