import { action, util } from "@prismatic-io/spectral";
import { handleErrors } from "@prismatic-io/spectral/dist/clients/http";
import {
  sharedLinkInput,
  sharedLinkPasswordInput,
  fieldsInput,
  fileIdInput,
  sharedLinkAccessInput,
  sharedLinkPermissionsInput,
  sharedLinkVanityNameInput,
  connectionInput,
} from "../inputs";
import { createBoxHttpClient } from "../client";
import {
  findFileForSharedLinkExamplePayload,
  getSharedLinkForFileExamplePayload,
} from "../examplePayloads";

export const findFileForSharedLink = action({
  display: {
    label: "Find File For Shared Link",
    description: "Returns the file represented by a shared link",
  },
  perform: async (context, params) => {
    const sharedLink = util.types.toString(params.sharedLink);
    const sharedLinkPassword = params.sharedLinkPassword || null;
    const fields = params.fields || null;
    const client = createBoxHttpClient(
      params.boxConnection,
      context.debug.enabled,
    );

    const { data } = await client.get("/shared_items", {
      headers: {
        boxapi: `shared_link=${sharedLink}&shared_link_password=${sharedLinkPassword}`,
      },
      params: {
        fields,
      },
    });
    return {
      data,
    };
  },
  inputs: {
    sharedLink: sharedLinkInput,
    sharedLinkPassword: sharedLinkPasswordInput,
    fields: fieldsInput,
    boxConnection: connectionInput,
  },
  examplePayload: findFileForSharedLinkExamplePayload,
});

export const getSharedLinkForFile = action({
  display: {
    label: "Get Shared Link For File",
    description: "Gets the shared link for a file",
  },
  perform: async (context, { fileId, boxConnection }) => {
    const client = createBoxHttpClient(boxConnection, context.debug.enabled);

    const { data } = await client.get(`/files/${fileId}`, {
      params: {
        fields: "shared_link",
      },
    });
    return {
      data: {
        sharedLink: data.shared_link.url,
      },
    };
  },
  inputs: {
    fileId: fileIdInput,
    boxConnection: connectionInput,
  },
  examplePayload: getSharedLinkForFileExamplePayload,
});
export const addSharedLinkToFile = action({
  display: {
    label: "Add Shared Link to File",
    description: "Adds a shared link to a file",
  },
  perform: async (context, params) => {
    const fileId = params.fileId;
    const sharedLink = params.fields;
    const sharedLinkAccess = params.sharedLinkAccess;
    const sharedLinkPassword = params.sharedLinkPassword || null;
    const sharedLinkVanityName = params.sharedLinkVanityName || null;
    const sharedLinkPermissions = params.sharedLinkPermissions || {};

    const client = createBoxHttpClient(
      params.boxConnection,
      context.debug.enabled,
    );

    const body = {
      shared_link: {
        access: sharedLinkAccess,
        password: sharedLinkPassword,
        permissions: sharedLinkPermissions,
        vanity_name: sharedLinkVanityName,
      },
    };

    const { data } = await client.put(`/files/${fileId}`, body, {
      params: {
        sharedLink,
        fields: "shared_link",
      },
    });
    return {
      data,
    };
  },
  inputs: {
    fileId: fileIdInput,
    fields: sharedLinkInput,
    sharedLinkAccess: sharedLinkAccessInput,
    sharedLinkPassword: sharedLinkPasswordInput,
    sharedLinkPermissions: sharedLinkPermissionsInput,
    sharedLinkVanityName: sharedLinkVanityNameInput,
    boxConnection: connectionInput,
  },
});

export const updateSharedLinkToFile = action({
  display: {
    label: "Update Shared Link on File",
    description: "Updates a shared link on a file",
  },
  perform: async (context, params) => {
    const fileId = params.fileId;
    const sharedLink = params.sharedLink;
    const sharedLinkAccess = params.sharedLinkAccess;
    const sharedLinkPassword = params.sharedLinkPassword || null;
    const sharedLinkVanityName = params.sharedLinkVanityName || null;
    const sharedLinkPermissions = params.sharedLinkPermissions || {};

    const client = createBoxHttpClient(
      params.boxConnection,
      context.debug.enabled,
    );

    const { data } = await client.put(
      `/2.0/files/${fileId}`,
      {
        shared_link: {
          access: sharedLinkAccess,
          password: sharedLinkPassword,
          permissions: sharedLinkPermissions,
          vanity_name: sharedLinkVanityName,
        },
      },
      {
        params: {
          sharedLink,
          fields: "shared_link",
        },
      },
    );
    return {
      data,
    };
  },
  inputs: {
    fileId: fileIdInput,
    sharedLink: sharedLinkInput,
    sharedLinkAccess: sharedLinkAccessInput,
    sharedLinkPassword: sharedLinkPasswordInput,
    sharedLinkPermissions: sharedLinkPermissionsInput,
    sharedLinkVanityName: sharedLinkVanityNameInput,
    boxConnection: connectionInput,
  },
});

export const removeSharedLinkFromFile = action({
  display: {
    label: "Remove Shared Link from File",
    description: "Removes a shared link from a file",
  },
  perform: async (context, params) => {
    const fileId = params.fileId;

    const client = createBoxHttpClient(
      params.boxConnection,
      context.debug.enabled,
    );

    try {
      const { data } = await client.put(
        `/files/${fileId}`,
        {
          shared_link: null,
        },
        {
          params: {
            fields: "shared_link",
          },
        },
      );
      return {
        data,
      };
    } catch (error) {
      const handled = handleErrors(error);
      const serialized = util.types.toJSON(handled);
      throw new Error(serialized);
    }
  },
  inputs: {
    fileId: fileIdInput,
    boxConnection: connectionInput,
  },
});
