# @mango-run/core

## Table of contents

### Enumerations

- [OrderSide](../wiki/OrderSide)
- [OrderType](../wiki/OrderType)
- [ReceiptStatus](../wiki/ReceiptStatus)

### Classes

- [Bot](../wiki/Bot)
- [Cache](../wiki/Cache)
- [ConsoleLogger](../wiki/ConsoleLogger)
- [InMemoryReceiptStore](../wiki/InMemoryReceiptStore)
- [MangoPerpMarket](../wiki/MangoPerpMarket)
- [NaiveGridSignal](../wiki/NaiveGridSignal)
- [NullLogger](../wiki/NullLogger)

### Interfaces

- [Balance](../wiki/Balance)
- [CacheConfig](../wiki/CacheConfig)
- [CallbackWithDetail](../wiki/CallbackWithDetail)
- [CancelOrderEvent](../wiki/CancelOrderEvent)
- [ConsoleLoggerConfigs](../wiki/ConsoleLoggerConfigs)
- [CreateMangoPerpMarketConfigsOptions](../wiki/CreateMangoPerpMarketConfigsOptions)
- [GridSignalConfigs](../wiki/GridSignalConfigs)
- [LifeCycle](../wiki/LifeCycle)
- [Logger](../wiki/Logger)
- [MangoPerpMarketConfigs](../wiki/MangoPerpMarketConfigs)
- [Market](../wiki/Market)
- [Order](../wiki/Order)
- [OrderDraft](../wiki/OrderDraft)
- [Orderbook](../wiki/Orderbook)
- [PlaceOrderEvent](../wiki/PlaceOrderEvent)
- [ReceiptStore](../wiki/ReceiptStore)
- [RetryConfig](../wiki/RetryConfig)
- [Signal](../wiki/Signal)

### Type aliases

- [Callback](../wiki/Exports#callback)
- [Receipt](../wiki/Exports#receipt)
- [SignalEvent](../wiki/Exports#signalevent)
- [SignalEventListener](../wiki/Exports#signaleventlistener)
- [SignalEventMap](../wiki/Exports#signaleventmap)
- [SignalEventPayload](../wiki/Exports#signaleventpayload)

### Functions

- [average](../wiki/Exports#average)
- [createMangoPerpMarketConfigs](../wiki/Exports#createmangoperpmarketconfigs)
- [doDestroy](../wiki/Exports#dodestroy)
- [doInitialize](../wiki/Exports#doinitialize)
- [isBetween](../wiki/Exports#isbetween)
- [measureTime](../wiki/Exports#measuretime)
- [order](../wiki/Exports#order)
- [orderDraftKey](../wiki/Exports#orderdraftkey)
- [retry](../wiki/Exports#retry)
- [sleep](../wiki/Exports#sleep)

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

Ƭ **Receipt**: { `id`: `string` ; `order`: [`OrderDraft`](../wiki/OrderDraft) ; `txHash`: `string`  } & { `status`: [`PlacePending`](../wiki/ReceiptStatus#placepending)  } \| { `error`: `any` ; `status`: [`Error`](../wiki/ReceiptStatus#error)  } \| { `orderId`: `string` ; `status`: [`ReceiptStatus`](../wiki/ReceiptStatus)  }

#### Defined in

[types.ts:38](https://github.com/mango-run/mango-run-core/blob/a90ccad/src/types.ts#L38)

___

### SignalEvent

Ƭ **SignalEvent**: keyof [`SignalEventMap`](../wiki/Exports#signaleventmap)

#### Defined in

[types.ts:98](https://github.com/mango-run/mango-run-core/blob/a90ccad/src/types.ts#L98)

___

### SignalEventListener

Ƭ **SignalEventListener**<`E`\>: (`payload`: [`SignalEventPayload`](../wiki/Exports#signaleventpayload)<`E`\>) => `void`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `E` | extends [`SignalEvent`](../wiki/Exports#signalevent) |

#### Type declaration

▸ (`payload`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `payload` | [`SignalEventPayload`](../wiki/Exports#signaleventpayload)<`E`\> |

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
| `cancel_order_event` | [`CancelOrderEvent`](../wiki/CancelOrderEvent) |
| `clear_all_position` | `void` |
| `pause` | `void` |
| `place_order_event` | [`PlaceOrderEvent`](../wiki/PlaceOrderEvent) |
| `resume` | `void` |
| `start` | `void` |
| `stop` | `void` |
| `tick` | `void` |

#### Defined in

[types.ts:86](https://github.com/mango-run/mango-run-core/blob/a90ccad/src/types.ts#L86)

___

### SignalEventPayload

Ƭ **SignalEventPayload**<`E`\>: [`SignalEventMap`](../wiki/Exports#signaleventmap)[`E`]

#### Type parameters

| Name | Type |
| :------ | :------ |
| `E` | extends [`SignalEvent`](../wiki/Exports#signalevent) |

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

▸ **createMangoPerpMarketConfigs**(`cluster`, `groupName`, `keypair`, `symbol`, `accountIndex`, `__namedParameters?`): `Promise`<[`MangoPerpMarketConfigs`](../wiki/MangoPerpMarketConfigs)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `cluster` | `Cluster` |
| `groupName` | `string` |
| `keypair` | `Keypair` |
| `symbol` | `string` |
| `accountIndex` | `number` |
| `__namedParameters` | [`CreateMangoPerpMarketConfigsOptions`](../wiki/CreateMangoPerpMarketConfigsOptions) |

#### Returns

`Promise`<[`MangoPerpMarketConfigs`](../wiki/MangoPerpMarketConfigs)\>

#### Defined in

[market/mango/helpers.ts:9](https://github.com/mango-run/mango-run-core/blob/a90ccad/src/market/mango/helpers.ts#L9)

___

### doDestroy

▸ **doDestroy**(`lifeCycle`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `lifeCycle` | [`LifeCycle`](../wiki/LifeCycle) |

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
| `lifeCycle` | [`LifeCycle`](../wiki/LifeCycle) |

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
| `callback` | [`Callback`](../wiki/Exports#callback)<`unknown`\> |

#### Returns

`Promise`<`number`\>

#### Defined in

[utils.ts:25](https://github.com/mango-run/mango-run-core/blob/a90ccad/src/utils.ts#L25)

___

### order

▸ **order**(`v`): [`Order`](../wiki/Order)

#### Parameters

| Name | Type |
| :------ | :------ |
| `v` | [`Order`](../wiki/Order) |

#### Returns

[`Order`](../wiki/Order)

#### Defined in

[utils.ts:17](https://github.com/mango-run/mango-run-core/blob/a90ccad/src/utils.ts#L17)

___

### orderDraftKey

▸ **orderDraftKey**(`order`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `order` | [`OrderDraft`](../wiki/OrderDraft) |

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
| `config` | [`RetryConfig`](../wiki/RetryConfig) |

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
