<template>
  <div class="min-h-screen bg-gray-50 p-8">
    <div class="max-w-4xl mx-auto">
      <h1 class="text-3xl font-bold mb-8">Simple Blog Test</h1>
      
      <!-- Loading State -->
      <div v-if="pending" class="text-blue-600">
        Loading posts...
      </div>
      
      <!-- Error State -->
      <div v-else-if="error" class="bg-red-100 p-4 rounded">
        <h2 class="text-red-800 font-bold">Error:</h2>
        <pre>{{ error }}</pre>
      </div>
      
      <!-- Success State -->
      <div v-else>
        <div class="bg-green-100 p-4 rounded mb-6">
          <p class="text-green-800">✅ Successfully loaded {{ posts?.length || 0 }} posts</p>
        </div>
        
        <!-- Posts List -->
        <div v-if="posts && posts.length > 0" class="space-y-6">
          <article v-for="post in posts" :key="post._path" class="bg-white p-6 rounded shadow">
            <h2 class="text-xl font-semibold mb-2">{{ post.title }}</h2>
            <p class="text-gray-600 mb-2">{{ post.description }}</p>
            <div class="text-sm text-gray-500">
              <span>Date: {{ post.date }}</span>
              <span class="ml-4">Path: {{ post._path }}</span>
            </div>
            <div v-if="post.tags" class="mt-2">
              <span v-for="tag in post.tags" :key="tag" class="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded mr-2">
                {{ tag }}
              </span>
            </div>
          </article>
        </div>
        
        <!-- No Posts -->
        <div v-else class="bg-yellow-100 p-4 rounded">
          <p class="text-yellow-800">No posts found in the content/blog directory</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { queryContent } from '@nuxt/content';
// Simple fetch without any sorting or complex logic
const { data: posts, pending, error } = await useAsyncData(
  'simple-blog-posts',
  async () => {
    try {
      // Use queryContent if available
      if (typeof queryContent !== 'undefined') {
        return await queryContent('blog').find()
      } else {
        // Fallback to direct API call
        return await $fetch('/api/_content/query', {
          method: 'GET',
          params: {
            _path: '/blog'
          }
        })
      }
    } catch (e) {
      console.error('Error fetching blog posts:', e)
      return []
    }
  }
)

// Log the results
onMounted(() => {
  console.log('Simple blog page mounted')
  console.log('Posts:', posts.value)
  console.log('Pending:', pending.value)
  console.log('Error:', error.value)
})
</script>