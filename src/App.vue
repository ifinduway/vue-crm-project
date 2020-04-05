<template lang="pug">
#app
  component(:is="layout")
    router-view
</template>

<script>
import EmptyLayout from '@/layouts/EmptyLayout.vue';
import MainLayout from '@/layouts/MainLayout.vue';

export default {
  data() {
    return {
      Layout: 'main',
    };
  },

  components: {
    EmptyLayout,
    MainLayout,
  },
  computed: {
    layout() {
      // eslint-disable-next-line prefer-template
      return (this.$route.meta.layout || 'empty') + '-layout';
    },
  },
};
</script>

<style lang="stylus">
@import '~materialize-css/dist/css/materialize.min.css'
@import 'assets/index.css'
</style>
