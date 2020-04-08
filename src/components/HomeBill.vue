<template lang="pug">
  .col.s12.m6.l4
    .card.light-blue.bill-card
      .card-content.white-text
        span.card-title {{'BillCurrency' | localize}}
          p.currency-line(
            v-for="cur in currencies"
            :key="cur"
          )
            span {{getCurrenct(cur) | currency(cur)}}
</template>

<script>
export default {
  props: ['rates'],
  data() {
    return {
      currencies: ['RUB', 'USD', 'MYR'],
    };
  },
  computed: {
    base() {
      // eslint-disable-next-line quotes
      return this.$store.getters.info.bill / (this.rates.RUB / this.rates.USD);
    },
  },
  methods: {
    getCurrenct(currency) {
      return Math.floor(this.base * this.rates[currency]);
    },
  },
};
</script>
