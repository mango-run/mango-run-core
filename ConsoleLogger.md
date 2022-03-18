# Class: ConsoleLogger

## Implements

- [`Logger`](../wiki/Logger)

## Table of contents

### Constructors

- [constructor](../wiki/ConsoleLogger#constructor)

### Properties

- [config](../wiki/ConsoleLogger#config)
- [namespace](../wiki/ConsoleLogger#namespace)

### Methods

- [create](../wiki/ConsoleLogger#create)
- [debug](../wiki/ConsoleLogger#debug)
- [error](../wiki/ConsoleLogger#error)
- [info](../wiki/ConsoleLogger#info)
- [warn](../wiki/ConsoleLogger#warn)

## Constructors

### constructor

• **new ConsoleLogger**(`namespace?`, `config?`)

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `namespace` | `string` | `''` |
| `config` | [`ConsoleLoggerConfigs`](../wiki/ConsoleLoggerConfigs) | `{}` |

#### Defined in

[logger/console-logger.ts:8](https://github.com/mango-run/mango-run-core/blob/a90ccad/src/logger/console-logger.ts#L8)

## Properties

### config

• **config**: [`ConsoleLoggerConfigs`](../wiki/ConsoleLoggerConfigs) = `{}`

___

### namespace

• **namespace**: `string` = `''`

## Methods

### create

▸ **create**(`namespace`): [`Logger`](../wiki/Logger)

#### Parameters

| Name | Type |
| :------ | :------ |
| `namespace` | `string` |

#### Returns

[`Logger`](../wiki/Logger)

#### Implementation of

[Logger](../wiki/Logger).[create](../wiki/Logger#create)

#### Defined in

[logger/console-logger.ts:10](https://github.com/mango-run/mango-run-core/blob/a90ccad/src/logger/console-logger.ts#L10)

___

### debug

▸ **debug**(...`msg`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `...msg` | `string`[] |

#### Returns

`void`

#### Implementation of

[Logger](../wiki/Logger).[debug](../wiki/Logger#debug)

#### Defined in

[logger/console-logger.ts:14](https://github.com/mango-run/mango-run-core/blob/a90ccad/src/logger/console-logger.ts#L14)

___

### error

▸ **error**(...`msg`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `...msg` | `string`[] |

#### Returns

`void`

#### Implementation of

[Logger](../wiki/Logger).[error](../wiki/Logger#error)

#### Defined in

[logger/console-logger.ts:35](https://github.com/mango-run/mango-run-core/blob/a90ccad/src/logger/console-logger.ts#L35)

___

### info

▸ **info**(...`msg`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `...msg` | `string`[] |

#### Returns

`void`

#### Implementation of

[Logger](../wiki/Logger).[info](../wiki/Logger#info)

#### Defined in

[logger/console-logger.ts:21](https://github.com/mango-run/mango-run-core/blob/a90ccad/src/logger/console-logger.ts#L21)

___

### warn

▸ **warn**(...`msg`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `...msg` | `string`[] |

#### Returns

`void`

#### Implementation of

[Logger](../wiki/Logger).[warn](../wiki/Logger#warn)

#### Defined in

[logger/console-logger.ts:28](https://github.com/mango-run/mango-run-core/blob/a90ccad/src/logger/console-logger.ts#L28)
