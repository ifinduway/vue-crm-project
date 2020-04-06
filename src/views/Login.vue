<template lang="pug">
  form.card.auth-card(@submit.prevent="submitHandler")
      .card-content
        span.card-title Домашняя бухгалтерия
        .input-field
          input#email(
            type="text"
            v-model.trim="email"
            :class="inputEmailClass")
          label(for="email") Email
          small.helper-text.invalid(
            v-if="this.$v.email.$dirty && !this.$v.email.required"
          ) Поле email пустое
          small.helper-text.invalid(
            v-else-if="this.$v.email.$dirty && !this.$v.email.email"
          ) Не корректный email
        .input-field
          input#password(type="password" v-model.trim="password" :class="inputPasswordClass")
          label(for="password") Пароль
          small.helper-text.invalid(v-if="this.$v.password.$dirty && !this.$v.password.required")
           | Введите пароль
          small.helper-text.invalid(v-if="this.$v.password.$dirty && !this.$v.password.minLength")
           | Длинна пароля должна быть более {{$v.password.$params.minLength.min}}
           | символов. Сейчас он {{ password.length }}
      .card-action
        div
          button.btn.waves-effect.waves-light.auth-submit(type="submit")
            | Войти
            i.material-icons.right send
        p.center
          | Нет аккаунта?
          router-link(to="/registration") Зарегистрироваться
</template>

<script>
import { email, required, minLength } from 'vuelidate/lib/validators';
import messages from '@/utils/messages';

export default {
  name: 'login',
  data() {
    return {
      email: '',
      password: '',
    };
  },
  computed: {
    inputEmailClass() {
      return {
        invalid: (this.$v.email.$dirty && !this.$v.email.required)
          || (this.$v.email.$dirty && !this.$v.email.email),
      };
    },
    inputPasswordClass() {
      return {
        invalid: (this.$v.password.$dirty && !this.$v.password.required)
          || (this.$v.password.$dirty && !this.$v.password.minLength),
      };
    },
  },
  mounted() {
    if (messages[this.$route.query.message]) {
      this.$message(messages[this.$route.query.message]);
    }
  },
  validations: {
    email: { email, required },
    password: { required, minLength: minLength(12) },
  },
  methods: {
    async submitHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }
      const loginData = {
        email: this.email,
        password: this.password,
      };
      try {
        await this.$store.dispatch('login', loginData);
        this.$router.push('/');
      // eslint-disable-next-line no-empty
      } catch (e) {}
    },
  },
};
</script>
