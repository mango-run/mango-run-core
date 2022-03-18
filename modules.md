[@mango-run/core](README.md) / Exports

# @mango-run/core

## Table of contents

### Enumerations

- [OrderSide](enums/OrderSide.md)
- [OrderType](enums/OrderType.md)
- [ReceiptStatus](enums/ReceiptStatus.md)

### Classes

- [Bot](classes/Bot.md)
- [Cache](classes/Cache.md)
- [ConsoleLogger](classes/ConsoleLogger.md)
- [InMemoryReceiptStore](classes/InMemoryReceiptStore.md)
- [MangoPerpMarket](classes/MangoPerpMarket.md)
- [NaiveGridSignal](classes/NaiveGridSignal.md)
- [NullLogger](classes/NullLogger.md)

### Interfaces

- [Balance](interfaces/Balance.md)
- [CacheConfig](interfaces/CacheConfig.md)
- [CallbackWithDetail](interfaces/CallbackWithDetail.md)
- [CancelOrderEvent](interfaces/CancelOrderEvent.md)
- [ConsoleLoggerConfigs](interfaces/ConsoleLoggerConfigs.md)
- [CreateMangoPerpMarketConfigsOptions](interfaces/CreateMangoPerpMarketConfigsOptions.md)
- [GridSignalConfigs](interfaces/GridSignalConfigs.md)
- [LifeCycle](interfaces/LifeCycle.md)
- [Logger](interfaces/Logger.md)
- [MangoPerpMarketConfigs](interfaces/MangoPerpMarketConfigs.md)
- [Market](interfaces/Market.md)
- [Order](interfaces/Order.md)
- [OrderDraft](interfaces/OrderDraft.md)
- [Orderbook](interfaces/Orderbook.md)
- [PlaceOrderEvent](interfaces/PlaceOrderEvent.md)
- [ReceiptStore](interfaces/ReceiptStore.md)
- [RetryConfig](interfaces/RetryConfig.md)
- [Signal](interfaces/Signal.md)

### Type aliases

- [Callback](modules.md#callback)
- [Receipt](modules.md#receipt)
- [SignalEvent](modules.md#signalevent)
- [SignalEventListener](modules.md#signaleventlistener)
- [SignalEventMap](modules.md#signaleventmap)
- [SignalEventPayload](modules.md#signaleventpayload)

### Functions

- [average](modules.md#average)
- [createMangoPerpMarketConfigs](modules.md#createmangoperpmarketconfigs)
- [doDestroy](modules.md#dodestroy)
- [doInitialize](modules.md#doinitialize)
- [isBetween](modules.md#isbetween)
- [measureTime](modules.md#measuretime)
- [order](modules.md#order)
- [orderDraftKey](modules.md#orderdraftkey)
- [retry](modules.md#retry)
- [sleep](modules.md#sleep)

## Type aliases

### Callback

Ƭ **Callback**<`T`\>: () => `T` \| `Promise`<`T`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `unknown` |

#### Type declaration

▸ (): `T` \| `Promise`<`T`\>

##### Returns

`T` \| `Promise`<`T`\>

#### Defined in

[types.ts:1](https://github.com/mango-run/mango-run-core/blob/a90ccad/src/types.ts#L1)

___

### Receipt

Ƭ **Receipt**: { `id`: `string` ; `order`: [`OrderDraft`](interfaces/OrderDraft.md) ; `txHash`: `string`  } & { `status`: [`PlacePending`](enums/ReceiptStatus.md#placepending)  } \| { `error`: `any` ; `status`: [`Error`](enums/ReceiptStatus.md#error)  } \| { `orderId`: `string` ; `status`: [`ReceiptStatus`](enums/ReceiptStatus.md)  }

#### Defined in

[types.ts:38](https://github.com/mango-run/mango-run-core/blob/a90ccad/src/types.ts#L38)

___

### SignalEvent

Ƭ **SignalEvent**: keyof [`SignalEventMap`](modules.md#signaleventmap)

#### Defined in

[types.ts:98](https://github.com/mango-run/mango-run-core/blob/a90ccad/src/types.ts#L98)

___

### SignalEventListener

Ƭ **SignalEventListener**<`E`\>: (`payload`: [`SignalEventPayload`](modules.md#signaleventpayload)<`E`\>) => `void`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `E` | extends [`SignalEvent`](modules.md#signalevent) |

#### Type declaration

▸ (`payload`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `payload` | [`SignalEventPayload`](modules.md#signaleventpayload)<`E`\> |

##### Returns

`void`

#### Defined in

[types.ts:102](https://github.com/mango-run/mango-run-core/blob/a90ccad/src/types.ts#L102)

___

### SignalEventMap

Ƭ **SignalEventMap**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `cancel_all_orders_event` | `void` |
| `cancel_order_event` | [`CancelOrderEvent`](interfaces/CancelOrderEvent.md) |
| `clear_all_position` | `void` |
| `pause` | `void` |
| `place_order_event` | [`PlaceOrderEvent`](interfaces/PlaceOrderEvent.md) |
| `resume` | `void` |
| `start` | `void` |
| `stop` | `void` |
| `tick` | `void` |

#### Defined in

[types.ts:86](https://github.com/mango-run/mango-run-core/blob/a90ccad/src/types.ts#L86)

___

### SignalEventPayload

Ƭ **SignalEventPayload**<`E`\>: [`SignalEventMap`](modules.md#signaleventmap)[`E`]

#### Type parameters

| Name | Type |
| :------ | :------ |
| `E` | extends [`SignalEvent`](modules.md#signalevent) |

#### Defined in

[types.ts:100](https://github.com/mango-run/mango-run-core/blob/a90ccad/src/types.ts#L100)

## Functions

### average

▸ **average**(...`numbers`): `number`

#### Parameters

| Name | Type |
| :------ | :------ |
| `...numbers` | `number`[] |

#### Returns

`number`

#### Defined in

[utils.ts:3](https://github.com/mango-run/mango-run-core/blob/a90ccad/src/utils.ts#L3)

___

### createMangoPerpMarketConfigs

▸ **createMangoPerpMarketConfigs**(`cluster`, `groupName`, `keypair`, `symbol`, `accountIndex`, `__namedParameters?`): `Promise`<[`MangoPerpMarketConfigs`](interfaces/MangoPerpMarketConfigs.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `cluster` | `Cluster` |
| `groupName` | `string` |
| `keypair` | `Keypair` |
| `symbol` | `string` |
| `accountIndex` | `number` |
| `__namedParameters` | [`CreateMangoPerpMarketConfigsOptions`](interfaces/CreateMangoPerpMarketConfigsOptions.md) |

#### Returns

`Promise`<[`MangoPerpMarketConfigs`](interfaces/MangoPerpMarketConfigs.md)\>

#### Defined in

[market/mango/helpers.ts:9](https://github.com/mango-run/mango-run-core/blob/a90ccad/src/market/mango/helpers.ts#L9)

___

### doDestroy

▸ **doDestroy**(`lifeCycle`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `lifeCycle` | [`LifeCycle`](interfaces/LifeCycle.md) |

#### Returns

`Promise`<`void`\>

#### Defined in

[utils.ts:42](https://github.com/mango-run/mango-run-core/blob/a90ccad/src/utils.ts#L42)

___

### doInitialize

▸ **doInitialize**(`lifeCycle`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `lifeCycle` | [`LifeCycle`](interfaces/LifeCycle.md) |

#### Returns

`Promise`<`void`\>

#### Defined in

[utils.ts:37](https://github.com/mango-run/mango-run-core/blob/a90ccad/src/utils.ts#L37)

___

### isBetween

▸ **isBetween**(`val`, `left`, `right`, `includeMargin?`): `boolean`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `val` | `number` | `undefined` |
| `left` | `number` | `undefined` |
| `right` | `number` | `undefined` |
| `includeMargin` | `boolean` | `false` |

#### Returns

`boolean`

#### Defined in

[utils.ts:8](https://github.com/mango-run/mango-run-core/blob/a90ccad/src/utils.ts#L8)

___

### measureTime

▸ **measureTime**(`callback`): `Promise`<`number`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `callback` | [`Callback`](modules.md#callback)<`unknown`\> |

#### Returns

`Promise`<`number`\>

#### Defined in

[utils.ts:25](https://github.com/mango-run/mango-run-core/blob/a90ccad/src/utils.ts#L25)

___

### order

▸ **order**(`v`): [`Order`](interfaces/Order.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `v` | [`Order`](interfaces/Order.md) |

#### Returns

[`Order`](interfaces/Order.md)

#### Defined in

[utils.ts:17](https://github.com/mango-run/mango-run-core/blob/a90ccad/src/utils.ts#L17)

___

### orderDraftKey

▸ **orderDraftKey**(`order`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `order` | [`OrderDraft`](interfaces/OrderDraft.md) |

#### Returns

`string`

#### Defined in

[utils.ts:13](https://github.com/mango-run/mango-run-core/blob/a90ccad/src/utils.ts#L13)

___

### retry

▸ **retry**<`T`\>(`fn`, `config?`): `Promise`<`T`\>

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `fn` | () => `Promise`<`T`\> |
| `config` | [`RetryConfig`](interfaces/RetryConfig.md) |

#### Returns

`Promise`<`T`\>

#### Defined in

[utils.ts:95](https://github.com/mango-run/mango-run-core/blob/a90ccad/src/utils.ts#L95)

___

### sleep

▸ **sleep**(`ms`): `Promise`<`unknown`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `ms` | `number` |

#### Returns

`Promise`<`unknown`\>

#### Defined in

[utils.ts:21](https://github.com/mango-run/mango-run-core/blob/a90ccad/src/utils.ts#L21)
