import request from '@/libs/request.js'

// 新建盘点
function $postCheck(data) {
	return request.post("check", data)
}

// 盘点列表
function $getCheck(data) {
	return request.get("check",data)
}

// 盘点详情
function $getCheckId(id) {
	return request.get("check/" + id)
}

// 盘点修改
function $putCheck(id, data) {
	return request.put("check/" + id, data)
}

// 盘点删除
function $delCheck(id) {
	return request.delete("check/" + id)
}

// 盘点物品
function $getCheckGoods(id) {
	return request.get("check/prodinfos/" + id)
}

// 库存商品列表
function $getWarehouseList(id) {
	let ids = id || "";
	return request.get("warehouse/prodinfos/" + ids)
}

module.exports = {
	$postCheck,
	$getCheck,
	$getCheckId,
	$putCheck,
	$delCheck,
	$getCheckGoods,
	$getWarehouseList
}
