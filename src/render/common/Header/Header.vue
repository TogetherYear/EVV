<script lang="ts" setup>
import { HeaderBar } from './Header'

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
    <div class="Header" :style="{ background: attribute.bgc }">
        <span class="MCBtns">
            <span class="btn_item" v-for="item in options" :key="item.type"
                @click="instance.OptionClick(attribute.view, item.type)">
                <img :src="item.icon" :title="item.label" class="btn_icon" />
            </span>
        </span>
    </div>
</template>

<style lang="scss" scoped>
@import "./Header.scss";
</style>
