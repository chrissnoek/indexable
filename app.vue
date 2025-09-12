<template>
    <div>
        <NuxtLayout>
            <NuxtPage />
            <ConsentBanner />
        </NuxtLayout>
    </div>
</template>

<script setup>
import ConsentBanner from '~/components/ConsentBanner.vue';
</script>
