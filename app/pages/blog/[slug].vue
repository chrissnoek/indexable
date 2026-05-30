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

        <Header />

        <nav aria-label="Breadcrumb" class="article-crumbs">
            <div class="wrap wrap--narrow">
                <ol class="crumbs">
                    <li>
                        <NuxtLink to="/" class="crumbs__link">{{
                            $t('blog.breadcrumbs.home')
                        }}</NuxtLink>
                    </li>
                    <li class="crumbs__sep" aria-hidden="true">/</li>
                    <li>
                        <NuxtLink to="/blog" class="crumbs__link">{{
                            $t('blog.breadcrumbs.blog')
                        }}</NuxtLink>
                    </li>
                    <li class="crumbs__sep" aria-hidden="true">/</li>
                    <li class="crumbs__current">{{ data?.title }}</li>
                </ol>
            </div>
        </nav>

        <main class="section section--tight">
            <div class="wrap wrap--narrow">
                <article>
                    <header class="article-head">
                        <div v-if="data?.tags" class="article-head__tags">
                            <span
                                v-for="tag in data.tags"
                                :key="tag"
                                class="tag tag--ghost"
                            >
                                {{ tag }}
                            </span>
                        </div>

                        <h1 class="text-display article-title">
                            {{ data?.title }}
                        </h1>

                        <div class="article-meta">
                            <time :datetime="data?.date">{{
                                formatDate(data?.date)
                            }}</time>
                            <span class="article-meta__dot" aria-hidden="true"
                                >·</span
                            >
                            <span
                                >{{ readingTime(data?.body?.children) }}
                                {{ $t('blog.post.readingTime') }}</span
                            >
                        </div>

                        <p v-if="data?.description" class="lede article-lede">
                            {{ data.description }}
                        </p>

                        <img
                            v-if="showImage"
                            :src="imageSrc"
                            :alt="data?.title"
                            class="article-cover"
                            @error="showImage = false"
                        />
                    </header>

                    <aside
                        v-if="data?.body?.toc?.links?.length"
                        class="toc"
                    >
                        <h2 class="toc__title">
                            {{ $t('blog.post.tableOfContents') }}
                        </h2>
                        <nav>
                            <ul class="toc__list">
                                <li
                                    v-for="link in data.body.toc.links"
                                    :key="link.id"
                                >
                                    <a
                                        :href="`#${link.id}`"
                                        class="toc__link"
                                    >
                                        {{ link.text }}
                                    </a>
                                    <ul
                                        v-if="link.children?.length"
                                        class="toc__sub"
                                    >
                                        <li
                                            v-for="child in link.children"
                                            :key="child.id"
                                        >
                                            <a
                                                :href="`#${child.id}`"
                                                class="toc__link toc__link--sub"
                                            >
                                                {{ child.text }}
                                            </a>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </nav>
                    </aside>

                    <div class="prose-editorial article-body">
                        <template v-if="faqData">
                            <ContentRenderer :value="beforeFaqContent" />
                            <FaqAccordion
                                :id="faqData.id"
                                :title="faqData.title"
                                :items="faqData.items"
                            />
                            <ContentRenderer
                                v-if="afterFaqContent"
                                :value="afterFaqContent"
                            />
                        </template>
                        <ContentRenderer v-else :value="data" />
                    </div>

                    <footer class="article-footer">
                        <div class="panel cta-panel">
                            <h3 class="cta-panel__title">
                                {{ $t('blog.cta.title') }}
                            </h3>
                            <p class="cta-panel__desc">
                                {{ $t('blog.cta.description') }}
                            </p>
                            <NuxtLink to="/search" class="btn btn--primary">
                                <span class="btn__label">{{
                                    $t('blog.cta.button')
                                }}</span>
                            </NuxtLink>
                        </div>
                    </footer>
                </article>

                <aside class="related">
                    <h2 class="text-h2 related__title">
                        {{ $t('blog.post.relatedArticles') }}
                    </h2>
                    <div class="related-grid">
                        <article
                            v-for="relatedPost in relatedPosts"
                            :key="relatedPost.path"
                            class="related-card"
                        >
                            <time
                                :datetime="relatedPost.date"
                                class="related-card__date"
                            >
                                {{ formatDate(relatedPost.date) }}
                            </time>
                            <h3 class="related-card__title">
                                <NuxtLink :to="relatedPost.path">
                                    {{ relatedPost.title }}
                                </NuxtLink>
                            </h3>
                            <p class="related-card__desc">
                                {{ relatedPost.description }}
                            </p>
                            <div class="related-card__tags">
                                <span
                                    v-for="tag in relatedPost.tags?.slice(0, 2)"
                                    :key="tag"
                                    class="tag tag--ghost"
                                >
                                    {{ tag }}
                                </span>
                            </div>
                        </article>
                    </div>
                </aside>
            </div>
        </main>

        <Footer />
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

// ── FAQ detection ──────────────────────────────────────────────────────────────
// @nuxt/content v3 stores the body as minimark: { type: "minimark", value: Node[] }
// Each node is a tuple:  [tagName, propsObj, ...children]
// Text children are plain strings; nested elements are nested tuples.
// This code detects "## Veelgestelde vragen" and the H3+answer pairs that follow.

// Returns tag name of a minimark node, or null for text strings.
function nodeTag(n) {
    return Array.isArray(n) ? n[0] : null;
}

// Recursively extract plain text from a minimark node or string.
function extractText(n) {
    if (typeof n === 'string') return n;
    if (!Array.isArray(n)) return '';
    // n = [tag, props, ...children]
    return n.slice(2).map(extractText).join('');
}

function extractAllText(nodes) {
    if (!nodes?.length) return '';
    return nodes
        .map((n) => extractText(n).trim())
        .filter(Boolean)
        .join(' ');
}

const faqData = computed(() => {
    // body.value is the flat root-level node array in minimark format
    const nodes = data.value?.body?.value;
    if (!nodes?.length) return null;

    const faqH2Index = nodes.findIndex(
        (n) =>
            nodeTag(n) === 'h2' &&
            extractText(n).startsWith('Veelgestelde vragen'),
    );
    if (faqH2Index === -1) return null;

    const faqH2 = nodes[faqH2Index];
    // props are at index 1: [tag, props, ...children]
    const faqId = (faqH2[1] && faqH2[1].id) || 'veelgestelde-vragen';
    const faqTitle = extractText(faqH2);

    // Collect nodes after FAQ H2 until the next H2
    let nextH2Index = nodes.length;
    for (let i = faqH2Index + 1; i < nodes.length; i++) {
        if (nodeTag(nodes[i]) === 'h2') {
            nextH2Index = i;
            break;
        }
    }

    const faqBodyNodes = nodes.slice(faqH2Index + 1, nextH2Index);
    const afterH2Nodes = nodes.slice(nextH2Index);

    // Parse into FAQ items; an <hr> ends the item stream (trailing CTA paragraph)
    const items = [];
    const trailingNodes = [];
    let currentItem = null;
    let hitHr = false;

    for (const node of faqBodyNodes) {
        if (hitHr) {
            trailingNodes.push(node);
            continue;
        }
        if (nodeTag(node) === 'hr') {
            hitHr = true;
            if (currentItem) {
                items.push(currentItem);
                currentItem = null;
            }
            continue;
        }
        if (nodeTag(node) === 'h3') {
            if (currentItem) items.push(currentItem);
            currentItem = {
                question: extractText(node),
                id: (node[1] && node[1].id) || null,
                answerNodes: [],
            };
        } else if (currentItem) {
            currentItem.answerNodes.push(node);
        }
    }
    if (currentItem) items.push(currentItem);
    if (items.length === 0) return null;

    return {
        title: faqTitle,
        id: faqId,
        items,
        beforeNodes: nodes.slice(0, faqH2Index),
        afterNodes: [...trailingNodes, ...afterH2Nodes],
    };
});

// Partial content objects for ContentRenderer — same shape as data but with
// a subset of body.value so the prose styles and component context stay intact.
const beforeFaqContent = computed(() =>
    faqData.value
        ? {
              ...data.value,
              body: {
                  ...data.value.body,
                  value: faqData.value.beforeNodes,
              },
          }
        : null,
);

const afterFaqContent = computed(() =>
    faqData.value?.afterNodes?.length
        ? {
              ...data.value,
              body: {
                  ...data.value.body,
                  value: faqData.value.afterNodes,
              },
          }
        : null,
);

// ── Structured data ────────────────────────────────────────────────────────────
const ldScripts = [
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
];

if (faqData.value) {
    ldScripts.push({
        type: 'application/ld+json',
        innerHTML: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faqData.value.items.map((item) => ({
                '@type': 'Question',
                name: item.question,
                acceptedAnswer: {
                    '@type': 'Answer',
                    text: extractAllText(item.answerNodes),
                },
            })),
        }),
    });
}

useHead({ script: ldScripts });
</script>

<style scoped>
.article-crumbs {
    border-bottom: 1px solid var(--rule);
    padding-block: 1rem;
}
.crumbs {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.6rem;
    margin: 0;
    padding: 0;
    list-style: none;
    font-size: var(--text-small);
}
.crumbs__link {
    color: var(--muted);
    text-decoration: none;
    transition: color var(--dur) var(--ease);
}
.crumbs__link:hover {
    color: var(--accent-deep);
}
.crumbs__sep {
    color: var(--rule-strong);
}
.crumbs__current {
    color: var(--ink);
    font-weight: 500;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    max-width: 40ch;
}

/* Article header */
.article-head {
    margin-bottom: clamp(2rem, 4vw, 3rem);
}
.article-head__tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.4rem;
    margin-bottom: 1.5rem;
}
.article-title {
    margin: 0;
}
.article-meta {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    margin-top: 1.25rem;
    font-size: var(--text-small);
    color: var(--muted);
}
.article-meta__dot {
    color: var(--rule-strong);
}
.article-lede {
    margin-top: 1.5rem;
}
.article-cover {
    width: 100%;
    margin-top: 2rem;
    border: 1px solid var(--rule);
    border-radius: var(--radius);
    max-height: 420px;
    object-fit: cover;
    display: block;
}

/* Table of contents */
.toc {
    background: var(--paper-warm);
    border: 1px solid var(--rule);
    border-left: 3px solid var(--accent);
    border-radius: var(--radius);
    padding: clamp(1.25rem, 1rem + 1vw, 1.75rem);
    margin-bottom: clamp(2rem, 4vw, 3rem);
}
.toc__title {
    font-family: var(--font-serif);
    font-size: var(--text-h3);
    margin-bottom: 1rem;
}
.toc__list,
.toc__sub {
    list-style: none;
    margin: 0;
    padding: 0;
}
.toc__sub {
    margin: 0.25rem 0 0.5rem 1rem;
}
.toc__link {
    display: block;
    padding: 0.3rem 0;
    font-size: var(--text-small);
    color: var(--accent-deep);
    text-decoration: none;
    transition: color var(--dur) var(--ease);
}
.toc__link:hover {
    color: var(--accent);
}
.toc__link--sub {
    color: var(--muted);
}
.toc__link--sub:hover {
    color: var(--accent-deep);
}

/* Article body: offset anchored headings under sticky header */
.article-body :deep(h2),
.article-body :deep(h3) {
    scroll-margin-top: 6rem;
}

/* CTA */
.article-footer {
    margin-top: clamp(2.5rem, 5vw, 4rem);
}
.cta-panel {
    background: var(--ink);
    border-color: var(--ink);
}
.cta-panel__title {
    font-family: var(--font-serif);
    font-size: var(--text-h3);
    color: #fff;
    margin-bottom: 0.5rem;
}
.cta-panel__desc {
    color: var(--night-muted);
    margin-bottom: 1.5rem;
}

/* Related */
.related {
    margin-top: clamp(3rem, 6vw, 5rem);
    padding-top: clamp(2rem, 4vw, 3rem);
    border-top: 1px solid var(--rule);
}
.related__title {
    margin-bottom: 2rem;
}
.related-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.5rem;
}
.related-card {
    display: flex;
    flex-direction: column;
    background: var(--paper-card);
    border: 1px solid var(--rule);
    border-radius: var(--radius);
    padding: clamp(1.25rem, 1rem + 1vw, 1.75rem);
    transition: border-color var(--dur) var(--ease),
        transform var(--dur) var(--ease);
}
.related-card:hover {
    border-color: var(--accent);
    transform: translateY(-3px);
}
.related-card__date {
    font-size: var(--text-caption);
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: var(--muted);
}
.related-card__title {
    font-family: var(--font-serif);
    font-size: 1.2rem;
    line-height: 1.2;
    margin-top: 0.5rem;
}
.related-card__title a {
    color: var(--ink);
    text-decoration: none;
    transition: color var(--dur) var(--ease);
}
.related-card:hover .related-card__title a {
    color: var(--accent-deep);
}
.related-card__desc {
    margin-top: 0.6rem;
    font-size: var(--text-small);
    color: var(--ink-soft);
    line-height: 1.6;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}
.related-card__tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.4rem;
    margin-top: 1rem;
}

@media (max-width: 560px) {
    .related-grid {
        grid-template-columns: 1fr;
    }
}
</style>
