[@mango-run/core](../README.md) / [Exports](../modules.md) / ConsoleLogger

# Class: ConsoleLogger

## Implements

- [`Logger`](../interfaces/Logger.md)

## Table of contents

### Constructors

- [constructor](ConsoleLogger.md#constructor)

### Properties

- [config](ConsoleLogger.md#config)
- [namespace](ConsoleLogger.md#namespace)

### Methods

- [create](ConsoleLogger.md#create)
- [debug](ConsoleLogger.md#debug)
- [error](ConsoleLogger.md#error)
- [info](ConsoleLogger.md#info)
- [warn](ConsoleLogger.md#warn)

## Constructors

### constructor

• **new ConsoleLogger**(`namespace?`, `config?`)

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `namespace` | `string` | `''` |
| `config` | [`ConsoleLoggerConfigs`](../interfaces/ConsoleLoggerConfigs.md) | `{}` |

#### Defined in

[logger/console-logger.ts:8](https://github.com/mango-run/mango-run-core/blob/a90ccad/src/logger/console-logger.ts#L8)

## Properties

### config

• **config**: [`ConsoleLoggerConfigs`](../interfaces/ConsoleLoggerConfigs.md) = `{}`

___

### namespace

• **namespace**: `string` = `''`

## Methods

### create

▸ **create**(`namespace`): [`Logger`](../interfaces/Logger.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `namespace` | `string` |

#### Returns

[`Logger`](../interfaces/Logger.md)

#### Implementation of

[Logger](../interfaces/Logger.md).[create](../interfaces/Logger.md#create)

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

[Logger](../interfaces/Logger.md).[debug](../interfaces/Logger.md#debug)

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

[Logger](../interfaces/Logger.md).[error](../interfaces/Logger.md#error)

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

[Logger](../interfaces/Logger.md).[info](../interfaces/Logger.md#info)

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

[Logger](../interfaces/Logger.md).[warn](../interfaces/Logger.md#warn)

#### Defined in

[logger/console-logger.ts:28](https://github.com/mango-run/mango-run-core/blob/a90ccad/src/logger/console-logger.ts#L28)
