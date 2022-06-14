import request from '@/libs/request.js'

// 物品列表
function $getProduct(data) {
	return request.get("prods", data);
}

// 删除物品
function $delProduct(id) {
	return request.delete('prod/' + id);
}

// 添加物品
function $postProduct(data) {
	return request.post('prod', data);
}

// 单个物品
function $getProductId(id) {
	return request.get('prod/' + id);
}

// 修改物品
function $putProduct(id, data) {
	return request.put('prod/' + id, data);
}

// 物品库存​​
function $getGoodsInventorys(id) {
	return request.get('inventorys/' + id);
}

// 物品采购记录
function $getGoodsPurchases(id) {
	return request.get('purchases/' + id);
}

module.exports = {
	$getProduct,
	$delProduct,
	$postProduct,
	$getProductId,
	$putProduct,
	$getGoodsInventorys,
	$getGoodsPurchases
}
