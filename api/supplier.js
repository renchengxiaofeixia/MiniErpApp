import request from '@/libs/request.js'

// 供应商列表
function $getSupplier(data) {
	return request.get("suppliers", data);
}

// 删除供应商
function $delSupplier(id) {
	return request.delete('supplier/' + id);
}

// 供应商详情
function $getSupplierId(id) {
	return request.get('supplier/' + id);
}

// 物品供应商
function $goodsSupplier(id) {
	return request.get('suppliers/' + id);
}

// 新建供应商
function $postSupplier(data) {
	return request.post('supplier', data);
}

// 修改供应商
function $putSupplier(id, data) {
	return request.put('supplier/' + id, data);
}

//  供应商 可供物品
function $getSupplierGoods(id) {
	return request.get('supplier/prodinfos/' + id);
}

//  供应商 采购记录
function $getPurchaseRecord(id) {
	return request.get('supplier/purchases/' + id);
}


module.exports = {
	$getSupplier,
	$delSupplier,
	$getSupplierId,
	$goodsSupplier,
	$postSupplier,
	$putSupplier,
	$getSupplierGoods,
	$getPurchaseRecord
}
