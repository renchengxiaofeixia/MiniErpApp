import request from '@/libs/request.js'

// 单位列表
function $getUnit() {
	return request.get("customprop/ProdInfo/Unit");
}

// 跟进状态
function $getFollowStatus() {
	return request.get("customprop/Customer/FollowStatus");
}
// 添加
function $postCustomprop(data) {
	return request.post("customprop", data);
}
// 修改
function $putCustomprop(id, data) {
	return request.put()('customprop/' + id, data);
}
//删除
function $delCustomprop(id) {
	return request.del('customprop/' + id);
}
module.exports = {
	$getUnit,
	$getFollowStatus,
	$postCustomprop,
	$putCustomprop,
	$delCustomprop
}
