<template>
  <v-app>
    <v-navigation-drawer
      class="text-center"
      v-model="drawer"
      mini-variant
      mini-variant-width="90"
      :clipped="clipped"
      fixed
      app
    >
      <v-list>
        <v-list-item v-for="(item, i) in items" :key="i" :to="item.to" router exact>
          <v-list-item-action style="align-items: center">
            <br />
            <br />
            <br />
            <v-icon>{{ item.icon }}</v-icon>
            <v-list-item-content
              ><p>{{ item.title }}</p>
            </v-list-item-content>
          </v-list-item-action>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar :clipped-left="clipped" fixed app elevate-on-scroll>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <nuxt-link to="/"
        ><img
          id="iconImage"
          class="mx-4"
          src="~/assets/logo20.png"
          max-height="40"
          width="160"
      /></nuxt-link>
      <v-spacer />

      <nuxt-link id="live" to=""
        ><span><b>Live</b> <v-icon id="liveIcon">mdi-youtube</v-icon> </span></nuxt-link
      >
    </v-app-bar>

    <v-main>
      <v-container>
        <Nuxt />

      </v-container>
    </v-main>

    <v-footer :absolute="!fixed" app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: "DefaultLayout",
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: "mdi-newspaper-variant-multiple",
          title: "News",
          to: "/",
        },
        {
          icon: "mdi-chart-bubble",
          title: "Predictions",
          to: "/Predictions",
        },
        {
          icon: "mdi-network",
          title: "More..",
          to: "/news",
        },
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: "Vuetify.js",
    };
  },
};
</script>
<style scoped>
#iconImage {
  margin-top: 20;
}

#yticon {
  margin: 3px;
  margin-bottom: 10px;
}
#live {
  text-decoration: none;
  background: rgb(245, 3, 3);
  border-radius: 8px;
  padding: 10px 10px 10px 14px;
  color: #fff;
  transition: 0.3s;
}
#live:hover {
  text-decoration: none;
  background: transparent;
  border: solid 1px rgb(245, 3, 3);
  border-radius: 8px;
  color: rgb(245, 3, 3);
}

#liveIcon {
  text-decoration: none;
  color: #fff;
}
#liveIcon:hover {
  color: rgb(245, 3, 3);
}
</style>
