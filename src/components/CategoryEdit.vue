<template lang="pug">
  .col.s12.m6
    div
      .page-subtitle
        h4 {{ 'CatEdit'  | localize }}
      form(@submit.prevent="submitHandler")
        .input-field
          select(ref="select" v-model="current")
            option(v-for="cat of categories" :key="cat.id" :value="cat.id") {{cat.title}}
          label {{ 'CatChoose'  | localize }}
        .input-field
          input#name(
            type="text"
            v-model="title"
            :class="{invalid: $v.title.$dirty && !$v.title.required}"
            )
          label(for="name") {{ 'CatName'  | localize }}
          span.helper-text(v-if="$v.title.$dirty && !$v.title.required") Введите название категории
        .input-field
          input(
            type="number"
            v-model.number="limit"
            :class="{invalid: $v.limit.$dirty && !$v.limit.minValue}"
            )
          label(for="limit") {{ 'CatLimit'  | localize }}
          span.helper-text(
            v-if="$v.limit.$dirty && !$v.limit.minValue"
            ) Мин. значение {{$v.limit.$params.minValue.min}}
        button.btn.waves-effect.waves-light(type="submit")
          | {{ 'CatUpdate'| localize }}
          i.material-icons.right send
</template>

<script>
import { required, minValue } from 'vuelidate/lib/validators';

export default {

  props: {
    categories: {
      type: Array,
      required: true,
    },
  },

  data() {
    return {
      select: null,
      title: '',
      limit: 100,
      current: null,
    };
  },


  validations: {
    title: { required },
    limit: { minValue: minValue(100) },
  },


  watch: {
    current(catId) {
      const { title, limit } = this.categories.find((c) => c.id === catId);
      this.title = title;
      this.limit = limit;
    },
  },

  methods: {
    async submitHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return 0;
      }

      try {
        await this.$store.dispatch('updateCategory', {
          id: this.current,
          title: this.title,
          limit: this.limit,
        });
        this.$message('Категория успешно обновлена');
        this.$emit('updated', {
          id: this.current,
          title: this.title,
          limit: this.limit,
        });
      } catch (e) { console.log('update submitHadler error'); }

      return 0;
    },
  },


  created() {
    const { id, title, limit } = this.categories[0];
    this.current = id;
    this.title = title;
    this.limit = limit;
  },


  mounted() {
    // eslint-disable-next-line no-undef
    this.select = M.FormSelect.init(this.$refs.select);
    // eslint-disable-next-line no-undef
    M.updateTextFields();
  },


  beforeDestroy() {
    if (this.select && this.select.destroy) {
      this.select.destroy();
    }
  },
};
</script>
