<template>
    <div ref="filter" class="mx-auto v-card v-sheet theme--dark" style="max-width: 400px; background-color: rgb(38, 198, 218); border-color: rgb(38, 198, 218);">
      <v-card-title>
        <span class="title font-weight-light">{{ title }}</span>
      </v-card-title>

      <v-card-text class="headline font-weight-bold">
        
      </v-card-text>

      <v-card-actions>
        
      </v-card-actions>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Transform } from '@/models/transform';
import { Filter } from '@/models/filter';

@Component
export default class FilterCard extends Vue {
    @Prop({ default: 1 }) private zoom?: number;
    @Prop({ required: true }) private model?: Filter;

    private filter?: HTMLElement;
    private moving = false;
    private startTransform?: Transform;
    private startX = 0;
    private startY = 0;

    private get title(): string {
      return this.model?.name || '';
    }

    private get position(): Transform {
      return this.model?.position || { x: 0, y: 0, k: 1 };
    }

    private set position(position: Transform) {
      if (this.model) this.model.position = position;
    }

    private mounted() {
        this.filter = this.$refs.filter as HTMLElement;
        this.filter.style.transformOrigin = '0 0';
        this.filter.style.position = 'absolute';
        this.filter.style.transform = `translate(${this.position.x}px, ${this.position.y}px)`;

        this.filter.addEventListener("mousedown", this.mousedown.bind(this));
        window.addEventListener("mouseup", this.mouseup.bind(this));
        window.addEventListener("mousemove", this.mousemove.bind(this));
    }

    private destroyed() {
        this.filter?.removeEventListener("mousedown", this.mousedown.bind(this));
        window.removeEventListener("mouseup", this.mouseup.bind(this));
        window.removeEventListener("mousemove", this.mousemove.bind(this));
    }

    private mousedown(e: MouseEvent) {
        e.stopPropagation();
        this.moving = true;
        this.startTransform = { ...this.position };
        this.startX = e.x;
        this.startY = e.y;
    }

    private mouseup() {
        this.moving = false;
    }

    private mousemove(e: MouseEvent) {
        if (this.moving && this.filter && this.startTransform && this.zoom) {
            e.preventDefault();
            const dx = e.x - this.startX;
            const dy = e.y - this.startY;

            this.position.x = this.startTransform.x + dx / this.zoom;
            this.position.y = this.startTransform.y + dy / this.zoom;

            this.filter.style.transform = `translate(${this.position.x}px, ${this.position.y}px)`;
        }
    }
}
</script>