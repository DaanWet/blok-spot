<script setup lang="ts">
import { defineComponent } from 'vue';
import VueDatePicker from '@vuepic/vue-datepicker';
import ReservationDay from '@/dataTypes/reservationDay';
import '@vuepic/vue-datepicker/dist/main.css';
import { useReservationsStore } from '@/stores/reservationStore';
defineProps({
    reservation: {
        type: ReservationDay,
        default: new ReservationDay(new Date(), { hours: 22, minutes: 0 }),
    },
    index: {
        type: Number,
        default: 0
    }
});
const reservationStore = useReservationsStore()
</script>


<template>
    <div class="card">
        <div class="checkbox">
            <v-checkbox :modelvalue="reservation.checked" class="shrink" hide-details density="compact" @update:model-value="newValue => {
                const n = newValue as Boolean;
                reservationStore.updateReserved(reservationStore.reservation.indexOf(reservation), n)
            }"></v-checkbox>
        </div>
        <div class="date txt">
            {{ reservation.day.toLocaleString('nl-BE', { dateStyle: "full" })
            }}
        </div>
        <div class="picker">
            <div class="txt">
                Van:
            </div>
            <VueDatePicker :model-value="reservation.start" time-picker :min-time="{ hours: 7 }"
                :max-time="{ hours: reservation.maxEnd.hours, minutes: reservation.maxEnd.minutes }"
                :start-time="{ hours: 0, minutes: 0 }" minutes-grid-increment="30" minutes-increment="30"
                :disabled="!reservation.checked"
                :state="(reservation.start === undefined && reservation.checked) ? false : undefined" @update:model-value="newValue => {
                    reservationStore.updateStart(reservationStore.reservation.indexOf(reservation), newValue);
                }" />
        </div>
        <div class="picker">
            <div class="txt">
                Tot:
            </div>
            <VueDatePicker :model-value="reservation.end" time-picker
                :min-time="reservation.start === undefined ? { hours: 7 } : reservation.start"
                :max-time="{ hours: reservation.maxEnd.hours, minutes: reservation.maxEnd.minutes }"
                :start-time="{ hours: 0, minutes: 0 }" minutes-grid-incremen t="30" minutes-increment="30"
                :disabled="!reservation.checked"
                :state="(reservation.end === undefined && reservation.checked) ? false : undefined" @update:model-value="newValue => {
                    reservationStore.updateEnd(reservationStore.reservation.indexOf(reservation), newValue);
                }" />
        </div>
    </div>
</template>
<style scoped>
.card {
    display: flex;
    justify-content: space-evenly;
}

.picker {
    display: flex;
    width: 90px;
}

.picker .txt {
    display: none;
}

.date {
    text-align: center;
}

.txt {
    width: 150px;
    align-self: center;
}

@media only screen and (min-width: 992px) {

    .card {
        display: flex;
        justify-content: space-evenly;
    }

    .picker {
        display: flex;
        width: 200px;
    }

    .picker .txt {
        display: unset;
        padding-right: 10px;

    }

    .txt {
        align-self: center;
    }

    .date {
        width: 300px;
        text-align: center;
    }
}
</style>
