<template>
    <button :disabled="btnDisable">
        <span v-if="!rootStore.isLoading">Создать</span>
        <span class="loader" v-else></span>
    </button>
</template>
<script setup>
import { ref } from 'vue';
import { useRootStore } from '@/stores/root';
import { storeToRefs } from 'pinia';

const rootStore = useRootStore()
const { btnDisable } = storeToRefs(rootStore)

</script>
<style>
button {
    width: 150px;
    height: 40px;
    background-color: #035efc;
    border: 1px solid white;
    border-radius: 10px;
    color: white;
    font-size: 20px;
}

button:disabled,
button[disabled] {
    border: 1px solid #999999;
    background-color: white;
    color: #666666;
}

.loader {
    display: inline-block;
    margin: 3px auto;
    width: 25px;
    height: 25px;
    border: 3px solid white;
    border-bottom: none;
    border-radius: 100%;
    animation: rotate 1s infinite linear;
}

@keyframes rotate {
    from {
        transform: rotate(0deg);
    }

    to {
        transform: rotate(360deg);
    }
}
</style>