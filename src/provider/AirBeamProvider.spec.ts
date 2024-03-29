import {expect} from 'chai';
import * as nock from 'nock';
import {SinonFakeTimers, useFakeTimers} from 'sinon';
import AirBeamProvider, {MAX_WAIT_MS} from './AirBeamProvider';

describe('AirBeam Flight Provider', () => {

    let clock: SinonFakeTimers;

    beforeEach(() => {
        clock = useFakeTimers(new Date());
    });

    afterEach(() => {
        clock.restore();
    });

    it('should return nothing when no results from the api', async () => {
        const scope = nock('https://my.api.mockaroo.com', {
                reqheaders: {
                    'X-API-Key': 'dd764f40',
                },
            })
            .get('/air-beam/flights')
            .reply(200);

        const flights = await new AirBeamProvider().flights();

        expect(scope.isDone()).to.be.true;
        expect(flights).to.deep.equal([]);
    });

    it('should return flights when multiple results from the api', async () => {
        const CSV =
            `id,p,departure,arrival
            e30f1fda-1ffd-4d55-8db1-1798221c7c78,499.81,8:48 PM,3:20 PM
            5cf7ff85-6d31-4d4f-ad87-9c66c682b69b,499.84,2:03 PM,11:00 AM`;
        const scope = nock('https://my.api.mockaroo.com', {
                reqheaders: {
                    'X-API-Key': 'dd764f40',
                },
            })
            .get('/air-beam/flights')
            .reply(200, CSV);

        const flights = await new AirBeamProvider().flights();

        expect(scope.isDone()).to.be.true;
        expect(flights).to.deep.equal([{
            provider: 'AIR_BEAM',
            price: 499.81,
            departure_time: '8:48 PM',
            arrival_time: '3:20 PM',
        }, {
            provider: 'AIR_BEAM',
            price: 499.84,
            departure_time: '2:03 PM',
            arrival_time: '11:00 AM',
        }]);
    });

    it('should return nothing when error 502 from the api', async () => {
        const longResponseDelayMs = MAX_WAIT_MS * 2;
        nock('https://my.api.mockaroo.com')
            .get('/air-beam/flights')
            .delay(longResponseDelayMs)
            .reply(502);

        const flightsPromise = new AirBeamProvider().flights();

        clock.tick(MAX_WAIT_MS);

        expect(await flightsPromise).to.deep.equal([]);
    });

});
