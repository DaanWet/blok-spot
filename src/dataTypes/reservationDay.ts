import { timeString } from "@/utils/util";

class ReservationDay {
    day: Date;
    checked: Boolean;
    start: any;
    end: any;
    maxEnd: {hours: string, minutes: string};

    constructor(day: Date, maxEnd : any){
        this.day = day;
        this.checked = false;
        this.start = undefined;
        this.end = undefined;
        this.maxEnd = maxEnd
    }

    

    toJson(){
        
        return {"day": this.day.toISOString().split("T")[0], "start": timeString(this.start), "end": timeString(this.end)}
    }

}

export default ReservationDay
