import request from '@/libs/request.js'

// 登入
function $login(data) {
	return request.post("signin", data)
}

// 注册
function $register(data) {
	return request.post("signup", data)
}

// 获取销售员
function $getUsers() {
	return request.get("users")
}

// 添加销售员
function $postUsers(data) {
	return request.post("user", data)
}

// 地址​
function $getAddress(id) {
	return request.get("area/" + id)
}

// 添加角色
function $postRole(data) {
	return request.post("role/", data)
}

// 角色列表
function $getRole() {
	return request.get("roles")
}

// 角色详情
function $getRoleId(id) {
	return request.get("role/" + id)
}

// 角色修改
function $putRole(id, data) {
	return request.put("role/" + id, data)
}

// 角色删除
function $delRole(id) {
	return request.delete("role/" + id)
}

module.exports = {
	$login,
	$register,
	$getUsers,
	$postUsers,
	$getAddress,
	$postRole,
	$getRole,
	$getRoleId,
	$putRole,
	$delRole
}
