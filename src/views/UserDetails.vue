<template>
  <div class="container">
    <div class="flex row space-between align-center">
      <h1>#{{ userId }}</h1>
      <router-link type="button" class="action secondary" to="/">Voltar</router-link>
    </div>
    <template v-if="user != null">
      <div class="flex row space-around align-center">
        <img :src="user.data.avatar">
        <div class="field">
          <h2>Primeiro nome</h2>
          <p>{{ user.data.first_name }}</p>
        </div>
        <div class="field">
          <h2>Último nome</h2>
          <p>{{ user.data.last_name }}</p>
        </div>
        <span class="expand"></span>
      </div>
      <div class="field">
        <h2>Endereço de e-mail</h2>
        <p>{{ user.data.email }}</p>
      </div>
      <div class="field">
        <h2>Link do avatar</h2>
        <a :href="user.data.avatar" target="_blank">{{ user.data.avatar }}</a>
      </div>
      <div class="field">
        <h2>Link de suporte</h2>
        <a :href="user.support.url" target="_blank">{{ user.support.url }}</a>
      </div>
      <div class="field">
        <h2>Descrição do usuário</h2>
        <p>{{ user.support.text }}</p>
      </div>
    </template>
    <div v-else-if="loading">Carregando...</div>
    <div v-else>Não foi possível carregar informações do usuário</div>
  </div>
</template>

<script setup lang="ts">
import { notificationKey } from "@/notifications";
import type { ReqresUserResponse } from "@/reqres";
import Reqres from "@/reqres";
import { inject, onBeforeMount, ref } from "vue";

const notifications = inject(notificationKey);

const { userId } = defineProps<{
  userId: number
}>();

const user = ref<ReqresUserResponse | null>();
const loading = ref(true);

onBeforeMount(async () => {
  try {
    user.value = await Reqres.getUser(userId);
  } catch (err) {
    if (err instanceof Error) {
      notifications?.push("error", `Erro ao buscar usuário: ${err.message}`);
    }
    throw err;
  }
  finally {
    loading.value = false;
  }
});
</script>

<style scoped>
.container {
  margin: 56px auto;
  max-width: 620px;
}

.action {
  padding: 18px 68px;
}

img {
  width: 120px;
  height: 120px;
  border-radius: 5px;
  margin-right: 34px;
  margin-bottom: 30px;
}

.row .field+.field {
  margin-left: 46px;
}

.field>h2 {
  color: #797979;
  font-weight: 400;
  font-size: 14px;
  margin: 0;
}

.field>a,
.field>p {
  display: block;
  appearance: none;
  text-decoration: none;
  color: unset;
  font-weight: 600;
  font-size: 16px;
  margin-top: 7px;
  margin-bottom: 20px;
}
</style>
