<script lang="ts" setup>
import { provide } from 'vue';
import HeaderBarVue from '@Render/Common/HeaderBar/HeaderBar.vue';
import { Application } from './Application';

const instance = new Application();

provide('instance', instance);

const {} = instance.InitStates();

instance.InitHooks();

instance.Run();
</script>

<template>
    <div class="Application">
        <HeaderBarVue></HeaderBarVue>
    </div>
</template>

<style lang="scss" scoped>
@import './Application.scss';
</style>
