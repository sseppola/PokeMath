<script lang="ts">
	import {onDestroy} from 'svelte';
	import {clearStorage} from '$lib/storage';
	import {player} from '$lib/player';
	import {shop} from '$lib/shop';
	import TrainerCard from '$lib/TrainerCard.svelte';

	export let openNameModal = () => {
		console.warn('Open modal not implemented');
	}

	let playerData = player.playerData;
	const unsubscribePlayer = player.subscribe((newPlayerData) => {
		playerData = newPlayerData;
	});
	onDestroy(unsubscribePlayer);

	function resetPrompt() {
		if (confirm('Er du sikker på at du vil slette alle pokemon og poeng?')) {
			// Save it!
			clearStorage();
			console.log('Everything was deleted as requested..');
			shop.reload();
			player.reload();
			location.reload();
		} else {
			// Do nothing!
			console.log('Nothing was deleted.');
		}
	}
</script>

<div class="topbar">
	<div class="left-topbar">
		<a href="/" id="backbutton">&#8249;</a>

		<a href="/shop" id="money" class="">
			<img id="coinimage" src="/images/money.svg" width="50" height="50" alt="money" />
			<span id="cointext" class=" money score">
				<!-- TODO: money added animation -->
				{playerData.money}
			</span>
		</a>
		<a href="/dex" id="caught" class="">
			<img id="ballimage" src="/images/pokeball.svg" width="50" height="50" alt="poke-ball" />
			<span id="balltext" class="">{playerData.pkmnCaught}</span>
		</a>

		<div id="playercard" class=" playercard">
			<a class="playerbtn">
				<img id="playerimage" src="/images/player.png" width="50" height="50" alt="player" />
				<span id="playertext">Ash</span>
			</a>
			<div class="playercard-content">
				<TrainerCard openNameModal={openNameModal} />
			</div>
		</div>
	</div>

	<div class="dropdown">
		<button class="dropbtn">
			<img id="gearimage" src="/images/gear.png" width="50" height="50" alt="Settings" />
		</button>
		<div class="dropdown-content">
			<a href="/">Hovedmeny</a>
			<a href="/dex">Pokedex</a>
			<a href="/shop">Butikk</a>
			<a href="/about">Om siden</a>
			<a href="/about#contact">Kontakt oss</a>
			<a href="/about#news">Nylige oppdateringer</a>
			<a href="/saveandload">Lagre / Last Inn</a>
			<a href="/faq">FAQ</a>
			<a href="#" />
			<a on:click={resetPrompt}>Tilbakestill (Slett alt)</a>
		</div>
	</div>
</div>

<style>
	@media (max-width: 720px) {
		.topbar-icontext-left {
			display: none;
		}
		#playerimage {
			display: none;
		}
		a.playerbtn {
			display: none;
		}
	}

	#playerimage {
		width: 50px;
		height: 50px;
		object-fit: cover;
	}

	/* Place the navbar at the bottom of the page, and make it stick */
	.topbar {
		display: flex;
		align-items: center;
		justify-content: space-between;
		background-color: #333;
		/*overflow: hidden;*/
		position: fixed;
		top: 0;
		width: 100%;
		height: 50px;
		z-index: 9999;
	}

	.left-topbar {
		display: flex;
		align-items: center;
	}

	#backbutton {
		padding: 0px 16px;
	}

	/* Style the links inside the navigation bar */
	.topbar a {
		display: flex;
		align-items: center;
		gap: 8px;
		color: #f2f2f2;
		text-align: center;
		padding: 0px 16px;
		text-decoration: none;
		font-size: 20px;
		height: 50px;
	}

	.topbar a:hover {
		background-color: #ddd;
		color: black;
	}

	.topbar span {
		display: block;
		text-align: center;
		text-decoration: none;
		font-size: 20px;
	}
	.score {
		position: relative;
	}

	/* total score */
	.score::before {
		content: attr(data-total);
	}

	/* added score */
	.score::after {
		content: attr(data-added);
		position: absolute;
		top: 30px;
		left: 0;

		/* 
    position added score above total
    0% will make it overlay the total 
  */
		transform: translateY(-100%);
		opacity: 0;
	}

	/* total score animation (fade in) */
	.score.animate::before {
		animation: fade-in 0.5s;
	}
	@keyframes fade-in-scale {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}

	/* added score animation (fade in up) */
	.score.animate::after {
		animation: fade-in-up 0.5s;
	}
	@keyframes fade-in-up {
		from {
			opacity: 0;
		}
		50% {
			opacity: 1;
		}
		to {
			transform: translateY(-200%);
			opacity: 0;
		}
	}

	#playercard {
		position: relative;
	}

	.playercard-content {
		display: none;
		position: absolute;
		right: -200px;
		padding-right: 0px;
		min-width: 160px;
		box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.3);
		z-index: 1;
	}

	.playercard:hover .playercard-content {
		display: block;
	}

	/* The dropdown container */
	.dropdown {
		overflow: hidden;
	}

	/* Dropdown button */
	.dropdown .dropbtn {
		padding: 0;
		font-size: 16px;
		border: none;
		outline: none;
		height: 50px;
		object-fit: contain;
		background-color: inherit;
		font-family: inherit; /* Important for vertical align on mobile phones */
		margin: 0; /* Important for vertical align on mobile phones */
	}

	.dropdown:hover .dropbtn {
		background-color: #ddd;
		color: black;
	}

	/* Dropdown content (hidden by default) */
	.dropdown-content {
		display: none;
		position: absolute;
		right: 0;
		width: 160px;
		left: auto;
		float: right;
		padding-right: 0px;
		min-width: 160px;
		box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.3);
		z-index: 1;
	}

	/* Links inside the dropdown */
	.dropdown-content a {
		background-color: #333;
		color: #f2f2f2;
		padding: 8px;
		text-decoration: none;
		height: fit-content;
		display: block;
		text-align: left;
		font-size: 16;
		margin-top: auto;
	}

	/* Add a grey background color to dropdown links on hover */
	.dropdown-content a:hover {
		background-color: #ddd;
	}

	/* Show the dropdown menu on hover */
	.dropdown:hover .dropdown-content {
		display: block;
	}
</style>
