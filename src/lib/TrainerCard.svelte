<script lang="ts">
	import {onDestroy} from 'svelte';
	import {player} from '$lib/player';

	let playerData = player.playerData;
	const unsubscribePlayer = player.subscribe((newPlayerData) => {
		playerData = newPlayerData;
	});
	onDestroy(unsubscribePlayer);

	export let openNameModal = () => {
		console.warn('Open modal not implemented');
	}
</script>

<div class="trainercard">
	<div class="card-avatar">
		<img id="playerimagebig" src="/images/player.png" width="100%" alt="player" />
	</div>
	<div class="trainercard-details">
		<div class="trainercard-name">
			<p id="playertextheader">{playerData.username}</p>
			<button
				id="editname"
				on:click={openNameModal}
				style="width:auto;">Endre</button
			>
		</div>
		<div class="trainercard-occupation">Pokémon Trener</div>
		<br />
		Oppgaver løst pr Nivå:
		<div class="trainercard-about">
			<div class="trainercard-item">
				<span class="value">1</span>
				<span class="label" id="t1solved">{playerData.tier1Solved}</span>
			</div>
			<div class="trainercard-item">
				<span class="value">2</span>
				<span class="label" id="t2solved">{playerData.tier2Solved}</span>
			</div>
			<div class="trainercard-item">
				<span class="value">3</span>
				<span class="label" id="t3solved">{playerData.tier3Solved}</span>
			</div>
			<div class="trainercard-item">
				<span class="value">4</span>
				<span class="label" id="t4solved">{playerData.tier4Solved}</span>
			</div>
			<div class="trainercard-item">
				<span class="value">5</span>
				<span class="label" id="t5solved">{playerData.tier5Solved}</span>
			</div>
		</div>
		<div class="skills">
			<span class="value" />
		</div>
	</div>
</div>

<style>
	.trainercard {
		min-width: calc(200px * 1.586);
		height: 200px;

		border-radius: 0.75rem;
		box-shadow: 0 22px 70px 4px rgba(0, 0, 0, 0.56), 0 0 0 1px rgba(0, 0, 0, 0.3);

		background: black;

		display: grid;
		grid-template-columns: 40% auto;
		color: white;

		align-items: center;

		will-change: transform;
		transition: transform 0.25s cubic-bezier(0.4, 0, 0.2, 1),
			box-shadow 0.25s cubic-bezier(0.4, 0, 0.2, 1);
	}
	.trainercard:hover {
		transform: scale(1.1);
		box-shadow: 0 32px 80px 14px rgba(0, 0, 0, 0.36), 0 0 0 1px rgba(0, 0, 0, 0.3);
	}

	.trainercard-details {
		padding: 1rem;
	}

	.trainercard-name {
		font-size: 1.25rem;
	}
	.trainercard-name p {
		margin: 0;
	}

	.trainercard-occupation {
		font-weight: 600;
		color: #ff1ead;
	}

	.trainercard-about {
		margin-top: 1rem;
		display: grid;
		grid-auto-flow: column;
	}

	.trainercard-item {
		display: flex;
		flex-direction: column;
		margin-bottom: 0.5rem;
	}

	.trainercard-item .value {
		font-size: 1rem;
	}

	.trainercard-item .label {
		margin-top: 0.15rem;
		font-size: 0.75rem;
		font-weight: 600;
		color: #ff1ead;
	}
</style>
