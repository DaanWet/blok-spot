import { timeString } from "@/utils/util";
class ReservationDay {
    day: Date;
    checked: Boolean;
    start: any;
    end: any;
    minStart : {hours: string, minutes: string}
    maxEnd: {hours: string, minutes: string};
    available: boolean;

    constructor(day: Date, minStart: any, maxEnd : any, available: boolean){
        this.day = day;
        this.checked = false;
        this.start = undefined;
        this.end = undefined;
        this.minStart = minStart;
        this.maxEnd = maxEnd;
        this.available = available;
    }

    

    toJson(){
        
        return {"day": this.day.toISOString().split("T")[0], "start": timeString(this.start), "end": timeString(this.end)}
    }

}

export default ReservationDay
