<script setup lang="ts">
import {computed} from 'vue';
import {useRoute} from 'vue-router';
import {exclude, fromString, generate, getBasket, Mode, RiverBank} from 'challenge-generator-backend';

function toArray<T>(item : undefined | T | T[]) {
  return item === undefined ? undefined : item instanceof Array ? item : [item];
}

const route = useRoute();
const results = computed(() => {
  const allStations = getBasket(
      toArray(route.query.zones)?.map(string => {
        if (string === null) {
          throw new TypeError(`${string} is null.`);
        }
        const result = parseInt(string, 10);
        if (Number.isNaN(result)) {
          throw new TypeError(`${string} is not a valid integer.`);
        }
        return result;
      }),
      toArray(route.query.modes)?.filter((string) : string is Mode => {
        if (string === null || !Object.values(Mode).includes(string as any)) {
          throw new RangeError(`${string} is not a valid mode`);
        }
        return true;
      }),
      toArray(route.query.riverBanks)?.filter((string) : string is RiverBank => {
        if (string === null || !Object.values(RiverBank).includes(string as any)) {
          throw new RangeError(`${string} is not a valid side of the river.`);
        }
        return true;
      }),
      toArray(route.query.lines)?.filter((string) : string is string => string !== null),
  );
  const excludedStations = toArray(route.query.exclude)?.map(string => {
    const result = string === null ? null : fromString(string);
    if (result === null) {
      throw new RangeError('An exclude station is invalid.');
    }
    return result;
  });

  const basket = exclude(allStations, excludedStations ?? []);

  const startingStation = route.query.start === undefined ? undefined : fromString(route.query.start as string);
  if (startingStation === null) {
    throw new RangeError('The starting station is invalid.');
  }

  const count = route.query.count === undefined ? 15 : parseInt(route.query.count as string);
  if (Number.isNaN(count)) {
    throw new TypeError('The count is not a valid integer.');
  }
  if (count < 1) {
    throw new RangeError('The count must be at least 1.');
  }
  return generate(count, basket, startingStation);
});
</script>

<template>
  <section>
    <h2>Results</h2>
    <ul>
      <li v-for="station in results">{{ station }}</li>
    </ul>
  </section>
</template>

<style scoped>
ul {
  list-style-type: none;
}
</style>

