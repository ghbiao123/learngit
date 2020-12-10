<template>
	<view class="container">
		
		<view v-for="(item, index) in shopList" :key="index" :data-idx="index">
			<navigator :url="'/pages/shopinfo/shopinfo?id='+item.id">
				<view class="list">
				<view class="list-image">
					<image class="image" :src="item.thumbnail" mode="aspectFit"></image>
				</view>
				<view class="list-content">
					<view class="title-box">
						<view class="title">
							{{item.shopName}}
						</view>
						<view class="detail">
							详情
						</view>
					</view>
					<view class="star">
						<star :num="item.star"></star>
					</view>
					<view class="address">
					距您{{item.distance}}公里 {{item.address}}
					</view>
				</view>
				</view>
			</navigator>
		</view>
	</view>
</template>

<script>
	import star from "../../components/stars/stars.vue";
	export default {
		components:{
			star
		},
		data() {
			return {
				shopList:[
					{id:1, shopName:"店铺名称", thumbnail:"../../static/images/menu06.png", star: 22, tel:"17855338899", address:"门店地址", isDelete:"", contact:"", longitude:"", latitude:"", distance:"3.3"},
					{id:1, shopName:"店铺名称", thumbnail:"../../static/images/menu06.png", star: 31, tel:"17855338899", address:"门店地址", isDelete:"", contact:"", longitude:"", latitude:"", distance:"3.3"},
					{id:1, shopName:"店铺名称", thumbnail:"../../static/images/menu06.png", star: 20, tel:"17855338899", address:"门店地址", isDelete:"", contact:"", longitude:"", latitude:"", distance:"3.3"},
					{id:1, shopName:"店铺名称", thumbnail:"../../static/images/menu06.png", star: 20, tel:"17855338899", address:"门店地址", isDelete:"", contact:"", longitude:"", latitude:"", distance:"3.3"},
				]
			}
		},
		onLoad(){
			this.initList(this.shopList);
		},
		methods: {
			getDetail(e){
				let idx = e.currentTarget.dataset.idx;
				let shop = this.shopList[idx];
				uni.navigateTo({
					url: `/pages/shopinfo/shopinfo?id=${shop.id}&shopName=${shop.shopName}`,
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			},
			// 将请求的列表数据传入 initList函数
			initList(list){
				this.shopList = list.map(v=>{
					v.star = Number(v.star) ? v.star/10 : 0;
					return v;
				});
			}
		}
	}
</script>

<style>
	.container{
		padding-bottom: 20rpx;
	}
	.list{
		display: flex;
		padding: 30rpx 40rpx;
		width: 670rpx;
		height: 120rpx;
		background-color: #fff;
		border-bottom: 2rpx solid #f6f5f5;
	}
	.list-image{
		border-radius: 6rpx;
		background-color: #F6F5F5;
		overflow: hidden;
	}
	.list-image,
	.image{
		width: 120rpx;
		height: 120rpx;
	}
	.list-content{
		width: 550rpx;
		height: 120rpx;
		text-indent: 20rpx;
	}
	.title-box{
		display: flex;
		justify-content: space-between;
		width: 100%;
		height: 50rpx;
		line-height: 50rpx;
	}
	.title{
		font-size: 36rpx;
		font-weight: bold;
		color: #333333;
	}
	.detail{
		height: 30rpx;
		line-height: 30rpx;
		padding: 7rpx 10rpx;
		text-indent: 0;
		text-align: center;
		color: #fff;
		font-size: 24rpx;
		background-color: #D9001B;
		border-radius: 10rpx;
	}
	.star{
		padding: 0 5rpx 5rpx;
		height: 30rpx;
	}
	.address{
		width: 550rpx;
		line-height: 30rpx;
		font-size: 28rpx;
		/* font-family: "华文中宋"; */
		color: #797979;
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
	}
	

</style>
