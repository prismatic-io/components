export interface PaginateAwsOptions<TOutput> {
  // biome-ignore lint/suspicious/noExplicitAny: AWS SDK v3 Command types are not generically expressible here
  createCommand: (nextToken: string | undefined) => any;

  // biome-ignore lint/suspicious/noExplicitAny: matches the loosely-typed AWS SDK v3 client.send signature
  client: { send: (command: any) => Promise<TOutput> };

  itemsKey: string;
}
