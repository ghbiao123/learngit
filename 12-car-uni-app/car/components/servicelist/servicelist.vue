<template>
	<view class="content">
		<view class="list" v-for="(item, index) in list" :key="index">
			<view class="cont">
				<view class="name">
					{{item.itemName}}
				</view>
				<view class="service">
					{{item.itemInfo}}
				</view>
				<view class="price">
					<view class="online">
						￥{{item.itemPriceOnline}}
					</view>
					<view class="offline">
						￥{{item.itemPriceOffline}}
					</view>
				</view>
			</view>
			<view class="buy">
				购买
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props:["list"],
		data() {
			return {
				
			};
		}
	}
</script>

<style>
	.cont{
		width: 100%;
		margin: 0 auto;
	}
	.list{
		display: flex;
		width: 670rpx;
		padding: 15rpx 40rpx;
		height: 160rpx;
		color: #333333;
		border-bottom: 2rpx solid #CCCCCC;
	}
	.cont{
		width: 650rpx;
	}
	.name{
		font-weight: bold;
		font-size: 34rpx;
		line-height: 1.5;
	}
	.service{
		font-size: 28rpx;
	}
	.price{
		display: flex;
		align-items: baseline;
	}
	.online{
		color: #D9001B;
		font-size: 52rpx;
	}
	.icon{
		font-size: 36rpx;
	}
	.offline{
		margin-left: 20rpx;
		font-size: 36rpx;
		color: #797979;
		text-decoration: line-through;
	}
	.buy{
		width: 100rpx;
		font-size: 36rpx;
		color: #D9001B ;
		text-align: center;
		line-height: 160rpx;
	}
</style>
