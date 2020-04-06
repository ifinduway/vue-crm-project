<template lang="pug">
  .col.s12.m6
    div
      .page-subtitle
        h4 Создать
      form(@submit.prevent="submitHandler")
        .input-field
          input#name(
            type="text"
            v-model="title"
            :class="{invalid: $v.title.$dirty && !$v.title.required}"
            )
          label(for="name") Название
          span.helper-text(v-if="$v.title.$dirty && !$v.title.required") Введите название категории
        .input-field
          input(
            type="number"
            v-model.number="limit"
            :class="{invalid: $v.limit.$dirty && !$v.limit.minValue}"
            )
          label(for="limit") Лимит
          span.helper-text(
            v-if="$v.limit.$dirty && !$v.limit.minValue"
            ) Мин. значение {{$v.limit.$params.minValue.min}}
        button.btn.waves-effect.waves-light(type="submit")
          | Создать
          i.material-icons.right send
</template>

<script>
import { required, minValue } from 'vuelidate/lib/validators';

export default {
  data() {
    return {
      title: '',
      limit: 100,
    };
  },
  validations: {
    title: { required },
    limit: { minValue: minValue(100) },
  },
  methods: {
    // eslint-disable-next-line consistent-return
    async submitHandler() {
      if (this.$v.$invalid) {
        console.log(this.$v.limit);
        this.$v.$touch();
        return 0;
      }

      try {
        const category = await this.$store.dispatch('createCategory', {
          title: this.title,
          limit: this.limit,
        });
        console.log(category);
      } catch (e) { console.log('Category Create ERROR'); }
    },
  },
  mounted() {
    // eslint-disable-next-line no-undef
    M.updateTextFields();
  },
};
</script>
