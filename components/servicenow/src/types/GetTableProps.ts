import type { BaseTableProps } from "./BaseTableProps";

export type GetTableProps = BaseTableProps & {
  queryParameters: Record<string, string>;
};
