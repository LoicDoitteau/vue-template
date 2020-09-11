<template>
    <div ref="container">
        <div ref="canvas">
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Transform } from '@/models/transform'

@Component
export default class Container extends Vue {
    private container?: HTMLElement;
    private canvas?: HTMLElement;
    private moving = false;
    private transform: Transform = { k: 1, x: 0, y: 0 };
    private startTransform?: Transform;
    private startX = 0;
    private startY = 0;

    private mounted() {
        this.container = this.$refs.container as HTMLElement;
        this.canvas = this.$refs.canvas as HTMLElement;
        this.canvas.style.transformOrigin = '0 0';

        window.addEventListener('resize', this.resize.bind(this));
        this.container.addEventListener("mousedown", this.mousedown.bind(this));
        window.addEventListener("mouseup", this.mouseup.bind(this));
        window.addEventListener("mousemove", this.mousemove.bind(this));
        this.container.addEventListener("wheel", this.wheel.bind(this));
        this.resize();
    }

    private destroyed() {
        window.removeEventListener('resize', this.resize.bind(this));

        this.container?.removeEventListener("mousedown", this.mousedown.bind(this));
        window.removeEventListener("mouseup", this.mouseup.bind(this));
        window.removeEventListener("mousemove", this.mousemove.bind(this));
        this.container?.removeEventListener("wheel", this.wheel.bind(this));
    }

    private resize() {
        if (!this.container) return;

        if (!this.container.parentElement)
            throw new Error('Container doesn\'t have parent element');

        const width = this.container.parentElement.clientWidth;
        const height = this.container.parentElement.clientHeight;

        this.container.style.width = `${width}px`;
        this.container.style.height = `${height}px`;
    }

    private mousedown(e: MouseEvent) {
        e.stopPropagation();
        this.moving = true;
        this.startTransform = { ...this.transform };
        this.startX = e.x;
        this.startY = e.y;
    }

    private mouseup() {
        this.moving = false;
    }

    private mousemove(e: MouseEvent) {
        if (this.moving && this.canvas && this.startTransform) {
            e.preventDefault();
            const dx = e.x - this.startX;
            const dy = e.y - this.startY;

            this.transform.x = this.startTransform.x + dx;
            this.transform.y = this.startTransform.y + dy;

            this.canvas.style.transform = `translate(${this.transform.x}px, ${this.transform.y}px) scale(${this.transform.k})`;
        }
    }

    private wheel(e: WheelEvent) {
        if (!this.canvas) return;

        e.preventDefault();
        const rect = this.canvas.getBoundingClientRect();
        const k = this.clamp(this.transform.k * (1 + e.deltaY * -0.1), 0.1, 20)
        const delta = k / (this.transform.k || 1) - 1;

        this.transform.k = k;
        this.transform.x += (rect.left - e.clientX) * delta;
        this.transform.y += (rect.top - e.clientY) * delta;
        
        this.canvas.style.transform = `translate(${this.transform.x}px, ${this.transform.y}px) scale(${this.transform.k})`;
    }

    private clamp(n: number, min: number, max: number) {
        return Math.max(min, Math.min(n, max));
    }
}
</script>