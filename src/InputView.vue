<script setup lang="ts">

import ExcludeInput from '@/ExcludeInput.vue';
import LineInput from '@/LineInput.vue';
import {exclude, getBasket, lines as allLines, Mode, RiverBank, SFA, type Station} from 'challenge-generator-backend';
import ModeInput from '@/ModeInput.vue';
import RiverInput from '@/RiverInput.vue';
import StartInput from '@/StartInput.vue';
import ZoneInput from '@/ZoneInput.vue';
import {computed, ref} from 'vue';

const count = ref(15);
const modes = ref([Mode.LU]);
const zones = ref([1, 2]);
const riverBanks = ref(Object.values(RiverBank));
const lines = ref(allLines);
const startStation = ref<Station>();
const excludedStations = ref<Station[]>([]);

const allStations = computed(() =>
    getBasket(zones.value, modes.value, riverBanks.value, lines.value)
);
const basket = computed(() => exclude(allStations.value, excludedStations.value));

</script>

<template>
  <form action="/results">
    <ModeInput v-model="modes"/>
    <ZoneInput v-model="zones"/>
    <RiverInput v-model="riverBanks"/>
    <LineInput v-model="lines"/>
    <ExcludeInput v-model="excludedStations" :stations="allStations"/>
    <StartInput v-model="startStation" :stations="basket"/>
    <section>
      <h2>Choose number of stations</h2>
      <label>
        Number of stations to be drawn:
        <input name="count" v-model="count" type="number" min="1" :max="basket.length"/>
      </label>
      <p>
        You are going to choose {{ count }} {{ modes.join(', ') }} stations
        starting at {{ startStation === undefined ? 'any station' : startStation }}
        in zones {{ zones.slice().sort((a, b) => a - b).map(zone => zone === SFA ? 'SFA' : zone).join(', ') }}
        on the {{ riverBanks.join(' and ') }} side of the Thames
        on {{ lines.join(', ') }},
        {{ excludedStations.length === 0 ? 'no stations are excluded.' : `excluding ${excludedStations.join(', ')}.` }}
      </p>
    </section>
    <button type="submit">Go</button>
  </form>
</template>