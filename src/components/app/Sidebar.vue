<template lang="pug">
    ul.sidenav.app-sidenav(:class="{open: value}")
      router-link(tag='li' active-class="active"
      v-for="link in links" :key="link.url"
      :to="link.url" :exact="link.exact")
        a.waves-effect.waves-orange.pointer {{ link.title }}
</template>

<script>
import localizeFilter from '@/filters/localize.filter';

export default {
  props: ['value'],
  data() {
    return {
      links: [
        {
          title: localizeFilter('SideBarBill'),
          url: '/',
          exact: true,
        },
        {
          title: localizeFilter('SideBarHistory'),
          url: '/history',
        },
        {
          title: localizeFilter('SideBarPlanning'),
          url: '/planning',
        },
        {
          title: localizeFilter('SideBarRecord'),
          url: '/record',
        },
        {
          title: localizeFilter('SideBarCategories'),
          url: '/categories',
        },
      ],
    };
  },
};
</script>
