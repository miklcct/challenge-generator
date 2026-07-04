<script setup lang="ts">
import {localAuthorities} from "challenge-generator-backend";
import {isAllSelected, isSomeSelected, toggleSelection} from "@/selection";

const model = defineModel<string[]>();


function toggleRegion(authorities: string[], event: Event) {
  model.value = toggleSelection(model.value, authorities, (event.target as HTMLInputElement).checked);
}
</script>

<template>
  <section>
    <h2>Select local authorities</h2>
    <div v-for="[region, authorities] in Object.entries(localAuthorities)" :key="region">
      <label>
        <input
            type="checkbox"
            name="regions"
            :value="region"
            :checked="isAllSelected(model, authorities)"
            :indeterminate="isSomeSelected(model, authorities) && !isAllSelected(model, authorities)"
            @change="toggleRegion(authorities, $event)"
        >
        {{ region }}
      </label>
      <div class="authorities">
        <label v-for="authority in authorities" :key="authority">
          <input type="checkbox" v-model="model" name="localAuthorities" :value="authority">
          {{ authority }}
        </label>
      </div>
    </div>
  </section>
</template>

<style scoped>
label {
  margin-right: 1em;
  display: inline-block;
}

.authorities {
  padding-left: 2em;
}
</style>