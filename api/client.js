import request from '@/libs/request.js'

// 客户列表
function $getClient(data) {
	return request.get("customers", data);
}

// 删除客户
function $delClient(id) {
	return request.delete('customer/' + id);
}

// 客户详情
function $getClientId(id) {
	return request.get('customer/' + id);
}

// 新建客户
function $postClient(data) {
	return request.post('customer', data);
}

// 修改客户
function $putClient(id, data) {
	return request.put('customer/' + id, data);
}



module.exports = {
	$getClient,
	$delClient,
	$getClientId,
	$postClient,
	$putClient
}
