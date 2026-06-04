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
  avatar?: string;
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
  description: string;
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
    };
    modifiedAt: string;
    name: string;
    filename: string;
    type: string;
    externalId: string;
    extension: string;
    size: number;
    downloadUrl: string;
  }[];
  externalId: string;
  tags: {
    value: string;
    source: string;
  }[];
  copyright: {
    status: string;
    notice: string;
  };
  expiresAt: string;
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
    };
    workspaceProject: {
      id: string;
      name: string;
    };
    folder: {
      id: string;
      name: string;
    };
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
  };
  modifiedAt: string;
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
  };
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
      };
      modifiedAt: string;
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
