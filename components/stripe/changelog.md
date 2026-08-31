## Changelog

### 2026-08-31

- Added output schemas to 61 actions for improved field mapping during configuration
- Added inline action calling support across all actions for improved example output during configuration
- Added a **Select Card** dropdown to **Payment Method ID** on **Attach Card**, **Detach Card**, **Get Card**, **Update Card**, **Create Invoice**, **Update Invoice**, and **Create Subscription**, listing the cards saved against the selected **Customer ID** instead of requiring the ID to be typed
- Added the **Webhook Secret** input to the **Webhook Events** trigger as a masked field, so signature validation can be configured when a deployment reused a pre-existing Stripe endpoint; Stripe returns a signing secret only when an endpoint is created, so none is stored in that case

Updated actions and trigger functionality:

- **Amount** on **Create Payment Intent** and **Update Payment Intent** now reports a fractional value as an error naming the field, instead of truncating it and charging the smaller whole number: an entered 44.55 was charged as 44 in the smallest currency unit. Amount is required, so every configuration of these two actions supplies it
- **Balance** on **Create Customer** and **Update Customer** and **Unit Price** on **Create Price** are now sent as entered instead of multiplied by 100, matching Stripe's smallest currency unit convention
- Added the **Payment Method ID** input that **Update Card** and **Update Subscription** both send but never collected
- **Create Checkout Session** now sends the **Customer Email**, **Customer ID**, and **Client Reference ID** it collects
- **Create Card** now attaches the created card to the customer identified by **Customer ID**
- Reconfiguring the **Webhook Events** trigger's selected events now updates its managed Stripe endpoint in place and preserves the endpoint's signing secret, instead of adding a second endpoint at the same flow URL that delivered every overlapping event twice
- Fixed the **Webhook Events** trigger lifecycle so the managed endpoint is matched by the flow's URL and removed when the instance is torn down even if its events were reconfigured after deployment, leaving no orphaned endpoints in the Stripe account, and so testing the trigger no longer fails on the absent signature header
- **Delete All Instance Webhooks** now returns only the endpoints it deleted, instead of padding the returned list with a blank entry for every other webhook endpoint in the Stripe account
- **New and Updated Records** now holds its polling cursor when a recurrence returns more events than it can fetch, instead of advancing past the events it left behind
- An explicit `false` or `0` now reaches Stripe, so **Update Price** can deactivate a price, **Create Product** and **Update Product** can clear **Shippable**, **Create Invoice** and **Update Invoice** can turn off **Auto Advance**, **Update Customer** can clear a **Balance**, **Create Price** can set a free **Unit Price**, **Create Subscription** and **Update Subscription** can set a **Quantity** of zero, and **Create Subscription** can set **Days Until Due** to zero for an invoice due on receipt
- A `0` referenced from an earlier step now survives on **Application Fee Amount** and **Amount to Capture** instead of being discarded as blank, so it no longer silently becomes a full capture; an omitted **Amount to Capture** tells Stripe to capture the whole authorized amount (a `0` typed directly into the field was already sent correctly)
- **Limit**, **Application Fee Amount**, **Amount to Capture**, **Unit Price** on **Create Price**, and **Balance** on **Create Customer** and **Update Customer** accept whole numbers only, and now report a fractional value as an error naming the field instead of rounding it down or forwarding it for Stripe to reject
- Leaving **Payment Method Types** on **Create Payment Intent** and **Update Payment Intent**, or **Event Types** on **New and Updated Records**, blank no longer fails the step
- Leaving **Webhook Events** blank on **Update Webhook** now leaves the endpoint's stored events alone instead of failing the step, matching how a blank **Webhook URL** already behaved
- **Charge ID** left blank on **List Disputes** is now omitted rather than sent as an empty charge ID
- A blank **Timeout** now falls back to the Stripe client default instead of configuring the client with no timeout at all
- Optional fields left blank are now omitted instead of sent as an empty string, covering **Currency** on **Update Payment Intent**, **Type** on **Create Product**, **Name** on **Create Customer**, and **State/Province** on **Create Card**
- **Customer ID** left blank on **Create Invoice** and **List Cards** is now omitted rather than sent as an empty customer ID that Stripe rejects; the field is optional in both of those Stripe endpoints
- **Update Customer** now reports a blank **Customer ID** as an error naming the field, instead of requesting an empty customer record from Stripe
- **Select Charge** and **Select Balance Transaction** labels now show amounts in the smallest currency unit, correcting zero decimal currencies such as JPY and three decimal currencies such as KWD
- Removed **Card Number** and **CVC** from **Update Card**, **Product Caption** from **Create Product** and **Update Product**, and **Coupon** from **Create Subscription** and **Update Subscription**, none of which were sent to Stripe

Reconfiguration notice: monetary inputs now take the smallest currency unit exactly as entered. Re-enter a fractional **Amount** on **Create Payment Intent** or **Update Payment Intent** as a whole number, and re-enter **Balance** on **Create Customer** or **Update Customer** and **Unit Price** on **Create Price** in the smallest currency unit, since these are no longer multiplied by 100.

Restructured action inputs into structured objects for an improved user experience.

- Every list and search action groups **Limit**, **Starting After**, **Ending Before**, and **Page** into **Pagination**, with **Fetch All** left as a top level toggle on **List Checkout Sessions** and **List Webhooks**
- **Create Card** and **Update Card** group their cardholder inputs into **Billing Address** and **Name & Contact Information**, and **Create Customer** and **Update Customer** group theirs into **Address** and **Name & Contact Information**
- **Create Payment Intent** and **Update Payment Intent** group their optional inputs into **Transfer Options** and **Additional Fields**, and **Confirm Payment Intent**, **Capture Payment Intent**, and **Update Invoice** group theirs into **Additional Fields**

### 2026-05-28

Added **New and Updated Records** polling trigger that polls Stripe's `/v1/events` API for change events on a configured schedule. Events are partitioned by type — `*.created` events go to the `created` bucket and all other event types go to the `updated` bucket. The trigger is a drop-in alternative to the existing webhook trigger for environments without a publicly reachable webhook endpoint

### 2026-04-30

Various modernizations and documentation updates

### 2026-03-31

Various modernizations and documentation updates

### 2026-03-27

Added **Customer ID** input to card retrieval, card update, and create invoice actions to support inline datasource dependencies

### 2026-03-05

Added inline data sources for balance transactions and cards to enable dynamic dropdown selection

### 2026-02-26

Added inline data sources for charges, disputes, and checkout sessions to enable dynamic dropdown selection

### 2025-10-17

Enhanced webhook lifecycle management with improved trigger subscription handling and automated cleanup

### 2025-10-13

Added inline data sources for customers, invoices, payment intents, prices, products, and subscriptions to enhance data selection capabilities

### 2025-08-12

Made webhook creation process idempotent to prevent duplication

### 2025-06-18

Added webhook validation toggle option for flexible webhook processing
