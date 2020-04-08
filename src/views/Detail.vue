<template lang="pug">
  div
    Loader(v-if="loading")
    div(v-else-if="record")
      .breadcrumb-wrap
        router-link.breadcrumb(to="/history") {{ 'DetailHistory' | localize }}
        a.breadcrumb
         | {{record.typeText}}
      .row
        .col.s12.m6
          .card(:class="[record.typeClass]")
            .card-content.white-text
              p {{ 'DetailDescription' | localize }}: {{record.description}}
              p {{ 'DetailAmount' | localize }}: {{record.amount | currency}}
              p {{ 'DetailCategory' | localize }}: {{record.categoryName}}
              small {{record.date | date('datetime')}}
    p.center(v-else) Запись с id={{$route.params.id}} не найдена
</template>

<script>
import localizeFilter from '@/filters/localize.filter';

export default {
  metaInfo() {
    return {
      title: this.$title('Details'),
    };
  },

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
      typeText: record.type === 'income' ? localizeFilter('income') : localizeFilter('outcome'),
    };
    this.loading = false;
  },
};
</script>
