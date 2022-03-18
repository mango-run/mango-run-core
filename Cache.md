# Class: Cache<T\>

## Type parameters

| Name |
| :------ |
| `T` |

## Implements

- [`LifeCycle`](../wiki/LifeCycle)

## Table of contents

### Constructors

- [constructor](../wiki/Cache#constructor)

### Properties

- [data](../wiki/Cache#data)
- [isLoading](../wiki/Cache#isloading)
- [timer](../wiki/Cache#timer)
- [updatedAt](../wiki/Cache#updatedat)

### Methods

- [destroy](../wiki/Cache#destroy)
- [get](../wiki/Cache#get)

## Constructors

### constructor

• **new Cache**<`T`\>(`updater`, `config`)

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `updater` | () => `Promise`<`T`\> |
| `config` | [`CacheConfig`](../wiki/CacheConfig) |

#### Defined in

[utils.ts:61](https://github.com/mango-run/mango-run-core/blob/a90ccad/src/utils.ts#L61)

## Properties

### data

• **data**: ``null`` \| `Promise`<`T`\> = `null`

#### Defined in

[utils.ts:53](https://github.com/mango-run/mango-run-core/blob/a90ccad/src/utils.ts#L53)

___

### isLoading

• **isLoading**: `boolean` = `false`

#### Defined in

[utils.ts:57](https://github.com/mango-run/mango-run-core/blob/a90ccad/src/utils.ts#L57)

___

### timer

• **timer**: `any`

#### Defined in

[utils.ts:59](https://github.com/mango-run/mango-run-core/blob/a90ccad/src/utils.ts#L59)

___

### updatedAt

• **updatedAt**: `number` = `0`

#### Defined in

[utils.ts:55](https://github.com/mango-run/mango-run-core/blob/a90ccad/src/utils.ts#L55)

## Methods

### destroy

▸ **destroy**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Implementation of

[LifeCycle](../wiki/LifeCycle).[destroy](../wiki/LifeCycle#destroy)

#### Defined in

[utils.ts:67](https://github.com/mango-run/mango-run-core/blob/a90ccad/src/utils.ts#L67)

___

### get

▸ **get**(): `Promise`<`T`\>

#### Returns

`Promise`<`T`\>

#### Defined in

[utils.ts:71](https://github.com/mango-run/mango-run-core/blob/a90ccad/src/utils.ts#L71)
