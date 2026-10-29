import type { Connection } from "@prismatic-io/spectral";

export interface GlueClientProps {
  awsRegion: string;
  awsConnection: Connection;
}
