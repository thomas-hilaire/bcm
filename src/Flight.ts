export default interface Flight {
    provider: 'AIR_MOON' | 'AIR_JAZZ' | 'AIR_BEAM';
    price: number;
    departure_time: Date;
    arrival_time: Date;
}
