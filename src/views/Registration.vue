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
            v-if="$v.email.$dirty && !$v.email.required"
          ) Поле email пустое
          small.helper-text.invalid(
            v-else-if="$v.email.$dirty && !$v.email.email"
          ) Не корректный email
        .input-field
          input#password(type="password" v-model.trim="password" :class="inputPasswordClass")
          label(for="password") Пароль
          small.helper-text.invalid(v-if="this.$v.password.$dirty && !this.$v.password.required")
           | Введите пароль
          small.helper-text.invalid(
            v-if="$v.password.$dirty && !$v.password.minLength"
            )
           | Длинна пароля должна быть более {{$v.password.$params.minLength.min}}
           | символов. Сейчас он {{ password.length }}
      .input-field
        input#name.validate(
          type="text"
          :class="inputNameClass"
          v-model="name"
          )
        label(for="name") Имя
        small.helper-text.invalid(
          v-if="$v.name.$dirty && !$v.name.required"
          )
          | Введите имя
      p
        label
          input(type="checkbox" v-model="agree")
          span С правилами согласен
    .card-action
      div
        button.btn.waves-effect.waves-light.auth-submit(type="submit")
          | Зарегистрироваться
          i.material-icons.right send
      p.center
        | Уже есть аккаунт?
        router-link(to="/login") Войти!
</template>

<script>
import { email, required, minLength } from 'vuelidate/lib/validators';

export default {
  name: 'registration',
  data() {
    return {
      email: '',
      password: '',
      name: '',
      agree: false,
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
    inputNameClass() {
      return {
        invalid: this.$v.name.$dirty && !this.$v.name.required,
      };
    },
  },
  validations: {
    email: { email, required },
    password: { required, minLength: minLength(6) },
    name: { required },
    agree: { checked: (v) => v },
  },
  methods: {
    async submitHandler() {
      if (this.$v.$invalid || this.agree === false) {
        this.$v.$touch();
        return 0;
      }

      const formRegistration = {
        email: this.email,
        password: this.password,
        name: this.name,
      };
      try {
        await this.$store.dispatch('registration', formRegistration);
        this.$router.push('/');
      // eslint-disable-next-line no-empty
      } catch (e) {
        console.log('error registrations');
      }
      return 0;
    },
  },
};
</script>
