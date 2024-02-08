<script setup>
import MySelect from './components/MySelect.vue';
import MyButton from './components/MyButton.vue';
import { useRootStore } from './stores/root.js'
import { storeToRefs } from 'pinia';


const rootStore = useRootStore()
const { dataElements } = storeToRefs(rootStore)

rootStore.getToken()

function changeOption(e) {
  rootStore.btnDisable = false
  if (e == 'Сделка') {
    rootStore.tag = 'leads';
    rootStore.titleElement = e;
  }
  else if (e == 'Контакт') {
    rootStore.tag = 'contacts';
    rootStore.titleElement = e;
  } else {
    rootStore.titleElement = e;
    rootStore.tag = 'companies';
  }
}
function getData() {
  rootStore.isLoading = true
  if (rootStore.titleElement == 'Сделка') {
    rootStore.getLeadsId()
  }
  else if (rootStore.titleElement == 'Контакт') {
    rootStore.getContactsId()
  } else {
    rootStore.getCompanyId()
  }
}
</script>

<template>
  <div class="root">
    <div class="wrap">
      <h1 class="title">Создание сущностей amoCRM</h1>
      <MySelect @change="changeOption($event.target.value)" />
      <MyButton @click="getData" />
      <div v-if="!dataElements.length" class="element">
      </div>
      <div v-else class="element">
        <div class="element-names">
          <div class="element-name">Id сущности</div>
          <div class="element-name-item" v-for="el in dataElements" :key="el.id">{{ el.id }}</div>
        </div>
        <div class="element-titles">
          <div class="element-title">Имя сущности</div>
          <div class="element-title-item" v-for="el in dataElements" :key="el.id">{{ el.name }}</div>
        </div>
      </div>
    </div>

  </div>
</template>

<style scoped>
.root {
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  margin: 40px auto;
  border-radius: 25px;
  background-color: black;
  color: white;
  padding: 0 20px;
  width: 940px;
  min-height: 500px;
}

.wrap {
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  margin: 40px auto;
  border-radius: 25px;
  background-color: white;
  color: black;
  width: 900px;
  min-height: 500px;
}

h1 {
  margin-top: 40px;
  text-align: center;
  margin-bottom: 40px;
}

.element {
  display: flex;
  justify-content: space-between;
  width: 400px;
  margin-top: 20px;
}

.element-name,
.element-title {
  margin-bottom: 20px;
}

.element-name-item,
.element-title-item {
  padding-bottom: 30px;
}
</style>
