import type { BaseTableProps } from "./BaseTableProps";

export type PostTableProps = BaseTableProps & {
  payload: Record<string, unknown>;
};
