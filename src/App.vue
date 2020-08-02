<template>
  <v-app>
    <v-navigation-drawer
      app
      nav
      v-model="drawer"
    >
      <v-list dense nav>
        <v-list-item-group v-model="itemIndex" color="primary">
          <v-list-item
            v-for="(item, i) in items"
            :key="i"
            :to="item.link"
            link
          >
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{ $t(`views.${item.view}.title`) }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  
    <v-app-bar
      app
      color="primary"
      dark
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>{{ $t('app.name') }}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-menu
        left
        bottom
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            icon
            v-bind="attrs"
            v-on="on"
          >
            <v-icon>mdi-translate</v-icon> {{ lang }}
          </v-btn>
        </template>

        <v-list dense nav>
          <v-list-item-group v-model="langIndex" color="primary">
            <v-list-item
              v-for="(lang, i) in langs"
              :key="i"
            >
              <v-list-item-content>
                <v-list-item-title>{{ lang.text }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-menu>
    </v-app-bar>

    <v-main>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-main>

  <v-footer 
      app
      color="primary"
      dark>
      <span class="white--text">Refou &copy; {{ new Date().getFullYear() }}</span>
  </v-footer>

  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class App extends Vue {
  private drawer: boolean | null = null;
  private items: object[] = [
    { view: 'home', icon: 'mdi-home', link: '/' },
    { view: 'about', icon: 'mdi-help-box', link: '/about' },
  ]
  private itemIndex = 0;

  private langs: { text: string; value: string }[] =  [
    { text: 'English', value: 'en' },
    { text: 'Français', value: 'fr' },
  ];
  private get langIndex() {
    return this.langs.findIndex(l => l.value === this.$i18n.locale);
  }
  private set langIndex(index) {
    this.$i18n.locale = this.langs[index].value;
  }
  private get lang(): string {
    return this.langs[this.langIndex].value;
  }
}
</script>
