<script lang="ts" setup>
import { Screenshot } from './Screenshot'
const instance = new Screenshot()

const {

} = instance.InitStates()
instance.InitHooks()
instance.Run()
</script>

<template>
    <div class="Screenshot">

    </div>
</template>

<style lang="scss" scoped>
@import "./Screenshot.scss"
</style>