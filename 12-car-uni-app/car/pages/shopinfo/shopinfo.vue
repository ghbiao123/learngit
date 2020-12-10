<template>
	<view class="container">
		<swiper class="swiper" :indicator-dots="true" :autoplay="true" circular indicator-active-color="#fff" :interval="3000" :duration="500">
			<swiper-item class="swiper-item" v-for="(item, index) in bannerList" :key="index">
				<image class="banner-image" :src="item" mode="aspectFit" ></image>
			</swiper-item>
		</swiper>
		
		<!-- shop info -->
		<view class="info-title">
			<view class="shop-name">
				{{shopInfo.shopName}}
			</view>
			<view class="info-tit-btn location" @click="openLocation">
				到这去
			</view>
		</view>
		
		<!-- address -->
		<view class="info-subtitle">
			<view>
			{{shopInfo.address}}
			</view>
			
		</view>
		
		<!-- score -->
		<view class="info-subtitle">
			<view class="">
				评分：{{shopInfo.star/10}}
			</view>
			<view class="info-tit-btn call" @click="makePhoneCall">
				联系电话
			</view>
		</view>
		
		<navigator>
			<view class="info-subtitle verify">
				<view>
					认证保险用户可先到店洗车后核销
				</view>
				<view>
					点击认证 >
				</view>
			</view>
		</navigator>
		<!-- 服务 tab -->
		<view class="tab">
			<view class="tab-item">
				<view class="tab-name" :class="[tabId == index? 'tab-item-selected':'']" v-for="(item, index) in servesList" :key="index" :data-idx="index" @click="tabId = index">
					{{item.serveName}}
				</view>
			</view>
			
			<view class="tab-content" v-for="(item, index) in servesList" :key="index" v-show="tabId == index ? true : false">
				
				<servicelist :list="item.list"></servicelist>
				
			</view>
			
		
			
		</view>
		
		<!-- 评价 - 简介 -->
		<view class="comment-box">
			<view class="comment-item">
				<view class="comment-name" :class="[commentId==1?'comment-name-selected':'']" @click="commentId = 1">
					评价
				</view>
				<view class="comment-name" :class="[commentId==2?'comment-name-selected':'']" @click="commentId = 2">
					简介
				</view>
			</view>
				
			<view class="comment-cont">
				<view class="comment-list" v-show="commentId == 1">
					<view class="info-subtitle comment-notes">
						<view class="">
							大家都这么说
						</view>
						<view class="color-orange">
							我来评价
						</view>
					</view>
					
					<commentlist :list="commentList"></commentlist>
					
				</view>
				<view class="introduce" v-show="commentId == 2">
					简介
				</view>
			</view>
			
		</view>
		
		
		
	</view>
</template>

<script>
	import servicelist from "../../components/servicelist/servicelist.vue";
	import commentlist from "../../components/commentlist/commentlist.vue";
	export default {
		components:{
			servicelist,
			commentlist
		},
		data() {
			return {
				// 所选服务tab id
				tabId: 0,
				commentId:1,
				bannerList:["../../static/images/1.jpeg", "../../static/images/1.jpeg", "../../static/images/1.jpeg"],
				shopInfo: {
					id: 1,
					shopName: "XX洗车行",
					thumbnail: "",
					star: 35,
					tel: "12378761",
					address: "石家庄市裕华区和平大街路北",
					isDelete: "",
					contact: "联系人",
					longitude: "",
					latitude: "",
					distance: "20",

				},
				servesList: [
					{
						serveId: 1,
						serveName: "tabName1",
						struts: "",
						list: [
								{ItemId:1, itemName:"title", itemInfo:"滤芯+机油更换+空调检测", itemPriceOnline:123, itemPriceOffline: 123, },
								{ItemId:1, itemName:"title", itemInfo:"滤芯+机油更换+空调检测", itemPriceOnline:123, itemPriceOffline: 123, },
								{ItemId:1, itemName:"title", itemInfo:"滤芯+机油更换+空调检测", itemPriceOnline:123, itemPriceOffline: 123, },
							],
					},
					{
						serveId: 1,
						serveName: "tabName12",
						struts: "",
						list: [
								{ItemId:12, itemName:"title2", itemInfo:"滤芯+机油更换+空调检测", itemPriceOnline:123, itemPriceOffline: 123, },
								{ItemId:12, itemName:"title2", itemInfo:"滤芯+机油更换+空调检测", itemPriceOnline:123, itemPriceOffline: 123, },
								{ItemId:12, itemName:"title2", itemInfo:"滤芯+机油更换+空调检测", itemPriceOnline:123, itemPriceOffline: 123, },
							],
					},
					{
						serveId: 1,
						serveName: "tabName123",
						struts: "",
						list: [
								{ItemId:13, itemName:"title3", itemInfo:"滤芯+机油更换+空调检测", itemPriceOnline:123, itemPriceOffline: 123, },
								{ItemId:13, itemName:"title3", itemInfo:"滤芯+机油更换+空调检测", itemPriceOnline:123, itemPriceOffline: 123, },
								{ItemId:13, itemName:"title3", itemInfo:"滤芯+机油更换+空调检测", itemPriceOnline:123, itemPriceOffline: 123, },
							],
					},
				],
				commentList:[
					{id:1, shopId: 123, memberId:123, memberName:"xingming1", star:10, content:"评论内容1", shopName:"商户名称", }, // star ,显示时除以十
					{id:1, shopId: 123, memberId:123, memberName:"xingming2", star:20, content:"评论内容2", shopName:"商户名称", }, // star ,显示时除以十
					{id:1, shopId: 123, memberId:123, memberName:"xingming3", star:30, content:"评论内容3", shopName:"商户名称", }, // star ,显示时除以十
				]
			}
		},
		onLoad(options) {
			console.log(options);
			
			this.initCommitList(this.commentList);
		},
		
		methods: {
			// 拨打电话
			makePhoneCall(){
				uni.makePhoneCall({
					phoneNumber: this.shopInfo.tel
				});
			},
			// 查看位置
			openLocation(){
				uni.openLocation({
					latitude: this.shopInfo.latitude,
					longitude: this.shopInfo.longitude
				});
			},
			// 获取评论列表后调用此函数
			initCommitList(list){
				this.commentList = list.map(v=>{
					v.star = Number(v.star) ? v.star/10 : 0;
					return v;
				});
			}
		}
	}
</script>

<style>
	page{
		background-color: #fff;
	}
	.container{
		/* font-family: "华文中宋" !important; */
		padding-bottom: 20rpx;
	}
	.swiper,
	.swiper .swiper-item,
	.swiper .banner-image{
		width: 100%;
		height: 320rpx;
	}
	
	.info-title,
	.info-subtitle{
		display: flex;
		justify-content: space-between;
		margin: 10rpx auto 0;
		width: 670rpx;
		color: #333333;
		font-weight: bold;
	}
	
	.info-title{
		font-size: 32rpx;
		
	}
	.info-subtitle{
		font-size: 24rpx;
		line-height: 42rpx;
	}
	.info-tit-btn{
		width: 160rpx;
		height: 42rpx;
		text-align: center;
		line-height: 42rpx;
		border-radius: 24rpx;
		font-size: 24rpx;
		color: #fff;
		font-weight: 500;
	}
	.location{
		background-color: #F37B1D;
	}
	.call{
		margin-top: -20rpx;
		background-color: #169BD5;
	}
	.verify{
		font-size: 26rpx;
		padding: 0 40rpx;
		height: 54rpx;
		line-height: 54rpx;
		font-weight: 500;
		background-color: rgba(255, 255, 128, 0.8);
	}
	.tab{
		margin: 40rpx auto 0;
		padding-bottom: 20rpx;
		width: 100%;
	}
	.tab-item{
		display: flex;
		padding: 0 20rpx;
		border-bottom: 2rpx solid #F6F5F5;
	}
	.tab-name{
		margin-right: 20rpx;
		padding: 0 20rpx;
		font-size: 26rpx;
		height: 40rpx;
		line-height: 40rpx;
		color: #333333;
		background-color: #F2F2F2;
		border-radius: 10rpx 10rpx 0 0;
	}
	.tab-item-selected{
		background-color: #71D2BE;
	}
	
	.comment-box{
		margin: 20rpx auto;
	}
	.comment-item{
		display: flex;
		width: 100%;
		height: 80rpx;
		background-color: #dcdcdc;
	}
	.comment-name{
		height: 80rpx;
		width: 375rpx;
		color: #333;
		text-align: center;
		line-height: 80rpx;
	}
	.comment-name-selected{
		color: #F37B1D;
		border-bottom: 4rpx solid #F37B1D;
	}
	.color-orange{
		color: #F37B1D;
	}
	.comment-notes{
		font-weight: 500;
	}
	
		
</style>
