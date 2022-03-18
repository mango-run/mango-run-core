# Interface: Logger

## Implemented by

- [`ConsoleLogger`](../wiki/ConsoleLogger)
- [`NullLogger`](../wiki/NullLogger)

## Table of contents

### Methods

- [create](../wiki/Logger#create)
- [debug](../wiki/Logger#debug)
- [error](../wiki/Logger#error)
- [info](../wiki/Logger#info)
- [warn](../wiki/Logger#warn)

## Methods

### create

▸ **create**(`namespace`): [`Logger`](../wiki/Logger)

#### Parameters

| Name | Type |
| :------ | :------ |
| `namespace` | `string` |

#### Returns

[`Logger`](../wiki/Logger)

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
