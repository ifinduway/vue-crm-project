<template lang="pug">
  div
    Loader(v-if="loading")
    div(v-else-if="record")
      .breadcrumb-wrap
        router-link.breadcrumb(to="/history") История
        a.breadcrumb
         | {{record.typeText}}
      .row
        .col.s12.m6
          .card(:class="[record.typeClass]")
            .card-content.white-text
              p Описание: {{record.description}}
              p Сумма: {{record.amount | currency}}
              p Категория: {{record.categoryName}}
              small {{record.date | date('datetime')}}
    p.center(v-else) Запись с id={{$route.params.id}} не найдена
</template>

<script>
export default {
  name: 'detail',
  data() {
    return {
      record: null,
      loading: true,
    };
  },

  async created() {
    const { id } = this.$route.params;
    const record = await this.$store.dispatch('fetchRecordsById', id);
    const category = await this.$store.dispatch('fetchCategoryById', record.categoryId);

    this.record = {
      ...record,
      categoryName: category.title,
      typeClass: record.type === 'income' ? 'green' : 'red',
      typeText: record.type === 'income' ? 'Доход' : 'Расход',
    };
    console.log(this.record);
    this.loading = false;
  },
};
</script>
