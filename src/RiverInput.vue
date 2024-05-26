<script setup lang="ts">
import {RiverBank} from '@/generator';
import {ref} from 'vue';

const selected = ref(Object.values(RiverBank));

defineExpose({selected});
</script>

<template>
  <section>
    <h2>Select sides of the river</h2>
    <p>Note that Blackfriars (NR) is on both sides of the river.</p>
    <p>
      <label v-for="bank in RiverBank">
        <input type="checkbox" v-model="selected" name="riverBanks" :value="bank">
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