<template>
  <!-- Comment -->
  <div :class="{ active: isActive }" @click="handleClick">
    <h1>{{ title }}</h1>
    <input v-model="inputValue" type="text" placeholder="Enter text" />
    <p v-if="showMessage">Message: {{ computedMessage }}</p>
    <ul>
      <li v-for="(item, idx) in items" :key="item.id">{{ idx }}: {{ item.name }}</li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, watch, defineProps } from 'vue'

interface Item {
  id: number;
  name: string;
}

const props = defineProps<{ initialValue?: string }>()

const title = ref<string>('Example Title')
const inputValue = ref(props.initialValue ?? '')
const items = ref<Item[]>([
  { id: 1, name: 'Item One' },
  { id: 2, name: 'Item Two' },
])
const isActive = ref(false)
const showMessage = ref(true)

const computedMessage = computed(() => `${title.value} - ${inputValue.value.toUpperCase()}`)

function handleClick(): void {
  isActive.value = !isActive.value
}

watch(inputValue, (newVal, oldVal) => {
  console.log(`Input changed from ${oldVal} to ${newVal}`)
})
</script>