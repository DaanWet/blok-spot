<script lang="ts" setup>
import PageHeader from '@/components/PageHeader.vue';
import ReservationDay from '@/dataTypes/reservationDay';
import DayComponent from '@/components/DayComponent.vue';
import { ref } from 'vue';
import { useReservationsStore } from '@/stores/reservations'

const email = ref('')
const name = ref('')
const reservations = useReservationsStore();


const emailRules = [
  (v: string) => !!v || 'E-mail is required',
  (v: string) => /^(([^<>()[\]\\.,;:\s@']+(\.[^<>()\\[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v) || 'E-mail must be valid',
]

function submit(event: any) {
  alert(JSON.stringify(reservations.reservation));
}
</script>

<template>
  <PageHeader />
  <main>
    <div class="container">
      <v-form class="form" @submit="submit">
        <v-text-field label="Naam" v-model="name" />
        <v-text-field label="Email" v-model="email" :rules="emailRules" />
        <div class="list">
          <DayComponent v-for="(day, index) in reservations.reservation" :key="index" :reservation="day" :index="index" />
        </div>
        <v-btn type="submit" block class="mt-2">Reserveer</v-btn>
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
</style>
