<script setup lang="ts">
import {CPAY, SFA} from 'challenge-generator-backend';

const allZones = [...Array(17).keys()];

const model = defineModel<number[]>();
</script>

<template>
  <section>
    <h2>Select zones</h2>
    <p>
      <label v-for="zone in allZones">
        <input type="checkbox" v-model="model" name="zones" :value="zone">
        {{
          zone === SFA ? 'Stratford International (NR)'
              : zone === CPAY ? `Zone ${zone} (Contactless only)` : `Zone ${zone}`
        }}
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