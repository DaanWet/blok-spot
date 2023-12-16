<script setup lang="ts">
import { useReservationsStore } from '@/stores/reservationStore';

const reservations = useReservationsStore();
reservations.fetchAllReservations();
const hours = Array(15).fill(0).map((_, i) => {
    const h = i + 8
    return h < 10 ? `0${h}` : `${h}`;
});
const minutes = Array(30).fill(0).map((_, i) => (i % 2 == 0) ? '00' : '30');
function isColored(start: string, end: string, hour: any, minute: any) {
    console.log(hour, Math.floor(hour / 2), hours[Math.floor(hour / 2)]);
    const startDate: Date = new Date(`1970-01-01T${start}Z`);
    const endDate: Date = new Date(`1970-01-01T${end}Z`);
    const place: Date = new Date(`1970-01-01T${hours[Math.floor(hour / 2)]}:${minute}:00Z`)
    console.log(start, end, hour, minute);
    console.log(startDate, endDate, place);
    console.log(startDate <= place && place < endDate);
    return startDate <= place && place < endDate ? "colored" : "";
}
</script>

<template>
    <main>
        <div class="container">
            <div v-for="day, index in reservations.reservationResults" :key="index">

                <table>
                    <caption>
                        {{ new Date(day.day).toLocaleString('nl-BE', { dateStyle: "full" }) }}
                    </caption>
                    <tr>
                        <th>
                            Naam
                        </th>
                        <th v-for="hour in hours" :key="hour" colspan="2">
                            {{ hour }}:00
                        </th>
                    </tr>
                    <tr v-for="reservation, i2 in day.reservations" :key="i2">
                        <td>{{ reservation.name }}</td>
                        <td v-for="ms, index in minutes" :key="index"
                            :class="isColored(reservation.start, reservation.end, index, ms)">

                        </td>
                    </tr>

                </table>

            </div>
        </div>
    </main>
</template>

<style>
.container {
    margin-left: 100px;
    margin-right: 100px;
    background-color: rgba(255, 255, 255, 0.72);
    padding: 20px;
    height: 100%;
}

td,
th {
    border: 1px solid rgb(40, 40, 40);
    border-collapse: collapse;
    min-height: 30px;
    min-width: 30px;
}

.colored {
    background-color: red;
    border-right: hidden;
}

th {
    border-bottom: 1px solid black;
}

table {
    overflow-x: auto;
    border-spacing: 10px;
    border: 1px solid rgb(89, 89, 89);
    border-collapse: collapse;
    width: 100%;
}
</style>
