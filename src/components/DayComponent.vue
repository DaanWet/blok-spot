<script setup lang="ts">
import { defineComponent } from 'vue';
import VueDatePicker from '@vuepic/vue-datepicker';
import ReservationDay from '@/dataTypes/reservationDay';
import '@vuepic/vue-datepicker/dist/main.css';
import { useReservationsStore } from '@/stores/reservations';
defineProps({
    reservation: {
        type: ReservationDay,
        default: new ReservationDay(new Date()),
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
            <v-checkbox :value="reservation.checked" class="shrink" hide-details density="compact" @click="(a: any) => {
                reservationStore.updateReserved(index);
            }"></v-checkbox>
        </div>
        <div>
            {{ reservation.day.toLocaleString('nl-BE', { dateStyle: "full" })
            }}
        </div>
        <div class="picker">
            <div class="txt">
                Van:
            </div>
            <VueDatePicker :value="reservation.start" time-picker :min-time="{ hours: 7 }" :max-time="{ hours: 22 }"
                :start-time="{ hours: 0, minutes: 0 }" minutes-grid-increment="30" minutes-increment="30"
                :disabled="!reservation.checked"
                :state="(reservation.start === undefined && reservation.checked) ? false : undefined"
                @update:model-value="$emit('update:start', $event.target.value)" />
        </div>
        <div class="picker">
            <div class="txt">
                Tot:
            </div>
            <VueDatePicker :value="reservation.end" time-picker
                :min-time="reservation.start === undefined ? { hours: 7 } : reservation.start" :max-time="{ hours: 22 }"
                :start-time="{ hours: 0, minutes: 0 }" minutes-grid-increment="30" minutes-increment="30"
                :disabled="!reservation.checked"
                :state="(reservation.end === undefined && reservation.checked) ? false : undefined"
                @text-submit="$emit('update:end', $event.target.value)" />
        </div>
    </div>
</template>
<style>
.card {
    display: flex;
    justify-content: space-evenly;
}

.picker {
    display: flex;
    width: 150px;
}

.picker .txt {
    padding-right: 10px;
}
</style>
