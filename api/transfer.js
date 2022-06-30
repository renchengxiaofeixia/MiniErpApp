import request from '@/libs/request.js'

// 添加调拨
function $postTransfer(data) {
	return request.post("transfer", data)
}

// 调拨列表
function $getTransfer(data) {
	return request.get("transfer",data)
}

// 调拨详情
function $getTransferId(id) {
	return request.get("transfer/" + id)
}

// 调拨修改
function $putTransfer(id, data) {
	return request.put("transfer/" + id, data)
}

// 调拨删除
function $delTransfer(id) {
	return request.delete("transfer/" + id)
}

// 调拨物品
function $getTransferGoods(id) {
	return request.get("transfer/prodinfos/" + id)
}

module.exports = {
	$postTransfer,
	$getTransfer,
	$getTransferId,
	$putTransfer,
	$delTransfer,
	$getTransferGoods
}
