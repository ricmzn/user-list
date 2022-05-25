<template>
  <header class="flex row space-between align-center">
    <h1>Usuários</h1>
    <button class="action">Novo usuário</button>
  </header>
  <main>
    <UserCard v-for="user in users" :user="user" />
  </main>
</template>

<script setup lang="ts">
import { notificationKey } from "@/notifications";
import { inject, onBeforeMount, ref } from "vue";
import UserCard from "../components/UserCard.vue";
import Reqres, { type ReqresUser } from "../reqres";

const notifications = inject(notificationKey);

const users = ref<Array<ReqresUser | null>>([
  // Inicializa o componente com wireframes dos usuários
  null, null, null, null, null
]);

// Carrega os usuários assim que o componente for criado
onBeforeMount(async () => {
  users.value = await Reqres.listUsers()
    .then((response) => response.data)
    .catch((err) => {
      notifications?.push("error", `Erro ao buscar usuários: ${err.message}`);
      throw err;
    });
});
</script>
