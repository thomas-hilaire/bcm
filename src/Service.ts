import Flight from './Flight';
import FlightProvider from './provider/FlightProvider';

export class Service {

    private readonly providers: Array<FlightProvider>;

    constructor(providers: Array<FlightProvider>) {
        this.providers = providers;
    }

    async fetchFlights(): Promise<Array<Flight>> {
        const providersFlights = await Promise.all(this.providers.map(provider => provider.flights()));
        return providersFlights.reduce((flattened, providerFlights) => [...flattened, ...providerFlights], []);
    }
}
