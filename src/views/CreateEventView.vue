<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter();

const name = ref('')
const place = ref('')
const time = ref('')

const saveData = async () => {
    const newEvent = JSON.stringify({
        name: name.value,
        place: place.value,
        time: Date.parse(time.value)/1000,
    })

    const response = await fetch('/api/events', {
        method:'POST',
        body: newEvent,
    })
    const data = await response.json()

    router.push('/')
}
</script>


<template>
    <div class="container px-4 py-6 mx-auto">
        <h1 class="text-lg sm:text-2xl">Buat Event Baru</h1>
        <form @submit.prevent="saveData">
            <div class="w-full">
                <label>Nama</label>
                <input type="text" v-model="name" class="border">
            </div>
            <div>
                <label>Tempat</label>
                <input type="text" v-model="place" class="border">
            </div>
            <div>
                <label>Waktu</label>
                <input type="datetime-local" v-model="time" class="border">
            </div>
    
            <div class="mt-3">
                <input type="submit" class="rounded-full text-white bg-sky-500 py-2 px-6 hover:bg-sky-800 hover:cursor-pointer">
            </div>
        </form>
    </div>
</template>