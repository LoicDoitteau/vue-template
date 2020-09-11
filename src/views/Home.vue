<template>
  <div style="width: 100vw; height: calc(100vh - 124px);">
    <container/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Container from '@/components/Container.vue';

@Component({
  components: {
    Container
  }
})
export default class Home extends Vue {
  
}
</script>
