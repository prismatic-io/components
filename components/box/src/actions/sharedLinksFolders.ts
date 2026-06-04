import { action, util } from "@prismatic-io/spectral";
import {
  sharedLinkInput,
  sharedLinkPasswordInput,
  folderIdInput,
  fieldsInput,
  sharedLinkAccessInput,
  sharedLinkPermissionsFolderInput,
  sharedLinkVanityNameInput,
  connectionInput,
} from "../inputs";
import { createBoxHttpClient } from "../client";
import {
  findFolderForSharedLinkExamplePayload,
  getSharedLinkForFolderExamplePayload,
} from "../examplePayloads";

export const findFolderForSharedLink = action({
  display: {
    label: "Find Folder For Shared Link",
    description: "Returns the folder represented by a shared link",
  },
  perform: async (context, params) => {
    const sharedLink = params.sharedLink;
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
  examplePayload: findFolderForSharedLinkExamplePayload,
});

export const getSharedLinkForFolder = action({
  display: {
    label: "Get Shared Link For Folder",
    description: "Gets the shared link for a folder",
  },
  perform: async (context, params) => {
    const folderId = util.types.toString(params.folderId);
    const client = createBoxHttpClient(
      params.boxConnection,
      context.debug.enabled,
    );

    const { data } = await client.get(`/folders/${folderId}`, {
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
    folderId: folderIdInput,
    boxConnection: connectionInput,
  },
  examplePayload: getSharedLinkForFolderExamplePayload,
});

export const addSharedLinkToFolder = action({
  display: {
    label: "Add Shared Link to Folder",
    description: "Adds a shared link to a folder",
  },
  perform: async (context, params) => {
    const folderId = params.folderId;
    const sharedLink = params.sharedLink;
    const sharedLinkAccess = params.sharedLinkAccess;
    const sharedLinkPassword = params.sharedLinkPassword
      ? params.sharedLinkPassword
      : null;
    const sharedLinkVanityName = params.sharedLinkVanityName
      ? params.sharedLinkVanityName
      : null;
    let sharedLinkPermissions = params.sharedLinkPermissions || {};

    const client = createBoxHttpClient(
      params.boxConnection,
      context.debug.enabled,
    );

    sharedLinkPermissions = {
      ...sharedLinkPermissions,
      can_edit: false,
    };

    const { data } = await client.put(
      `/folders/${folderId}`,
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
    folderId: folderIdInput,
    sharedLink: sharedLinkInput,
    sharedLinkAccess: sharedLinkAccessInput,
    sharedLinkPassword: sharedLinkPasswordInput,
    sharedLinkPermissions: sharedLinkPermissionsFolderInput,
    sharedLinkVanityName: sharedLinkVanityNameInput,
    boxConnection: connectionInput,
  },
});

export const updateSharedLinkOnFolder = action({
  display: {
    label: "Update Shared Link on Folder",
    description: "Updates a shared link on a folder",
  },
  perform: async (context, params) => {
    const folderId = params.folderId;
    const sharedLink = params.sharedLink;
    const sharedLinkAccess = params.sharedLinkAccess;
    const sharedLinkPassword = params.sharedLinkPassword || null;
    const sharedLinkVanityName = params.sharedLinkVanityName || null;
    let sharedLinkPermissions = params.sharedLinkPermissions || {};

    const client = createBoxHttpClient(
      params.boxConnection,
      context.debug.enabled,
    );

    sharedLinkPermissions = {
      ...sharedLinkPermissions,
      can_edit: false,
    };

    const { data } = await client.put(
      `/folders/${folderId}`,
      {
        shared_link: {
          url: sharedLink,
          access: sharedLinkAccess,
          password: sharedLinkPassword,
          permissions: sharedLinkPermissions,
          vanity_name: sharedLinkVanityName,
        },
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
  },
  inputs: {
    folderId: folderIdInput,
    sharedLink: sharedLinkInput,
    sharedLinkAccess: sharedLinkAccessInput,
    sharedLinkPassword: sharedLinkPasswordInput,
    sharedLinkPermissions: sharedLinkPermissionsFolderInput,
    sharedLinkVanityName: sharedLinkVanityNameInput,
    boxConnection: connectionInput,
  },
});

export const removeSharedLinkFromFolder = action({
  display: {
    label: "Remove Shared Link from Folder",
    description: "Removes a shared link from a folder",
  },
  perform: async (context, params) => {
    const folderId = params.folderId;
    const client = createBoxHttpClient(
      params.boxConnection,
      context.debug.enabled,
    );
    const { data } = await client.put(
      `/folders/${folderId}`,
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
  },
  inputs: {
    folderId: folderIdInput,
    boxConnection: connectionInput,
  },
});
