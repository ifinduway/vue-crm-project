<template lang="pug">
  .Loader(v-if="loading")
  .app-main-layout(v-else)
    Navbar(@click="isOpen = !isOpen")
    Sidebar(v-model="isOpen" :key="locale")
    main.app-content(:class="{full: !isOpen }")
      .app-page
        router-view

    .fixed-action-btn
      router-link.btn-floationg.btn-large.blue(to="/record" v-tooltip="'Создать новую запись'")
        i.large.material-icons add
</template>

<script>
import Navbar from '@/components/app/Navbar.vue';
import Sidebar from '@/components/app/Sidebar.vue';
import messages from '@/utils/messages';

export default {
  name: 'main-layout',
  data() {
    return {
      isOpen: true,
      loading: true,
    };
  },
  async mounted() {
    if (!Object.keys(this.$store.getters.info).length) {
      await this.$store.dispatch('fetchInfo');
    }
    this.loading = false;
  },
  components: {
    Navbar,
    Sidebar,
  },
  computed: {
    error() {
      return this.$store.getters.error;
    },
    locale() {
      return this.$store.getters.info.locale;
    },
  },
  watch: {
    error(frbError) {
      this.$error(messages[frbError.code] || 'Что-то пошло не так');
    },
  },
};
</script>
