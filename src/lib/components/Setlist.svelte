<script>
	import { setlist } from '$lib/store.js';

	const formatDuration = (seconds) => {
		const minutes = Math.floor(seconds / 60);
		seconds %= 60;
		return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
	};

	let totalDuration = 0;

	// Reactive statement to update total duration
	$: {
		totalDuration = 0;
		$setlist.forEach((song) => {
			totalDuration += song.duration;
		});
	}

	const removeSong = (index) => {
		setlist.update((songs) => {
			songs.splice(index, 1);
			return songs;
		});
	};

	const generateShareableLink = () => {
		const data = JSON.stringify($setlist);
		const encodedData = encodeURIComponent(data);
		const link = `${window.location.origin}?setlist=${encodedData}`;

		// Copy link to clipboard
		navigator.clipboard
			.writeText(link)
			.then(() => alert('Shareable link copied to clipboard'))
			.catch((err) => console.error('Failed to copy link to clipboard:', err));
	};
</script>

<section>
	{#if $setlist.length > 0}
		<ol class="py-12 list">
			{#each $setlist as { title, duration }, i}
				<div class="flex justify-between space-y-4">
					<li class="text-xl">
						<span class="text-surface-200">{i + 1}.</span>
						<span class="flex-auto">{title} - {formatDuration(duration)}</span>
					</li>
					<button on:click={() => removeSong(i)}>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="1.5"
							stroke="currentColor"
							class="w-6 h-6 cursor-pointer text-surface-200 hover:text-surface-400"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
							/>
						</svg>
					</button>
				</div>
			{/each}
		</ol>
	{:else}
		<p class="text-surface-400 py-12">
			🔥 Add some songs to make that sick setlist no one is gonna care about 🔥
		</p>
	{/if}

	<div class="py-8 border-t border-t-surface-500">
		<p class="mt-6 text-3xl">Total set time - {formatDuration(totalDuration)}</p>
		<button type="button" class="mt-6 btn variant-outline-tertiary" on:click={generateShareableLink}
			>Generate Shareable Link</button
		>
	</div>
</section>
