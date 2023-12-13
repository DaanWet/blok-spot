class ReservationDay {
    day: Date;
    checked: Boolean;
    start: any;
    end: any;

    constructor(day: Date){
        this.day = day;
        this.checked = false;
        this.start = undefined;
        this.end = undefined;
    }

}

export default ReservationDay
