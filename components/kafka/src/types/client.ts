import type { Connection } from "@prismatic-io/spectral";

export interface CreateClientProps {
  clientId: string;
  brokers: string[];
  connection?: Connection;
}
