# Interface: Signal

## Hierarchy

- [`LifeCycle`](../wiki/LifeCycle)

  ↳ **`Signal`**

## Table of contents

### Properties

- [isPaused](../wiki/Signal#ispaused)
- [isRunning](../wiki/Signal#isrunning)

### Methods

- [destroy](../wiki/Signal#destroy)
- [initialize](../wiki/Signal#initialize)
- [off](../wiki/Signal#off)
- [on](../wiki/Signal#on)
- [once](../wiki/Signal#once)
- [pause](../wiki/Signal#pause)
- [resume](../wiki/Signal#resume)
- [start](../wiki/Signal#start)
- [stop](../wiki/Signal#stop)

## Properties

### isPaused

• `Readonly` **isPaused**: `boolean`

#### Defined in

[types.ts:106](https://github.com/mango-run/mango-run-core/blob/a90ccad/src/types.ts#L106)

___

### isRunning

• `Readonly` **isRunning**: `boolean`

#### Defined in

[types.ts:105](https://github.com/mango-run/mango-run-core/blob/a90ccad/src/types.ts#L105)

## Methods

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

#### Defined in

[types.ts:108](https://github.com/mango-run/mango-run-core/blob/a90ccad/src/types.ts#L108)

___

### on

▸ **on**<`E`\>(`event`, `listener`): `void`

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

#### Defined in

[types.ts:107](https://github.com/mango-run/mango-run-core/blob/a90ccad/src/types.ts#L107)

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

#### Defined in

[types.ts:109](https://github.com/mango-run/mango-run-core/blob/a90ccad/src/types.ts#L109)

___

### pause

▸ **pause**(): `Promise`<`boolean`\>

#### Returns

`Promise`<`boolean`\>

#### Defined in

[types.ts:115](https://github.com/mango-run/mango-run-core/blob/a90ccad/src/types.ts#L115)

___

### resume

▸ **resume**(): `Promise`<`boolean`\>

#### Returns

`Promise`<`boolean`\>

#### Defined in

[types.ts:117](https://github.com/mango-run/mango-run-core/blob/a90ccad/src/types.ts#L117)

___

### start

▸ **start**(): `Promise`<`boolean`\>

#### Returns

`Promise`<`boolean`\>

#### Defined in

[types.ts:111](https://github.com/mango-run/mango-run-core/blob/a90ccad/src/types.ts#L111)

___

### stop

▸ **stop**(): `Promise`<`boolean`\>

#### Returns

`Promise`<`boolean`\>

#### Defined in

[types.ts:113](https://github.com/mango-run/mango-run-core/blob/a90ccad/src/types.ts#L113)
