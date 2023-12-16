import Reservation from "./reservation";

class ReservationResult {
    day: Date;
    end: any;
    reservations: Reservation[]

    constructor(day: Date, end: any, reservations : Reservation[]){
        this.day = day;
        this.end = end;
        this.reservations = reservations;
    }


}

export default ReservationResult
