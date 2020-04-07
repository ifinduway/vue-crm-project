<template lang="pug">
  div
    .page-title
      h3 Планирование
      h4 {{info.bill | currency('RUB')}}
    Loader(v-if="loading")
    p(v-else-if="!categories.length") Категорий пока нет
      router-link(to="/categories") СОЗДАТЬ
    section(v-else)
      div(v-for="cat in categories" :key="cat.id")
        p
          strong {{cat.title}}:
          | {{cat.spend}} из {{cat.limit}}
        .progress(v-tooltip="getTooltip(cat.limit,cat.spend)")
          .determinate(
            :style="{width: `${cat.progressPercent}%`}"
            :class="getPercentClass(cat.progressPercent)"
            )
</template>

<script>
import { mapGetters } from 'vuex';
import currencyFilter from '@/filters/currency.filter';

export default {
  data() {
    return {
      loading: true,
      categories: [],
    };
  },

  computed: {
    ...mapGetters(['info']),
  },

  async created() {
    const [records, categories] = await Promise.all([this.$store.dispatch('fetchRecords'), this.$store.dispatch('fetchCategories')]);

    this.categories = categories.map((cat) => {
      const spend = records
        .filter((r) => r.categoryID === cat.id && r.type === 'outcome')
        .reduce((total, record) => total + +record.amount, 0);
      const percent = ((spend / cat.limit) * 100);
      const progressPercent = percent > 100 ? 100 : percent;
      return {
        ...cat,
        progressPercent,
        spend,
      };
    });
    this.loading = false;
  },

  methods: {
    getPercentClass(percent) {
      if (percent < 60) return 'green';
      if (percent < 100) return 'yellow';
      return 'red';
    },
    getTooltip(limit, spend) {
      const tooltipValue = limit - spend;
      return `${tooltipValue < 0 ? 'Превышение: ' : 'Осталось: '}${currencyFilter(Math.abs(tooltipValue))}`;
    },
  },
};
</script>
