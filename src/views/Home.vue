<template>
  <div style="width: 100vw; height: calc(100vh - 124px);">
    <refixel-container/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import RefixelContainer from '@/components/RefixelContainer.vue';

@Component({
  components: {
    RefixelContainer
  }
})
export default class Home extends Vue {
  
}
</script>
