<template>
	<view class="container">
		<!-- banner -->
		<view class="head">			
			<swiper class="swiper" :indicator-dots="true" :autoplay="true" circular indicator-active-color="#fff" :interval="3000" :duration="500">
				<swiper-item class="swiper-item" :data-idx="index" @click="bannerClick" v-for="(item, index) in bannerList" :key="index" v-show="item.isShow">
					<view class="banner-bg"  :style="{backgroundColor: item.backgroundColor}">
						<view class="banner">
							<image class="banner-image" :src="item.imageUrl"></image>
						</view>
					</view>
				</swiper-item>
			</swiper>
			
			<view class="search">
				<input class="search-input" type="text" focus @blur="showCover = true" :value="searchValue" v-show="!showCover"/>
				<view class="search-cover" v-show="showCover" @click="showCover=false">
					<image class="cover-icon"  src="../../static/images/search.png" mode="aspectFit"></image>
					<view class="cover-text">
						搜索
					</view>
				</view>
			</view>
			
		</view>
		
		<!-- menu -->
		<view class="menu-box">
			<view class="menu-item" v-for="(item, index) in mallMentList" :key="index">
				<navigator :url="item.linkValue">					
					<image class="menu-icon" :src="item.imageUrl" mode="aspectFit"></image>
					<view class="menu-title">{{item.title}}</view>
				</navigator>
			</view>
		</view>
		
		<!-- notice -->
		<view class="notice-box">
			<view class="notice-item">
				<navigator>
					<image class="notice-image" src="../../static/images/notice01.png" mode="aspectFit"></image>
				</navigator>
			</view>
			<view class="notice-item">
				<navigator>
					<image class="notice-image" src="../../static/images/notice02.png" mode="aspectFit"></image>
				</navigator>
			</view>
		</view>
		
		<!-- 试运营 -->
		<view class="sys-online" @click="getNewSystem">
			<view class="sys-online-title">
				系统上线试运营
			</view>
			<view class="sys-online-more">
				查看更多>
			</view>
		</view>
		
		<!-- 洗车付费模块 -->
		<view class="paytowash">
			<navigator>
				<image class="paytowash-image" src="" mode="aspectFit"></image>
			</navigator>
		</view>
		
	</view>
</template>

<script>
	export default {
		components:{
			
		},
		data() {
			return {
				// 搜索框上方遮罩是否显示
				showCover:true,
				// 搜索框输入内容
				searchValue:"",
				// bannerlist
				bannerList: [
					{id: 1, shopId: 1,imageUrl:"../../static/images/banner01.png", backgroundColor:"#F26224", title:"", isShow:1, position:1, showIndex:1, linkType:1, linkValue:""},
					{id: 1, shopId: 1,imageUrl:"../../static/images/banner02.jpg", backgroundColor:"rgba(153, 233, 209, 0.8)", title:"", isShow:1, position:1, showIndex:1, linkType:1, linkValue:""},
					{id: 1, shopId: 1,imageUrl:"../../static/images/banner03.jpg", backgroundColor:"rgba(152, 157, 228, 0.9)", title:"", isShow:1, position:1, showIndex:1, linkType:1, linkValue:""},
					{id: 1, shopId: 1,imageUrl:"../../static/images/banner04.png", backgroundColor:"rgba(147, 224, 254, 0.98)", title:"", isShow:1, position:1, showIndex:1, linkType:1, linkValue:""},
				],
				// 通知列表
				noticeList:[
					{noticeId:1, noticeType:"", noticeContent:"", status: "0"}
				],
				// 菜单列表
				mallMentList:[
					{id: 1, shopId: 1,imageUrl:"../../static/images/menu01.png", title:"代驾服务", isShow:1, showIndex:1, linkType:1, linkValue:"", isDelete:""},
					{id: 1, shopId: 1,imageUrl:"../../static/images/menu02.png", title:"应急救援", isShow:1, showIndex:1, linkType:1, linkValue:"", isDelete:""},
					{id: 1, shopId: 1,imageUrl:"../../static/images/menu03.png", title:"安全监测", isShow:1, showIndex:1, linkType:1, linkValue:"", isDelete:""},
					{id: 1, shopId: 1,imageUrl:"../../static/images/menu04.png", title:"检车服务", isShow:1, showIndex:1, linkType:1, linkValue:"", isDelete:""},
					{id: 1, shopId: 1,imageUrl:"../../static/images/menu05.png", title:"洗车服务", isShow:1, showIndex:1, linkType:1, linkValue:"/pages/shoplist/shoplist", isDelete:""},
					{id: 1, shopId: 1,imageUrl:"../../static/images/menu06.png", title:"保养维修", isShow:1, showIndex:1, linkType:1, linkValue:"", isDelete:""},
					{id: 1, shopId: 1,imageUrl:"../../static/images/menu07.png", title:"办公用品", isShow:1, showIndex:1, linkType:1, linkValue:"", isDelete:""},
					{id: 1, shopId: 1,imageUrl:"../../static/images/menu08.png", title:"活动策划", isShow:1, showIndex:1, linkType:1, linkValue:"", isDelete:""},
				]
			}
		},
		onLoad() {

		},
		methods: {
			// 预留 banner 点击事件
			bannerClick(e){
				let idx = e.currentTarget.dataset.idx;
				// currentBanner 当前点击banner的信息
				let currentBanner = this.bannerList[idx];
				
				switch(currentBanner.linkType){
					case 4:{
						uni.navigateToMiniProgram({
							appId: currentBanner.linkValue
						});
					}
				}
				
				
				
			},
			//  系统上线试运营点击事件
			getNewSystem(){
			}
		}
	}
</script>

<style>
	page{
		background-color: #F6F5F5;
	}
	.container{
		padding-bottom: 20rpx;
	}
	.head{
		position: relative;
	}
	.search{
		position: absolute;
		top: 40rpx;
		left: 45rpx;
		width: 660rpx;
		height: 80rpx;
		border-radius: 40rpx;
		background-color: rgba(255,255,255,0.61);
	}
	.search-input{
		margin: 0 auto;
		display: block;
		width: 620rpx;
		height: 80rpx;
	}
	.search-cover{
		width: 660rpx;
		height: 80rpx;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.cover-icon{
		width: 60rpx;
		height: 60rpx;
	}
	.cover-text{
		margin-left: 20rpx;
		font-size: 45rpx;
		color: #797979;
	}
	.swiper,
	.swiper-item{
		height: 476rpx;
		width: 100%;
	}
	.banner-bg{
		padding-top: 1rpx;
		width: 100%;
		height: 422rpx;
	}
	.swiper-item .banner{
		margin: 140rpx auto 0;
		width: 684rpx;
		height: 334rpx;
		border-radius: 40rpx;
		overflow: hidden;
	}
	.banner .banner-image{
		width: 684rpx;
		height: 334rpx;
	}
	
	
	.menu-box{
		display: flex;
		flex-wrap: wrap;
		margin: 20rpx auto;
		padding: 10rpx 20rpx;
		width: 644rpx;
		height: 282rpx;
		border-radius: 24rpx;
		background-color: #fff;
	}
	.menu-box .menu-item{
		margin: 0 10rpx;
		padding: 10rpx;
		width: 120rpx;
		height: auto;
	}
	.menu-item .menu-icon{
		display: block;
		margin: 0 auto;
		width: 72rpx;
		height: 72rpx;
	}
	.menu-item .menu-title{
		text-align: center;
		font-family: "宋体";
		line-height: 38rpx;
		font-size: 24rpx;
		color: #333333;
	}
	
	
	.notice-box{
		display: flex;
		justify-content: space-between;
		margin: 20rpx auto 0;
		width: 684rpx;
		height: 100rpx;
	}
	.notice-box .notice-item{
		border-radius: 10rpx;
		overflow: hidden;
	}
	.notice-box .notice-item,
	.notice-box .notice-image{
		width: 330rpx;
		height: 100rpx;
	}
	
	.sys-online{
		display: flex;
		justify-content: space-between;
		margin: 20rpx auto 0;
		padding: 0 20rpx;
		width: 644rpx;
		height: 54rpx;
		line-height: 54rpx;
		font-size: 24rpx;
		color: #333333;
		background-color: rgba(153, 233, 209, 0.6);
	}
	
	.paytowash{
		margin: 20rpx auto;
		width: 684rpx;
		height: 300rpx;
		background-color: #007AFF;
	}
	.paytowash-image{
		width: 684rpx;
		height: 300rpx;
	}
</style>
