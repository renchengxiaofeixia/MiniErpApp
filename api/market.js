import request from '@/libs/request.js'

// 添加销售
function $postOrder(data) {
	return request.post("order", data);
}

// 销售列表
function $getOrder() {
	return request.get("order");
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

module.exports = {
	$postOrder,
	$getOrder,
	$getOrderId,
	$putOrder,
	$delOrder

}
