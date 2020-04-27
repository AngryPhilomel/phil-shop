<template>
  <div id="app">
    <div id="container-fluid">
      <component :is="layout">
        <router-view/>
      </component>
    </div>
    
  </div>
</template>

<script>
import MainLayout from './layouts/MainLayout'
export default {
  computed: {
    layout() {
      return (this.$route.meta.layout || 'main') + '-layout'
      // console.log(this.$route.meta.layout)
      // return 'main-layout'
    }
  },
  
  components: {
    MainLayout
  },

}
</script>

