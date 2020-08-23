<template>
    <canvas ref="canvas"/>
</template>

<script lang="ts">
import { Component, Provide, Vue } from 'vue-property-decorator';

@Component
export default class RefixelCanvas extends Vue {

    @Provide("context") private context: WebGLRenderingContext | null = null;

    private mounted() {
        const canvas = this.$refs.canvas as HTMLCanvasElement;
        this.context = canvas.getContext('webgl');
        this.context?.clearColor(0.1, 0.7, 0.3, 1);
        this.context?.clear(this.context.COLOR_BUFFER_BIT);
    }
}
</script>