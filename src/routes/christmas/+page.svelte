<script lang="ts">
	import 'animate.css';
	import 'axios';
	import { onDestroy } from 'svelte';
	import repeat from 'lodash/repeat';
	import { shop } from '$lib/shop';
	import { player } from '$lib/player';
	import { checkACookieExists } from '$lib/cookies';
	import { getStorageItem, setStorageItem } from '$lib/storage';
	import { createToast } from '$lib/toast';

	let shopOptions = shop.shopOptions;

	// Subscribe to shop changes, and unsubscribe when the page is navigated away from
	const unsubscribeShop = shop.subscribe((newShopOptions) => {
		shopOptions = newShopOptions;
	})
	onDestroy(unsubscribeShop)

	const hatches = [
		{
			id: 1,
			imageUrl: '/images/events/christmas/1.png',
			message: 'Luke 1 er åpnet, og du fikk en Christmas Sudowoodo, og 1000 mynter.',
			pokemonId: 'N185-C1',
			money: 1000
		},
		{
			id: 2,
			imageUrl: '/images/events/christmas/2.png',
			message: 'Julekalender, Dag 2 - Du har fått en Festive Murkrow, og 1000 mynter!',
			pokemonId: 'N198-C1',
			money: 1000
		},
		{
			id: 3,
			imageUrl: '/images/events/christmas/3.png',
			message:
				'Luke 3 - Gratulerer! Mistletoe Igglybuff has blitt med i samlingen! (og 1000 mynter)',
			pokemonId: 'N174-C1',
			money: 1000
		},
		{
			id: 4,
			imageUrl: '/images/events/christmas/4.png',
			message:
				'Nå er det bare 20 dager igjen til Jul! Du har fått en Drummer Boy Cubone, og 1000 mynter!!',
			pokemonId: 'N104-C1',
			money: 1000
		},
		{
			id: 5,
			imageUrl: '/images/events/christmas/5.png',
			message: 'Luke 5 - Du har fått en Reindeer Vulpix, og 1000 mynter!',
			pokemonId: 'N37-C1',
			money: 1000
		},
		{
			id: 6,
			imageUrl: '/images/events/christmas/6.png',
			message:
				'Luke 6 - Eeengleer daaaaler neeed i skjuuuul. (Eller under jorda - sånn som Angel Digletten du akuratt fikk sammen med 1000 mynter!)',
			pokemonId: 'N50-C1',
			money: 1000
		},
		{
			id: 7,
			imageUrl: '/images/events/christmas/7.png',
			message: 'Luke 7 - Du har fått 20 000 mynter!',
			money: 20000
		},
		{
			id: 8,
			imageUrl: '/images/events/christmas/8.png',
			message: 'Luke 8 - Den nye Christmas Rowleten din ønsker deg en god jul! (+1000 mynter)',
			pokemonId: 'N722-C1',
			money: 1000
		},
		{
			id: 9,
			imageUrl: '/images/events/christmas/9.png',
			message:
				'Luke 9 - Her har du en Christmas Wreath Comfey som du kan henge på døren! (+1000 mynter)',
			pokemonId: 'N764-C1',
			money: 1000
		},
		{
			id: 10,
			imageUrl: '/images/events/christmas/10.png',
			message: 'Luke 10 - Presents Komala har blitt med på laget! (+1000 mynter)',
			pokemonId: 'N775-C1',
			money: 1000
		},
		{
			id: 11,
			imageUrl: '/images/events/christmas/11.png',
			message: 'Luke 11 - Elf Impidimp kommer for å gjøre rampestreker! (+1000 mynter)',
			pokemonId: 'N859-C1',
			money: 1000
		},
		{
			id: 12,
			imageUrl: '/images/events/christmas/12.png',
			message: 'Luke 12 - En Ornaments Spoink vil gjerne henge på treet! (+1000 mynter)',
			pokemonId: 'N325-C1',
			money: 1000
		},
		{
			id: 13,
			imageUrl: '/images/events/christmas/13.png',
			message: 'Luke 13 - Festive Pidove er klar for julesesongen! (+1000 mynter)',
			pokemonId: 'N519-C1',
			money: 1000
		},
		{
			id: 14,
			imageUrl: '/images/events/christmas/14.png',
			message: 'Luke 14 - Her får du 30 000 mynter!',
			money: 30000
		},
		{
			id: 15,
			imageUrl: '/images/events/christmas/15.png',
			message: "Luke 15 - Festive Farfetch'd funker fint! (+1000 mynter)",
			pokemonId: 'N83-C1',
			money: 1000
		},
		{
			id: 16,
			imageUrl: '/images/events/christmas/16.png',
			message: 'Luke 16 - Festive Gardevoir har blitt med på laget! (+1000 mynter)',
			pokemonId: 'N282-C1',
			money: 1000
		},
		{
			id: 17,
			imageUrl: '/images/events/christmas/17.png',
			money: shopOptions.boughtBackgrounds.includes('bg-019') ? 100000 : 0,
			message: shopOptions.boughtBackgrounds.includes('bg-019')
				? 'Luke 19 - Her skulle du ha fått en ny bakgrunn, men denne har du allerede, så du får pengene tilbake!'
				: 'Luke 19 - Her får du en av julebakgrunnene!',
			backgroundId: 'bg-019'
		},
		{
			id: 18,
			imageUrl: '/images/events/christmas/18.png',
			message: 'Luke 18 - Festive Gallade er klar til kamp!',
			pokemonId: 'N475-C1',
			money: 1000
		},
		{
			id: 19,
			imageUrl: '/images/events/christmas/19.png',
			message:
				'Luke 19 - Christmas Cake Appletun sørger for en god lukt på kjøkkenet! (+1000 mynter)',
			pokemonId: 'N842-C1',
			money: 1000
		},
		{
			id: 20,
			imageUrl: '/images/events/christmas/20.png',
			message: 'Luke 20 - Snowman Pikachu har ventet lenge på vintersesongen! (+1000 mynter)',
			pokemonId: 'N25-C1',
			money: 1000
		},
		{
			id: 21,
			imageUrl: '/images/events/christmas/21.png',
			message: 'Luke 21 - Her får du 50 000 mynter! Bruk dem godt!',
			money: 50000
		},
		{
			id: 22,
			imageUrl: '/images/events/christmas/22.png',
			message: 'Luke 22 - Santa Delibird har samlet opp gaver i hele år! (+1000 mynter)',
			pokemonId: 'N225-C1',
			money: 1000
		},
		{
			id: 23,
			imageUrl: '/images/events/christmas/23.png',
			message: 'Luke 23 - Festive Hoopa blir med på laget! (+1000 mynter)',
			pokemonId: 'N720-C1',
			money: 1000
		},
		{
			id: 24,
			imageUrl: '/images/events/christmas/24.png',
			money: shopOptions.boughtBackgrounds.includes('bg-020') ? 500000 : 0,
			message: shopOptions.boughtBackgrounds.includes('bg-020')
				? 'Luke 24 - God Jul! Skulle du ha fått julekalenderen som bakgrunn, men den har du allerede, så du får pengene tilbake!'
				: 'Luke 24 - God Jul! Her får du en versjon av julekalenderen som du kan bruke som bakgrunn!',
			backgroundId: 'bg-020'
		}
	];

	const date = new Date();

	let openedHatches = getStorageItem('xmasOpened') ?? [];
	let eventYear = getStorageItem('xmasYear') ?? date.getFullYear();

	$ : {
		if (eventYear != date.getFullYear()) {
			// Not in correct event year, reset event data
			setStorageItem('xmasOpened', []);
			setStorageItem('xmasYear', date.getFullYear());
			openedHatches = []
		}
	}

	function handleDoorClick(id: number) {
		if (date.getDate() != id || openedHatches.includes(id)) {
			return;
		}

		const openedHatch = hatches.find(hatch => hatch.id == id);
		if (openedHatch?.message) {
			createToast({ text: openedHatch.message });
		}
		if (openedHatch?.pokemonId) {
			player.addPokemon(openedHatch?.pokemonId);
		}
		if (openedHatch?.backgroundId)  {
			shop.addBackground(openedHatch.backgroundId);
		}
		if (openedHatch?.money) {
			player.addMoney(openedHatch?.money);
		}

		openedHatches = [...openedHatches, id];
		if (checkACookieExists('cookies')) {
			setStorageItem('xmasOpened', openedHatches);
		} else {
			createToast({
				text: 'Du har ikke godkjent bruken av Cookies, så vi kan ikke lagre din spillerdate på din enhet.',
				type:'bad',
			})
		}
	}
</script>

<div class="main">
	<div class="above-calendar">
		Du kan bare åpne en luke på riktig dag. Man kan ikke åpne luker senere!
		{`Dagens dato: ${date.toLocaleDateString('NO')}`}
		{#each repeat(0, 10, 1) as i}
		<div class="fallingsnowflake">❅</div>
		{/each}
	</div>

	{#if date.getMonth() !== 11}
		<div class="not-christmas-yet">
			{'Kom tilbake i desember!'}
		</div>
	{:else}
		<div class="calendar-container calendar-grid">
			{#each hatches as hatch}
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<div
					on:click={(event) => handleDoorClick(hatch.id)}
					class="calendar-image door {openedHatches.includes(hatch.id) ? 'calendar-image-opened' : ''}"
					style="grid-area: door{hatch.id};{openedHatches.includes(hatch.id) ? `background-image: url(${hatch.imageUrl})` : ''}"
				>
					<div class="text">
						{hatch.id}
					</div>
				</div>
			{/each}
		</div>
	{/if}
</div>

<style>
	@import url('https://fonts.googleapis.com/css2?family=Mountains+of+Christmas:wght@700&display=swap');
	@import url('https://fonts.googleapis.com/css2?family=Amatic+SC:wght@700&display=swap');

	.main {
		background-size: cover;
		font-family: 'Mountains of Christmas', cursive;
		display: flex;
		flex-direction: column;
		background: linear-gradient(#123, #111);
		overflow: hidden;
		height: 100%;
		margin-bottom: 0px;
		font-size: 2vw;
		box-sizing: border-box;
	}
	.above-calendar {
		font-family: 'Source Sans Pro', sans-serif;
		color: #fff;
		text-align: center;
		padding: 10px;
	}
	.not-christmas-yet {
		margin: auto;
		width: 50%;
		height: 70%;
		text-align: center;
		font-size: 3.5em;
		padding: 50px;
		color: #fff;
	}

	/* calendar layout */
	.calendar-container {
		box-sizing: border-box;
		width: 90vw;
		height: 50.625vw; /*aspect ratio math*/
		/*height: calc((9/16)*90%);*/
		max-width: 1980px;
		max-height: 1080px;
		min-width: 198px;
		min-height: 108px;
		/*aspect-ratio: 16 / 9;*/

		border: 5px solid rgb(250, 208, 93);
		margin: 15px auto;
		background-image: url('/images/backgrounds/bg-020.png');
		background-size: cover;
		background-repeat: no-repeat;
		box-shadow: 0px 0px 20px rgb(240, 207, 117);
		display: grid;
		grid-template-columns: repeat(4, 25%);
		grid-template-rows: repeat(6, 16.6%);

		grid-template-areas:
			'door9 door6 door11 door7'
			'door3 door20 door16 door2'
			'door14 door12 door19 door15'
			'door22 door1 door5 door23'
			'door17 door10 door24 door21'
			'door8 door18 door4 door13';
	}

	@keyframes animatedBackground {
		from {
			background-position: center 250;
		}
		to {
			background-position: center center;
		}
	}

	.calendar-image {
		background-image: none;
		background-size: cover;
		background-position: center;
		text-align: center;
	}

	.calendar-image.calendar-image-opened {
		background-image: none;
		background-size: contain;
		background-repeat: no-repeat;
		background-position: center;
		max-width: 100%;
		max-height: 100%;
		border: 2px dashed rgba(0, 0, 0, 0.2);
		border-radius: 0.6rem;
		transform-origin: 0% 50%;
		transition: all 2.5s, opacity 1s;
		animation: animatedBackground 4s cubic-bezier(0.175, 0.885, 0.32, 1.1);
		font-size: 2vw;
		padding-left: 5px;
		opacity: 1;
		background-color: #ffffff73;
	}

	.text {
		height: 100%;
		width: 100%;
		color: white;
		padding: 0px;
		-webkit-user-select: none; /* Safari */
		-moz-user-select: none; /* Firefox */
		-ms-user-select: none; /* IE10+/Edge */
		user-select: none; /* Standard */
		text-shadow: 1px 1px 0 rgba(0, 0, 0, 0.7);
	}

	.calendar-grid .door {
		width: 100%;
		height: 100%;
		transform-style: preserve-3d;
		transition: all 300ms;
		border: 2px dashed rgba(0, 0, 0, 0.2);
		border-radius: 0.6rem;
	}

	.calendar-grid .door div {
		position: absolute;
		height: 100%;
		width: 100%;
		border-radius: 0.4rem;
		display: flex;
		align-items: center;
		justify-content: center;
		color: #121212;
		font-size: 3em;
		font-weight: bold;
		text-shadow: 1px 1px 0 rgba(255, 255, 255, 0.2);
	}

	.btn-start {
		background-color: #fa923f;
		color: white;
		border: 2px solid #512751;
		border-radius: 15px;
		margin: 15px auto;
		display: block;
		width: 10rem;
		height: 2rem;
	}
</style>
