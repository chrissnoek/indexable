<template>
  <div>
    <h1>Test Blog Content</h1>
    <div v-if="pending">Loading...</div>
    <div v-else-if="error">Error: {{ error }}</div>
    <div v-else>
      <p>Total posts found: {{ posts?.length || 0 }}</p>
      <pre>{{ JSON.stringify(posts, null, 2) }}</pre>
    </div>
  </div>
</template>

<script setup>
// Test fetching blog posts
const { data: posts, pending, error } = await useAsyncData('test-blog-posts', () => 
  queryContent('blog').find()
)

console.log('Posts fetched:', posts.value)
</script>