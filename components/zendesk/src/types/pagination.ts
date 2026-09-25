interface Links {
  first: string;
  last: string;
  prev: string;
  next: string;
}
interface Meta {
  has_more: boolean;
  after_cursor: string;
  before_cursor: string;
}
export type PaginatedResponse<T> = Record<string, T[]> & {
  meta: Meta;
} & {
  links: Links;
};
