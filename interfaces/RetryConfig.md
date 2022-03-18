[@mango-run/core](../README.md) / [Exports](../modules.md) / RetryConfig

# Interface: RetryConfig

## Table of contents

### Properties

- [maxAttempt](RetryConfig.md#maxattempt)
- [retryDelay](RetryConfig.md#retrydelay)

### Methods

- [shouldRetry](RetryConfig.md#shouldretry)

## Properties

### maxAttempt

• `Optional` **maxAttempt**: `number`

#### Defined in

[utils.ts:90](https://github.com/mango-run/mango-run-core/blob/a90ccad/src/utils.ts#L90)

___

### retryDelay

• `Optional` **retryDelay**: `number` \| (`attempt`: `number`) => `number`

#### Defined in

[utils.ts:91](https://github.com/mango-run/mango-run-core/blob/a90ccad/src/utils.ts#L91)

## Methods

### shouldRetry

▸ `Optional` **shouldRetry**(`error`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `error` | `unknown` |

#### Returns

`boolean`

#### Defined in

[utils.ts:92](https://github.com/mango-run/mango-run-core/blob/a90ccad/src/utils.ts#L92)
