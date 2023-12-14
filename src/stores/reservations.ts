import { defineStore, acceptHMRUpdate } from "pinia";
import ReservationDay from "@/dataTypes/reservationDay";
import { getAvailable } from "@/utils/ApiRequests";
const d = new Date();
d.setDate(14);
const d2 = new Date();
d2.setDate(15);

export const useReservationsStore = defineStore({
    id: 'reservations',
    state: () => ({
        reservation: [new ReservationDay(new Date()), new ReservationDay(d), new ReservationDay(d2)] as ReservationDay[]
    }),
    getters: {
        /*reservation: (state): Array<ReservationDay> =>{
            return state.reservation;
        }*/
    },
    actions: {
        fetchReservations(){
            getAvailable().then(res => {
                this.reservation = res as ReservationDay[];
            });
        },
        addDay(day : Date){
            this.reservation.push(new ReservationDay(new Date()))
        },
        updateReserved(index: any, newValue:Boolean){
            this.reservation[index].checked = newValue;
        },
        updateStart(index: any, start: any){
            console.log(index);
            this.reservation[index].start = start;
        },
        updateEnd(index: any, end: any){
            this.reservation[index].end = end;
        }
    }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useReservationsStore, import.meta.hot))
}
