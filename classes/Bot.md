[@mango-run/core](../README.md) / [Exports](../modules.md) / Bot

# Class: Bot

## Table of contents

### Constructors

- [constructor](Bot.md#constructor)

### Properties

- [blockCallbacks](Bot.md#blockcallbacks)
- [cancelAllOrdersHandler](Bot.md#cancelallordershandler)
- [cancelOrderHandler](Bot.md#cancelorderhandler)
- [clearAllPositionHandler](Bot.md#clearallpositionhandler)
- [logger](Bot.md#logger)
- [market](Bot.md#market)
- [placeOrderHandler](Bot.md#placeorderhandler)
- [signal](Bot.md#signal)

### Methods

- [blockSignal](Bot.md#blocksignal)
- [clearAllPosition](Bot.md#clearallposition)
- [resolveBlockSignalCallbacks](Bot.md#resolveblocksignalcallbacks)
- [start](Bot.md#start)
- [stop](Bot.md#stop)

## Constructors

### constructor

• **new Bot**(`market`, `signal`, `logger`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `market` | [`Market`](../interfaces/Market.md) |
| `signal` | [`Signal`](../interfaces/Signal.md) |
| `logger` | [`Logger`](../interfaces/Logger.md) |

#### Defined in

[bot.ts:30](https://github.com/mango-run/mango-run-core/blob/a90ccad/src/bot.ts#L30)

## Properties

### blockCallbacks

• **blockCallbacks**: [`CallbackWithDetail`](../interfaces/CallbackWithDetail.md)[] = `[]`

#### Defined in

[bot.ts:10](https://github.com/mango-run/mango-run-core/blob/a90ccad/src/bot.ts#L10)

___

### cancelAllOrdersHandler

• **cancelAllOrdersHandler**: [`SignalEventListener`](../modules.md#signaleventlistener)<``"cancel_all_orders_event"``\>

#### Defined in

[bot.ts:20](https://github.com/mango-run/mango-run-core/blob/a90ccad/src/bot.ts#L20)

___

### cancelOrderHandler

• **cancelOrderHandler**: [`SignalEventListener`](../modules.md#signaleventlistener)<``"cancel_order_event"``\>

#### Defined in

[bot.ts:16](https://github.com/mango-run/mango-run-core/blob/a90ccad/src/bot.ts#L16)

___

### clearAllPositionHandler

• **clearAllPositionHandler**: [`SignalEventListener`](../modules.md#signaleventlistener)<``"clear_all_position"``\>

#### Defined in

[bot.ts:24](https://github.com/mango-run/mango-run-core/blob/a90ccad/src/bot.ts#L24)

___

### logger

• `Protected` **logger**: [`Logger`](../interfaces/Logger.md)

#### Defined in

[bot.ts:28](https://github.com/mango-run/mango-run-core/blob/a90ccad/src/bot.ts#L28)

___

### market

• `Protected` **market**: [`Market`](../interfaces/Market.md)

___

### placeOrderHandler

• **placeOrderHandler**: [`SignalEventListener`](../modules.md#signaleventlistener)<``"place_order_event"``\>

#### Defined in

[bot.ts:12](https://github.com/mango-run/mango-run-core/blob/a90ccad/src/bot.ts#L12)

___

### signal

• `Protected` **signal**: [`Signal`](../interfaces/Signal.md)

## Methods

### blockSignal

▸ **blockSignal**(`callback`, `name?`): `void`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `callback` | [`Callback`](../modules.md#callback)<`unknown`\> | `undefined` |
| `name` | `string` | `'unknown'` |

#### Returns

`void`

#### Defined in

[bot.ts:34](https://github.com/mango-run/mango-run-core/blob/a90ccad/src/bot.ts#L34)

___

### clearAllPosition

▸ **clearAllPosition**(): `Promise`<`boolean`\>

#### Returns

`Promise`<`boolean`\>

#### Defined in

[bot.ts:104](https://github.com/mango-run/mango-run-core/blob/a90ccad/src/bot.ts#L104)

___

### resolveBlockSignalCallbacks

▸ **resolveBlockSignalCallbacks**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Defined in

[bot.ts:50](https://github.com/mango-run/mango-run-core/blob/a90ccad/src/bot.ts#L50)

___

### start

▸ **start**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Defined in

[bot.ts:76](https://github.com/mango-run/mango-run-core/blob/a90ccad/src/bot.ts#L76)

___

### stop

▸ **stop**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Defined in

[bot.ts:90](https://github.com/mango-run/mango-run-core/blob/a90ccad/src/bot.ts#L90)
