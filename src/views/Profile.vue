<template lang="pug">
  div
    .page-title
      h3 {{'ProfileTitle' | localize}}
    form.form(@submit.prevent="submitHandler")
      .input-field
        input#description(type="text" v-model="userName"
        :class="{invalid: this.$v.userName.$dirty && !this.$v.userName.required}")
        label(for="description") {{'ProfileName' | localize}}
        span.helper-text(
          v-if="this.$v.userName.$dirty && !this.$v.userName.required"
        ) {{'ProfileNameValidate' | localize}}
      button.btn.waves-effect.waves-light(type="submit")
        | {{'ProfileUpdate' | localize}}
        i.material-icons.right send
      .switch
        label
          | English
          input(type='checkbox' v-model="isRuLocale")
          span.lever
          | Русский

</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { required } from 'vuelidate/lib/validators';

export default {
  metaInfo() {
    return {
      title: this.$title('Profile'),
    };
  },

  data() {
    return {
      userName: '',
      isRuLocale: true,
    };
  },

  created() {
    this.userName = this.info.name;
    this.isRuLocale = this.info.locale === 'ru-RU';
  },

  mounted() {
    setTimeout(() => {
      // eslint-disable-next-line no-undef
      M.updateTextFields();
    });
  },

  validations: {
    userName: { required },
  },

  computed: {
    ...mapGetters(['info']),
  },

  methods: {
    ...mapActions(['updateInfo']),
    // eslint-disable-next-line consistent-return
    async submitHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return 0;
      }
      try {
        await this.updateInfo({
          name: this.userName,
          locale: this.isRuLocale ? 'ru-RU' : 'en-US',
        });
      } catch (e) { console.log('dispatch createRecord error'); }
    },
  },
};
</script>

<style lang="stylus" scoped>
  .switch
    margin-top 30px
</style>
