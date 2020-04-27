 <!--  -->
<template>
  <div role="alert" aria-live="assertive" aria-atomic="true" class="toast" data-autohide="false" style="position: absolute; top: 7%; left: 0%; z-index: 10000;">
  <div class="toast-header">
    <strong class="mr-auto">Уведомление</strong>
    <button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>
  <div class="toast-body">
    {{message}}
  </div>
</div>  
</template>

<script>
export default {
  computed:{
    message() {
      return this.$store.getters.message
    }
  }
}
</script>
    <!--  -->