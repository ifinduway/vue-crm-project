<template lang="pug">
  .col.s12.m6.l4
    .card.light-blue.bill-card
      .card-content.white-text
        span.card-title Счет в валюте
        p.currency-line(
          v-for="cur in currencies"
          :key="currency"
        )
          span {{getCurrenct(cur) | currency(cur)}}
</template>

<script>
export default {
  props: ['rates'],
  data() {
    return {
      currencies: ['RUB', 'USD', 'EUR'],
    };
  },
  computed: {
    base() {
      // eslint-disable-next-line quotes
      return this.$store.getters.info.bill / (this.rates.RUB / this.rates.EUR);
    },
  },
  methods: {
    getCurrenct(currency) {
      return Math.floor(this.base * this.rates[currency]);
    },
  },
};
</script>
