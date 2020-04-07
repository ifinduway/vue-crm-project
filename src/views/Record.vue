/* eslint-disable no-undef */
<template lang="pug">
  div
    .page-title
      h3 Новая запись
    Loader(v-if="loading")
    p.center(v-else-if="!categories.length") категорий пока нет.
      router-link(to="/categories") Добавить новую категорию
    form.form(v-else @submit.prevent="submitHandler")
      .input-field
        select(ref="select" v-model="category")
          option(v-for="c in categories" :key="c.id" :value="c.id") {{c.title}}
        label Выбери категорию
      p
        label
          input.with-gap(name="type" type="radio" value="income" v-model="type")
          span Доход
      p
        label
          input.with-gap(name="type" type="radio" value="outcome" v-model="type")
          span Расход
      .input-field
        input#amount(
          type="number"
          v-model.number="amount"
          :class="{invalid: $v.amount.$dirty && !$v.amount.minValue}"
          )
        label(for="amount") Сумма
        span.helper-text.invalid(
          v-if="$v.amount.$dirty && !$v.amount.minValue"
          ) Мин. значение {{$v.amount.$params.minValue.min}}
      .input-field
        input#description(
          type="text"
          v-model="description"
          :class="{invalid: $v.description.$dirty && !$v.description.required}"
          )
        label(for="description") Описание
        span.helper-text.invalid(
          v-if="$v.description.$dirty && !$v.description.required"
          ) Введите описание
      button.btn.waves-effect.waves-light(type="submit")
        | Создать
        i.material-icons.right send
</template>

<script>
import { required, minValue } from 'vuelidate/lib/validators';
import { mapGetters } from 'vuex';

export default {
  name: 'record',


  data() {
    return {
      loading: true,
      categories: [],
      select: null,
      category: null,
      type: 'income',
      amount: 1,
      description: '',
    };
  },


  validations: {
    amount: { minValue: minValue(1) },
    description: { required },
  },


  computed: {
    ...mapGetters(['info']),
    canCreateRecord() {
      if (this.type === 'income') {
        return true;
      }
      return this.info.bill >= this.amount;
    },
  },


  methods: {
    // eslint-disable-next-line consistent-return
    async submitHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return 0;
      }

      if (this.canCreateRecord) {
        try {
          await this.$store.dispatch('createRecord', {
            categoryID: this.category,
            amount: this.amount,
            description: this.description,
            type: this.type,
            date: new Date().toJSON(),
          });
          const bill = this.type === 'income'
            ? this.info.bill + this.amount
            : this.info.bill - this.amount;

          await this.$store.dispatch('updateInfo', { bill });
          this.$message('Запись успешно создана.');
          this.$v.$reset();
          this.amount = 1;
          this.description = '';
        } catch (e) { console.log('dispatch createRecord error'); }
      } else {
        this.$message(`Недостаточно средств на счете (${this.amount - this.info.bill})`);
      }
    },
  },


  async mounted() {
    this.categories = await this.$store.dispatch('fetchCategories');
    this.loading = false;

    if (this.categories.length) {
      this.category = this.categories[0].id;
    }
    setTimeout(() => {
      // eslint-disable-next-line no-undef
      this.select = M.FormSelect.init(this.$refs.select);
      // eslint-disable-next-line no-undef
      M.updateTextFields();
    }, 0);
  },

  beforeDestroy() {
    if (this.select && this.select.destroy) {
      this.select.destroy();
    }
  },
};
</script>
