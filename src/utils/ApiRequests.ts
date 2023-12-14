import ReservationDay from "@/dataTypes/reservationDay";

export const baseURL = "http://172.29.128.1:8080" // import.meta.env.VITE_ROOT_API;

export async function doGetRequest(url:string, params:Record<string,string> | null = null) {
    const fetchUrl = baseURL + url + (params === null ? "" : "?" + new URLSearchParams(params))
    return fetch(fetchUrl,
        {
            method: "GET",
            
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
            credentials: 'same-origin',
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
            credentials: 'same-origin'
        }
    );
}

export async function sendLogout() {
    return fetch(baseURL + "/auth/logout",
        {
            method: "POST",
            credentials: 'same-origin'
        }
    );
}

export async function makeReservation(name: string, email: string, reservations: ReservationDay[]) {
    return doPostRequest("/reservations", {"name": name, "email": email, "reservations": reservations})
}

export async function getAvailable(){
    console.log("api")
    return doGetRequest("/reservations").then(async (res) => {
        console.log("??")
        console.log(res);
        return res.json().then(json => {
            const j = json as any[];
            return j.map(m => new ReservationDay(new Date(m.day)))
        })
    })
}

export async function addReservationDay(date: Date){
    return doPostRequest("/reservations/add", {"day": date.toDateString()})
}
