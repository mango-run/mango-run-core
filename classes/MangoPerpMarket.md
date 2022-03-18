[@mango-run/core](../README.md) / [Exports](../modules.md) / MangoPerpMarket

# Class: MangoPerpMarket

## Implements

- [`Market`](../interfaces/Market.md)

## Table of contents

### Constructors

- [constructor](MangoPerpMarket.md#constructor)

### Properties

- [connection](MangoPerpMarket.md#connection)
- [fillEvents](MangoPerpMarket.md#fillevents)
- [hasInitialized](MangoPerpMarket.md#hasinitialized)
- [keepAlive](MangoPerpMarket.md#keepalive)
- [mangoAccount](MangoPerpMarket.md#mangoaccount)
- [mangoCache](MangoPerpMarket.md#mangocache)
- [mangoClient](MangoPerpMarket.md#mangoclient)
- [mangoGroup](MangoPerpMarket.md#mangogroup)
- [marketConfig](MangoPerpMarket.md#marketconfig)
- [owner](MangoPerpMarket.md#owner)
- [perpMarket](MangoPerpMarket.md#perpmarket)
- [receiptStore](MangoPerpMarket.md#receiptstore)

### Methods

- [balance](MangoPerpMarket.md#balance)
- [bestAsk](MangoPerpMarket.md#bestask)
- [bestBid](MangoPerpMarket.md#bestbid)
- [cancelAllOrders](MangoPerpMarket.md#cancelallorders)
- [cancelOrder](MangoPerpMarket.md#cancelorder)
- [closePosition](MangoPerpMarket.md#closeposition)
- [destroy](MangoPerpMarket.md#destroy)
- [initialize](MangoPerpMarket.md#initialize)
- [orderbook](MangoPerpMarket.md#orderbook)
- [placeOrder](MangoPerpMarket.md#placeorder)
- [receipts](MangoPerpMarket.md#receipts)
- [settlePnl](MangoPerpMarket.md#settlepnl)
- [waitForCanceled](MangoPerpMarket.md#waitforcanceled)
- [waitForFulfilled](MangoPerpMarket.md#waitforfulfilled)
- [waitForPlaced](MangoPerpMarket.md#waitforplaced)

## Constructors

### constructor

• **new MangoPerpMarket**(`configs`, `logger`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `configs` | [`MangoPerpMarketConfigs`](../interfaces/MangoPerpMarketConfigs.md) |
| `logger` | [`Logger`](../interfaces/Logger.md) |

#### Defined in

[market/mango/mango-perp-market.ts:76](https://github.com/mango-run/mango-run-core/blob/a90ccad/src/market/mango/mango-perp-market.ts#L76)

## Properties

### connection

• `Private` **connection**: `Connection`

#### Defined in

[market/mango/mango-perp-market.ts:45](https://github.com/mango-run/mango-run-core/blob/a90ccad/src/market/mango/mango-perp-market.ts#L45)

___

### fillEvents

• **fillEvents**: [`Cache`](Cache.md)<`ParsedFillEvent`[]\>

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

• `Private` **receiptStore**: [`ReceiptStore`](../interfaces/ReceiptStore.md)

#### Defined in

[market/mango/mango-perp-market.ts:52](https://github.com/mango-run/mango-run-core/blob/a90ccad/src/market/mango/mango-perp-market.ts#L52)

## Methods

### balance

▸ **balance**(): `Promise`<[`Balance`](../interfaces/Balance.md)\>

#### Returns

`Promise`<[`Balance`](../interfaces/Balance.md)\>

#### Implementation of

[Market](../interfaces/Market.md).[balance](../interfaces/Market.md#balance)

#### Defined in

[market/mango/mango-perp-market.ts:101](https://github.com/mango-run/mango-run-core/blob/a90ccad/src/market/mango/mango-perp-market.ts#L101)

___

### bestAsk

▸ **bestAsk**(): `Promise`<`undefined` \| [`Order`](../interfaces/Order.md)\>

#### Returns

`Promise`<`undefined` \| [`Order`](../interfaces/Order.md)\>

#### Implementation of

[Market](../interfaces/Market.md).[bestAsk](../interfaces/Market.md#bestask)

#### Defined in

[market/mango/mango-perp-market.ts:113](https://github.com/mango-run/mango-run-core/blob/a90ccad/src/market/mango/mango-perp-market.ts#L113)

___

### bestBid

▸ **bestBid**(): `Promise`<`undefined` \| [`Order`](../interfaces/Order.md)\>

#### Returns

`Promise`<`undefined` \| [`Order`](../interfaces/Order.md)\>

#### Implementation of

[Market](../interfaces/Market.md).[bestBid](../interfaces/Market.md#bestbid)

#### Defined in

[market/mango/mango-perp-market.ts:125](https://github.com/mango-run/mango-run-core/blob/a90ccad/src/market/mango/mango-perp-market.ts#L125)

___

### cancelAllOrders

▸ **cancelAllOrders**(): `Promise`<[`Receipt`](../modules.md#receipt)[]\>

#### Returns

`Promise`<[`Receipt`](../modules.md#receipt)[]\>

#### Implementation of

[Market](../interfaces/Market.md).[cancelAllOrders](../interfaces/Market.md#cancelallorders)

#### Defined in

[market/mango/mango-perp-market.ts:290](https://github.com/mango-run/mango-run-core/blob/a90ccad/src/market/mango/mango-perp-market.ts#L290)

___

### cancelOrder

▸ **cancelOrder**(`id`): `Promise`<[`Receipt`](../modules.md#receipt)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |

#### Returns

`Promise`<[`Receipt`](../modules.md#receipt)\>

#### Implementation of

[Market](../interfaces/Market.md).[cancelOrder](../interfaces/Market.md#cancelorder)

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

[Market](../interfaces/Market.md).[destroy](../interfaces/Market.md#destroy)

#### Defined in

[market/mango/mango-perp-market.ts:95](https://github.com/mango-run/mango-run-core/blob/a90ccad/src/market/mango/mango-perp-market.ts#L95)

___

### initialize

▸ **initialize**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Implementation of

[Market](../interfaces/Market.md).[initialize](../interfaces/Market.md#initialize)

#### Defined in

[market/mango/mango-perp-market.ts:89](https://github.com/mango-run/mango-run-core/blob/a90ccad/src/market/mango/mango-perp-market.ts#L89)

___

### orderbook

▸ **orderbook**(`depth`): `Promise`<[`Orderbook`](../interfaces/Orderbook.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `depth` | `number` |

#### Returns

`Promise`<[`Orderbook`](../interfaces/Orderbook.md)\>

#### Implementation of

[Market](../interfaces/Market.md).[orderbook](../interfaces/Market.md#orderbook)

#### Defined in

[market/mango/mango-perp-market.ts:137](https://github.com/mango-run/mango-run-core/blob/a90ccad/src/market/mango/mango-perp-market.ts#L137)

___

### placeOrder

▸ **placeOrder**(`order`): `Promise`<[`Receipt`](../modules.md#receipt)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `order` | [`OrderDraft`](../interfaces/OrderDraft.md) |

#### Returns

`Promise`<[`Receipt`](../modules.md#receipt)\>

#### Implementation of

[Market](../interfaces/Market.md).[placeOrder](../interfaces/Market.md#placeorder)

#### Defined in

[market/mango/mango-perp-market.ts:168](https://github.com/mango-run/mango-run-core/blob/a90ccad/src/market/mango/mango-perp-market.ts#L168)

___

### receipts

▸ **receipts**(...`status`): [`Receipt`](../modules.md#receipt)[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `...status` | [`ReceiptStatus`](../enums/ReceiptStatus.md)[] |

#### Returns

[`Receipt`](../modules.md#receipt)[]

#### Implementation of

[Market](../interfaces/Market.md).[receipts](../interfaces/Market.md#receipts)

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
| `receipt` | [`Receipt`](../modules.md#receipt) |

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
| `receipt` | [`Receipt`](../modules.md#receipt) |

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
| `receipt` | [`Receipt`](../modules.md#receipt) |

#### Returns

`Promise`<`boolean`\>

#### Defined in

[market/mango/mango-perp-market.ts:335](https://github.com/mango-run/mango-run-core/blob/a90ccad/src/market/mango/mango-perp-market.ts#L335)
