<script lang="ts" setup>
import { HeaderBar } from './HeaderBar'

const attribute = withDefaults(defineProps<{
    view: string,
    bgc?: string
}>(), {
    bgc: '#212121',
})

const instance = new HeaderBar()

const {
    options
} = instance.InitStates()
</script>

<template>
    <div class="HeaderBar" :style="{ background: attribute.bgc }">
        <span class="Btn">
            <span class="Item" v-for="item in options" :key="item.type"
                @click="instance.OptionClick(attribute.view, item.type)">
                <img :src="item.icon" :title="item.label" class="Icon" />
            </span>
        </span>
    </div>
</template>

<style lang="scss" scoped>
@import "./HeaderBar.scss";
</style>
