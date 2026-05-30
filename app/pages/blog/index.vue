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

        <Header />

        <section class="section">
            <div class="wrap">
                <div class="section-head">
                    <p class="eyebrow">{{ $t('home.navigation.blog') }}</p>
                    <h1 class="text-h1">{{ $t('blog.index.title') }}</h1>
                </div>
                <hr class="rule" style="margin: 2.5rem 0" />

                <!-- Loading State -->
                <div v-if="pending" class="state-block">
                    <div class="spinner"></div>
                    <p class="muted" style="margin-top: 1rem">
                        {{ $t('blog.index.loading') }}
                    </p>
                </div>

                <!-- Error State -->
                <div v-else-if="error" class="panel error-panel">
                    <p class="eyebrow eyebrow--muted">Error</p>
                    <p style="margin-top: 0.5rem">
                        <strong>{{ $t('blog.index.error') }}</strong> {{ error }}
                    </p>
                </div>

                <!-- Blog Posts Grid -->
                <div
                    v-else-if="data && data.length > 0"
                    class="post-grid"
                >
                    <article
                        v-for="post in data"
                        :key="post.path"
                        class="post-card stagger-child"
                    >
                        <img
                            v-if="post.coverImage || `/blog-images/${post.path.split('/').pop()}.png`"
                            :src="post.coverImage || `/blog-images/${post.path.split('/').pop()}.png`"
                            :alt="post.title"
                            class="post-card__img"
                            @error="$event.target.style.display='none'"
                        />
                        <div class="post-card__body">
                            <time
                                :datetime="post.date"
                                class="post-card__date"
                            >
                                {{ formatDate(post.date) }}
                            </time>

                            <h2 class="post-card__title">
                                <NuxtLink :to="post.path">
                                    {{ post.title }}
                                </NuxtLink>
                            </h2>

                            <p class="post-card__desc">
                                {{ post.description }}
                            </p>

                            <div
                                v-if="post.tags"
                                class="post-card__tags"
                            >
                                <span
                                    v-for="tag in post.tags.slice(0, 3)"
                                    :key="tag"
                                    class="tag tag--ghost"
                                >
                                    {{ tag }}
                                </span>
                            </div>

                            <NuxtLink
                                :to="post.path"
                                class="more-link post-card__more"
                            >
                                {{ $t('blog.index.readMore') }}
                                <span class="caret">→</span>
                            </NuxtLink>
                        </div>
                    </article>
                </div>

                <!-- No Posts Found -->
                <div v-else class="panel empty-panel">
                    <p class="lede" style="margin: 0">
                        {{ $t('blog.index.noPosts') }}
                    </p>
                </div>
            </div>
        </section>

        <Footer />
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
.post-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.5rem;
}
.post-card {
    display: flex;
    flex-direction: column;
    background: var(--paper-card);
    border: 1px solid var(--rule);
    border-radius: var(--radius);
    overflow: hidden;
    transition: border-color var(--dur) var(--ease),
        transform var(--dur) var(--ease), box-shadow var(--dur) var(--ease);
}
.post-card:hover {
    border-color: var(--accent);
    transform: translateY(-3px);
    box-shadow: var(--shadow-card);
}
.post-card__img {
    width: 100%;
    height: 200px;
    object-fit: cover;
    border-bottom: 1px solid var(--rule);
    display: block;
}
.post-card__body {
    display: flex;
    flex-direction: column;
    flex: 1;
    padding: clamp(1.25rem, 1rem + 1vw, 1.75rem);
}
.post-card__date {
    font-size: var(--text-caption);
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: var(--muted);
}
.post-card__title {
    font-family: var(--font-serif);
    font-size: var(--text-h3);
    line-height: 1.15;
    margin-top: 0.5rem;
}
.post-card__title a {
    color: var(--ink);
    text-decoration: none;
    transition: color var(--dur) var(--ease);
}
.post-card:hover .post-card__title a {
    color: var(--accent-deep);
}
.post-card__desc {
    margin-top: 0.75rem;
    color: var(--ink-soft);
    line-height: 1.6;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
}
.post-card__tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.4rem;
    margin-top: 1rem;
}
.post-card__more {
    margin-top: auto;
    padding-top: 1.25rem;
}

.state-block {
    text-align: center;
    padding-block: clamp(3rem, 6vw, 5rem);
}
.error-panel {
    border-color: var(--accent);
}
.empty-panel {
    text-align: center;
    padding-block: clamp(2.5rem, 5vw, 4rem);
}

@media (max-width: 1024px) {
    .post-grid {
        grid-template-columns: repeat(2, 1fr);
    }
}
@media (max-width: 640px) {
    .post-grid {
        grid-template-columns: 1fr;
    }
}
</style>
