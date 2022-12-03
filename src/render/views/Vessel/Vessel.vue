<script lang="ts" setup>
import { provide } from 'vue';
import HeaderBarVue from '@render/common/HeaderBar/HeaderBar.vue';
import { Vessel } from './Vessel'

const instance = new Vessel()

provide('instance', instance)

const {

} = instance.InitStates()

instance.InitHooks()

instance.Run()
</script>

<template>
    <div class="Vessel">
        <HeaderBarVue :view="'Vessel'"></HeaderBarVue>
        <n-button type="primary" class="Btn" @click="instance.Test()">
            Emit
        </n-button>
    </div>
</template>

<style lang="scss" scoped>
@import "./Vessel.scss";
</style>
