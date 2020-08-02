<template>
  <v-container>   
    <v-row class="text-center">
      <v-col class="mb-4">
        <h1 class="display-2 font-weight-bold mb-3">
          {{ $t("components.hello.message") }}
        </h1>

        <p class="subheading font-weight-regular">
          <v-btn
            @click="add()"
          >
          {{ counter }}
          </v-btn>
        </p>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class HelloWorld extends Vue {
  @Prop() private increment!: number;

  private get counter(): number {
    return this.$store.getters.counter;
  }

  private add() {
    return this.$store.dispatch("increment", { amount: this.increment });
  }
}
</script>
