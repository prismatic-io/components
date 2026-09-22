import type { sendRawRequest } from "@prismatic-io/spectral/dist/clients/http";
export type HttpResponse = Awaited<ReturnType<typeof sendRawRequest>>;
