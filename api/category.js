import request from '@/libs/request.js'

// 类目列表
function $getCategory() {
	return request.get("prodcats");
}

// 类目添加
function $postCategory(data) {
	return request.post("prodcat", data);
}

// 类目修改
function $putCategory(id,data) {
	return request.put("prodcat/" + id, data);
}

// 类目删除
function $delCategory(id) {
	return request.del("prodvat/" + id);
}



module.exports = {
	$getCategory,
	$postCategory,
	$putCategory,
	$delCategory
}
