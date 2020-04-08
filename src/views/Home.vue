<template lang="pug">
  div
    .page-title
      h3 {{ 'BillTitle' | localize}}
      button.btn.waves-effect.waves-light.btn-small(
        @click="refresh"
      )
        i.material-icons refresh
    Loader(v-if="loading")
    .row(v-else)
      HomeBill(
        :rates="currency.rates"
      )
      HomeCurrency(
        :rates="currency.rates"
        :date="currency.date"
      )
</template>

<script>
import HomeBill from '@/components/HomeBill.vue';
import HomeCurrency from '@/components/HomeCurrency.vue';

export default {
  metaInfo() {
    return {
      title: this.$title('SideBarBill'),
    };
  },
  components: {
    HomeBill,
    HomeCurrency,
  },
  async mounted() {
    this.currency = await this.$store.dispatch('fetchCurrency');
    this.loading = false;
  },
  data() {
    return {
      loading: true,
      currency: null,
    };
  },
  methods: {
    async refresh() {
      this.loading = true;
      this.currency = await this.$store.dispatch('fetchCurrency');
      this.loading = false;
    },
  },
};
</script>
