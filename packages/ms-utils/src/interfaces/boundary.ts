// biome-ignore lint/suspicious/noExplicitAny: default mirrors axios for untyped consumer calls
type UntypedData = any;

interface BoundaryResponse<T = UntypedData> {
  data: T;
  status: number;
  headers: Record<string, unknown>;
}

export interface BoundaryHttpClient {
  get<T = UntypedData>(
    url: string,
    config?: unknown,
  ): Promise<BoundaryResponse<T>>;
  post<T = UntypedData>(
    url: string,
    data?: unknown,
    config?: unknown,
  ): Promise<BoundaryResponse<T>>;
  patch<T = UntypedData>(
    url: string,
    data?: unknown,
    config?: unknown,
  ): Promise<BoundaryResponse<T>>;
  delete<T = UntypedData>(
    url: string,
    config?: unknown,
  ): Promise<BoundaryResponse<T>>;
}

export interface BoundaryActionContext {
  crossFlowState: Record<string, unknown>;
  debug: { enabled: boolean };
  flow: { id: string; name: string };
  logger: { info(...args: unknown[]): void; warn(...args: unknown[]): void };
  webhookUrls: Record<string, string>;
}

export interface BoundaryTriggerPayload {
  headers: Record<string, string>;
  queryParameters?: Record<string, string>;
  body: { data: unknown };
}

export interface BoundaryHttpResponse {
  statusCode: number;
  contentType: string;
  body?: string;
  headers?: Record<string, string>;
}
