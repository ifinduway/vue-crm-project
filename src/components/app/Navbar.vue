<template lang="pug">
nav.navbar.orange.lighten-1
  .nav-wrapper
    .navbar-left
      a(href="#" @click.prevent="$emit('click')")
        i.material-icons.black-text dehaze
      span.black-text {{ date | date('datetime') }}
    ul.right.hide-on-small-and-down
      li
        a.dropdown-trigger.black-text(href="#" data-target="dropdown" ref="dropdown")
          | {{ name }}
          i.material-icons.right arrow_drop_down
        ul#dropdown.dropdown-content
          li
            router-link.black-text(to="/profile")
              i.material-icons account_circle
              | {{ 'NavbarProfile' | localize }}
          li.divider(tabindex="-1")
          li
            a.black-text(href="#" @click.prevent="logout")
              i.material-icons assignment_return
                    | {{ 'NavbarExit' | localize }}
</template>

<script>
export default {
  data() {
    return {
      date: new Date(),
      interval: null,
      dropdown: null,
    };
  },
  methods: {
    async logout() {
      await this.$store.dispatch('logout');
      this.$router.push('/login?message=logout');
    },
  },
  computed: {
    name() {
      return this.$store.getters.info.name;
    },
  },
  mounted() {
    this.interval = setInterval(() => {
      this.date = new Date();
    }, 1000);
    // eslint-disable-next-line no-undef
    this.dropdown = M.Dropdown.init(this.$refs.dropdown, {
      constrainWidth: false,
    });
  },
  beforeDestroy() {
    clearInterval(this.interval);
    if (this.dropdown && this.dropdown.destroy) {
      this.dropdown.destroy();
    }
  },
};
</script>
