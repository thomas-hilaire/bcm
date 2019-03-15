import Flight from './Flight';

export class Service {
    fetchFlights(): Promise<Array<Flight>> {
        return Promise.resolve([]);
    }
}
