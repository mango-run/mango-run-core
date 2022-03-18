# Class: InMemoryReceiptStore

## Implements

- [`ReceiptStore`](../wiki/ReceiptStore)

## Table of contents

### Constructors

- [constructor](../wiki/InMemoryReceiptStore#constructor)

### Properties

- [byId](../wiki/InMemoryReceiptStore#byid)
- [byOrderId](../wiki/InMemoryReceiptStore#byorderid)
- [byStatus](../wiki/InMemoryReceiptStore#bystatus)
- [logger](../wiki/InMemoryReceiptStore#logger)
- [nextId](../wiki/InMemoryReceiptStore#nextid)

### Methods

- [add](../wiki/InMemoryReceiptStore#add)
- [generateId](../wiki/InMemoryReceiptStore#generateid)
- [get](../wiki/InMemoryReceiptStore#get)
- [getByOrderId](../wiki/InMemoryReceiptStore#getbyorderid)
- [onCanceled](../wiki/InMemoryReceiptStore#oncanceled)
- [onError](../wiki/InMemoryReceiptStore#onerror)
- [onFulfilled](../wiki/InMemoryReceiptStore#onfulfilled)
- [onPlaced](../wiki/InMemoryReceiptStore#onplaced)
- [remove](../wiki/InMemoryReceiptStore#remove)
- [update](../wiki/InMemoryReceiptStore#update)

## Constructors

### constructor

• **new InMemoryReceiptStore**(`logger`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `logger` | [`Logger`](../wiki/Logger) |

#### Defined in

[market/in-memory-receipt-store.ts:21](https://github.com/mango-run/mango-run-core/blob/a90ccad/src/market/in-memory-receipt-store.ts#L21)

## Properties

### byId

• **byId**: `Record`<`string`, `undefined` \| [`Receipt`](../wiki/Exports#receipt)\> = `{}`

#### Defined in

[market/in-memory-receipt-store.ts:13](https://github.com/mango-run/mango-run-core/blob/a90ccad/src/market/in-memory-receipt-store.ts#L13)

___

### byOrderId

• **byOrderId**: `Record`<`string`, `undefined` \| [`Receipt`](../wiki/Exports#receipt)\> = `{}`

#### Defined in

[market/in-memory-receipt-store.ts:15](https://github.com/mango-run/mango-run-core/blob/a90ccad/src/market/in-memory-receipt-store.ts#L15)

___

### byStatus

• **byStatus**: `Record`<[`ReceiptStatus`](../wiki/ReceiptStatus), [`Receipt`](../wiki/Exports#receipt)[]\>

#### Defined in

[market/in-memory-receipt-store.ts:4](https://github.com/mango-run/mango-run-core/blob/a90ccad/src/market/in-memory-receipt-store.ts#L4)

___

### logger

• **logger**: [`Logger`](../wiki/Logger)

#### Defined in

[market/in-memory-receipt-store.ts:17](https://github.com/mango-run/mango-run-core/blob/a90ccad/src/market/in-memory-receipt-store.ts#L17)

___

### nextId

• `Private` **nextId**: `number` = `0`

#### Defined in

[market/in-memory-receipt-store.ts:19](https://github.com/mango-run/mango-run-core/blob/a90ccad/src/market/in-memory-receipt-store.ts#L19)

## Methods

### add

▸ **add**(`draft`, `id?`): [`Receipt`](../wiki/Exports#receipt)

#### Parameters

| Name | Type |
| :------ | :------ |
| `draft` | `Omit`<[`Receipt`](../wiki/Exports#receipt), ``"id"``\> |
| `id` | `string` |

#### Returns

[`Receipt`](../wiki/Exports#receipt)

#### Implementation of

[ReceiptStore](../wiki/ReceiptStore).[add](../wiki/ReceiptStore#add)

#### Defined in

[market/in-memory-receipt-store.ts:40](https://github.com/mango-run/mango-run-core/blob/a90ccad/src/market/in-memory-receipt-store.ts#L40)

___

### generateId

▸ **generateId**(): `string`

#### Returns

`string`

#### Implementation of

[ReceiptStore](../wiki/ReceiptStore).[generateId](../wiki/ReceiptStore#generateid)

#### Defined in

[market/in-memory-receipt-store.ts:25](https://github.com/mango-run/mango-run-core/blob/a90ccad/src/market/in-memory-receipt-store.ts#L25)

___

### get

▸ **get**(`id`): ``null`` \| [`Receipt`](../wiki/Exports#receipt)

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |

#### Returns

``null`` \| [`Receipt`](../wiki/Exports#receipt)

#### Implementation of

[ReceiptStore](../wiki/ReceiptStore).[get](../wiki/ReceiptStore#get)

#### Defined in

[market/in-memory-receipt-store.ts:29](https://github.com/mango-run/mango-run-core/blob/a90ccad/src/market/in-memory-receipt-store.ts#L29)

▸ **get**(...`status`): [`Receipt`](../wiki/Exports#receipt)[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `...status` | [`ReceiptStatus`](../wiki/ReceiptStatus)[] |

#### Returns

[`Receipt`](../wiki/Exports#receipt)[]

#### Implementation of

[ReceiptStore](../wiki/ReceiptStore).[get](../wiki/ReceiptStore#get)

#### Defined in

[market/in-memory-receipt-store.ts:30](https://github.com/mango-run/mango-run-core/blob/a90ccad/src/market/in-memory-receipt-store.ts#L30)

___

### getByOrderId

▸ **getByOrderId**(`orderId`): ``null`` \| [`Receipt`](../wiki/Exports#receipt)

#### Parameters

| Name | Type |
| :------ | :------ |
| `orderId` | `string` |

#### Returns

``null`` \| [`Receipt`](../wiki/Exports#receipt)

#### Implementation of

[ReceiptStore](../wiki/ReceiptStore).[getByOrderId](../wiki/ReceiptStore#getbyorderid)

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

[ReceiptStore](../wiki/ReceiptStore).[onCanceled](../wiki/ReceiptStore#oncanceled)

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

[ReceiptStore](../wiki/ReceiptStore).[onError](../wiki/ReceiptStore#onerror)

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

[ReceiptStore](../wiki/ReceiptStore).[onFulfilled](../wiki/ReceiptStore#onfulfilled)

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

[ReceiptStore](../wiki/ReceiptStore).[onPlaced](../wiki/ReceiptStore#onplaced)

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

[ReceiptStore](../wiki/ReceiptStore).[remove](../wiki/ReceiptStore#remove)

#### Defined in

[market/in-memory-receipt-store.ts:48](https://github.com/mango-run/mango-run-core/blob/a90ccad/src/market/in-memory-receipt-store.ts#L48)

___

### update

▸ **update**(`draft`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `draft` | [`Receipt`](../wiki/Exports#receipt) |

#### Returns

`boolean`

#### Defined in

[market/in-memory-receipt-store.ts:108](https://github.com/mango-run/mango-run-core/blob/a90ccad/src/market/in-memory-receipt-store.ts#L108)
