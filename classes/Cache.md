[@mango-run/core](../README.md) / [Exports](../modules.md) / Cache

# Class: Cache<T\>

## Type parameters

| Name |
| :------ |
| `T` |

## Implements

- [`LifeCycle`](../interfaces/LifeCycle.md)

## Table of contents

### Constructors

- [constructor](Cache.md#constructor)

### Properties

- [data](Cache.md#data)
- [isLoading](Cache.md#isloading)
- [timer](Cache.md#timer)
- [updatedAt](Cache.md#updatedat)

### Methods

- [destroy](Cache.md#destroy)
- [get](Cache.md#get)

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
| `config` | [`CacheConfig`](../interfaces/CacheConfig.md) |

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

[LifeCycle](../interfaces/LifeCycle.md).[destroy](../interfaces/LifeCycle.md#destroy)

#### Defined in

[utils.ts:67](https://github.com/mango-run/mango-run-core/blob/a90ccad/src/utils.ts#L67)

___

### get

▸ **get**(): `Promise`<`T`\>

#### Returns

`Promise`<`T`\>

#### Defined in

[utils.ts:71](https://github.com/mango-run/mango-run-core/blob/a90ccad/src/utils.ts#L71)
