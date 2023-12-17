<script lang="ts" setup>
import PageHeader from '@/components/PageHeader.vue';
import ReservationDay from '@/dataTypes/reservationDay';
import DayComponent from '@/components/DayComponent.vue';
import { inject, ref, onBeforeMount, Ref } from 'vue';
import { useReservationsStore } from '@/stores/reservationStore'
import VueDatePicker from '@vuepic/vue-datepicker';
import { makeReservation, addReservationDay, addReservationDayWithStart, addReservationDayWithEnd, addReservationDayWithStartEnd } from '@/utils/ApiRequests'
import { UserAuthKey } from '@/utils/Symbols';
import { fail } from 'assert';


const email = ref('')
const name = ref('')
const reservations = useReservationsStore();
reservations.fetchReservations();
const reses = ref([]);
const addDay = ref(new Date());
const addStart = ref(undefined);
const addEnd = ref(undefined);
const succes = ref(false);
const failure = ref(false);
const text = ref('Vul alle velden in')
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
        text.value = "Server error";
        failure.value = true;
      }
    })
  } else {
    text.value = "Vul alle velden in";
    failure.value = true;
  }
  disabled.value = false;

}

function checkTimes(): boolean {
  return reservations.reservation.filter(m => m.checked).every(m => m.start !== undefined && m.end !== undefined);
}


async function add(event: any) {
  if (addStart.value === undefined) {
    if (addEnd.value === undefined) {
      await addReservationDay(addDay.value).then(_ => reservations.fetchReservations());
    } else {
      await addReservationDayWithEnd(addDay.value, addEnd.value).then(_ => reservations.fetchReservations());
    }
  } else {
    if (addEnd.value === undefined) {
      await addReservationDayWithStart(addDay.value, addStart.value).then(_ => reservations.fetchReservations());
    } else {
      await addReservationDayWithStartEnd(addDay.value, addStart.value, addEnd.value).then(_ => reservations.fetchReservations());
    }
  }
  reservations.fetchReservations();
}

</script>

<template>
  <PageHeader />
  <main>
    <div class="container">
      <div class="explanation text-body-1">
        <p>Schrijf je hier in voor de blok-spot van Jeugdhuis SOCK.</p>
        <p>Vul je naam en email in en vink dan aan welke dagen (en bijhorende uren) je graag in het jeugdhuis zou komen
          studeren.</p>
        <p>Lukt iets niet? Stuur ons gerust een berichtje op facebook.</p>
        <p>Hou zeker onze socials in de gaten voor eventuele veranderingen of nieuwe beschikbare dagen.</p>
      </div>


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

        <div class="headers text-body-1">
          <div class="placeholder"></div>
          <div class="placeholder"></div>
          <div class="txt start">
            Van
          </div>
          <div class="txt end">
            Tot
          </div>
        </div>
        <div class="list text-body-1">
          <DayComponent v-for="(day, index) in reservations.reservation" :key="index" :reservation="day" :index="index" />
        </div>
        <div class="submit-container">
          <div class="small">
            <v-btn type="submit" block class="mt-2">Reserveer</v-btn>
            <div v-if="auth.isAuthenticated" class="text-body-1">
              <VueDatePicker v-model="addDay" :enable-time-picker="false" />
              Start:
              <VueDatePicker v-model="addStart" time-picker />
              End:
              <VueDatePicker v-model="addEnd" time-picker />
              <v-btn @click="add">ADD</v-btn>
            </div>
            <v-alert v-model="failure" type="error" title="Fout" :text="text" closable />
            <v-alert v-model="succes" type="success" title="Success" text="Reservering in orde" closable />
          </div>
        </div>
      </v-form>
    </div>
  </main>
</template>

<style scoped>
.explanation {}

.container {
  height: 100%;
  background-color: rgba(255, 255, 255, 0.72);
  padding: 5px;
}

.form {

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
    height: 100%;
    padding: 20px;
    background-color: rgba(255, 255, 255, 0.72);
  }

  .form {

    height: 100%;
  }

  .explanation {
    padding-left: 50px;
    padding-right: 50px;
    padding-bottom: 20px;
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
