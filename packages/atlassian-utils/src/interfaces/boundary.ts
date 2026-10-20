// biome-ignore lint/suspicious/noExplicitAny: default mirrors axios for untyped consumer calls
type UntypedData = any;
interface BoundaryResponse<T = UntypedData> {
  data: T;
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
  put<T = UntypedData>(
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
  debug: {
    enabled: boolean;
  };
  flow: {
    id: string;
    name: string;
    stableId?: string;
  };
  logger: {
    debug(...args: unknown[]): void;
    info(...args: unknown[]): void;
    warn(...args: unknown[]): void;
    error(...args: unknown[]): void;
  };
  webhookUrls: Record<string, string>;
}
