<script setup lang="ts">
import { ref, inject, Ref } from 'vue';
import router from '@/router';
import { sendLogin, sendLogout } from '@/utils/ApiRequests';
import { AuthUpdateKey, UserAuthKey } from '@/utils/Symbols';

const loginActive = ref(false);
const name = ref('');
const password = ref('');
const authUpdate = inject(AuthUpdateKey, () => { });
const userAuth = inject(UserAuthKey, { isAuthenticated: false, userName: "" });
function login() {
    console.log("login")
    sendLogin(name.value, password.value).then(async res => {
        if (res.ok) {
            authUpdate();
        } else {
            alert("Wrong password")
        }
    });
}



async function logout() {
    await sendLogout();
    authUpdate();
}
</script>

<template>
    <header>
        <div class="navigator">
            <div class="left text-button">
                <a href="www.jhsock.be">
                    <img alt="Sock Logo" class="logo" src="@/assets/sock_logo.png" width="50" height="50" />
                </a>
                <nav>
                    <RouterLink to="/" class="text-button">Home</RouterLink>
                    <RouterLink to="/about" class="text-button">About</RouterLink>
                    <RouterLink v-if="userAuth.isAuthenticated" to="/results">Resultaten</RouterLink>
                </nav>
            </div>

            <div class="right">
                <div v-if="!userAuth.isAuthenticated">
                    <v-menu :close-on-content-click="false">
                        <template v-slot:activator="{ props }">
                            <v-btn color="primary" v-bind="props">Login</v-btn>
                        </template>
                        <v-form @submit.prevent="login" class="dropdown">
                            <v-text-field label="Naam" v-model="name" />
                            <v-text-field label="Password" v-model="password" type="password" />
                            <v-btn type="submit" block class="mb-8" variant="tonal">Login</v-btn>
                        </v-form>
                    </v-menu>
                </div>
                <div v-else>
                    <v-btn color="primary" @click="logout">Logout</v-btn>
                </div>
            </div>


        </div>
        <div class="space"></div>
    </header>
</template>

<style scoped>
header .navigator {
    display: flex;
    justify-content: space-between;
    background: rgba(255, 255, 255);
    position: fixed;
    top: 0;
    z-index: 1000;
    width: 100%;
    padding: 20px;
}


.space {
    height: 104px;
}


.left {
    display: flex;
    justify-content: flex-start;
    gap: 20px;
}



header nav {
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    gap: 40px;

}

header {
    position: relative;
    width: 100%;
}

.right {
    padding-left: 10px;
    padding-right: 10px;
    display: flex;
    align-items: center;
    gap: 10px
}

.dropdown {
    width: 250px;
    padding: 20px;
    padding-bottom: 0px;
    background: rgb(250, 250, 250);

}

a {
    text-decoration: none;
    color: blue;
}

a:visited {
    color: blue;
}
</style>
