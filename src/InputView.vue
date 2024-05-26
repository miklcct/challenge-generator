<script setup lang="ts">

import ExcludeInput from '@/ExcludeInput.vue';
import {CPAY, exclude, getBasket, type Station} from '@/generator';
import ModeInput from '@/ModeInput.vue';
import RiverInput from '@/RiverInput.vue';
import StartInput from '@/StartInput.vue';
import ZoneInput from '@/ZoneInput.vue';
import {computed, ref} from 'vue';

const count = ref(15);
const modeInput = ref<InstanceType<typeof ModeInput>>();
const zoneInput = ref<InstanceType<typeof ZoneInput>>();
const riverInput = ref<InstanceType<typeof RiverInput>>();
const startInput = ref<InstanceType<typeof StartInput>>();
const excludeInput = ref<InstanceType<typeof ExcludeInput>>();

const allStations = computed(() =>
    getBasket(zoneInput.value?.selected, modeInput.value?.selected, riverInput.value?.selected)
);
const excludedStations = computed(() => excludeInput.value?.selected ?? []);
const basket = computed(() => exclude(allStations.value, excludedStations.value));
const startStation = computed(() => startInput.value?.selected);

</script>

<template>
  <form action="/results">
    <ModeInput ref="modeInput"/>
    <ZoneInput ref="zoneInput"/>
    <RiverInput ref="riverInput"/>
    <ExcludeInput ref="excludeInput" :stations="allStations"/>
    <StartInput ref="startInput" :stations="basket"/>
    <section>
      <h2>Choose number of stations</h2>
      <label>
        Number of stations to be drawn:
        <input name="count" v-model="count" type="number" min="1" :max="basket.length"/>
      </label>
      <p>
        You are going to choose {{ count }} {{ modeInput?.selected.join(', ') }} stations
        starting at {{ startStation === undefined ? 'any station' : startStation }}
        in zones {{ zoneInput?.selected.slice().sort((a, b) => a - b).map(zone => zone === CPAY ? 'CPAY' : zone).join(', ') }}
        on the {{ riverInput?.selected.join(' and ') }} side of the Thames,
        {{ excludedStations.length === 0 ? 'no stations are excluded.' : `excluding ${excludedStations.join(', ')}.` }}
      </p>
    </section>
    <button type="submit">Go</button>
  </form>
</template>