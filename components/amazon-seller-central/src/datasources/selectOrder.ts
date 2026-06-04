import type { Element } from "@prismatic-io/spectral";
import { dataSource, util } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { selectOrderDataSourceExamplePayload } from "../examplePayloads/datasources";
import {
  CreatedAfter,
  CreatedBefore,
  connectionInput,
  LastUpdatedAfter,
  LastUpdatedBefore,
  MarketplaceIds,
} from "../inputs";
import type { Order } from "../interfaces";
import { paginateResults } from "../util";

export const selectOrder = dataSource({
  display: {
    label: "Select Order",
    description: "Select an order from your Amazon Seller Central account",
  },
  inputs: {
    connection: connectionInput,
    createdAfter: CreatedAfter,
    createdBefore: CreatedBefore,
    lastUpdatedAfter: LastUpdatedAfter,
    lastUpdatedBefore: LastUpdatedBefore,
    marketplaceIds: MarketplaceIds,
  },
  perform: async (
    _context,
    {
      connection,
      createdAfter,
      createdBefore,
      lastUpdatedAfter,
      lastUpdatedBefore,
      marketplaceIds,
    },
  ) => {
    const client = createClient(connection);
    const orders = await paginateResults<Order>(
      client,
      "/orders/v0/orders",
      {
        CreatedAfter: createdAfter,
        CreatedBefore: createdBefore,
        LastUpdatedAfter: lastUpdatedAfter,
        LastUpdatedBefore: lastUpdatedBefore,
        MarketplaceIds: marketplaceIds,
      },
      "Orders",
      true,
    );

    const result: Element[] = orders.map((order) => ({
      label: `${order.billToParty.name} - ${order.OrderStatus} - ${order.purchaseOrderNumber} - ${order.PurchaseDate}`,
      key: util.types.toString(order.purchaseOrderNumber),
    }));

    return { result };
  },
  dataSourceType: "picklist",
  examplePayload: selectOrderDataSourceExamplePayload,
});
