<script lang="ts">
	import '../styles/global.css'
	import { invalidate } from '$app/navigation'
	import { onMount } from 'svelte'
	let { data, children } = $props()
	let { session, supabase } = $derived(data)
	onMount(() => {
		const { data } = supabase.auth.onAuthStateChange((_, newSession) => {
			if (newSession?.expires_at !== session?.expires_at) {
				invalidate('supabase:auth')
			}
		})
		return () => data.subscription.unsubscribe();
	})
</script>

<svelte:head>
	<link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96" media="(prefers-color-scheme: light)" />
	<link rel="icon" type="image/png" href="/favicon-96x96-white.png" sizes="96x96" media="(prefers-color-scheme: dark)" />
	<link rel="icon" type="image/svg+xml" href="/favicon.svg" media="(prefers-color-scheme: light)" />
	<link rel="icon" type="image/svg+xml" href="/favicon-white.svg" media="(prefers-color-scheme: dark)" />
	<link rel="shortcut icon" href="/favicon-dark.ico" media="(prefers-color-scheme: light)" />
	<link rel="shortcut icon" href="/favicon.ico" media="(prefers-color-scheme: dark)" />
	<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon-white.png" />
	<meta name="apple-mobile-web-app-title" content="Oh that's useful" />
	<link rel="manifest" href="/site.webmanifest" />

	<meta name="author" content="Lethargistic"/>
	<meta name="theme-color" content="#ffffff"/>
	<meta property="og:site_name" content="Oh that's useful"/>
</svelte:head>

{@render children()}