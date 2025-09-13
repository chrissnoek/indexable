<template>
    <div>
        <!-- SEO Head -->
        <Head>
            <Title>{{ $t('blog.meta.title') }}</Title>
            <Meta name="description" :content="$t('blog.meta.description')" />
            <Meta name="keywords" :content="$t('blog.meta.keywords')" />
            <Meta name="robots" content="index, follow" />

            <!-- Open Graph -->
            <Meta property="og:title" :content="$t('blog.meta.ogTitle')" />
            <Meta
                property="og:description"
                :content="$t('blog.meta.ogDescription')"
            />
            <Meta property="og:type" content="website" />
            <Meta
                property="og:url"
                content="https://deskundigewijzer.nl/blog"
            />

            <!-- Canonical -->
            <Link
                rel="canonical"
                href="https://deskundigewijzer.nl/blog"
            />
        </Head>

        <div class="min-h-screen bg-gray-50">
            <Header />

            <!-- Main Content -->
            <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <h1 class="text-4xl font-bold text-gray-900 mb-8">
                    {{ $t('blog.index.title') }}
                </h1>

                <!-- Loading State -->
                <div v-if="pending" class="text-center py-8">
                    <div
                        class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"
                    ></div>
                    <p class="mt-2 text-gray-600">
                        {{ $t('blog.index.loading') }}
                    </p>
                </div>

                <!-- Error State -->
                <div
                    v-else-if="error"
                    class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded"
                >
                    <strong>{{ $t('blog.index.error') }}</strong> {{ error }}
                </div>

                <!-- Blog Posts Grid -->
                <div
                    v-else-if="data && data.length > 0"
                    class="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    <article
                        v-for="post in data"
                        :key="post.path"
                        class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                    >
                        <img
                            v-if="post.coverImage || `/blog-images/${post.path.split('/').pop()}.png`"
                            :src="post.coverImage || `/blog-images/${post.path.split('/').pop()}.png`"
                            :alt="post.title"
                            class="w-full h-48 object-cover"
                            @error="$event.target.style.display='none'"
                        />
                        <div class="p-6">
                            <time
                                :datetime="post.date"
                                class="text-sm text-gray-500"
                            >
                                {{ formatDate(post.date) }}
                            </time>

                            <h2
                                class="mt-2 text-xl font-semibold text-gray-900"
                            >
                                <NuxtLink
                                    :to="post.path"
                                    class="hover:text-cyan-600"
                                >
                                    {{ post.title }}
                                </NuxtLink>
                            </h2>

                            <p class="mt-3 text-gray-600 line-clamp-3">
                                {{ post.description }}
                            </p>

                            <div
                                v-if="post.tags"
                                class="mt-4 flex flex-wrap gap-2"
                            >
                                <span
                                    v-for="tag in post.tags.slice(0, 3)"
                                    :key="tag"
                                    class="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded"
                                >
                                    {{ tag }}
                                </span>
                            </div>

                            <NuxtLink
                                :to="post.path"
                                class="mt-4 inline-flex items-center text-cyan-600 hover:text-cyan-700 font-medium"
                            >
                                {{ $t('blog.index.readMore') }}
                            </NuxtLink>
                        </div>
                    </article>
                </div>

                <!-- No Posts Found -->
                <div v-else class="text-center py-12">
                    <p class="text-gray-600 text-lg">
                        {{ $t('blog.index.noPosts') }}
                    </p>
                </div>
            </main>

            <Footer />
        </div>
    </div>
</template>

<script setup>
const route = useRoute();

// Fetch blog posts from the content/blog directory using Nuxt Content v3
const { data, pending, error } = await useAsyncData(route.path, () =>
    queryCollection('blog')
        .order('date', 'DESC')
        .all()
);

// Utility function to format date
const formatDate = (dateString) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('nl-NL', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
};
</script>

<style scoped>
.line-clamp-3 {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
}
</style>
