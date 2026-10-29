import type { Connection } from "@prismatic-io/spectral";

export interface CreateClientProps {
  connection: Connection;
  debug?: boolean;
}
