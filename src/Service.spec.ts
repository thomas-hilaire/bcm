import {expect} from 'chai';
import {SinonStub, stub} from 'sinon';
import FlightProvider from './provider/FlightProvider';
import {Service} from './Service';

describe('Service', () => {

  let provider1: FlightProvider;
  let provider2: FlightProvider;
  let service: Service;

  beforeEach(() => {
    provider1 = {flights: stub()};
    provider2 = {flights: stub()};
    service = new Service([provider1, provider2]);
  });

  it('should return nothing when no providers return results', async () => {
    (provider1.flights as SinonStub).resolves([]);
    (provider2.flights as SinonStub).resolves([]);

    const flights = await service.fetchFlights();

    expect(flights).to.deep.equal([]);
  });

  it('should return all results when all providers have some', async () => {
    const provider1Flights = [{
      provider: 'AIR_MOON',
      price: 511.78,
      departure_time: '9:15 PM',
      arrival_time: '5:35 AM',
    }, {
      provider: 'AIR_MOON',
      price: 600.50,
      departure_time: '10:15 PM',
      arrival_time: '10:35 AM',
    }];
    const provider2Flights = [{
      provider: 'AIR_JAZZ',
      price: 511.78,
      departure_time: '9:15 PM',
      arrival_time: '5:35 AM',
    }, {
      provider: 'AIR_JAZZ',
      price: 600.50,
      departure_time: '10:15 PM',
      arrival_time: '10:35 AM',
    }];
    (provider1.flights as SinonStub).resolves(provider1Flights);
    (provider2.flights as SinonStub).resolves(provider2Flights);

    const flights = await service.fetchFlights();

    expect(flights).to.deep.equal([
        ...provider1Flights,
        ...provider2Flights,
    ]);
  });

});
