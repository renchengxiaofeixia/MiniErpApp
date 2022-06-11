import request from '@/libs/request.js'

//采购列表
function $getPurchases() {
	return request.get('purchases');
}

//删除采购
function $delPurchases(id) {
	return request.delete('purchase/' + id);
}

//采购详情
function $getPurchasesId(id) {
	return request.get('purchase/' + id);
}

//采购物品
function $getProdinfos(id) {
	return request.get('purchase/prodinfos/' + id);
}

//修改采购
function $putPurchases(id, data) {
	return request.put('purchase/' + id, data);
}

//创建采购
function $postPurchases(data) {
	return request.post('purchase', data);
}

//审核采购
function $auditPurchases(id) {
	return request.put('purchase/audit/' + id);
}

//反审核采购
function $unauditPurchases(id) {
	return request.put('purchase/unaudit/' + id);
}

// 添加付款
function $postPayment(data) {
	return request.post('purchase/pay', data);
}

// 付款列表
function $getPayment(id) {
	return request.get('purchase/pays/' + id);
}

// 付款详情
function $getPaymentId(id) {
	return request.get('purchase/pay/' + id);
}

// 付款修改
function $putPayment(id,data) {
	return request.put('purchase/pay/' + id,data);
}

// 付款删除
function $delPayment(id) {
	return request.delete('purchase/pay/' + id);
}

module.exports = {
	$getPurchases,
	$delPurchases,
	$getPurchasesId,
	$getProdinfos,
	$putPurchases,
	$postPurchases,
	$auditPurchases,
	$unauditPurchases,
	$postPayment,
	$getPayment,
	$getPaymentId,
	$putPayment,
	$delPayment

}
