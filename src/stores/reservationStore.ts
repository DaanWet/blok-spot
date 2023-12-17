import { defineStore, acceptHMRUpdate } from "pinia";
import ReservationDay from "@/dataTypes/reservationDay";
import Reservation from "@/dataTypes/reservation";
import { getAvailable, getResults } from "@/utils/ApiRequests";
import ReservationResult from "@/dataTypes/reservationResult";
const d = new Date();
d.setDate(14);
const d2 = new Date();
d2.setDate(15);

export const useReservationsStore = defineStore({
    id: 'reservations',
    state: () => ({
        reservation: [] as ReservationDay[],
        reservationResults : [] as ReservationResult[]
    }),
    getters: {
        /*reservation: (state): Array<ReservationDay> =>{
            return state.reservation;
        }*/
    },
    actions: {
        fetchReservations(){
            getAvailable().then(res => {
                
                this.reservation = res.filter(r => r.day >= new Date()) as ReservationDay[];
            });
        },
        fetchAllReservations(){
            getResults().then(res => {
                this.reservationResults = res as ReservationResult[]
                console.log(this.reservationResults);
                console.log("---")
            })
        },
        updateReserved(index: any, newValue:Boolean){
            this.reservation[index].checked = newValue;
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
