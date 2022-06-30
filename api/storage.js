import request from '@/libs/request.js'

// 入库列表
function $getStorage(data) {
	return request.get("enterwarehouses",data);
}
// 入库物品
function $goodsStorage(id) {
	return request.get('enterwarehouse/prodinfos/' + id);
}
// 入库详情
function $getStorageId(id) {
	return request.get('enterwarehouse/' + id);
}

// 入库修改
function $putStorage(id, data) {
	return request.put('enterwarehouse/' + id, data);
}

// 入库创建
function $postStorage(data) {
	return request.post('enterwarehouse', data);
}

// 入库删除
function $delStorage(id) {
	return request.delete('enterwarehouse/' + id);
}

// 入库审核
function $auditStorage(id) {
	return request.put('enterwarehouse/audit/' + id);
}


module.exports = {
	$getStorage,
	$goodsStorage,
	$getStorageId,
	$putStorage,
	$postStorage,
	$delStorage,
	$auditStorage
}
