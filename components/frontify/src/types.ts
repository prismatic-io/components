export interface CollectionItem {
  id: string;
  name: string;
}

export interface LibraryCollectionsResponse {
  library: {
    collections: {
      items: CollectionItem[];
    };
  };
}

export interface FolderItem {
  id: string;
  name: string;
}

export interface LibraryFoldersResponse {
  library: {
    browse: {
      folders: {
        items: FolderItem[];
      };
    };
  };
}

export interface RelatedAssetItem {
  id: string;
  title: string;
}

export interface RelatedAssetsResponse {
  asset: {
    relatedAssets: {
      items: RelatedAssetItem[];
    };
  };
}

export interface WebhookItem {
  id: string;
  name: string;
}

export interface WebhooksResponse {
  webhooks: {
    items: WebhookItem[];
  };
}

export interface WorkspaceProjectFoldersResponse {
  workspaceProject: {
    browse: {
      folders: {
        items: FolderItem[];
      };
    };
  };
}
