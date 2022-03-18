[@mango-run/core](../README.md) / [Exports](../modules.md) / Market

# Interface: Market

## Hierarchy

- [`LifeCycle`](LifeCycle.md)

  ↳ **`Market`**

## Implemented by

- [`MangoPerpMarket`](../classes/MangoPerpMarket.md)

## Table of contents

### Methods

- [balance](Market.md#balance)
- [bestAsk](Market.md#bestask)
- [bestBid](Market.md#bestbid)
- [cancelAllOrders](Market.md#cancelallorders)
- [cancelOrder](Market.md#cancelorder)
- [destroy](Market.md#destroy)
- [initialize](Market.md#initialize)
- [orderbook](Market.md#orderbook)
- [placeOrder](Market.md#placeorder)
- [receipts](Market.md#receipts)

## Methods

### balance

▸ **balance**(): `Promise`<[`Balance`](Balance.md)\>

#### Returns

`Promise`<[`Balance`](Balance.md)\>

#### Defined in

[types.ts:68](https://github.com/mango-run/mango-run-core/blob/a90ccad/src/types.ts#L68)

___

### bestAsk

▸ **bestAsk**(): `Promise`<`undefined` \| [`Order`](Order.md)\>

#### Returns

`Promise`<`undefined` \| [`Order`](Order.md)\>

#### Defined in

[types.ts:69](https://github.com/mango-run/mango-run-core/blob/a90ccad/src/types.ts#L69)

___

### bestBid

▸ **bestBid**(): `Promise`<`undefined` \| [`Order`](Order.md)\>

#### Returns

`Promise`<`undefined` \| [`Order`](Order.md)\>

#### Defined in

[types.ts:70](https://github.com/mango-run/mango-run-core/blob/a90ccad/src/types.ts#L70)

___

### cancelAllOrders

▸ **cancelAllOrders**(): `Promise`<[`Receipt`](../modules.md#receipt)[]\>

#### Returns

`Promise`<[`Receipt`](../modules.md#receipt)[]\>

#### Defined in

[types.ts:75](https://github.com/mango-run/mango-run-core/blob/a90ccad/src/types.ts#L75)

___

### cancelOrder

▸ **cancelOrder**(`id`): `Promise`<[`Receipt`](../modules.md#receipt)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |

#### Returns

`Promise`<[`Receipt`](../modules.md#receipt)\>

#### Defined in

[types.ts:74](https://github.com/mango-run/mango-run-core/blob/a90ccad/src/types.ts#L74)

___

### destroy

▸ `Optional` **destroy**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Inherited from

[LifeCycle](LifeCycle.md).[destroy](LifeCycle.md#destroy)

#### Defined in

[types.ts:133](https://github.com/mango-run/mango-run-core/blob/a90ccad/src/types.ts#L133)

___

### initialize

▸ `Optional` **initialize**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Inherited from

[LifeCycle](LifeCycle.md).[initialize](LifeCycle.md#initialize)

#### Defined in

[types.ts:132](https://github.com/mango-run/mango-run-core/blob/a90ccad/src/types.ts#L132)

___

### orderbook

▸ **orderbook**(`depth`): `Promise`<[`Orderbook`](Orderbook.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `depth` | `number` |

#### Returns

`Promise`<[`Orderbook`](Orderbook.md)\>

#### Defined in

[types.ts:71](https://github.com/mango-run/mango-run-core/blob/a90ccad/src/types.ts#L71)

___

### placeOrder

▸ **placeOrder**(`order`): `Promise`<[`Receipt`](../modules.md#receipt)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `order` | [`OrderDraft`](OrderDraft.md) |

#### Returns

`Promise`<[`Receipt`](../modules.md#receipt)\>

#### Defined in

[types.ts:73](https://github.com/mango-run/mango-run-core/blob/a90ccad/src/types.ts#L73)

___

### receipts

▸ **receipts**(...`status`): [`Receipt`](../modules.md#receipt)[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `...status` | [`ReceiptStatus`](../enums/ReceiptStatus.md)[] |

#### Returns

[`Receipt`](../modules.md#receipt)[]

#### Defined in

[types.ts:72](https://github.com/mango-run/mango-run-core/blob/a90ccad/src/types.ts#L72)
