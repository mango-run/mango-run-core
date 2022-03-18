[@mango-run/core](../README.md) / [Exports](../modules.md) / ReceiptStore

# Interface: ReceiptStore

## Implemented by

- [`InMemoryReceiptStore`](../classes/InMemoryReceiptStore.md)

## Table of contents

### Methods

- [add](ReceiptStore.md#add)
- [generateId](ReceiptStore.md#generateid)
- [get](ReceiptStore.md#get)
- [getByOrderId](ReceiptStore.md#getbyorderid)
- [onCanceled](ReceiptStore.md#oncanceled)
- [onError](ReceiptStore.md#onerror)
- [onFulfilled](ReceiptStore.md#onfulfilled)
- [onPlaced](ReceiptStore.md#onplaced)
- [remove](ReceiptStore.md#remove)

## Methods

### add

▸ **add**(`receipt`, `id?`): [`Receipt`](../modules.md#receipt)

#### Parameters

| Name | Type |
| :------ | :------ |
| `receipt` | `Omit`<[`Receipt`](../modules.md#receipt), ``"id"``\> |
| `id?` | `string` |

#### Returns

[`Receipt`](../modules.md#receipt)

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

▸ **get**(`id`): ``null`` \| [`Receipt`](../modules.md#receipt)

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |

#### Returns

``null`` \| [`Receipt`](../modules.md#receipt)

#### Defined in

[types.ts:138](https://github.com/mango-run/mango-run-core/blob/a90ccad/src/types.ts#L138)

▸ **get**(...`status`): [`Receipt`](../modules.md#receipt)[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `...status` | [`ReceiptStatus`](../enums/ReceiptStatus.md)[] |

#### Returns

[`Receipt`](../modules.md#receipt)[]

#### Defined in

[types.ts:139](https://github.com/mango-run/mango-run-core/blob/a90ccad/src/types.ts#L139)

___

### getByOrderId

▸ **getByOrderId**(`orderId`): ``null`` \| [`Receipt`](../modules.md#receipt)

#### Parameters

| Name | Type |
| :------ | :------ |
| `orderId` | `string` |

#### Returns

``null`` \| [`Receipt`](../modules.md#receipt)

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
