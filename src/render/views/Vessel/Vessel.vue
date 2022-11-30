<script lang="ts" setup>
import { provide } from 'vue';
import HeaderVue from "@render/common/Header/Header.vue"
import { Vessel } from './Vessel'

provide('view', 'Vessel')

const instance = new Vessel()

provide('instance', instance)

const {

} = instance.InitStates()

instance.InitHooks()

instance.Run()
</script>

<template>
    <div class="Vessel">
        <HeaderVue></HeaderVue>
        <n-button type="primary" class="Btn" @click="instance.Test()">
            Emit
        </n-button>
    </div>
</template>

<style lang="scss" scoped>
@import "./Vessel.scss";
</style>
