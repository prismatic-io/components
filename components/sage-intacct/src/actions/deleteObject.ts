import { action } from "@prismatic-io/spectral";
import { connection, object, keys } from "../inputs";
import { executeXmlRequest, handleSageError } from "../utils";
import { deleteObjectPayload } from "../examplePayloads/deleteObjectPayload";

export const deleteObject = action({
  display: {
    label: "Delete Object",
    description: "Deletes different objects in Sage Intacct.",
  },
  perform: async (context, { connection, object, keys }) => {
    const action = `<delete>
    <object>${object}</object>
    <keys>${keys}</keys>
  </delete>`;

    const responseFromSage = await executeXmlRequest(
      connection,
      action,
      context.debug.enabled,
      { explicitArray: false },
    );

    handleSageError(responseFromSage);

    return {
      data: responseFromSage,
    };
  },
  inputs: {
    connection,
    object,
    keys,
  },
  examplePayload: deleteObjectPayload,
});
