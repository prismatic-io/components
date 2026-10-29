export interface PartitionInfo {
  rowCount: number;
  uncompressedSize: number;
  compressedSize: number;
}

export interface ResultSetMetadata {
  numRows: number;
  format: string;
  partitionInfo: Array<PartitionInfo>;
}

export interface ResultSet {
  code: string;
  statementHandle: string;
  sqlState: string;
  message: string;
  createdOn: number;
  statementStatusUrl: string;
  resultSetMetadata: ResultSetMetadata;
  data: Array<Array<string>>;
}

export interface QueryStatus {
  code: string;
  sqlState: string;
  message: string;
  statementHandle?: string;
  statementHandles?: Array<string>;
}

export type HeaderProps = {
  authorization: string;
  "X-Snowflake-Authorization-Token-Type": string;
  "Snowflake-Account"?: string;
  "Content-Type": string;
  Accept: string;
};
