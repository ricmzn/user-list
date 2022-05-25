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
          <div>{{ user.data.first_name }}</div>
        </div>
        <div class="field">
          <h2>Último nome</h2>
          <div>{{ user.data.last_name }}</div>
        </div>
        <span class="expand"></span>
      </div>
      <div class="field">
        <h2>Endereço de e-mail</h2>
        <div>{{ user.data.email }}</div>
      </div>
      <div class="field">
        <h2>Link do avatar</h2>
        <div>{{ user.data.avatar }}</div>
      </div>
      <div class="field">
        <h2>Link de suporte</h2>
        <div>{{ user.support.url }}</div>
      </div>
      <div class="field">
        <h2>Descrição do usuário</h2>
        <div>{{ user.support.text }}</div>
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

.field>div {
  font-weight: 600;
  font-size: 16px;
  margin-top: 7px;
  margin-bottom: 20px;
}
</style>
