<script setup lang="ts">
import {RiverBank} from 'challenge-generator-backend';

const model = defineModel<RiverBank[]>();
</script>

<template>
  <section>
    <h2>Select sides of the river</h2>
    <p>Note that Blackfriars (NR) is on both sides of the river.</p>
    <p>
      <label v-for="bank in RiverBank">
        <input type="checkbox" v-model="model" name="riverBanks" :value="bank">
        {{ bank }} of the Thames
      </label>
    </p>
  </section>
</template>

<style scoped>
label {
  margin-right: 2em;
  display: inline-block;
}
</style>