export interface Version {
  createdAt?: string;
  message?: string;
  number?: number;
  minorEdit?: boolean;
  authorId?: string;
}

export interface Page {
  title: string;
  id: string;
  createdAt?: string;
  version?: Version;
}

export interface Space {
  name: string;
  id: string;
  createdAt?: string;
}

export interface Attachment {
  id: string;
  title: string;
  status?: string;
  createdAt?: string;
  version?: Version;
}

export interface ContentProperty {
  id: string;
  key: string;
  version?: Version;
}

export interface AccessibleResource {
  id: string;
  url: string;
  name: string;
  scopes: string[];
  avatarUrl: string;
}

export interface PaginationLinks {
  next?: string;
}

export interface Pageable<T> {
  results: T[];
  _links?: PaginationLinks;
}
