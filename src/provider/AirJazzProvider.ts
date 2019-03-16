import axios from 'axios';
import Flight, {Provider} from '../Flight';
import FlightProvider from './FlightProvider';

const HEADERS = {headers: {'X-API-Key': 'dd764f40'}};
const ENDPOINT = 'https://my.api.mockaroo.com/air-jazz/flights';

interface JazzFlight {
    id: string;
    price: number;
    dtime: string;
    atime: string;
}

export default class AirJazzProvider implements FlightProvider {
    async flights(): Promise<Array<Flight>> {
        const flights = (await axios.get(ENDPOINT, HEADERS)).data as Array<JazzFlight>;
        return flights.map(flight => ({
            provider: 'AIR_JAZZ' as Provider,
            price: flight.price,
            departure_time: flight.dtime,
            arrival_time: flight.atime,
        }));
    }
}
