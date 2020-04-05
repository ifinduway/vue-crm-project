<template lang="pug">
    ul.sidenav.app-sidenav(:class="{open: value}")
      router-link(tag='li' active-class="active"
      v-for="link in links" :key="link.url"
      :to="link.url" :exact="link.exact")
        a.waves-effect.waves-orange.pointer {{ link.title }}
</template>

<script>
export default {
  props: ['value'],
  data() {
    return {
      links: [
        {
          title: 'Счет',
          url: '/',
          exact: true,
        },
        {
          title: 'История',
          url: '/history',
        },
        {
          title: 'Планирование',
          url: '/planning',
        },
        {
          title: 'Новая запись',
          url: '/record',
        },
        {
          title: 'Категория',
          url: '/categories',
        },
      ],
    };
  },
};
</script>
