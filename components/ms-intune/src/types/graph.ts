import type { sendRawRequest } from "@prismatic-io/spectral/http";

export type GraphResponseData = Awaited<
  ReturnType<typeof sendRawRequest>
>["data"];
