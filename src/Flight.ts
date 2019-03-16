export type Provider = 'AIR_MOON' | 'AIR_JAZZ' | 'AIR_BEAM';

export default interface Flight {
    provider: Provider;
    price: number;
    departure_time: string;
    arrival_time: string;
}
