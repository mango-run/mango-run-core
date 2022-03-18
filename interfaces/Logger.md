[@mango-run/core](../README.md) / [Exports](../modules.md) / Logger

# Interface: Logger

## Implemented by

- [`ConsoleLogger`](../classes/ConsoleLogger.md)
- [`NullLogger`](../classes/NullLogger.md)

## Table of contents

### Methods

- [create](Logger.md#create)
- [debug](Logger.md#debug)
- [error](Logger.md#error)
- [info](Logger.md#info)
- [warn](Logger.md#warn)

## Methods

### create

▸ **create**(`namespace`): [`Logger`](Logger.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `namespace` | `string` |

#### Returns

[`Logger`](Logger.md)

#### Defined in

[types.ts:124](https://github.com/mango-run/mango-run-core/blob/a90ccad/src/types.ts#L124)

___

### debug

▸ **debug**(...`msg`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `...msg` | `unknown`[] |

#### Returns

`void`

#### Defined in

[types.ts:125](https://github.com/mango-run/mango-run-core/blob/a90ccad/src/types.ts#L125)

___

### error

▸ **error**(...`msg`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `...msg` | `unknown`[] |

#### Returns

`void`

#### Defined in

[types.ts:128](https://github.com/mango-run/mango-run-core/blob/a90ccad/src/types.ts#L128)

___

### info

▸ **info**(...`msg`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `...msg` | `unknown`[] |

#### Returns

`void`

#### Defined in

[types.ts:126](https://github.com/mango-run/mango-run-core/blob/a90ccad/src/types.ts#L126)

___

### warn

▸ **warn**(...`msg`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `...msg` | `unknown`[] |

#### Returns

`void`

#### Defined in

[types.ts:127](https://github.com/mango-run/mango-run-core/blob/a90ccad/src/types.ts#L127)
