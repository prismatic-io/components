import type { Connection } from "@prismatic-io/spectral";

export interface CreateClientProps {
  redisConnection?: Connection;
}

export interface RedisOptions {
  host: string;
  port: number;
  user?: string;
  password: string;
  database?: number;
  useTls: boolean;
  cert?: string;
  key?: string;
  ca?: string;
}
