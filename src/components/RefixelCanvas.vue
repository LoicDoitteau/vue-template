<template>
    <canvas class="fill" ref="canvas"/>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class RefixelCanvas extends Vue {

    private context: WebGLRenderingContext | null = null;

    private mounted() {
        const canvas = this.$refs.canvas as HTMLCanvasElement;
        this.context = canvas.getContext('webgl');
        this.context?.clearColor(Math.random() * 0.5 + 0.5, Math.random() * 0.5 + 0.5, Math.random() * 0.5 + 0.5, 1);
        this.context?.clear(this.context.COLOR_BUFFER_BIT);
    }
}
</script>

<style>
.fill {
  width: 100%;
  height: 100%;
}
</style>