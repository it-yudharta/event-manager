<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const router = useRouter();

const route = useRoute()
const id = route.params.id

const name = ref('')
const place = ref('')
const time = ref('')

const saveData = async () => {
    const event = JSON.stringify({
        name: name.value,
        place: place.value,
        time: Date.parse(time.value)/1000,
    })

    const response = await fetch(`/api/events/${id}`, {
        method:'PUT',
        body: event,
    })
    const data = await response.json()

    router.push('/')
}

onMounted(() => {
    fetch(`/api/events/${id}`)
        .then(response => response.json())
        .then(data => {
            name.value = data.name
            place.value = data.place
            time.value = new Date(data.time * 1000).toISOString().slice(0, 16)
        })
})
</script>

<template>
    <h1>Edit Event Baru</h1>
    <form @submit.prevent="saveData">
        <div>
            <label>Nama</label>
            <input type="text" v-model="name">
        </div>
        <div>
            <label>Tempat</label>
            <input type="text" v-model="place">
        </div>
        <div>
            <label>Waktu</label>
            <input type="datetime-local" v-model="time">
        </div>

        <div>
            <input type="submit">
        </div>
    </form>
</template>