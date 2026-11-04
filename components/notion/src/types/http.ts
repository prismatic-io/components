import type { sendRawRequest } from "@prismatic-io/spectral/http";

export type HttpResponse = Awaited<ReturnType<typeof sendRawRequest>>;
