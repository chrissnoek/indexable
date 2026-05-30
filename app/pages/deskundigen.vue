<template>
    <div>
        <Header />

        <main>
            <!-- Hero -->
            <section class="disc-hero">
                <div class="wrap wrap--narrow">
                    <span class="notice-tag">Binnenkort beschikbaar</span>
                    <h1 class="text-display disc-hero__title">
                        Vind de juiste deskundige voor uw zaak
                    </h1>
                    <p class="lede disc-hero__lede">
                        Wij bouwen op dit moment ons netwerk uit van
                        gecertificeerde gerechtelijk deskundigen in heel
                        Nederland — medisch, bouwkundig, financieel, forensisch
                        en IT. Heeft u nu al een deskundige nodig voor uw zaak?
                        Neem rechtstreeks contact met ons op.
                    </p>

                    <!-- Spam-proof email CTA -->
                    <button
                        class="btn btn--primary btn--lg"
                        @click="sendEmail"
                    >
                        <span class="btn__label">
                            Stuur ons uw vraag
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                aria-hidden="true"
                            >
                                <path d="M5 12h14" />
                                <path d="m12 5 7 7-7 7" />
                            </svg>
                        </span>
                    </button>

                    <p class="disc-hero__note">
                        We reageren binnen één werkdag.
                    </p>

                    <!-- Honeypot: invisible field. Bots fill it; humans don't. -->
                    <input
                        v-model="honeypot"
                        type="text"
                        name="website"
                        tabindex="-1"
                        autocomplete="off"
                        aria-hidden="true"
                        class="absolute opacity-0 pointer-events-none -z-10 left-[-9999px]"
                    />
                </div>
            </section>

            <!-- Categories preview -->
            <section class="section section--paper-warm">
                <div class="wrap">
                    <div class="section-head section-head--center">
                        <p class="eyebrow">Netwerk in opbouw</p>
                        <h2 class="text-h1">Vakgebieden die wij dekken</h2>
                        <p class="lede">
                            Ons netwerk omvat gecertificeerde deskundigen in vijf
                            hoofdgebieden.
                        </p>
                    </div>
                    <hr class="rule" style="margin: 2.5rem 0" />

                    <div class="fieldgrid">
                        <div
                            v-for="category in categories"
                            :key="category.id"
                            class="fieldcard"
                        >
                            <div class="fieldcard__icon" aria-hidden="true">
                                {{ category.icon }}
                            </div>
                            <div class="fieldcard__name">
                                {{ category.name }}
                            </div>
                            <div class="fieldcard__desc">
                                {{ category.description }}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <!-- What to include -->
            <section class="section">
                <div class="wrap wrap--mid">
                    <div class="section-head section-head--center">
                        <p class="eyebrow">Uw aanvraag</p>
                        <h2 class="text-h1">Wat heeft u nodig in uw bericht?</h2>
                        <p class="lede">
                            Hoe gerichter uw vraag, hoe sneller wij u kunnen
                            helpen.
                        </p>
                    </div>
                    <hr class="rule" style="margin: 2.5rem 0" />

                    <ul class="req-list">
                        <li
                            v-for="item in checklist"
                            :key="item"
                            class="req-item"
                        >
                            <span
                                class="req-item__num"
                                aria-hidden="true"
                            ></span>
                            <span class="req-item__text">{{ item }}</span>
                        </li>
                    </ul>

                    <div class="disc-cta">
                        <button
                            class="btn btn--primary btn--lg"
                            @click="sendEmail"
                        >
                            <span class="btn__label">
                                Neem nu contact op
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    aria-hidden="true"
                                >
                                    <path d="M5 12h14" />
                                    <path d="m12 5 7 7-7 7" />
                                </svg>
                            </span>
                        </button>
                    </div>
                </div>
            </section>
        </main>

        <Footer />
    </div>
</template>

<script setup lang="ts">
import Header from '~/components/Header.vue';
import Footer from '~/components/Footer.vue';

useSeoMeta({
    title: 'Gerechtelijk Deskundigen vinden | Deskundigewijzer',
    description: 'Zoek gecertificeerde gerechtelijk deskundigen in Nederland. Medisch, bouwkundig, financieel, forensisch en IT-deskundigen. Neem direct contact op voor een match op uw zaak.',
    ogTitle: 'Gerechtelijk Deskundigen vinden | Deskundigewijzer',
    ogDescription: 'Gecertificeerde gerechtelijk deskundigen in Nederland — medisch, bouwkundig, financieel, forensisch en IT. Neem contact op voor een match op uw zaak.',
    ogType: 'website',
});

const honeypot = ref('');

// Email assembled at runtime so bots scraping the static HTML never see a mailto link.
const emailParts = ['info', 'deskundigewijzer.nl'];

const sendEmail = () => {
  // If a bot tripped the honeypot, silently do nothing.
  if (honeypot.value) return;
  const address = `${emailParts[0]}@${emailParts[1]}`;
  const subject = encodeURIComponent('Aanvraag deskundige via deskundigewijzer.nl');
  const body = encodeURIComponent(
    'Beste team,\n\n' +
    'Ik zoek een gerechtelijk deskundige voor de volgende zaak:\n\n' +
    '- Vakgebied: \n' +
    '- Aard van de zaak: \n' +
    '- Gewenste regio: \n' +
    '- Tijdsbestek: \n\n' +
    'Met vriendelijke groet,\n'
  );
  window.location.href = `mailto:${address}?subject=${subject}&body=${body}`;
};

const categories = [
  { id: 'medical', name: 'Medisch', icon: '⚕️', description: 'Letselschade, aansprakelijkheid' },
  { id: 'construction', name: 'Bouwkundig', icon: '🏗️', description: 'Geschillen, opnames' },
  { id: 'financial', name: 'Financieel', icon: '💼', description: 'Waardering, schade' },
  { id: 'forensic', name: 'Forensisch', icon: '🔬', description: 'DNA, technisch onderzoek' },
  { id: 'it', name: 'IT', icon: '💻', description: 'Cybercrime, datageschillen' },
];

const checklist = [
  'Het vakgebied waarvoor u een deskundige zoekt (medisch, bouwkundig, etc.)',
  'Een korte beschrijving van de zaak en de specifieke vraagstelling',
  'De gewenste regio of of een landelijke deskundige acceptabel is',
  'Het beoogde tijdsbestek voor het onderzoek',
  'Of de deskundige door de rechtbank benoemd moet worden of als partijdeskundige optreedt',
];
</script>

<style scoped>
.disc-hero {
    text-align: center;
    padding-block: clamp(3.5rem, 2rem + 7vw, 7rem);
    border-bottom: 1px solid var(--rule);
}
.notice-tag {
    display: inline-block;
    font-size: var(--text-caption);
    text-transform: uppercase;
    letter-spacing: 0.16em;
    font-weight: 600;
    color: var(--accent-deep);
    border: 1px solid var(--accent);
    border-radius: var(--radius);
    padding: 0.4rem 0.85rem;
    margin-bottom: 1.5rem;
}
.disc-hero__title {
    margin: 0 auto;
    max-width: 18ch;
}
.disc-hero__lede {
    margin: 1.5rem auto 2.25rem;
    max-width: 60ch;
}
.disc-hero__note {
    margin-top: 1rem;
    font-size: var(--text-small);
    color: var(--muted);
}
.btn__label svg {
    width: 18px;
    height: 18px;
}

/* Vakgebieden grid */
.fieldgrid {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 1.25rem;
}
.fieldcard {
    text-align: center;
    background: var(--paper-card);
    border: 1px solid var(--rule);
    border-radius: var(--radius);
    padding: clamp(1.25rem, 1rem + 1vw, 1.85rem);
    transition: border-color var(--dur) var(--ease),
        transform var(--dur) var(--ease);
}
.fieldcard:hover {
    border-color: var(--accent);
    transform: translateY(-3px);
}
.fieldcard__icon {
    font-size: 2.25rem;
    line-height: 1;
    margin-bottom: 0.75rem;
}
.fieldcard__name {
    font-family: var(--font-serif);
    font-weight: 700;
    font-size: var(--text-h3);
    color: var(--ink);
}
.fieldcard__desc {
    margin-top: 0.5rem;
    font-size: var(--text-small);
    color: var(--muted);
}

/* Checklist */
.req-list {
    counter-reset: req;
    list-style: none;
    margin: 0 auto;
    padding: 0;
    max-width: 64ch;
}
.req-item {
    counter-increment: req;
    display: flex;
    align-items: flex-start;
    gap: 1.1rem;
    padding: 1.1rem 0;
    border-bottom: 1px solid var(--rule);
}
.req-item:last-child {
    border-bottom: 0;
}
.req-item__num {
    flex-shrink: 0;
    font-family: var(--font-serif);
    font-size: 1.1rem;
    font-weight: 600;
    color: var(--accent);
    line-height: 1.55;
}
.req-item__num::before {
    content: counter(req, decimal-leading-zero);
}
.req-item__text {
    color: var(--ink-soft);
    line-height: 1.6;
}
.disc-cta {
    text-align: center;
    margin-top: clamp(2rem, 4vw, 3rem);
}

@media (max-width: 1024px) {
    .fieldgrid {
        grid-template-columns: repeat(3, 1fr);
    }
}
@media (max-width: 560px) {
    .fieldgrid {
        grid-template-columns: 1fr 1fr;
    }
}
</style>
