<template lang="pug">
  .col.s12.m6.l8
    .card.orange.darken-3.bill-card
      .card-content.white-text
        .card-header
          span.card-title {{'ExchangeRates' | localize}}
        table
          thead
            tr
              th {{ 'Currency' | localize }}
              th {{ 'Exchange' | localize }}
              th {{ 'Date' | localize }}
          tbody
            tr(v-for="cur in currencies" :key="cur")
              td {{cur}}
              td {{rates[cur]}}
              td {{date | date('date')}}
</template>

<script>
export default {
  props: ['rates', 'date'],
  data() {
    return {
      currencies: ['RUB', 'USD', 'MYR'],
    };
  },
};
</script>
