<script lang="ts" setup>
import PageHeader from '@/components/PageHeader.vue';
import ReservationDay from '@/dataTypes/reservationDay';
import DayComponent from '@/components/DayComponent.vue';
import { inject, ref, onBeforeMount, Ref } from 'vue';
import { useReservationsStore } from '@/stores/reservationStore'
import VueDatePicker from '@vuepic/vue-datepicker';
import { makeReservation, addReservationDay, addReservationDayWithTime } from '@/utils/ApiRequests'
import { UserAuthKey } from '@/utils/Symbols';
import { fail } from 'assert';


const email = ref('')
const name = ref('')
const reservations = useReservationsStore();
reservations.fetchReservations();
const reses = ref([]);
const addDay = ref(new Date());
const addTime = ref(undefined);
const succes = ref(false);
const failure = ref(false);
const text = ref('Good')
const disabled = ref(false);
const form = ref({ reset() { } })

const nameRules = [
  (v: string) => !!v || 'E-mail is required'
]
const emailRules = [
  (v: string) => !!v || 'E-mail is required',
  (v: string) => /^(([^<>()[\]\\.,;:\s@']+(\.[^<>()\\[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v) || 'E-mail must be valid',
]

const auth = inject(UserAuthKey, { isAuthenticated: false, userName: "" });


async function submit(event: any) {
  disabled.value = true;
  const results = await event;
  if (results.valid && checkTimes()) {
    makeReservation(name.value, email.value, reservations.reservation).then(res => {
      if (res.ok) {
        form.value.reset()
        reservations.fetchReservations()
        succes.value = true;
      } else {
        failure.value = true;
      }
    })
  } else {
    failure.value = true;
  }
  disabled.value = false;

}

function checkTimes(): boolean {
  return reservations.reservation.filter(m => m.checked).every(m => m.start !== undefined && m.end !== undefined);
}


async function add(event: any) {
  if (addTime.value == undefined) {
    addReservationDay(addDay.value).then(_ => reservations.fetchReservations());
  } else {
    await addReservationDayWithTime(addDay.value, addTime.value).then(_ => reservations.fetchReservations());
  }
  reservations.fetchReservations();
}

</script>

<template>
  <PageHeader />
  <main>
    <div class="container">
      <v-form class="form" @submit.prevent="submit" ref="form" :disabled="disabled">
        <v-text-field label="Naam" v-model="name" :rules="nameRules" />
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

        <div class="headers">
          <div class="placeholder"></div>
          <div class="placeholder"></div>
          <div class="txt start">
            Van
          </div>
          <div class="txt end">
            Tot
          </div>
        </div>
        <div class="list">
          <DayComponent v-for="(day, index) in reservations.reservation" :key="index" :reservation="day" :index="index" />
        </div>
        <div class="submit-container">
          <div class="small">
            <v-btn type="submit" block class="mt-2">Reserveer</v-btn>
            <div v-if="auth.isAuthenticated">
              <VueDatePicker v-model="addDay" :enable-time-picker="false" />
              <VueDatePicker v-model="addTime" time-picker />
              <v-btn @click="add">ADD</v-btn>
            </div>
            <v-alert v-model="failure" type="error" title="Fout" text="Vul alle velden in" closable />
            <v-alert v-model="succes" type="success" title="Success" text="Reservering in orde" closable />
          </div>
        </div>
      </v-form>
    </div>
  </main>
</template>

<style scoped>
.container {
  height: 100%;
}

.form {
  background-color: rgba(255, 255, 255, 0.72);
  padding: 5px;
  height: 100%;
}

.submit-container {
  justify-content: center;
  display: flex;
}

.small {
  width: 75%;
}

.headers {
  display: flex;
  justify-content: space-evenly;

}

.headers .txt {
  width: 90px;
  text-align: center;
}

.placeholder {
  width: 89px;
}

@media only screen and (min-width: 992px) {

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



  .submit-container {
    justify-content: center;
    display: flex;
  }

  .small {
    width: 50%;
  }


  .txt {
    display: none;
  }
}
</style>
