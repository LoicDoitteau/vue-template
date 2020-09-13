import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import en from 'vuetify/lib/locale/en';
import fr from 'vuetify/lib/locale/fr';

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        dark: true,
        themes: {
            dark: {
                primary: '#4caf50',
                secondary: '#009688',
                accent: '#8bc34a',
                error:' #ff5722',
                warning: '#ff9800',
                info: '#00bcd4',
                success: '#cddc39'
            }
        }
    },
    lang: {
        locales: { en, fr },
        current: 'en',
      },
});
