<script lang="ts" setup>
import PageHeader from '@/components/PageHeader.vue';
import ReservationDay from '@/dataTypes/reservationDay';
import DayComponent from '@/components/DayComponent.vue';
import { inject, ref, onBeforeMount, Ref } from 'vue';
import { useReservationsStore } from '@/stores/reservations'
import VueDatePicker from '@vuepic/vue-datepicker';
import { makeReservation, addReservationDay } from '@/utils/ApiRequests'
import { UserAuthKey } from '@/utils/Symbols';


const email = ref('')
const name = ref('')
const reservations = useReservationsStore();
reservations.fetchReservations();
const reses = ref([]);
const addDay: Ref<Date> = ref(new Date());
const addTime: Ref<Date> = ref(new Date());
const emailRules = [
  (v: string) => !!v || 'E-mail is required',
  (v: string) => /^(([^<>()[\]\\.,;:\s@']+(\.[^<>()\\[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v) || 'E-mail must be valid',
]

const auth = inject(UserAuthKey, { isAuthenticated: false, userName: "" });


function submit(event: any) {
  for (let r of reservations.reservation) {
    if (r.checked && (r.start === undefined || r.end === undefined)) {
      alert("Vul een start en eind uur voor elke gereserveerde dag");
      return;
    }
  }
  makeReservation(name.value, email.value, reservations.reservation)
}

function add(event: any) {
  addReservationDay(addDay.value);
}

</script>

<template>
  <PageHeader />
  <main>
    <div class="container">
      <v-form class="form" @submit="submit">
        <v-text-field label="Naam" v-model="name" />
        <v-text-field label="Email" v-model="email" :rules="emailRules" />

        <!--<v-data-table :items="reservations.reservation" show-select :item-value="item => item.day" v-model="reses"
          items-per-page="-1" return-object>
          <template v-slot:item.start="{ item }">
            <VueDatePicker :model-value="item.start" time-picker :min-time="{ hours: 7 }" :max-time="{ hours: 22 }"
              :start-time="{ hours: 0, minutes: 0 }" minutes-grid-increment="30" minutes-increment="30"
              :disabled="!isChecked(item)" :state="(item.start === undefined && isChecked(item)) ? false : undefined"
              @update:model-value="newValue => {
                reservations.updateStart(reservations.reservation.indexOf(item), newValue);
              }" class="picker" />
          </template>
          <template v-slot:item.end="{ item }">
            <VueDatePicker :model-value="item.end" time-picker
              :min-time="item.start === undefined ? { hours: 7 } : item.start" :max-time="{ hours: 22 }"
              :start-time="{ hours: 0, minutes: 0 }" minutes-grid-increment="30" minutes-increment="30"
              :disabled="!isChecked(item)" :state="(item.end === undefined && isChecked(item)) ? false : undefined"
              @update:model-value="newValue => {
                reservations.updateEnd(reservations.reservation.indexOf(item), newValue);
              }" class="picker" />
          </template>
          <template v-slot:bottom></template>
        </v-data-table> --->


        <div class="list">
          <DayComponent v-for="(day, index) in reservations.reservation" :key="index" :reservation="day" :index="index" />
        </div>
        <v-btn type="submit" block class="mt-2">Reserveer</v-btn>
        <div v-if="auth.isAuthenticated" class="add">
          <VueDatePicker v-model="addDay" />
          <VueDatePicker v-model="addTime" time-picker />
          <v-btn type="idk" @click="add"></v-btn>
        </div>
      </v-form>
    </div>
  </main>
</template>

<style>
.container {
  margin-left: 100px;
  margin-right: 100px;
  height: 100%
}

.form {
  background-color: rgba(255, 255, 255, 0.72);
  padding: 20px;
  height: 100%;
}

main {
  background-image: url("@/assets/background.jpg");
  background-size: cover;
  height: calc(100vh - 65px);
}

.add {}
</style>
