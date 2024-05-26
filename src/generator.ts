import arrayShuffle from 'array-shuffle';
import _stations from './assets/stations.json';

function toString(this: typeof _stations[0]) {
    return `${this.name}${this.disambiguation === null ? '' : ` (${this.disambiguation})`}`;
}
export const stations = _stations.map(
    (station) => ({
        ...station,
        toString : toString,
    })
);
export type Station = typeof stations[0];

export enum RiverBank {
    NORTH = 'North',
    SOUTH = 'South',
}

export enum Mode {
    LU = 'Underground',
    DLR = 'DLR',
    NR = 'National Rail',
}

export const CPAY = 16;

export function getBasket(zones : number[] | undefined, modes : Mode[] | undefined, riverBanks : RiverBank[] | undefined) {
    return stations.filter(
        station =>
            match(zones, station.zones)
            && match(modes, station.modes)
            && match(riverBanks, station.riverBanks)
    );
}

export function exclude(basket : Station[], exclude : Station[]) {
    return basket.filter(
        station => !exclude.some(selectedStation => selectedStation.toString() === station.toString())
    );
}

export function fromString(id : string) {
    return stations.find(station => station.toString() === id) ?? null;
}

export function generate(
    count: number
    , basket: Station[]
    , startingStation?: Station
) {
    if (basket.length < count) {
        throw new RangeError('There are not enough stations to be drawn.');
    }

    const results = startingStation !== undefined
        ? [
            startingStation,
            ...arrayShuffle(basket.filter(station => station.toString() !== startingStation.toString()))
        ]
        : arrayShuffle(basket);
    if (results.length !== basket.length) {
        throw new RangeError('The starting station cannot be found in the basket.');
    }

    return results.slice(0, count);
}

function match<T>(input: T[] | undefined, data: T[]) {
    return input === undefined || input.some(element => data.includes(element));
}

