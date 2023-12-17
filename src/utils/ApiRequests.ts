import ReservationDay from "@/dataTypes/reservationDay";
import Reservation from "@/dataTypes/reservation";
import ReservationResult from "@/dataTypes/reservationResult";
import { timeString } from "./util";
export const baseURL = import.meta.env.VITE_ROOT_API;

export async function doGetRequest(url:string, params:Record<string,string> | null = null) {
    const fetchUrl = baseURL + url + (params === null ? "" : "?" + new URLSearchParams(params))
    return fetch(fetchUrl,
        {
            method: "GET",
            credentials: 'include'
        }
    );
}

export async function doPostRequest(url:string, body:object) {
    return fetch(baseURL + url,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: 'include',//'same-origin',
            body: JSON.stringify(body),
        }
    );
}

export async function sendLogin(username:string, password:string) {
    const formData  = new FormData();
    formData.append("username", username);
    formData.append("password", password);

    return fetch(baseURL + "/auth/login",
        {
            method: "POST",
            body: formData, 
            headers: new Headers(),
            credentials: 'include'//'same-origin'
        }
    );
}

export async function sendLogout() {
    return fetch(baseURL + "/auth/logout",
        {
            method: "POST",
            credentials: 'include'//'same-origin'
        }
    );
}

export async function makeReservation(name: string, email: string, reservations: ReservationDay[]) {
    return doPostRequest("/reservations", {"name": name, "email": email, "reservations": reservations.filter(m => m.checked).map(r => r.toJson())})
}

export async function getAvailable(){
    return doGetRequest("/reservations").then(async (res) => {
        return res.json().then(json => {
            const j = json as any[];
            return j.map(m => new ReservationDay(new Date(m.day), {"hours": m.start.split(":")[0],  "minutes": m.start.split(":")[1]},{"hours": m.end.split(":")[0],  "minutes": m.end.split(":")[1]}, m.availableSlots !== 0))
            .sort((a, b) => a.day.getTime() - b.day.getTime());
        })
    })
}

export async function addReservationDay(date: Date){
    return doPostRequest("/reservations/add", {"day": date.toISOString().split("T")[0] })
}

export async function addReservationDayWithStart(date: Date, start: any){
    return doPostRequest("/reservations/add", {"day": date.toISOString().split("T")[0] , "start": timeString(start)})
}

export async function addReservationDayWithEnd(date: Date, end: any){
    return doPostRequest("/reservations/add", {"day": date.toISOString().split("T")[0] , "end": timeString(end)})
}

export async function addReservationDayWithStartEnd(date: Date, start: any, end: any){
    return doPostRequest("/reservations/add", {"day": date.toISOString().split("T")[0] , "start": timeString(start), "end": timeString(end)})
}

export async function removeReservationDay(date: Date){
    // actually bad
    return doPostRequest("/reservations/delete", {"day": date.toISOString().split("T")[0]});
}


export async function getResults(){
    return doGetRequest("/reservations/results").then(async (res) => {
        return res.json().then(json => {
            let j = json as any[];
            j =  j.map(m => new ReservationResult(new Date(m.day),  m.end, m.reservations));
            j.sort((a : ReservationResult, b : ReservationResult) => a.day.getTime() - b.day.getTime());
            return j
        })
    })
}
