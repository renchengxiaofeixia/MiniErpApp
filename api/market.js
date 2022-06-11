import request from '@/libs/request.js'

// 添加销售
function $postOrder(data) {
	return request.post("order", data);
}

// 销售列表
function $getOrder() {
	return request.get("orders");
}
// 销售详情
function $getOrderId(id) {
	return request.get("order/" + id);
}
// 销售修改
function $putOrder(id, data) {
	return request.put("order/" + id, data);
}

// 销售删除
function $delOrder(id) {
	return request.delete("order/" + id);
}

// 销售物品
function $getOrderGoods(id) {
	return request.get("order/prodinfos/" + id);
}

// 添加收款  
function $postPay(data) {
	return request.post("order/pay", data);
}

// 收款列表  
function $getPay(id) {
	return request.get("order/pays/" + id);
}

// 收款详情  
function $getPayId(id) {
	return request.get("order/pay/" + id);
}

// 收款修改 
function $putPay(id, data) {
	return request.put("order/pay/" + id, data);
}

// 收款删除
function $delPay(id) {
	return request.delete("order/pay/" + id);
}

module.exports = {
	$postOrder,
	$getOrder,
	$getOrderId,
	$putOrder,
	$delOrder,
	$getOrderGoods,
	$postPay,
	$getPay,
	$getPayId,
	$putPay,
	$delPay

}
