<template>
  <header class="flex row space-between align-center">
    <h1>Usuários</h1> <button class="action">Novo usuário</button>
  </header>
  <UserList />
</template>

<script setup lang="ts">
import UserList from "../components/UserList.vue";
</script>
