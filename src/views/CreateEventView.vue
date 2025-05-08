<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

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
    <div class="container px-4 py-6 mx-auto w-lg">
        <h1 class="text-lg sm:text-2xl text-center">Buat Event Baru</h1>
        <form @submit.prevent="saveData">
            <div class="w-full">
                <label>Nama</label>
                <Input type="text" v-model="name" />
            </div>
            <div>
                <label>Tempat</label>
                <Input type="text" v-model="place" />
            </div>
            <div>
                <label>Waktu</label>
                <Input type="datetime-local" v-model="time" />
            </div>
    
            <div class="mt-3">
                <Button type="submit">Simpan</Button>
            </div>
        </form>
    </div>
</template>