<script setup lang="ts">
import {lines} from '../../challenge-generator-backend';

const model = defineModel<string[]>();
</script>

<template>
  <section>
    <h2>Select lines</h2>
    <p>
      <label v-for="line in lines">
        <input type="checkbox" v-model="model" name="lines" :value="line">
        {{ line }}
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