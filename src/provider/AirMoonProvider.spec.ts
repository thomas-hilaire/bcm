import {expect} from 'chai';
import * as nock from 'nock';
import AirMoonProvider from './AirMoonProvider';

describe('AirMoon Flight Provider', () => {

    it('should return nothing when no results from the api', async () => {
        const scope = nock('https://my.api.mockaroo.com', {
                reqheaders: {
                    'X-API-Key': 'dd764f40',
                },
            })
            .get('/air-moon/flights')
            .reply(200, []);

        const flights = await new AirMoonProvider().flights();

        expect(scope.isDone()).to.be.true;
        expect(flights).to.deep.equal([]);
    });

    it('should return flights when multiple results from the api', async () => {
        const scope = nock('https://my.api.mockaroo.com', {
                reqheaders: {
                    'X-API-Key': 'dd764f40',
                },
            })
            .get('/air-moon/flights')
            .reply(200, [{
                id: 'c2e91bdf-ccc0-45d5-b4ea-ef75bc932ae8',
                price: 511.78,
                departure_time: '9:15 PM',
                arrival_time: '5:35 AM',
            }, {
                id: '8fbf41b2-477b-11e9-909c-5b43b685f98a',
                price: 600.50,
                departure_time: '10:15 PM',
                arrival_time: '10:35 AM',
            }]);

        const flights = await new AirMoonProvider().flights();

        expect(scope.isDone()).to.be.true;
        expect(flights).to.deep.equal([{
            provider: 'AIR_MOON',
            price: 511.78,
            departure_time: '9:15 PM',
            arrival_time: '5:35 AM',
        }, {
            provider: 'AIR_MOON',
            price: 600.50,
            departure_time: '10:15 PM',
            arrival_time: '10:35 AM',
        }]);
    });

});
