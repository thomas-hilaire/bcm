import axios from 'axios';
import Flight from '../Flight';
import FlightProvider from './FlightProvider';

const HEADERS = {headers: {'X-API-Key': 'dd764f40'}};
const ENDPOINT = 'https://my.api.mockaroo.com/air-beam/flights';
export const MAX_WAIT_MS = 2000;

export default class AirBeamProvider implements FlightProvider {
    async flights(): Promise<Array<Flight>> {
        return Promise.race([timeoutReply(), this.fetchFlights()]);
    }

    private async fetchFlights() {
        const csv = (await axios.get(ENDPOINT, HEADERS)).data as string;
        return toFlights(csv);
    }
}

function timeoutReply(): Promise<Array<Flight>> {
    return new Promise((resolve => {
        setTimeout(() => resolve([]), MAX_WAIT_MS);
    }));
}

function csvToFlightLine(flights: string) {
    return flights.split('\n').slice(1);
}

function toFlights(flights: string) {
    return csvToFlightLine(flights).reduce((result, flight) => {
        const fligthDetails = flight.split(',');
        if (fligthDetails.length !== 4) {
            return result;
        }
        return [
            ...result,
            {
                provider: 'AIR_BEAM',
                price: parseFloat(fligthDetails[1].trim()),
                departure_time: fligthDetails[2].trim(),
                arrival_time: fligthDetails[3].trim(),
            },
        ];
    }, []);
}
