<template>
  <div>
    <v-navigation-drawer absolute temporary v-model="drawer" class="hidden-md-and-up">
      <v-list-tile v-for="(item,i) in menuItems" :key="`navdrawer${i}`" :to="item.route">
        <v-list-tile-action>
          <v-icon v-html="item.icon"></v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title v-text="item.title"></v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-navigation-drawer>

    <v-toolbar app dark class="teal">
      <v-toolbar-side-icon @click.stop="drawer=!drawer" class="hidden-md-and-up"></v-toolbar-side-icon>

      <router-link to="/" tag="span" style="cursor:pointer;">
        <v-toolbar-title v-text="'EnWord'"></v-toolbar-title>
      </router-link>

      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn v-for="(item,i) in menuItems" flat :key="`menuitem${i}`" :to="item.route">
          <v-icon left v-html="item.icon"></v-icon>
          {{item.title}}
        </v-btn>
        <v-btn flat @click.prevent="signout" v-if="isUserAuthenticated">
          <v-icon left>exit_to_app</v-icon>
          Выйти
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>

  </div>
</template>

<script>
  export default {
    data() {
      return {
        drawer: false, // Меню мобильной версий
        counter: null // Текущий счёт
      };
    },
    computed: {
      // Проверка зарегистрирован ли пользователь
      isUserAuthenticated() {
        return this.$store.getters.isUserAuthenticated;
      },
      // Какие кнопки показывать пользователю
      menuItems() {
        return this.isUserAuthenticated ? [{
            icon: "reply",
            title: "Начать",
            route: "/start"
          },
          {
            icon: "trending_up",
            title: "Ваш рекорд",
            route: "/score"
          }
        ] : [{
            icon: "reply",
            title: "Начать",
            route: "/start"
          },
          {
            icon: "trending_up",
            title: "Ваш рекорд",
            route: "/score"
          },
          {
            icon: "input",
            title: "Войти",
            route: "/signin"
          },
          {
            icon: "lock_open",
            title: "Зарегистрироваться",
            route: "/signup"
          }
        ];
      }
    },
    methods: {
      // Диалоговое окно при нажатий на кнопку "Выйти"
      signout() {
        this.$confirm("Вы действительно хотите выйти?").then(res => {
          if (res) {
            this.$store.dispatch("SIGNOUT");
            this.$router.push("/signin");
          }
        });
      }
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
