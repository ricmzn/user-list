<template>
  <main>
    <UserCard v-for="user in users" :user="user" />
  </main>
</template>

<script setup lang="ts">
import { onBeforeMount, ref } from "vue";
import Reqres, { type ReqresUser } from "../reqres";
import UserCard from "./UserCard.vue";

const users = ref<Array<ReqresUser | null>>([
  // Inicializa o componente com wireframes dos usuários
  null, null, null, null, null
]);

onBeforeMount(async () => {
  users.value = await Reqres.listUsers()
    .then((response) => response.data);
});
</script>
