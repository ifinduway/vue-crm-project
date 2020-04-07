<template lang="pug">
  div
    .page-title
      h3 Категории
    section
      Loader(v-if="loading")
      .row(v-else)
        CategoryCreate(@created="addNewCategory")
        CategoryEdit(
          v-if="categories.length"
          :categories="categories"
          :key="categories.length + updateCount"
          @updated="updateCategories")
        p.center(v-else) Нету нихуя
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

  data() {
    return {
      categories: [],
      loading: true,
      updateCount: 0,
    };
  },


  async mounted() {
    this.categories = await this.$store.dispatch('fetchCategories');
    console.log(this.categories);
    this.loading = false;
  },


  methods: {

    addNewCategory(category) {
      this.categories.push(category);
    },

    updateCategories(category) {
      const idx = this.categories.findIndex((c) => c.id === category.id);
      this.categories[idx].title = category.title;
      this.categories[idx].limit = category.limit;
      this.updateCount += 1;
    },
  },
};
</script>
