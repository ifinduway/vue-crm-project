<template lang="pug">
  table
    thead
      tr
        th #
        th {{ 'DetailAmount' | localize }}
        th {{ 'Date' | localize }}
        th {{ 'DetailCategory' | localize }}
        th {{ 'DetailType' | localize }}
        th {{ 'DetailCategory' | localize }}
    tbody
      tr(v-for="(record, index) in records" :key="record.id")
        td {{index + 1}}
        td {{record.amount | currency('RUB')}}
        td {{record.date | date('datetime')}}
        td {{record.categoryName}}
        td
          span.white-text.badge(
            :class="[record.typeClass]"
          ) {{record.typeText}}
        td
          button.btn-small.btn(
            @click="$router.push(`/detail/${record.id}`)"
            v-tooltip="'Посмотреть запись'"
            )
            i.material-icons open_in_new
</template>

<script>
export default {
  props: {
    records: {
      required: true,
      type: Array,
    },
  },
};
</script>
