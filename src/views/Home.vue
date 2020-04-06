<template lang="pug">
  div
    .page-title
      h3 Счет
      button.btn.waves-effect.waves-light.btn-small
        i.material-icons refresh
    .row
      HomeBill
      HomeCurrency

</template>

<script>
import HomeBill from '@/components/HomeBill.vue';
import HomeCurrency from '@/components/HomeCurrency.vue';

export default {
  components: {
    HomeBill,
    HomeCurrency,
  },
};
</script>
