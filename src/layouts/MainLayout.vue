<template lang="pug">
  .app-main-layout
    Navbar(@click="isOpen = !isOpen")
    Sidebar(v-model="isOpen")
    main.app-content(:class="{full: !isOpen }")
      .app-page
        router-view

    .fixed-action-btn
      router-link.btn-floationg.btn-large.blue(to="/record")
        i.large.material-icons add
</template>

<script>
import Navbar from '@/components/app/Navbar.vue';
import Sidebar from '@/components/app/Sidebar.vue';

export default {
  name: 'main-layout',
  data() {
    return {
      isOpen: true,
    };
  },
  async mounted() {
    if (!Object.keys(this.$store.getters.info).length) {
      await this.$store.dispatch('fetchInfo');
    }
  },
  components: {
    Navbar,
    Sidebar,
  },
};
</script>
