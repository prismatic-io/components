export interface UsersResponse {
  total: number;
  page: number;
  limit: number;
  hasNextPage: boolean;
  items: User[];
}
interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string | null;
}
export interface CustomMetadataProperty {
  id: string;
  creator: {
    id: string;
    name: string;
    email: string;
  };
  createdAt: string;
  modifier: {
    id: string;
    name: string;
    email: string;
  };
  modifiedAt: string;
  name: string;
  type: {
    name: string;
  };
  isRequired: boolean;
  defaultValue: unknown;
}
export interface AssetResponse {
  id: string;
  creator: {
    id: string;
    name: string;
    email: string;
  };
  createdAt: string;
  modifier: {
    id: string;
    name: string;
    email: string;
  };
  modifiedAt: string;
  title: string;
  description: string | null;
  attachments: {
    id: string;
    creator: {
      id: string;
      name: string;
      email: string;
    };
    createdAt: string;
    modifier: {
      id: string;
      name: string;
      email: string;
    } | null;
    modifiedAt: string | null;
    name: string;
    filename: string;
    type: string;
    externalId: string | null;
    extension: string;
    size: number;
    downloadUrl: string;
  }[];
  externalId: string | null;
  tags: {
    value: string;
    source: string;
  }[];
  copyright: {
    status: string;
    notice: string;
  };
  expiresAt: string | null;
  licenses: {
    id: string;
    title: string;
    license: string;
    addByDefault: boolean;
    requireConsensus: boolean;
  }[];
  status: string;
  relatedAssets: {
    total: number;
  };
  comments: {
    total: number;
  };
  customMetadata: CustomMetadataProperty[];
  location: {
    brand: {
      id: string;
      name: string;
    };
    library: {
      id: string;
      name: string;
    } | null;
    workspaceProject: {
      id: string;
      name: string;
    } | null;
    folder: {
      id: string;
      name: string;
    } | null;
  };
}
export interface CommentResponse {
  id: string;
  creator: {
    id: string;
    email: string;
    name: string;
  };
  createdAt: string;
  modifier: {
    id: string;
    email: string;
    name: string;
  } | null;
  modifiedAt: string | null;
  content: string;
  mentionedUsers: {
    id: string;
    email: string;
    name: string;
  }[];
  isResolved: boolean;
  replies: {
    total: number;
    hasNextPage: boolean;
    limit: number;
    page: number;
    items: {
      id: string;
      creator: {
        id: string;
        email: string;
        name: string;
      };
      createdAt: string;
      modifier: {
        id: string;
        email: string;
        name: string;
      };
      modifiedAt: string;
      content: string;
      mentionedUsers: {
        id: string;
        email: string;
        name: string;
      };
    }[];
  };
  marking: {
    position: {
      x: number;
      y: number;
    };
    dimensions: {
      width: number;
      height: number;
    };
    page?: number;
    timeframe?: {
      start: number;
      end: number;
    };
  } | null;
}
export interface BrowseResponse {
  folders: {
    limit: number;
    page: number;
    hasNextPage: boolean;
    total: number;
    items: {
      id: string;
      name: string;
      creator: {
        id: string;
        name: string;
        email: string;
      };
      createdAt: string;
      modifier: {
        id: string;
        name: string;
        email: string;
      } | null;
      modifiedAt: string | null;
      breadcrumbs: {
        id: string;
        name: string;
      }[];
      folders: {
        total: number;
      };
    }[];
  };
}
