<script setup lang="ts">

import ExcludeInput from '@/ExcludeInput.vue';
import LineInput from '@/LineInput.vue';
import {
  exclude,
  getBasket,
  localAuthorities as allLocalAuthorities,
  RiverBank,
  SFA,
  type Station
} from 'challenge-generator-backend';
import RiverInput from '@/RiverInput.vue';
import StartInput from '@/StartInput.vue';
import ZoneInput from '@/ZoneInput.vue';
import {computed, ref} from 'vue';
import LocalAuthorityInput from "@/LocalAuthorityInput.vue";

const count = ref(15);
const zones = ref([1, 2]);
const riverBanks = ref(Object.values(RiverBank));
const lines = ref([
  "Bakerloo",
  "Central",
  "Circle",
  "District",
  "Hammersmith & City",
  "Jubilee",
  "Metropolitan",
  "Northern",
  "Piccadilly",
  "Victoria",
  "Waterloo & City"
]);
const localAuthorities = ref<string[]>(Object.values(allLocalAuthorities).flat());
const startStation = ref<Station>();
const excludedStations = ref<Station[]>([]);

const allStations = computed(() =>
    getBasket(zones.value, riverBanks.value, lines.value, localAuthorities.value)
);
const basket = computed(() => exclude(allStations.value, excludedStations.value));
const selectedCounties = computed(() => Object.entries(allLocalAuthorities)
    .filter(([_, districts]) => districts.every(district => localAuthorities.value.includes(district)))
    .map(entry => entry[0]));
const selectedDistricts = computed(() => localAuthorities.value.filter(localAuthority => !selectedCounties.value.flatMap(
    county => allLocalAuthorities[county])
    .includes(localAuthority)));

</script>

<template>
  <form action="/results">
    <ZoneInput v-model="zones"/>
    <RiverInput v-model="riverBanks"/>
    <LineInput v-model="lines"/>
    <LocalAuthorityInput v-model="localAuthorities"/>
    <ExcludeInput v-model="excludedStations" :stations="allStations"/>
    <StartInput v-model="startStation" :stations="basket"/>
    <section>
      <h2>Choose number of stations</h2>
      <label>
        Number of stations to be drawn:
        <input name="count" v-model="count" type="number" min="1" :max="basket.length"/>
      </label>
      <p>
        You are going to choose {{ count }} stations
        starting at <span v-if="startStation === undefined">any station</span><span v-else>{{ startStation }}</span>

        in <span v-if="!zones.length">no</span> zones {{
          zones.slice()
              .sort((a, b) => a - b)
              .map(zone => zone === SFA ? 'SFA' : zone)
              .join(', ')
        }}
        on <span v-if="!riverBanks.length">no sides</span>

        <span v-else-if="riverBanks.length === 2">both sides</span>
        <span v-else>the {{ riverBanks[0] }} side</span>
        of the Thames

        on <span v-if="!lines.length">no</span><span v-else>{{ lines.join(', ') }}</span> lines

        in <span v-if="!localAuthorities.length">no local authorities</span>
        <span v-else>
          <span v-if="selectedCounties.length">all districts in {{ selectedCounties.join(', ') }}<span
              v-if="selectedDistricts.length">, and also </span>
          </span>{{ selectedDistricts.join(', ') }}</span>,
        <span v-if="!excludedStations.length">no stations are excluded</span>
        <span v-else>excluding {{ excludedStations.join(', ') }}</span>.
      </p>
    </section>
    <button type="submit">Go</button>
  </form>
</template>