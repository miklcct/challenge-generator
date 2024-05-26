<script setup lang="ts">
import {type Station} from '@/generator';
import {ref} from 'vue';

const selected = ref<Station[]>();

const props = defineProps<{
  stations: Station[];
}>();
defineExpose({selected})
</script>

<template>
  <section>
    <h2>Exclude selected stations below:</h2>
    <select name="exclude" v-model="selected" multiple size="10">
      <option v-for="station in props.stations" :value="station">{{ station }}</option>
    </select>
  </section>
</template>

<style scoped>
select {
  display: block;
}
</style>