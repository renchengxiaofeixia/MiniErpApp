import request from '@/libs/request.js'

// 单位列表
function $getUnit() {
	return request.get("customprop/ProdInfo/Unit");
}

// 跟进状态
function $getFollowStatus() {
	return request.get("customprop/Customer/FollowStatus");
}

// 支出类型
function $getPayType() {
	return request.get("customprop/Purchase/PayType");
}

// 资金账户
function $getFinanceAccount() {
	return request.get("customprop/Purchase/FinanceAccount");
}
// 结算方式
function $getSettlementType() {
	return request.get("customprop/Purchase/SettlementType");
}

// 添加
function $postCustomprop(data) {
	return request.post("customprop", data);
}
// 修改
function $putCustomprop(id, data) {
	return request.put('customprop/' + id, data);
}
//删除
function $delCustomprop(id) {
	return request.delete('customprop/' + id);
}

// //删除
// function $c() {
// 	return request.get('customprops');
// }
module.exports = {
	$getUnit,
	$getFollowStatus,
	$postCustomprop,
	$putCustomprop,
	$delCustomprop,
	$getPayType,
	$getFinanceAccount,
	$getSettlementType

}
