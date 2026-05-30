<template>
    <section :id="id" class="faq-accordion">
        <h2 class="faq-accordion__title">{{ title }}</h2>
        <div class="faq-accordion__items">
            <details
                v-for="item in items"
                :id="item.id ?? undefined"
                :key="item.id ?? item.question"
                class="faq-item"
            >
                <summary class="faq-item__summary">
                    <span class="faq-item__question">{{ item.question }}</span>
                    <svg
                        class="faq-chevron"
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        aria-hidden="true"
                    >
                        <path d="m6 9 6 6 6-6" />
                    </svg>
                </summary>
                <div class="faq-item__answer">
                    <ContentRenderer
                        :value="{
                            body: {
                                type: 'minimark',
                                value: item.answerNodes,
                            },
                        }"
                    />
                </div>
            </details>
        </div>
    </section>
</template>

<script setup>
defineProps({
    id: { type: String, default: 'veelgestelde-vragen' },
    title: { type: String, required: true },
    items: { type: Array, required: true },
})
</script>

<style scoped>
/* The h2.faq-accordion__title inherits all .prose-editorial h2 styles
   (font, size, border-top, padding-top, margin) from the parent .prose-editorial
   wrapper, so it reads identically to every other section heading. */
.faq-accordion__items {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    margin-top: 0;
}

.faq-item {
    border: 1px solid var(--rule);
    border-radius: var(--radius);
    background: var(--paper-card);
    scroll-margin-top: 6rem;
    transition: border-color var(--dur) var(--ease);
    overflow: hidden;
}

.faq-item[open] {
    border-color: var(--rule-strong);
}

.faq-item__summary {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 1rem;
    padding: 1rem 1.25rem;
    cursor: pointer;
    list-style: none;
    -webkit-user-select: none;
    user-select: none;
    transition: background var(--dur) var(--ease);
}

.faq-item__summary::-webkit-details-marker {
    display: none;
}

.faq-item__summary:hover {
    background: var(--paper-warm);
}

.faq-item[open] > .faq-item__summary {
    border-bottom: 1px solid var(--rule);
}

.faq-item__question {
    font-family: var(--font-serif);
    font-weight: 700;
    font-size: var(--text-h3);
    color: var(--ink);
    line-height: 1.25;
    text-wrap: balance;
}

.faq-chevron {
    flex-shrink: 0;
    margin-top: 0.2rem;
    color: var(--muted);
    transition: transform var(--dur) var(--ease), color var(--dur) var(--ease);
}

.faq-item[open] .faq-chevron {
    transform: rotate(180deg);
    color: var(--accent-deep);
}

.faq-item__answer {
    padding: 0.9rem 1.25rem 1.25rem;
    font-size: var(--text-body);
    color: var(--ink-soft);
    line-height: 1.8;
}

/* Answer content rendered by ContentRenderer lives inside .prose-editorial,
   so p/a/strong/li are already styled. These rules only fill the gap where
   the ContentRenderer wrapper div resets the first-child margin. */
.faq-item__answer :deep(> div > p:first-child),
.faq-item__answer :deep(> div > ul:first-child),
.faq-item__answer :deep(> div > ol:first-child) {
    margin-top: 0;
}

.faq-item__answer :deep(> div > p:last-child),
.faq-item__answer :deep(> div > ul:last-child),
.faq-item__answer :deep(> div > ol:last-child) {
    margin-bottom: 0;
}
</style>
