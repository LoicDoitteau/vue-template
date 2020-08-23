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
            style="font-size:28px"
          >
            <flag :iso="iso"/>
          </v-btn>
        </template>

        <v-list dense nav>
          <v-list-item-group v-model="currentLangIndex" color="primary">
            <v-list-item
              v-for="(lang, code) in langs"
              :key="code"
            >
              <v-list-item-content>
                <v-list-item-title><flag :iso="lang.iso" /> {{ lang.name }}</v-list-item-title>
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
import { Component, Vue, Watch } from 'vue-property-decorator';
import { Lang, langs, langsCode, isLang } from '@/models/lang'

@Component
export default class App extends Vue {
  private drawer: boolean | null = null;
  private items: object[] = [
    { view: 'home', icon: 'mdi-home', link: '/' },
    { view: 'about', icon: 'mdi-help-box', link: '/about' },
  ]
  private itemIndex = 0;

  private langs = langs;
  
  private get currentLangIndex() {
    return langsCode.findIndex(code => langs[code] === this.currentLang);
  }
  private set currentLangIndex(index) {
    const code = langsCode[index];
    this.currentLang = langs[code];
  }

  private get currentLang(): Lang {
    return this.$store.getters.currentLang;
  }

  private set currentLang(lang: Lang) {
    this.$store.dispatch("changeLang", lang);
  }

  private get iso(): string {
    return this.currentLang.iso;
  }

  @Watch('currentLangIndex')
  private changeLang()
  {
    const code = langsCode[this.currentLangIndex];
    this.$i18n.locale = this.$vuetify.lang.current = code;
  }

  private mounted()
  {
    if (isLang(navigator.language)) this.currentLang = langs[navigator.language];
  }
}
</script>
