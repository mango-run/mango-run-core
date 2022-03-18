# Class: MangoPerpMarket

## Implements

- [`Market`](../wiki/Market)

## Table of contents

### Constructors

- [constructor](../wiki/MangoPerpMarket#constructor)

### Properties

- [connection](../wiki/MangoPerpMarket#connection)
- [fillEvents](../wiki/MangoPerpMarket#fillevents)
- [hasInitialized](../wiki/MangoPerpMarket#hasinitialized)
- [keepAlive](../wiki/MangoPerpMarket#keepalive)
- [mangoAccount](../wiki/MangoPerpMarket#mangoaccount)
- [mangoCache](../wiki/MangoPerpMarket#mangocache)
- [mangoClient](../wiki/MangoPerpMarket#mangoclient)
- [mangoGroup](../wiki/MangoPerpMarket#mangogroup)
- [marketConfig](../wiki/MangoPerpMarket#marketconfig)
- [owner](../wiki/MangoPerpMarket#owner)
- [perpMarket](../wiki/MangoPerpMarket#perpmarket)
- [receiptStore](../wiki/MangoPerpMarket#receiptstore)

### Methods

- [balance](../wiki/MangoPerpMarket#balance)
- [bestAsk](../wiki/MangoPerpMarket#bestask)
- [bestBid](../wiki/MangoPerpMarket#bestbid)
- [cancelAllOrders](../wiki/MangoPerpMarket#cancelallorders)
- [cancelOrder](../wiki/MangoPerpMarket#cancelorder)
- [closePosition](../wiki/MangoPerpMarket#closeposition)
- [destroy](../wiki/MangoPerpMarket#destroy)
- [initialize](../wiki/MangoPerpMarket#initialize)
- [orderbook](../wiki/MangoPerpMarket#orderbook)
- [placeOrder](../wiki/MangoPerpMarket#placeorder)
- [receipts](../wiki/MangoPerpMarket#receipts)
- [settlePnl](../wiki/MangoPerpMarket#settlepnl)
- [waitForCanceled](../wiki/MangoPerpMarket#waitforcanceled)
- [waitForFulfilled](../wiki/MangoPerpMarket#waitforfulfilled)
- [waitForPlaced](../wiki/MangoPerpMarket#waitforplaced)

## Constructors

### constructor

• **new MangoPerpMarket**(`configs`, `logger`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `configs` | [`MangoPerpMarketConfigs`](../wiki/MangoPerpMarketConfigs) |
| `logger` | [`Logger`](../wiki/Logger) |

#### Defined in

[market/mango/mango-perp-market.ts:76](https://github.com/mango-run/mango-run-core/blob/a90ccad/src/market/mango/mango-perp-market.ts#L76)

## Properties

### connection

• `Private` **connection**: `Connection`

#### Defined in

[market/mango/mango-perp-market.ts:45](https://github.com/mango-run/mango-run-core/blob/a90ccad/src/market/mango/mango-perp-market.ts#L45)

___

### fillEvents

• **fillEvents**: [`Cache`](../wiki/Cache)<`ParsedFillEvent`[]\>

#### Defined in

[market/mango/mango-perp-market.ts:60](https://github.com/mango-run/mango-run-core/blob/a90ccad/src/market/mango/mango-perp-market.ts#L60)

___

### hasInitialized

• `Private` **hasInitialized**: `boolean` = `false`

#### Defined in

[market/mango/mango-perp-market.ts:54](https://github.com/mango-run/mango-run-core/blob/a90ccad/src/market/mango/mango-perp-market.ts#L54)

___

### keepAlive

• `Private` **keepAlive**: `boolean` = `false`

determine underlying process is keeping alive or not

#### Defined in

[market/mango/mango-perp-market.ts:58](https://github.com/mango-run/mango-run-core/blob/a90ccad/src/market/mango/mango-perp-market.ts#L58)

___

### mangoAccount

• `Private` **mangoAccount**: `default`

#### Defined in

[market/mango/mango-perp-market.ts:46](https://github.com/mango-run/mango-run-core/blob/a90ccad/src/market/mango/mango-perp-market.ts#L46)

___

### mangoCache

• `Private` **mangoCache**: `MangoCache`

#### Defined in

[market/mango/mango-perp-market.ts:49](https://github.com/mango-run/mango-run-core/blob/a90ccad/src/market/mango/mango-perp-market.ts#L49)

___

### mangoClient

• `Private` **mangoClient**: `MangoClient`

#### Defined in

[market/mango/mango-perp-market.ts:47](https://github.com/mango-run/mango-run-core/blob/a90ccad/src/market/mango/mango-perp-market.ts#L47)

___

### mangoGroup

• `Private` **mangoGroup**: `default`

#### Defined in

[market/mango/mango-perp-market.ts:48](https://github.com/mango-run/mango-run-core/blob/a90ccad/src/market/mango/mango-perp-market.ts#L48)

___

### marketConfig

• `Private` **marketConfig**: `MarketConfig`

#### Defined in

[market/mango/mango-perp-market.ts:50](https://github.com/mango-run/mango-run-core/blob/a90ccad/src/market/mango/mango-perp-market.ts#L50)

___

### owner

• `Private` **owner**: `Account`

#### Defined in

[market/mango/mango-perp-market.ts:43](https://github.com/mango-run/mango-run-core/blob/a90ccad/src/market/mango/mango-perp-market.ts#L43)

___

### perpMarket

• `Private` **perpMarket**: `default`

#### Defined in

[market/mango/mango-perp-market.ts:51](https://github.com/mango-run/mango-run-core/blob/a90ccad/src/market/mango/mango-perp-market.ts#L51)

___

### receiptStore

• `Private` **receiptStore**: [`ReceiptStore`](../wiki/ReceiptStore)

#### Defined in

[market/mango/mango-perp-market.ts:52](https://github.com/mango-run/mango-run-core/blob/a90ccad/src/market/mango/mango-perp-market.ts#L52)

## Methods

### balance

▸ **balance**(): `Promise`<[`Balance`](../wiki/Balance)\>

#### Returns

`Promise`<[`Balance`](../wiki/Balance)\>

#### Implementation of

[Market](../wiki/Market).[balance](../wiki/Market#balance)

#### Defined in

[market/mango/mango-perp-market.ts:101](https://github.com/mango-run/mango-run-core/blob/a90ccad/src/market/mango/mango-perp-market.ts#L101)

___

### bestAsk

▸ **bestAsk**(): `Promise`<`undefined` \| [`Order`](../wiki/Order)\>

#### Returns

`Promise`<`undefined` \| [`Order`](../wiki/Order)\>

#### Implementation of

[Market](../wiki/Market).[bestAsk](../wiki/Market#bestask)

#### Defined in

[market/mango/mango-perp-market.ts:113](https://github.com/mango-run/mango-run-core/blob/a90ccad/src/market/mango/mango-perp-market.ts#L113)

___

### bestBid

▸ **bestBid**(): `Promise`<`undefined` \| [`Order`](../wiki/Order)\>

#### Returns

`Promise`<`undefined` \| [`Order`](../wiki/Order)\>

#### Implementation of

[Market](../wiki/Market).[bestBid](../wiki/Market#bestbid)

#### Defined in

[market/mango/mango-perp-market.ts:125](https://github.com/mango-run/mango-run-core/blob/a90ccad/src/market/mango/mango-perp-market.ts#L125)

___

### cancelAllOrders

▸ **cancelAllOrders**(): `Promise`<[`Receipt`](../wiki/Exports#receipt)[]\>

#### Returns

`Promise`<[`Receipt`](../wiki/Exports#receipt)[]\>

#### Implementation of

[Market](../wiki/Market).[cancelAllOrders](../wiki/Market#cancelallorders)

#### Defined in

[market/mango/mango-perp-market.ts:290](https://github.com/mango-run/mango-run-core/blob/a90ccad/src/market/mango/mango-perp-market.ts#L290)

___

### cancelOrder

▸ **cancelOrder**(`id`): `Promise`<[`Receipt`](../wiki/Exports#receipt)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |

#### Returns

`Promise`<[`Receipt`](../wiki/Exports#receipt)\>

#### Implementation of

[Market](../wiki/Market).[cancelOrder](../wiki/Market#cancelorder)

#### Defined in

[market/mango/mango-perp-market.ts:218](https://github.com/mango-run/mango-run-core/blob/a90ccad/src/market/mango/mango-perp-market.ts#L218)

___

### closePosition

▸ **closePosition**(): `Promise`<`undefined` \| `string`\>

#### Returns

`Promise`<`undefined` \| `string`\>

#### Defined in

[market/mango/mango-perp-market.ts:469](https://github.com/mango-run/mango-run-core/blob/a90ccad/src/market/mango/mango-perp-market.ts#L469)

___

### destroy

▸ **destroy**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Implementation of

[Market](../wiki/Market).[destroy](../wiki/Market#destroy)

#### Defined in

[market/mango/mango-perp-market.ts:95](https://github.com/mango-run/mango-run-core/blob/a90ccad/src/market/mango/mango-perp-market.ts#L95)

___

### initialize

▸ **initialize**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Implementation of

[Market](../wiki/Market).[initialize](../wiki/Market#initialize)

#### Defined in

[market/mango/mango-perp-market.ts:89](https://github.com/mango-run/mango-run-core/blob/a90ccad/src/market/mango/mango-perp-market.ts#L89)

___

### orderbook

▸ **orderbook**(`depth`): `Promise`<[`Orderbook`](../wiki/Orderbook)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `depth` | `number` |

#### Returns

`Promise`<[`Orderbook`](../wiki/Orderbook)\>

#### Implementation of

[Market](../wiki/Market).[orderbook](../wiki/Market#orderbook)

#### Defined in

[market/mango/mango-perp-market.ts:137](https://github.com/mango-run/mango-run-core/blob/a90ccad/src/market/mango/mango-perp-market.ts#L137)

___

### placeOrder

▸ **placeOrder**(`order`): `Promise`<[`Receipt`](../wiki/Exports#receipt)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `order` | [`OrderDraft`](../wiki/OrderDraft) |

#### Returns

`Promise`<[`Receipt`](../wiki/Exports#receipt)\>

#### Implementation of

[Market](../wiki/Market).[placeOrder](../wiki/Market#placeorder)

#### Defined in

[market/mango/mango-perp-market.ts:168](https://github.com/mango-run/mango-run-core/blob/a90ccad/src/market/mango/mango-perp-market.ts#L168)

___

### receipts

▸ **receipts**(...`status`): [`Receipt`](../wiki/Exports#receipt)[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `...status` | [`ReceiptStatus`](../wiki/ReceiptStatus)[] |

#### Returns

[`Receipt`](../wiki/Exports#receipt)[]

#### Implementation of

[Market](../wiki/Market).[receipts](../wiki/Market#receipts)

#### Defined in

[market/mango/mango-perp-market.ts:164](https://github.com/mango-run/mango-run-core/blob/a90ccad/src/market/mango/mango-perp-market.ts#L164)

___

### settlePnl

▸ **settlePnl**(): `Promise`<``null`` \| `string`\>

#### Returns

`Promise`<``null`` \| `string`\>

#### Defined in

[market/mango/mango-perp-market.ts:449](https://github.com/mango-run/mango-run-core/blob/a90ccad/src/market/mango/mango-perp-market.ts#L449)

___

### waitForCanceled

▸ **waitForCanceled**(`receipt`): `Promise`<`boolean`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `receipt` | [`Receipt`](../wiki/Exports#receipt) |

#### Returns

`Promise`<`boolean`\>

#### Defined in

[market/mango/mango-perp-market.ts:391](https://github.com/mango-run/mango-run-core/blob/a90ccad/src/market/mango/mango-perp-market.ts#L391)

___

### waitForFulfilled

▸ **waitForFulfilled**(`receipt`): `Promise`<`boolean`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `receipt` | [`Receipt`](../wiki/Exports#receipt) |

#### Returns

`Promise`<`boolean`\>

#### Defined in

[market/mango/mango-perp-market.ts:408](https://github.com/mango-run/mango-run-core/blob/a90ccad/src/market/mango/mango-perp-market.ts#L408)

___

### waitForPlaced

▸ **waitForPlaced**(`receipt`): `Promise`<`boolean`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `receipt` | [`Receipt`](../wiki/Exports#receipt) |

#### Returns

`Promise`<`boolean`\>

#### Defined in

[market/mango/mango-perp-market.ts:335](https://github.com/mango-run/mango-run-core/blob/a90ccad/src/market/mango/mango-perp-market.ts#L335)
