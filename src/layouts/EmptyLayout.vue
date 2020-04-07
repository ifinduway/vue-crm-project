<template lang="pug">
  .grey.darken-1.empty-layout
    router-view
</template>

<script>
import messages from '@/utils/messages';

export default {
  computed: {
    error() {
      return this.$store.getters.error;
    },
  },
  watch: {
    error(frbError) {
      this.$error(messages[frbError.code] || 'Что-то пошло не так');
    },
  },
};
</script>

<style lang="stylus" scoped>
</style>
