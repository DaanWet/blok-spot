<script setup lang="ts">
import { DefaultSerializer } from 'v8';
import DayComponent from './DayComponent.vue';
import ReservationDay from '@/dataTypes/reservationDay';
defineProps({
    ,

})


</script>

<template>
    <div class="list">
        <DayComponent v-for="(day, index) in list" :day="day" :key="index" />
    </div>
</template>

<style>
</style>
