<template>
	<view class="star-box">
		<view class="iconfont icon-xingxing star" v-for="(item, index) in list" :key="index" :class="{gold: index<num}"></view>
	</view>
</template>

<script>
	export default {
		props:["num"],
		data() {
			return {
				list: [1, 1, 1, 1, 1,]
			};
		}
	}
</script>

<style>
	.star-box {
		display: flex;
		width: 150rpx;
		height: 30rpx;
	}
	.star{
		width: 30rpx;
		height: 30rpx;
		color: #F2F2F2;
	}
	.gold{
		color: gold;
	}
	@font-face {
		font-family: "iconfont";
		src: url('data:application/x-font-woff2;charset=utf-8;base64,d09GMgABAAAAAAKIAAsAAAAABjAAAAI+AAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHEIGVgCCcAo4VQE2AiQDCAsGAAQgBYRtBzIbfQUR1YtVsj8ccHIv1nFrUCmEPtLXg3m3T+rRMu5HUDI2xEzFwX4fD//t97997syzeV/U0v900SaarJFIVJUEqRGiZVhdrOGRfJNnwrsXQnDtt81NZKakmQHfmvMniSTlfHFyNwukAFUpX+A0owBIhKHzpAYE8HkupzeBDmR+oHO95qSxJk3qBdSLAynQPTCKrFACbxi74AU+JlDM2RFH1seLaMvsVYG4Fvq2aBeisswKbaHZcDCLFxra1bPqHZ5H348/dqNNpZHYLaeurjxx4AenJN2tvxgQYgR0vIGEHWTiXGP2hCQYl5RstsSxGoMf6jrwiKM6Bfvr7PoeMANzwQ/eSgEqeKypCsYm/RSi3HBeD+v6cO3Xsu/cHzdy+cOaeNZfwQFQS2/TnkBw6Hz9K13/yeDTXxSuZcP8tFf3Bb9BHTiQDa3trrKmNo5Wyu7bioI6HBzydapt9JzF0DY6wd8ymyFpWyEzu4OGrn1oatuPYtvx413Drksid7DlEUAY8BKVPq+QDHhPZvYLGsb8Q9NAJBQXogu71sIKGxHajB44fwjdPJOulxtx4wn9d2JTXhvxN6QqTICpGeXCBjOkJbZUH3/OLEFSnsIaPIdJkkNBeYQuawFzsdB12fQmzc1T0RAR2oweOH8I3TyTwXhuVD5/Qv+d2NTRV1fekKpwdjA1YwC5MWWD+h7llerjz5klSMpTWIN5mCQ5FM3zInRZCyaki4XuDJNDTdr2lvTvTkARtr2qOZWJX5j5nlMI') format('woff2');
	}

	.iconfont {
		font-family: "iconfont" !important;
		font-size: 16px;
		font-style: normal;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
	}

	.icon-xingxing:before {
		content: "\e70b";
	}
</style>
