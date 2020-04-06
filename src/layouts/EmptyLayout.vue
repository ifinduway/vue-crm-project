<template lang="pug">
  .grey.darken-1.empty-layout
    router-view
</template>

<script>
export default {
  computed: {
    error() {
      return this.$store.getters.error;
    },
  },
  watch: {
    error(frbError) {
      console.log(frbError);
    },
  },
};
</script>

<style lang="stylus" scoped>
</style>
