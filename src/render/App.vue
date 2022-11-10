<script lang="ts" setup>
import PreloadVue from './preload/Preload.vue';
import { darkTheme, zhCN, dateZhCN } from 'naive-ui'
import { App } from './App'

App.Instance.Run()
</script>

<template>
    <n-config-provider :locale="zhCN" :date-locale="dateZhCN" :theme="darkTheme">
        <n-message-provider>
            <n-dialog-provider>
                <PreloadVue></PreloadVue>
                <router-view />
            </n-dialog-provider>
        </n-message-provider>
    </n-config-provider>
</template>

<style lang="scss">
@import "./App.scss";
</style>
