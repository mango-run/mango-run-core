# Interface: Market

## Hierarchy

- [`LifeCycle`](../wiki/LifeCycle)

  ↳ **`Market`**

## Implemented by

- [`MangoPerpMarket`](../wiki/MangoPerpMarket)

## Table of contents

### Methods

- [balance](../wiki/Market#balance)
- [bestAsk](../wiki/Market#bestask)
- [bestBid](../wiki/Market#bestbid)
- [cancelAllOrders](../wiki/Market#cancelallorders)
- [cancelOrder](../wiki/Market#cancelorder)
- [destroy](../wiki/Market#destroy)
- [initialize](../wiki/Market#initialize)
- [orderbook](../wiki/Market#orderbook)
- [placeOrder](../wiki/Market#placeorder)
- [receipts](../wiki/Market#receipts)

## Methods

### balance

▸ **balance**(): `Promise`<[`Balance`](../wiki/Balance)\>

#### Returns

`Promise`<[`Balance`](../wiki/Balance)\>

#### Defined in

[types.ts:68](https://github.com/mango-run/mango-run-core/blob/a90ccad/src/types.ts#L68)

___

### bestAsk

▸ **bestAsk**(): `Promise`<`undefined` \| [`Order`](../wiki/Order)\>

#### Returns

`Promise`<`undefined` \| [`Order`](../wiki/Order)\>

#### Defined in

[types.ts:69](https://github.com/mango-run/mango-run-core/blob/a90ccad/src/types.ts#L69)

___

### bestBid

▸ **bestBid**(): `Promise`<`undefined` \| [`Order`](../wiki/Order)\>

#### Returns

`Promise`<`undefined` \| [`Order`](../wiki/Order)\>

#### Defined in

[types.ts:70](https://github.com/mango-run/mango-run-core/blob/a90ccad/src/types.ts#L70)

___

### cancelAllOrders

▸ **cancelAllOrders**(): `Promise`<[`Receipt`](../wiki/Exports#receipt)[]\>

#### Returns

`Promise`<[`Receipt`](../wiki/Exports#receipt)[]\>

#### Defined in

[types.ts:75](https://github.com/mango-run/mango-run-core/blob/a90ccad/src/types.ts#L75)

___

### cancelOrder

▸ **cancelOrder**(`id`): `Promise`<[`Receipt`](../wiki/Exports#receipt)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |

#### Returns

`Promise`<[`Receipt`](../wiki/Exports#receipt)\>

#### Defined in

[types.ts:74](https://github.com/mango-run/mango-run-core/blob/a90ccad/src/types.ts#L74)

___

### destroy

▸ `Optional` **destroy**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Inherited from

[LifeCycle](../wiki/LifeCycle).[destroy](../wiki/LifeCycle#destroy)

#### Defined in

[types.ts:133](https://github.com/mango-run/mango-run-core/blob/a90ccad/src/types.ts#L133)

___

### initialize

▸ `Optional` **initialize**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Inherited from

[LifeCycle](../wiki/LifeCycle).[initialize](../wiki/LifeCycle#initialize)

#### Defined in

[types.ts:132](https://github.com/mango-run/mango-run-core/blob/a90ccad/src/types.ts#L132)

___

### orderbook

▸ **orderbook**(`depth`): `Promise`<[`Orderbook`](../wiki/Orderbook)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `depth` | `number` |

#### Returns

`Promise`<[`Orderbook`](../wiki/Orderbook)\>

#### Defined in

[types.ts:71](https://github.com/mango-run/mango-run-core/blob/a90ccad/src/types.ts#L71)

___

### placeOrder

▸ **placeOrder**(`order`): `Promise`<[`Receipt`](../wiki/Exports#receipt)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `order` | [`OrderDraft`](../wiki/OrderDraft) |

#### Returns

`Promise`<[`Receipt`](../wiki/Exports#receipt)\>

#### Defined in

[types.ts:73](https://github.com/mango-run/mango-run-core/blob/a90ccad/src/types.ts#L73)

___

### receipts

▸ **receipts**(...`status`): [`Receipt`](../wiki/Exports#receipt)[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `...status` | [`ReceiptStatus`](../wiki/ReceiptStatus)[] |

#### Returns

[`Receipt`](../wiki/Exports#receipt)[]

#### Defined in

[types.ts:72](https://github.com/mango-run/mango-run-core/blob/a90ccad/src/types.ts#L72)
