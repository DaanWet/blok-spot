export function timeString(time: any){
        return `${(time.hours as number) < 10 ? "0" : ""}${time.hours}:${(time.minutes as number) < 10 ? "0" : ""}${time.minutes}`
}
