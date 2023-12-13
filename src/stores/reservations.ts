import { defineStore, acceptHMRUpdate } from "pinia";
import ReservationDay from "@/dataTypes/reservationDay";

export const useReservationsStore = defineStore({
    id: 'reservations',
    state: () => ({
        reservation: [new ReservationDay(new Date()), new ReservationDay(new Date()), new ReservationDay(new Date)] as ReservationDay[]
    }),
    getters: {
        /*reservation: (state): Array<ReservationDay> =>{
            return state.reservation;
        }*/
    },
    actions: {
        addDay(day : Date){
            this.reservation.push(new ReservationDay(new Date()))
        },
        updateReserved(index: any){
            console.log(this.reservation[index].checked)
            this.reservation[index].checked = !this.reservation[index].checked;
            console.log(this.reservation[index].checked)
        },
        updateStart(index: any, start: any){
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
