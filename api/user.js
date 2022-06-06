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

module.exports = {
	$login,
	$register,
	$getUsers,
	$postUsers,
	$getAddress
}
