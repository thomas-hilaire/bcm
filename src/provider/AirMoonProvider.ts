import axios from 'axios';
import Flight, {Provider} from '../Flight';
import FlightProvider from './FlightProvider';

const HEADERS = {headers: {'X-API-Key': 'dd764f40'}};
const ENDPOINT = 'https://my.api.mockaroo.com/air-moon/flights';

interface MoongFlight {
    id: string;
    price: number;
    departure_time: string;
    arrival_time: string;
}

export default class AirMoongProvider implements FlightProvider {
    async flights(): Promise<Array<Flight>> {
        const flights = (await axios.get(ENDPOINT, HEADERS)).data as Array<MoongFlight>;
        return flights.map(flight => ({
            provider: 'AIR_MOON' as Provider,
            price: flight.price,
            departure_time: flight.departure_time,
            arrival_time: flight.arrival_time,
        }));
    }
}
