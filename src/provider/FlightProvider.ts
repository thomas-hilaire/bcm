import Flight from '../Flight';

export default interface FlightProvider {
    flights(): Promise<Array<Flight>>;
}
