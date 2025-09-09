<template>
  <div class="p-8">
    <h1 class="text-2xl font-bold mb-4">API Test</h1>
    
    <div class="space-y-4">
      <div class="bg-gray-100 p-4 rounded">
        <h2 class="font-bold">Test 1: Direct API call with /blog path</h2>
        <pre>{{ test1 }}</pre>
      </div>
      
      <div class="bg-gray-100 p-4 rounded">
        <h2 class="font-bold">Test 2: Direct API call with blog path (no slash)</h2>
        <pre>{{ test2 }}</pre>
      </div>
      
      <div class="bg-gray-100 p-4 rounded">
        <h2 class="font-bold">Test 3: API call with where filter</h2>
        <pre>{{ test3 }}</pre>
      </div>

      <div class="bg-gray-100 p-4 rounded">
        <h2 class="font-bold">Test 4: API call with no params</h2>
        <pre>{{ test4 }}</pre>
      </div>
    </div>
  </div>
</template>

<script setup>
// Test different API calls
const test1 = ref(null)
const test2 = ref(null)
const test3 = ref(null)
const test4 = ref(null)

onMounted(async () => {
  // Test 1: With /blog
  try {
    const result = await $fetch('/api/_content/query', {
      params: { _path: '/blog' }
    })
    test1.value = JSON.stringify(result, null, 2)
  } catch (e) {
    test1.value = 'Error: ' + e.message
  }

  // Test 2: With blog (no slash)
  try {
    const result = await $fetch('/api/_content/query', {
      params: { _path: 'blog' }
    })
    test2.value = JSON.stringify(result, null, 2)
  } catch (e) {
    test2.value = 'Error: ' + e.message
  }

  // Test 3: With where filter
  try {
    const result = await $fetch('/api/_content/query', {
      params: { 
        where: JSON.stringify({ _path: { $contains: '/blog' } })
      }
    })
    test3.value = JSON.stringify(result, null, 2)
  } catch (e) {
    test3.value = 'Error: ' + e.message
  }

  // Test 4: No params
  try {
    const result = await $fetch('/api/_content/query')
    test4.value = JSON.stringify(result, null, 2)
  } catch (e) {
    test4.value = 'Error: ' + e.message
  }
})
</script>