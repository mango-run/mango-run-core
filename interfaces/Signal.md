[@mango-run/core](../README.md) / [Exports](../modules.md) / Signal

# Interface: Signal

## Hierarchy

- [`LifeCycle`](LifeCycle.md)

  ↳ **`Signal`**

## Table of contents

### Properties

- [isPaused](Signal.md#ispaused)
- [isRunning](Signal.md#isrunning)

### Methods

- [destroy](Signal.md#destroy)
- [initialize](Signal.md#initialize)
- [off](Signal.md#off)
- [on](Signal.md#on)
- [once](Signal.md#once)
- [pause](Signal.md#pause)
- [resume](Signal.md#resume)
- [start](Signal.md#start)
- [stop](Signal.md#stop)

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

#### Defined in

[types.ts:108](https://github.com/mango-run/mango-run-core/blob/a90ccad/src/types.ts#L108)

___

### on

▸ **on**<`E`\>(`event`, `listener`): `void`

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

#### Defined in

[types.ts:107](https://github.com/mango-run/mango-run-core/blob/a90ccad/src/types.ts#L107)

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
