<script lang="ts" setup>
import { provide, onMounted, reactive } from 'vue';
import { doGetRequest } from "@/utils/ApiRequests";
import { UserAuthKey, AuthUpdateKey } from "@/utils/Symbols";

const userAuth = reactive({
  isAuthenticated: false,
  userName: ""
});

async function updateAuthentication() {
  doGetRequest("/auth/username")
    .then(value => {
      if (value.ok) {
        userAuth.isAuthenticated = true;
      } else {
        userAuth.isAuthenticated = false;
        userAuth.userName = "";
      }
      return value.text();
    })
    .then(value => {
      userAuth.userName = value;
    })
    .catch(e => { });
}

provide(UserAuthKey, userAuth);
provide(AuthUpdateKey, updateAuthentication);

onMounted(() => {
  updateAuthentication();
})
</script>

<template>
  <router-view />
</template>



