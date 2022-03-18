[@mango-run/core](../README.md) / [Exports](../modules.md) / NaiveGridSignal

# Class: NaiveGridSignal

## Hierarchy

- `BaseSignal`<[`GridSignalConfigs`](../interfaces/GridSignalConfigs.md)\>

  ↳ **`NaiveGridSignal`**

## Table of contents

### Constructors

- [constructor](NaiveGridSignal.md#constructor)

### Events

- [on](NaiveGridSignal.md#on)

### Properties

- [config](NaiveGridSignal.md#config)
- [eventEmitter](NaiveGridSignal.md#eventemitter)
- [hasStarted](NaiveGridSignal.md#hasstarted)
- [interval](NaiveGridSignal.md#interval)
- [isPaused](NaiveGridSignal.md#ispaused)
- [isRunning](NaiveGridSignal.md#isrunning)
- [logger](NaiveGridSignal.md#logger)

### Methods

- [emit](NaiveGridSignal.md#emit)
- [off](NaiveGridSignal.md#off)
- [once](NaiveGridSignal.md#once)
- [pause](NaiveGridSignal.md#pause)
- [resume](NaiveGridSignal.md#resume)
- [run](NaiveGridSignal.md#run)
- [start](NaiveGridSignal.md#start)
- [stop](NaiveGridSignal.md#stop)
- [tick](NaiveGridSignal.md#tick)

## Constructors

### constructor

• **new NaiveGridSignal**(`config`, `logger`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `config` | [`GridSignalConfigs`](../interfaces/GridSignalConfigs.md) |
| `logger` | [`Logger`](../interfaces/Logger.md) |

#### Overrides

BaseSignal&lt;GridSignalConfigs\&gt;.constructor

#### Defined in

[signal/naive-grid-signal/naive-grid-signal.ts:29](https://github.com/mango-run/mango-run-core/blob/a90ccad/src/signal/naive-grid-signal/naive-grid-signal.ts#L29)

## Events

### on

• **on**<`E`\>(`event`, `listener`): `void`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `E` | extends keyof [`SignalEventMap`](../modules.md#signaleventmap) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `E` |
| `listener` | [`SignalEventListener`](../modules.md#signaleventlistener)<`E`\> |

#### Returns

`void`

#### Inherited from

BaseSignal.on

#### Defined in

[signal/base-signal.ts:31](https://github.com/mango-run/mango-run-core/blob/a90ccad/src/signal/base-signal.ts#L31)

## Properties

### config

• **config**: [`GridSignalConfigs`](../interfaces/GridSignalConfigs.md)

#### Inherited from

BaseSignal.config

___

### eventEmitter

• **eventEmitter**: `EventEmitter`

#### Inherited from

BaseSignal.eventEmitter

#### Defined in

[signal/base-signal.ts:10](https://github.com/mango-run/mango-run-core/blob/a90ccad/src/signal/base-signal.ts#L10)

___

### hasStarted

• **hasStarted**: `boolean` = `false`

#### Defined in

[signal/naive-grid-signal/naive-grid-signal.ts:27](https://github.com/mango-run/mango-run-core/blob/a90ccad/src/signal/naive-grid-signal/naive-grid-signal.ts#L27)

___

### interval

• **interval**: `number`

#### Inherited from

BaseSignal.interval

#### Defined in

[signal/base-signal.ts:18](https://github.com/mango-run/mango-run-core/blob/a90ccad/src/signal/base-signal.ts#L18)

___

### isPaused

• **isPaused**: `boolean` = `false`

#### Inherited from

BaseSignal.isPaused

#### Defined in

[signal/base-signal.ts:14](https://github.com/mango-run/mango-run-core/blob/a90ccad/src/signal/base-signal.ts#L14)

___

### isRunning

• **isRunning**: `boolean` = `false`

#### Inherited from

BaseSignal.isRunning

#### Defined in

[signal/base-signal.ts:12](https://github.com/mango-run/mango-run-core/blob/a90ccad/src/signal/base-signal.ts#L12)

___

### logger

• **logger**: [`Logger`](../interfaces/Logger.md)

#### Inherited from

BaseSignal.logger

#### Defined in

[signal/base-signal.ts:16](https://github.com/mango-run/mango-run-core/blob/a90ccad/src/signal/base-signal.ts#L16)

## Methods

### emit

▸ **emit**<`E`\>(`event`, `payload`): `void`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `E` | extends keyof [`SignalEventMap`](../modules.md#signaleventmap) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `E` |
| `payload` | [`SignalEventPayload`](../modules.md#signaleventpayload)<`E`\> |

#### Returns

`void`

#### Inherited from

BaseSignal.emit

#### Defined in

[signal/base-signal.ts:43](https://github.com/mango-run/mango-run-core/blob/a90ccad/src/signal/base-signal.ts#L43)

___

### off

▸ **off**<`E`\>(`event`, `listener`): `void`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `E` | extends keyof [`SignalEventMap`](../modules.md#signaleventmap) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `E` |
| `listener` | [`SignalEventListener`](../modules.md#signaleventlistener)<`E`\> |

#### Returns

`void`

#### Inherited from

BaseSignal.off

#### Defined in

[signal/base-signal.ts:35](https://github.com/mango-run/mango-run-core/blob/a90ccad/src/signal/base-signal.ts#L35)

___

### once

▸ **once**<`E`\>(`event`, `listener`): `void`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `E` | extends keyof [`SignalEventMap`](../modules.md#signaleventmap) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `E` |
| `listener` | [`SignalEventListener`](../modules.md#signaleventlistener)<`E`\> |

#### Returns

`void`

#### Inherited from

BaseSignal.once

#### Defined in

[signal/base-signal.ts:39](https://github.com/mango-run/mango-run-core/blob/a90ccad/src/signal/base-signal.ts#L39)

___

### pause

▸ **pause**(): `Promise`<`boolean`\>

#### Returns

`Promise`<`boolean`\>

#### Inherited from

BaseSignal.pause

#### Defined in

[signal/base-signal.ts:63](https://github.com/mango-run/mango-run-core/blob/a90ccad/src/signal/base-signal.ts#L63)

___

### resume

▸ **resume**(): `Promise`<`boolean`\>

#### Returns

`Promise`<`boolean`\>

#### Inherited from

BaseSignal.resume

#### Defined in

[signal/base-signal.ts:71](https://github.com/mango-run/mango-run-core/blob/a90ccad/src/signal/base-signal.ts#L71)

___

### run

▸ **run**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Inherited from

BaseSignal.run

#### Defined in

[signal/base-signal.ts:79](https://github.com/mango-run/mango-run-core/blob/a90ccad/src/signal/base-signal.ts#L79)

___

### start

▸ **start**(): `Promise`<`boolean`\>

#### Returns

`Promise`<`boolean`\>

#### Inherited from

BaseSignal.start

#### Defined in

[signal/base-signal.ts:47](https://github.com/mango-run/mango-run-core/blob/a90ccad/src/signal/base-signal.ts#L47)

___

### stop

▸ **stop**(): `Promise`<`boolean`\>

#### Returns

`Promise`<`boolean`\>

#### Inherited from

BaseSignal.stop

#### Defined in

[signal/base-signal.ts:55](https://github.com/mango-run/mango-run-core/blob/a90ccad/src/signal/base-signal.ts#L55)

___

### tick

▸ **tick**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Overrides

BaseSignal.tick

#### Defined in

[signal/naive-grid-signal/naive-grid-signal.ts:33](https://github.com/mango-run/mango-run-core/blob/a90ccad/src/signal/naive-grid-signal/naive-grid-signal.ts#L33)
