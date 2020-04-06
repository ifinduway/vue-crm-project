<template lang="pug">
  div
    .page-title
      h3 Категории
    section
      .row
        CategoryCreate
        CategoryEdit
</template>

<script>
import CategoryCreate from '../components/CategoryCreate.vue';
import CategoryEdit from '../components/CategoryEdit.vue';

export default {
  name: 'categories',
  components: {
    CategoryCreate,
    CategoryEdit,
  },
};
</script>
