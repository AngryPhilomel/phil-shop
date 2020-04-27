<template>
  <div class="container">
    <Loader v-if="loading"/>
    <div v-else class="row">
      <HomeCard v-for="i in items" :key="i.id" :item="i"/>
    </div>
  </div>
</template>

<script>
import HomeCard from '@/components/HomeCard'

export default {
  name: 'Home',
  data: () => ({
    items: [],
    loading: true
  }),
  async mounted() {
    this.items = await this.$store.dispatch('fetchItems')
    this.loading = false
  },
  components: {
    HomeCard
  },
}
</script>
