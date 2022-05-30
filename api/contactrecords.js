import request from '@/libs/request.js'

//联系记录
function $getContactrecords(id) {
	return request.get('contactrecords/' + id);
}

//添加联系
function $postContactrecords(data) {
	return request.post('contactrecords/',data);
}


//联系详情
function $getCustomercontact(id) {
	return request.post('customercontact/'+id);
}

module.exports = {
	$getContactrecords,
	$postContactrecords,
	$getCustomercontact
}
