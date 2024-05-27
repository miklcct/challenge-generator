<script setup lang="ts">
import {type Station} from '@/generator';

const model = defineModel<Station>();

const props = defineProps<{
  stations: Station[];
}>();
</script>

<template>
  <section>
    <h2>Choose starting station (optional)</h2>
    <select name="start" v-model="model">
      <option />
      <option v-for="station in props.stations" :value="station">{{ station }}</option>
    </select>
  </section>
</template>

<style scoped>
select {
  display: block;
}
</style>