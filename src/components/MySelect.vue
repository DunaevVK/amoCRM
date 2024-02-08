<template>
    <div class="select">
        <select>
            <option disabled value="" selected>Не выбрано</option>
            <option v-for="(titleElement, index) in rootStore.getElementsNames" :key="index">
                {{ titleElement }}
            </option>
        </select>
    </div>
</template>
<script setup>
import { useRootStore } from '../stores/root.js'
const rootStore = useRootStore()

</script>
<style scoped>
select {
    width: 150px;
    height: 40px;
    background-color: transparent !important;
    border: none;
    border-bottom: 1px solid black;
    border-radius: 1px;
    color: black;
    font-size: 20px;
    margin-bottom: 80px;
}
</style>