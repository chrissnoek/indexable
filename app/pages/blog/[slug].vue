<template>
    <div>
        <!-- SEO Head -->
        <Head>
            <Title>{{ data?.title || 'Blog' }} | Deskundigen Directory</Title>
            <Meta
                name="description"
                :content="
                    data?.description || $t('blog.meta.fallbackDescription')
                "
            />
            <Meta
                name="keywords"
                :content="
                    data?.tags?.join(', ') || $t('blog.meta.fallbackKeywords')
                "
            />
            <Meta name="author" content="Deskundigen Directory" />
            <Meta name="robots" content="index, follow" />

            <Meta property="og:title" :content="data?.title || 'Blog'" />
            <Meta
                property="og:description"
                :content="
                    data?.description || $t('blog.meta.fallbackDescription')
                "
            />
            <Meta property="og:type" content="article" />
            <Meta
                property="og:url"
                :content="`https://deskundigewijzer.nl/blog/${$route.params.slug}`"
            />
            <Meta property="og:locale" content="nl_NL" />
            <Meta property="og:site_name" content="Deskundigen Directory" />

            <Meta property="article:author" content="Deskundigen Directory" />
            <Meta property="article:published_time" :content="data?.date" />
            <Meta property="article:section" content="Juridische expertise" />
            <Meta
                property="article:tag"
                :content="data?.tags?.join(', ') || ''"
            />

            <Meta name="twitter:card" content="summary_large_image" />
            <Meta name="twitter:title" :content="data?.title || 'Blog'" />
            <Meta
                name="twitter:description"
                :content="
                    data?.description || $t('blog.meta.fallbackDescription')
                "
            />

            <Link
                rel="canonical"
                :href="`https://deskundigewijzer.nl/blog/${$route.params.slug}`"
            />
        </Head>

        <div class="min-h-screen bg-gray-50">
            <Header
                variant="simple"
                :navigationItems="[
                    { key: 'search', to: '/search', label: $t('common.navigation.search') },
                    { key: 'blog', to: '/blog', label: $t('blog.navigation.blog') },
                    { key: 'submit', to: '/submit', label: $t('common.navigation.submit'), isButton: true }
                ]"
            />

            <nav
                aria-label="Breadcrumb"
                class="bg-white border-b border-gray-200"
            >
                <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <ol class="flex items-center space-x-2 text-sm">
                        <li>
                            <NuxtLink
                                to="/"
                                class="text-gray-500 hover:text-gray-700"
                                >{{ $t('blog.breadcrumbs.home') }}</NuxtLink
                            >
                        </li>
                        <li class="text-gray-400">›</li>
                        <li>
                            <NuxtLink
                                to="/blog"
                                class="text-gray-500 hover:text-gray-700"
                                >{{ $t('blog.breadcrumbs.blog') }}</NuxtLink
                            >
                        </li>
                        <li class="text-gray-400">›</li>
                        <li class="text-gray-900 font-medium truncate">
                            {{ data?.title }}
                        </li>
                    </ol>
                </div>
            </nav>

            <main class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <article>
                    <header class="mb-8">
                        <div class="mb-4">
                            <div
                                v-if="data?.tags"
                                class="flex flex-wrap gap-2 mb-4"
                            >
                                <span
                                    v-for="tag in data.tags"
                                    :key="tag"
                                    class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                                >
                                    {{ tag }}
                                </span>
                            </div>

                            <h1
                                class="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-6"
                            >
                                {{ data?.title }}
                            </h1>

                            <div
                                class="flex items-center text-sm text-gray-500 space-x-4"
                            >
                                <time
                                    :datetime="data?.date"
                                    class="flex items-center"
                                >
                                    <svg
                                        class="w-4 h-4 mr-2"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            stroke-width="2"
                                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                        ></path>
                                    </svg>
                                    {{ formatDate(data?.date) }}
                                </time>
                                <span class="flex items-center">
                                    <svg
                                        class="w-4 h-4 mr-2"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            stroke-width="2"
                                            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                                        ></path>
                                    </svg>
                                    {{ readingTime(data?.body?.children) }}
                                    {{ $t('blog.post.readingTime') }}
                                </span>
                            </div>

                            <p
                                v-if="data?.description"
                                class="mt-6 text-xl text-gray-600 leading-relaxed"
                            >
                                {{ data.description }}
                            </p>

                            <img
                                v-if="showImage"
                                :src="imageSrc"
                                :alt="data?.title"
                                class="mt-8 w-full max-w-2xl mx-auto rounded-lg shadow-lg max-h-[290px] object-cover"
                                @error="showImage = false"
                            />
                        </div>
                    </header>

                    <aside
                        v-if="data?.body?.toc?.links?.length"
                        class="mb-8 bg-gray-50 rounded-lg p-6 border border-gray-200"
                    >
                        <h2
                            class="text-lg font-semibold text-gray-900 mb-4 flex items-center"
                        >
                            <svg
                                class="w-5 h-5 mr-2"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M4 6h16M4 10h16M4 14h16M4 18h16"
                                ></path>
                            </svg>
                            {{ $t('blog.post.tableOfContents') }}
                        </h2>
                        <nav>
                            <ul class="space-y-2">
                                <li
                                    v-for="link in data.body.toc.links"
                                    :key="link.id"
                                >
                                    <a
                                        :href="`#${link.id}`"
                                        class="text-cyan-600 hover:text-cyan-700 hover:underline text-sm font-medium block py-1"
                                    >
                                        {{ link.text }}
                                    </a>
                                    <ul
                                        v-if="link.children?.length"
                                        class="ml-4 mt-1 space-y-1"
                                    >
                                        <li
                                            v-for="child in link.children"
                                            :key="child.id"
                                        >
                                            <a
                                                :href="`#${child.id}`"
                                                class="text-gray-600 hover:text-cyan-600 hover:underline text-sm block py-0.5"
                                            >
                                                {{ child.text }}
                                            </a>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </nav>
                    </aside>

                    <div class="prose prose-lg prose-blue max-w-none">
                        <div
                            class="prose-headings:font-bold prose-headings:text-gray-900 prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4 prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-3 prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-4 prose-strong:text-gray-900 prose-strong:font-semibold prose-ul:my-6 prose-li:mb-2 prose-a:text-cyan-600 prose-a:no-underline hover:prose-a:text-cyan-700"
                        >
                            <ContentRenderer :value="data" />
                        </div>
                    </div>

                    <footer class="mt-12 pt-8 border-t border-gray-200">
                        <div class="bg-blue-50 rounded-lg p-6">
                            <h3
                                class="text-lg font-semibold text-gray-900 mb-2"
                            >
                                {{ $t('blog.cta.title') }}
                            </h3>
                            <p class="text-gray-700 mb-4">
                                {{ $t('blog.cta.description') }}
                            </p>
                            <NuxtLink
                                to="/search"
                                class="inline-flex items-center px-6 py-3 bg-cyan-600 hover:bg-cyan-700 text-white font-medium rounded-lg transition-colors"
                            >
                                <svg
                                    class="w-5 h-5 mr-2"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                    ></path>
                                </svg>
                                {{ $t('blog.cta.button') }}
                            </NuxtLink>
                        </div>
                    </footer>
                </article>

                <aside class="mt-16">
                    <h2 class="text-2xl font-bold text-gray-900 mb-8">
                        {{ $t('blog.post.relatedArticles') }}
                    </h2>
                    <div class="grid md:grid-cols-2 gap-8">
                        <article
                            v-for="relatedPost in relatedPosts"
                            :key="relatedPost.path"
                            class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
                        >
                            <div class="p-6">
                                <div
                                    class="flex items-center text-sm text-gray-500 mb-3"
                                >
                                    <time :datetime="relatedPost.date">
                                        {{ formatDate(relatedPost.date) }}
                                    </time>
                                </div>
                                <h3
                                    class="text-lg font-semibold text-gray-900 mb-2 line-clamp-2"
                                >
                                    <NuxtLink
                                        :to="relatedPost.path"
                                        class="hover:text-cyan-600"
                                    >
                                        {{ relatedPost.title }}
                                    </NuxtLink>
                                </h3>
                                <p
                                    class="text-gray-600 text-sm line-clamp-2 mb-4"
                                >
                                    {{ relatedPost.description }}
                                </p>
                                <div class="flex flex-wrap gap-2">
                                    <span
                                        v-for="tag in relatedPost.tags?.slice(
                                            0,
                                            2
                                        )"
                                        :key="tag"
                                        class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600"
                                    >
                                        {{ tag }}
                                    </span>
                                </div>
                            </div>
                        </article>
                    </div>
                </aside>
            </main>

            <Footer />
        </div>
    </div>
</template>

<script setup>
const { params, query, path } = useRoute();

console.log(params, query, path);

// Data for image visibility
const showImage = ref(true);

// Get image source from frontmatter or fallback to slug-based
const imageSrc = computed(() => {
    return data.value?.coverImage || `/blog-images/${params.slug}.png`;
});
// Fetch the blog post content from content/blog directory
const { data } = await useAsyncData(path, () =>
    queryCollection('blog')
        .path(path)
        .first()
);

// Fetch related posts from content/blog (exclude current post, limit to 4)
const { data: relatedPosts } = await useAsyncData('related-posts', () =>
    queryCollection('blog')
        .where('path', '!=', path)
        .order('date', 'DESC')
        .limit(4)
        .all()
);

// Utility functions
const formatDate = (dateString) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('nl-NL', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
};

const readingTime = (content) => {
    if (!content) return 0;
    const text = JSON.stringify(content);
    const wordsPerMinute = 200;
    const wordCount = text.split(/\s+/).length;
    return Math.ceil(wordCount / wordsPerMinute);
};

// Handle 404 - only throw error in client-side after hydration
if (!data.value && process.client) {
    throw createError({
        statusCode: 404,
        statusMessage: 'Blog post not found',
    });
}

// Add structured data to head
useHead({
    script: [
        {
            type: 'application/ld+json',
            innerHTML: JSON.stringify({
                '@context': 'https://schema.org',
                '@type': 'Article',
                headline: data.value?.title,
                description: data.value?.description,
                author: {
                    '@type': 'Organization',
                    name: 'Deskundigen Directory',
                    url: 'https://deskundigewijzer.nl',
                },
                publisher: {
                    '@type': 'Organization',
                    name: 'Deskundigen Directory',
                    url: 'https://deskundigewijzer.nl',
                    logo: {
                        '@type': 'ImageObject',
                        url: 'https://deskundigewijzer.nl/logo.png',
                    },
                },
                datePublished: data.value?.date,
                dateModified: data.value?.date,
                mainEntityOfPage: {
                    '@type': 'WebPage',
                    '@id': `https://deskundigewijzer.nl/blog/${params.slug}`,
                },
                keywords: data.value?.tags?.join(', '),
                articleSection: 'Juridische expertise',
                inLanguage: 'nl-NL',
            }),
        },
        {
            type: 'application/ld+json',
            innerHTML: JSON.stringify({
                '@context': 'https://schema.org',
                '@type': 'BreadcrumbList',
                itemListElement: [
                    {
                        '@type': 'ListItem',
                        position: 1,
                        name: 'Home',
                        item: 'https://deskundigewijzer.nl',
                    },
                    {
                        '@type': 'ListItem',
                        position: 2,
                        name: 'Blog',
                        item: 'https://deskundigewijzer.nl/blog',
                    },
                    {
                        '@type': 'ListItem',
                        position: 3,
                        name: data.value?.title,
                        item: `https://deskundigewijzer.nl/blog/${params.slug}`,
                    },
                ],
            }),
        },
    ],
});
</script>

<style scoped>
.line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

/* Prose styles for better content display */
.prose h2 {
    scroll-margin-top: 6rem;
}

.prose h3 {
    scroll-margin-top: 6rem;
}

/* Smooth scrolling for anchor links */
html {
    scroll-behavior: smooth;
}
</style>
