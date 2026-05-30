<template>
  <div class="min-h-screen bg-slate-100">
    <Header />

    <main>
      <!-- Hero -->
      <section class="relative overflow-hidden bg-white">
        <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 text-center">
          <span class="inline-block bg-cyan-100 text-cyan-700 px-4 py-1.5 rounded-full text-sm font-medium mb-6">
            Binnenkort beschikbaar
          </span>
          <h1 class="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Vind de juiste deskundige voor uw zaak
          </h1>
          <p class="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-10">
            Wij bouwen op dit moment ons netwerk uit van gecertificeerde gerechtelijk deskundigen
            in heel Nederland — medisch, bouwkundig, financieel, forensisch en IT.
            Heeft u nu al een deskundige nodig voor uw zaak? Neem rechtstreeks contact met ons op.
          </p>

          <!-- Spam-proof email CTA -->
          <button
            @click="sendEmail"
            class="inline-flex items-center gap-2 px-8 py-4 bg-cyan-700 hover:bg-cyan-800 text-white text-lg font-semibold rounded-xl transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            <span>Stuur ons uw vraag</span>
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </button>

          <p class="text-sm text-gray-500 mt-4">
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
      <section class="py-20 bg-gray-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-14">
            <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Vakgebieden die wij dekken
            </h2>
            <p class="text-gray-600 text-lg max-w-2xl mx-auto">
              Ons netwerk omvat gecertificeerde deskundigen in vijf hoofdgebieden.
            </p>
          </div>

          <div class="grid grid-cols-2 md:grid-cols-5 gap-6">
            <div
              v-for="category in categories"
              :key="category.id"
              class="p-6 bg-white rounded-2xl border-2 border-gray-100 text-center"
            >
              <div class="text-5xl mb-3">{{ category.icon }}</div>
              <div class="font-bold text-gray-900">{{ category.name }}</div>
              <div class="text-sm text-gray-500 mt-2">{{ category.description }}</div>
            </div>
          </div>
        </div>
      </section>

      <!-- What to include -->
      <section class="py-20 bg-white">
        <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-12">
            <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Wat heeft u nodig in uw bericht?
            </h2>
            <p class="text-gray-600 text-lg">
              Hoe gerichter uw vraag, hoe sneller wij u kunnen helpen.
            </p>
          </div>

          <ul class="space-y-4">
            <li
              v-for="item in checklist"
              :key="item"
              class="flex items-start gap-4 bg-slate-50 p-5 rounded-xl"
            >
              <span class="flex-shrink-0 w-7 h-7 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold text-sm">✓</span>
              <span class="text-gray-700 text-lg leading-relaxed">{{ item }}</span>
            </li>
          </ul>

          <div class="text-center mt-12">
            <button
              @click="sendEmail"
              class="inline-flex items-center gap-2 px-8 py-4 bg-cyan-700 hover:bg-cyan-800 text-white text-lg font-semibold rounded-xl transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              <span>Neem nu contact op</span>
              <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
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

useHead({
  title: 'Vind een gerechtelijk deskundige | Deskundigewijzer',
});

useSeoMeta({
  title: 'Vind een gerechtelijk deskundige | Deskundigewijzer',
  description:
    'Op zoek naar een gecertificeerde gerechtelijk deskundige? Wij bouwen het Nederlandse netwerk uit ' +
    'van medische, bouwkundige, financiële, forensische en IT-deskundigen. Neem rechtstreeks contact op.',
  ogTitle: 'Vind een gerechtelijk deskundige | Deskundigewijzer',
  ogDescription:
    'Gecertificeerde gerechtelijk deskundigen in Nederland — ons netwerk in opbouw. Neem contact op voor een match.',
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
@reference "tailwindcss";
</style>
