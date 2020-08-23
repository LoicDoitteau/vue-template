<template>
  <div class="home">
    <refixel-canvas/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import RefixelCanvas from '@/components/RefixelCanvas.vue';

@Component({
  components: {
    RefixelCanvas
  }
})
export default class Home extends Vue {
  
}
</script>
