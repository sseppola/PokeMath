<script lang="ts">
	import {onDestroy} from 'svelte';
	import CookieContainer from '$lib/cookies.svelte';
	import TopNav from '$lib/TopNav.svelte';
	import ChangeNameModal from '$lib/ChangeNameModal.svelte';

  import {shop} from '$lib/shop'

  let shopOptions = shop.shopOptions;
	const unsubscribeShop = shop.subscribe((newShopOptions) => {
		shopOptions = newShopOptions;
	});
	onDestroy(unsubscribeShop);

	let nameModalVisible = false;
	const setNameModalState = (visible: boolean) => {
		nameModalVisible = visible;
	};
</script>

<CookieContainer />

<TopNav openNameModal={() => setNameModalState(true)} />

<image src={shopOptions.background} alt="" id="background" />

<ChangeNameModal 
	visible={nameModalVisible}
	closeModal={() => setNameModalState(false)}
/>

<div class="main">
	<slot />
</div>

<style>
	#background {
		position: fixed;
		background-repeat: no-repeat;
		background-attachment: fixed;
		background-position: center;
		top: 0;
		width: 100%;
		height: 100%;
		z-index: -2;
	}

	.main {
		margin-top: 50px;
		margin-bottom: 50px;
	}
</style>
