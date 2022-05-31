<template>
	<view class="storage">
		<headerTab title="选择地址"></headerTab>
	</view>
</template>

<script>
	let {
		$postWarehouse,
		$getWarehouse,
		$putWarehouse,
		$delWarehouse
	} = require('@/api/warehouse.js');

	import headerTab from '@/components/headerTab/index.vue';

	export default {
		components: {
			headerTab,

		},
		data() {
			return {
	
			};
		},
		onLoad(e) {
	
		},
		methods: {

		}
	}
</script>

<style lang="scss">

</style>
