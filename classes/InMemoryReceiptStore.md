[@mango-run/core](../README.md) / [Exports](../modules.md) / InMemoryReceiptStore

# Class: InMemoryReceiptStore

## Implements

- [`ReceiptStore`](../interfaces/ReceiptStore.md)

## Table of contents

### Constructors

- [constructor](InMemoryReceiptStore.md#constructor)

### Properties

- [byId](InMemoryReceiptStore.md#byid)
- [byOrderId](InMemoryReceiptStore.md#byorderid)
- [byStatus](InMemoryReceiptStore.md#bystatus)
- [logger](InMemoryReceiptStore.md#logger)
- [nextId](InMemoryReceiptStore.md#nextid)

### Methods

- [add](InMemoryReceiptStore.md#add)
- [generateId](InMemoryReceiptStore.md#generateid)
- [get](InMemoryReceiptStore.md#get)
- [getByOrderId](InMemoryReceiptStore.md#getbyorderid)
- [onCanceled](InMemoryReceiptStore.md#oncanceled)
- [onError](InMemoryReceiptStore.md#onerror)
- [onFulfilled](InMemoryReceiptStore.md#onfulfilled)
- [onPlaced](InMemoryReceiptStore.md#onplaced)
- [remove](InMemoryReceiptStore.md#remove)
- [update](InMemoryReceiptStore.md#update)

## Constructors

### constructor

• **new InMemoryReceiptStore**(`logger`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `logger` | [`Logger`](../interfaces/Logger.md) |

#### Defined in

[market/in-memory-receipt-store.ts:21](https://github.com/mango-run/mango-run-core/blob/a90ccad/src/market/in-memory-receipt-store.ts#L21)

## Properties

### byId

• **byId**: `Record`<`string`, `undefined` \| [`Receipt`](../modules.md#receipt)\> = `{}`

#### Defined in

[market/in-memory-receipt-store.ts:13](https://github.com/mango-run/mango-run-core/blob/a90ccad/src/market/in-memory-receipt-store.ts#L13)

___

### byOrderId

• **byOrderId**: `Record`<`string`, `undefined` \| [`Receipt`](../modules.md#receipt)\> = `{}`

#### Defined in

[market/in-memory-receipt-store.ts:15](https://github.com/mango-run/mango-run-core/blob/a90ccad/src/market/in-memory-receipt-store.ts#L15)

___

### byStatus

• **byStatus**: `Record`<[`ReceiptStatus`](../enums/ReceiptStatus.md), [`Receipt`](../modules.md#receipt)[]\>

#### Defined in

[market/in-memory-receipt-store.ts:4](https://github.com/mango-run/mango-run-core/blob/a90ccad/src/market/in-memory-receipt-store.ts#L4)

___

### logger

• **logger**: [`Logger`](../interfaces/Logger.md)

#### Defined in

[market/in-memory-receipt-store.ts:17](https://github.com/mango-run/mango-run-core/blob/a90ccad/src/market/in-memory-receipt-store.ts#L17)

___

### nextId

• `Private` **nextId**: `number` = `0`

#### Defined in

[market/in-memory-receipt-store.ts:19](https://github.com/mango-run/mango-run-core/blob/a90ccad/src/market/in-memory-receipt-store.ts#L19)

## Methods

### add

▸ **add**(`draft`, `id?`): [`Receipt`](../modules.md#receipt)

#### Parameters

| Name | Type |
| :------ | :------ |
| `draft` | `Omit`<[`Receipt`](../modules.md#receipt), ``"id"``\> |
| `id` | `string` |

#### Returns

[`Receipt`](../modules.md#receipt)

#### Implementation of

[ReceiptStore](../interfaces/ReceiptStore.md).[add](../interfaces/ReceiptStore.md#add)

#### Defined in

[market/in-memory-receipt-store.ts:40](https://github.com/mango-run/mango-run-core/blob/a90ccad/src/market/in-memory-receipt-store.ts#L40)

___

### generateId

▸ **generateId**(): `string`

#### Returns

`string`

#### Implementation of

[ReceiptStore](../interfaces/ReceiptStore.md).[generateId](../interfaces/ReceiptStore.md#generateid)

#### Defined in

[market/in-memory-receipt-store.ts:25](https://github.com/mango-run/mango-run-core/blob/a90ccad/src/market/in-memory-receipt-store.ts#L25)

___

### get

▸ **get**(`id`): ``null`` \| [`Receipt`](../modules.md#receipt)

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |

#### Returns

``null`` \| [`Receipt`](../modules.md#receipt)

#### Implementation of

[ReceiptStore](../interfaces/ReceiptStore.md).[get](../interfaces/ReceiptStore.md#get)

#### Defined in

[market/in-memory-receipt-store.ts:29](https://github.com/mango-run/mango-run-core/blob/a90ccad/src/market/in-memory-receipt-store.ts#L29)

▸ **get**(...`status`): [`Receipt`](../modules.md#receipt)[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `...status` | [`ReceiptStatus`](../enums/ReceiptStatus.md)[] |

#### Returns

[`Receipt`](../modules.md#receipt)[]

#### Implementation of

[ReceiptStore](../interfaces/ReceiptStore.md).[get](../interfaces/ReceiptStore.md#get)

#### Defined in

[market/in-memory-receipt-store.ts:30](https://github.com/mango-run/mango-run-core/blob/a90ccad/src/market/in-memory-receipt-store.ts#L30)

___

### getByOrderId

▸ **getByOrderId**(`orderId`): ``null`` \| [`Receipt`](../modules.md#receipt)

#### Parameters

| Name | Type |
| :------ | :------ |
| `orderId` | `string` |

#### Returns

``null`` \| [`Receipt`](../modules.md#receipt)

#### Implementation of

[ReceiptStore](../interfaces/ReceiptStore.md).[getByOrderId](../interfaces/ReceiptStore.md#getbyorderid)

#### Defined in

[market/in-memory-receipt-store.ts:36](https://github.com/mango-run/mango-run-core/blob/a90ccad/src/market/in-memory-receipt-store.ts#L36)

___

### onCanceled

▸ **onCanceled**(`id`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |

#### Returns

`boolean`

#### Implementation of

[ReceiptStore](../interfaces/ReceiptStore.md).[onCanceled](../interfaces/ReceiptStore.md#oncanceled)

#### Defined in

[market/in-memory-receipt-store.ts:73](https://github.com/mango-run/mango-run-core/blob/a90ccad/src/market/in-memory-receipt-store.ts#L73)

___

### onError

▸ **onError**(`id`, `error`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `error` | `any` |

#### Returns

`boolean`

#### Implementation of

[ReceiptStore](../interfaces/ReceiptStore.md).[onError](../interfaces/ReceiptStore.md#onerror)

#### Defined in

[market/in-memory-receipt-store.ts:99](https://github.com/mango-run/mango-run-core/blob/a90ccad/src/market/in-memory-receipt-store.ts#L99)

___

### onFulfilled

▸ **onFulfilled**(`id`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |

#### Returns

`boolean`

#### Implementation of

[ReceiptStore](../interfaces/ReceiptStore.md).[onFulfilled](../interfaces/ReceiptStore.md#onfulfilled)

#### Defined in

[market/in-memory-receipt-store.ts:86](https://github.com/mango-run/mango-run-core/blob/a90ccad/src/market/in-memory-receipt-store.ts#L86)

___

### onPlaced

▸ **onPlaced**(`id`, `orderId`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `orderId` | `string` |

#### Returns

`boolean`

#### Implementation of

[ReceiptStore](../interfaces/ReceiptStore.md).[onPlaced](../interfaces/ReceiptStore.md#onplaced)

#### Defined in

[market/in-memory-receipt-store.ts:60](https://github.com/mango-run/mango-run-core/blob/a90ccad/src/market/in-memory-receipt-store.ts#L60)

___

### remove

▸ **remove**(`id`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |

#### Returns

`boolean`

#### Implementation of

[ReceiptStore](../interfaces/ReceiptStore.md).[remove](../interfaces/ReceiptStore.md#remove)

#### Defined in

[market/in-memory-receipt-store.ts:48](https://github.com/mango-run/mango-run-core/blob/a90ccad/src/market/in-memory-receipt-store.ts#L48)

___

### update

▸ **update**(`draft`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `draft` | [`Receipt`](../modules.md#receipt) |

#### Returns

`boolean`

#### Defined in

[market/in-memory-receipt-store.ts:108](https://github.com/mango-run/mango-run-core/blob/a90ccad/src/market/in-memory-receipt-store.ts#L108)
