<template lang="pug">
  div
    .page-title
      h3 История записей
    .history-chart
      canvas(ref="canvas")
    Loader(v-if="loading")

    p.center(v-else-if="!records.length") Записей пока нет

    section(v-else)
      HistoryTable(:records="records")
</template>

<script>
import HistoryTable from '@/components/HistoryTable.vue';
import { Pie } from 'vue-chartjs';


export default {
  name: 'history',
  extends: Pie,
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

  async mounted() {
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
    this.loading = false;

    this.renderChart({
      labels: this.categories.map((c) => c.title),
      datasets: [{
        label: 'Расходы по категориям',
        // eslint-disable-next-line arrow-body-style
        data: this.categories.map((c) => {
          return this.records.reduce((total, record) => {
            if (record.categoryID === c.id && record.type === 'outcome') {
              // eslint-disable-next-line no-param-reassign
              total += record.amount;
            }
            return total;
          }, 0);
        }),
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      }],
    });
  },
};
</script>
