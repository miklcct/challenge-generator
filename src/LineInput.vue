<script setup lang="ts">
import {lines} from '../../challenge-generator-backend';
import {isAllSelected, isSomeSelected, toggleSelection} from "@/selection";

const model = defineModel<string[]>();

function toggleMode(linesOfMode: string[], event: Event) {
  model.value = toggleSelection(model.value, linesOfMode, (event.target as HTMLInputElement).checked);
}
</script>

<template>
  <section>
    <h2>Select lines</h2>
    <div v-for="[mode, linesOfMode] in Object.entries(lines)" :key="mode">
      <label>
        <input
            type="checkbox"
            name="modes"
            :value="mode"
            :checked="isAllSelected(model, linesOfMode)"
            :indeterminate="isSomeSelected(model, linesOfMode) && !isAllSelected(model, linesOfMode)"
            @change="toggleMode(linesOfMode, $event)"
        >
        {{ mode }}
      </label>
      <div class="lines">
        <label v-for="line in linesOfMode" :key="line">
          <input type="checkbox" v-model="model" name="lines" :value="line">
          {{ line }}
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

.lines {
  padding-left: 2em;
}
</style>