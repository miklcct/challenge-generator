<script setup lang="ts">
import {Mode} from '@/generator';

const model = defineModel<Mode[]>();
</script>

<template>
  <section>
    <h2>Select modes</h2>
    <p>
      <label v-for="mode in Mode">
        <input type="checkbox" v-model="model" name="modes" :value="mode">
        {{ mode }}
      </label>
    </p>
  </section>
</template>

<style scoped>
label {
  margin-right: 1em;
  display: inline-block;
}
</style>