# Interface: ReceiptStore

## Implemented by

- [`InMemoryReceiptStore`](../wiki/InMemoryReceiptStore)

## Table of contents

### Methods

- [add](../wiki/ReceiptStore#add)
- [generateId](../wiki/ReceiptStore#generateid)
- [get](../wiki/ReceiptStore#get)
- [getByOrderId](../wiki/ReceiptStore#getbyorderid)
- [onCanceled](../wiki/ReceiptStore#oncanceled)
- [onError](../wiki/ReceiptStore#onerror)
- [onFulfilled](../wiki/ReceiptStore#onfulfilled)
- [onPlaced](../wiki/ReceiptStore#onplaced)
- [remove](../wiki/ReceiptStore#remove)

## Methods

### add

▸ **add**(`receipt`, `id?`): [`Receipt`](../wiki/Exports#receipt)

#### Parameters

| Name | Type |
| :------ | :------ |
| `receipt` | `Omit`<[`Receipt`](../wiki/Exports#receipt), ``"id"``\> |
| `id?` | `string` |

#### Returns

[`Receipt`](../wiki/Exports#receipt)

#### Defined in

[types.ts:141](https://github.com/mango-run/mango-run-core/blob/a90ccad/src/types.ts#L141)

___

### generateId

▸ **generateId**(): `string`

#### Returns

`string`

#### Defined in

[types.ts:137](https://github.com/mango-run/mango-run-core/blob/a90ccad/src/types.ts#L137)

___

### get

▸ **get**(`id`): ``null`` \| [`Receipt`](../wiki/Exports#receipt)

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |

#### Returns

``null`` \| [`Receipt`](../wiki/Exports#receipt)

#### Defined in

[types.ts:138](https://github.com/mango-run/mango-run-core/blob/a90ccad/src/types.ts#L138)

▸ **get**(...`status`): [`Receipt`](../wiki/Exports#receipt)[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `...status` | [`ReceiptStatus`](../wiki/ReceiptStatus)[] |

#### Returns

[`Receipt`](../wiki/Exports#receipt)[]

#### Defined in

[types.ts:139](https://github.com/mango-run/mango-run-core/blob/a90ccad/src/types.ts#L139)

___

### getByOrderId

▸ **getByOrderId**(`orderId`): ``null`` \| [`Receipt`](../wiki/Exports#receipt)

#### Parameters

| Name | Type |
| :------ | :------ |
| `orderId` | `string` |

#### Returns

``null`` \| [`Receipt`](../wiki/Exports#receipt)

#### Defined in

[types.ts:140](https://github.com/mango-run/mango-run-core/blob/a90ccad/src/types.ts#L140)

___

### onCanceled

▸ **onCanceled**(`id`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |

#### Returns

`boolean`

#### Defined in

[types.ts:144](https://github.com/mango-run/mango-run-core/blob/a90ccad/src/types.ts#L144)

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

#### Defined in

[types.ts:146](https://github.com/mango-run/mango-run-core/blob/a90ccad/src/types.ts#L146)

___

### onFulfilled

▸ **onFulfilled**(`id`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |

#### Returns

`boolean`

#### Defined in

[types.ts:145](https://github.com/mango-run/mango-run-core/blob/a90ccad/src/types.ts#L145)

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

#### Defined in

[types.ts:143](https://github.com/mango-run/mango-run-core/blob/a90ccad/src/types.ts#L143)

___

### remove

▸ **remove**(`id`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |

#### Returns

`boolean`

#### Defined in

[types.ts:142](https://github.com/mango-run/mango-run-core/blob/a90ccad/src/types.ts#L142)
