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

<section class="max-w-4xl mx-auto mt-16">
	<ol class="list">
		{#each $setlist as { title, duration }, i}
			<div class="flex justify-between space-y-2">
				<li class="text-xl">
					<span>{i + 1}.</span>
					<span class="flex-auto">{title} - {formatDuration(duration)}</span>
				</li>
				<button
					type="button"
					class="btn btn-sm variant-ghost-secondary"
					on:click={() => removeSong(i)}>Remove</button
				>
			</div>
		{/each}
	</ol>

	<p class="text-3xl mt-6">Total duration: {formatDuration(totalDuration)}</p>
	<button type="button" class="btn variant-ringed mt-6" on:click={generateShareableLink}
		>Generate Shareable Link</button
	>
</section>
