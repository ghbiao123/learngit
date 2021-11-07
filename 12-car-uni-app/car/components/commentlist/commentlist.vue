<template>
	<view class="container">
		<view class="list" v-for="(item, index) in list" :key="index">
			<view class="name">
				<view>
					{{item.memberName}}
				</view>
				<view class="star">
					<star :num="item.star"></star>
				</view>
			</view>
			<view class="cont">{{item.content}}</view>
			<view class="time">2020年12月10日15:11:05</view>
		</view>
	</view>
</template>

<script>
	import star from "../stars/stars.vue";
	export default {
		components:{
			star
		},
		props:["list"],
		data() {
			return {
				
			};
		}
	}
</script>

<style>
	.list{
		margin: 0 auto;
		width: 670rpx;
		min-height: 100rpx;
		padding: 5rpx 40rpx;
		font-size: 24rpx;
		border-bottom: 2rpx solid #C0C0C0;
	}
	.name{
		display: flex;
		line-height: 40rpx;
		
	}
	.star{
		margin-left: 20rpx;
	}
	.cont,
	.time{
		line-height: 30rpx;
		color: #a9a8ac;
	}
	
		
</style>
