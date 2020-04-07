<template lang="pug">
  div
    .page-title
      h3 История записей
    .history-chart
      canvas
    Loader(v-if="loading")

    p.center(v-else-if="!records.length") Записей пока нет

    section(v-else)
      HistoryTable(:records="records")
</template>

<script>
import HistoryTable from '@/components/HistoryTable.vue';

export default {
  name: 'history',

  data() {
    return {
      loading: false,
      records: [],
      categories: [],
    };
  },

  components: {
    HistoryTable,
  },
  async created() {
    const records = await this.$store.dispatch('fetchRecords');
    this.categories = await this.$store.dispatch('fetchCategories');
    // eslint-disable-next-line arrow-body-style
    this.records = records.map((record) => {
      return {
        ...record,
        categoryName: this.categories.find((c) => c.id === record.categoryID).title,
        typeClass: record.type === 'income' ? 'green' : 'red',
        typeText: record.type === 'income' ? 'Доход' : 'Расход',
      };
    });
    console.log(this.records);
    this.loading = false;
  },
};
</script>
