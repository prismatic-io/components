






export const getCollectionResponse = {
  userId: "A1B2C3D4-E5F6-7890-A1B2C3D4E5F67890",
  dateModified: "March, 08 2017 14:17:37 +0000",
  filename: "collection_1",
  dateCreated: "March, 01 2017 10:49:12 +0000",
  collectionCount: 2,
  id: "B2C3D4E5-F6A7-8901-B2C3D4E5F6A78901",
  name: "Collection 1",
  cover: {
    thumbnail:
      "https://d2csxpduxe849s.cloudfront.net/media/example/thumbnails/collection1-thumb.jpg",
    thumbnails: [
      "https://d2csxpduxe849s.cloudfront.net/media/example/thumbnails/collection1-1.jpg",
      "https://d2csxpduxe849s.cloudfront.net/media/example/thumbnails/collection1-2.jpg",
      "https://d2csxpduxe849s.cloudfront.net/media/example/thumbnails/collection1-3.jpg",
    ],
    large:
      "https://d2csxpduxe849s.cloudfront.net/media/example/large/collection1.jpg",
  },
  user: {
    id: "A1B2C3D4-E5F6-7890-A1B2C3D4E5F67890",
    name: "John Doe",
  },
  description: "Collection 1 with various assets.",
  IsPublic: 1,
};

export const listCollectionsResponse = {
  collections: [
    getCollectionResponse,
    {
      userId: "C3D4E5F6-A7B8-9012-C3D4E5F6A7B89012",
      dateModified: "March, 10 2017 07:57:18 +0000",
      filename: "collection_2",
      dateCreated: "October, 30 2014 13:54:00 +0000",
      collectionCount: 4,
      id: "D4E5F6A7-B8C9-0123-D4E5F6A7B8C90123",
      name: "Collection 2",
      cover: {
        thumbnail:
          "https://d2csxpduxe849s.cloudfront.net/media/example/thumbnails/collection2-thumb.jpg",
        thumbnails: [
          "https://d2csxpduxe849s.cloudfront.net/media/example/thumbnails/collection2-1.jpg",
          "https://d2csxpduxe849s.cloudfront.net/media/example/thumbnails/collection2-2.jpg",
          "https://d2csxpduxe849s.cloudfront.net/media/example/thumbnails/collection2-3.jpg",
        ],
        large:
          "https://d2csxpduxe849s.cloudfront.net/media/example/large/collection2.jpg",
      },
      user: {
        id: "C3D4E5F6-A7B8-9012-C3D4E5F6A7B89012",
        name: "Jane Doe",
      },
      description: "Collection 2 with various assets.",
      IsPublic: 0,
    },
  ],
  count: 151,
};

export const selectCollectionResponse = [
  {
    key: "B2C3D4E5-F6A7-8901-B2C3D4E5F6A78901",
    label: "Collection 1 (ID: B2C3D4E5-F6A7-8901-B2C3D4E5F6A78901)",
  },
];
