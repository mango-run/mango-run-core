# Class: Bot

## Table of contents

### Constructors

- [constructor](../wiki/Bot#constructor)

### Properties

- [blockCallbacks](../wiki/Bot#blockcallbacks)
- [cancelAllOrdersHandler](../wiki/Bot#cancelallordershandler)
- [cancelOrderHandler](../wiki/Bot#cancelorderhandler)
- [clearAllPositionHandler](../wiki/Bot#clearallpositionhandler)
- [logger](../wiki/Bot#logger)
- [market](../wiki/Bot#market)
- [placeOrderHandler](../wiki/Bot#placeorderhandler)
- [signal](../wiki/Bot#signal)

### Methods

- [blockSignal](../wiki/Bot#blocksignal)
- [clearAllPosition](../wiki/Bot#clearallposition)
- [resolveBlockSignalCallbacks](../wiki/Bot#resolveblocksignalcallbacks)
- [start](../wiki/Bot#start)
- [stop](../wiki/Bot#stop)

## Constructors

### constructor

• **new Bot**(`market`, `signal`, `logger`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `market` | [`Market`](../wiki/Market) |
| `signal` | [`Signal`](../wiki/Signal) |
| `logger` | [`Logger`](../wiki/Logger) |

#### Defined in

[bot.ts:30](https://github.com/mango-run/mango-run-core/blob/a90ccad/src/bot.ts#L30)

## Properties

### blockCallbacks

• **blockCallbacks**: [`CallbackWithDetail`](../wiki/CallbackWithDetail)[] = `[]`

#### Defined in

[bot.ts:10](https://github.com/mango-run/mango-run-core/blob/a90ccad/src/bot.ts#L10)

___

### cancelAllOrdersHandler

• **cancelAllOrdersHandler**: [`SignalEventListener`](../wiki/Exports#signaleventlistener)<``"cancel_all_orders_event"``\>

#### Defined in

[bot.ts:20](https://github.com/mango-run/mango-run-core/blob/a90ccad/src/bot.ts#L20)

___

### cancelOrderHandler

• **cancelOrderHandler**: [`SignalEventListener`](../wiki/Exports#signaleventlistener)<``"cancel_order_event"``\>

#### Defined in

[bot.ts:16](https://github.com/mango-run/mango-run-core/blob/a90ccad/src/bot.ts#L16)

___

### clearAllPositionHandler

• **clearAllPositionHandler**: [`SignalEventListener`](../wiki/Exports#signaleventlistener)<``"clear_all_position"``\>

#### Defined in

[bot.ts:24](https://github.com/mango-run/mango-run-core/blob/a90ccad/src/bot.ts#L24)

___

### logger

• `Protected` **logger**: [`Logger`](../wiki/Logger)

#### Defined in

[bot.ts:28](https://github.com/mango-run/mango-run-core/blob/a90ccad/src/bot.ts#L28)

___

### market

• `Protected` **market**: [`Market`](../wiki/Market)

___

### placeOrderHandler

• **placeOrderHandler**: [`SignalEventListener`](../wiki/Exports#signaleventlistener)<``"place_order_event"``\>

#### Defined in

[bot.ts:12](https://github.com/mango-run/mango-run-core/blob/a90ccad/src/bot.ts#L12)

___

### signal

• `Protected` **signal**: [`Signal`](../wiki/Signal)

## Methods

### blockSignal

▸ **blockSignal**(`callback`, `name?`): `void`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `callback` | [`Callback`](../wiki/Exports#callback)<`unknown`\> | `undefined` |
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
