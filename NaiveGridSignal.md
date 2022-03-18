# Class: NaiveGridSignal

## Hierarchy

- `BaseSignal`<[`GridSignalConfigs`](../wiki/GridSignalConfigs)\>

  ↳ **`NaiveGridSignal`**

## Table of contents

### Constructors

- [constructor](../wiki/NaiveGridSignal#constructor)

### Events

- [on](../wiki/NaiveGridSignal#on)

### Properties

- [config](../wiki/NaiveGridSignal#config)
- [eventEmitter](../wiki/NaiveGridSignal#eventemitter)
- [hasStarted](../wiki/NaiveGridSignal#hasstarted)
- [interval](../wiki/NaiveGridSignal#interval)
- [isPaused](../wiki/NaiveGridSignal#ispaused)
- [isRunning](../wiki/NaiveGridSignal#isrunning)
- [logger](../wiki/NaiveGridSignal#logger)

### Methods

- [emit](../wiki/NaiveGridSignal#emit)
- [off](../wiki/NaiveGridSignal#off)
- [once](../wiki/NaiveGridSignal#once)
- [pause](../wiki/NaiveGridSignal#pause)
- [resume](../wiki/NaiveGridSignal#resume)
- [run](../wiki/NaiveGridSignal#run)
- [start](../wiki/NaiveGridSignal#start)
- [stop](../wiki/NaiveGridSignal#stop)
- [tick](../wiki/NaiveGridSignal#tick)

## Constructors

### constructor

• **new NaiveGridSignal**(`config`, `logger`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `config` | [`GridSignalConfigs`](../wiki/GridSignalConfigs) |
| `logger` | [`Logger`](../wiki/Logger) |

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
| `E` | extends keyof [`SignalEventMap`](../wiki/Exports#signaleventmap) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `E` |
| `listener` | [`SignalEventListener`](../wiki/Exports#signaleventlistener)<`E`\> |

#### Returns

`void`

#### Inherited from

BaseSignal.on

#### Defined in

[signal/base-signal.ts:31](https://github.com/mango-run/mango-run-core/blob/a90ccad/src/signal/base-signal.ts#L31)

## Properties

### config

• **config**: [`GridSignalConfigs`](../wiki/GridSignalConfigs)

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

• **logger**: [`Logger`](../wiki/Logger)

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
| `E` | extends keyof [`SignalEventMap`](../wiki/Exports#signaleventmap) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `E` |
| `payload` | [`SignalEventPayload`](../wiki/Exports#signaleventpayload)<`E`\> |

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
| `E` | extends keyof [`SignalEventMap`](../wiki/Exports#signaleventmap) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `E` |
| `listener` | [`SignalEventListener`](../wiki/Exports#signaleventlistener)<`E`\> |

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
| `E` | extends keyof [`SignalEventMap`](../wiki/Exports#signaleventmap) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `E` |
| `listener` | [`SignalEventListener`](../wiki/Exports#signaleventlistener)<`E`\> |

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
