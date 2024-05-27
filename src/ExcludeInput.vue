<script setup lang="ts">
import {type Station} from 'challenge-generator-backend';
import {ref} from 'vue';

const model = defineModel<Station[]>();

const props = defineProps<{
  stations: Station[];
}>();
</script>

<template>
  <section>
    <h2>Exclude selected stations below:</h2>
    <select name="exclude" v-model="model" multiple size="10">
      <option v-for="station in props.stations" :value="station">{{ station }}</option>
    </select>
  </section>
</template>

<style scoped>
select {
  display: block;
}
</style>