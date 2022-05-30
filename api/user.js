import request from '@/libs/request.js'

// 登入
function $login(data) {
	return request.post("signin", data)
}

// 注册
function $register(data) {
	return request.post("signup", data)
}

module.exports = {
	$login,
	$register
}
