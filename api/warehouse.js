import request from '@/libs/request.js'

// 添加仓库
function $postWarehouse(data) {
	return request.post("warehouse",data);
}

//仓库列表
function $getWarehouse() {
	return request.get("warehouses");
}

//仓库详情
function $getWarehouseId(id) {
	return request.get("warehouse/" + id);
}

//仓库修改
function $putWarehouse(id, data) {
	return request.get("warehouse/" + id, data);
}

//仓库删除
function $delWarehouse(id) {
	return request.delete("warehouse/" + id);
}


module.exports = {
	$postWarehouse,
	$getWarehouse,
	$getWarehouseId,
	$putWarehouse,
	$delWarehouse
}
