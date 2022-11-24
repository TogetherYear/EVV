<script lang="ts" setup>
import { Transformable } from './Transformable';

const instance = new Transformable()

const {
    dom,
    UpdateSize
} = instance.InitStates()
instance.InitHooks()
instance.Run()

defineExpose({
    /**
     * 如果容器改变大小 调一下这个方法
     */
    UpdateSize
})
</script>

<template>
    <div class="Transformable" ref="dom">
        <slot></slot>
    </div>
</template>

<style lang="scss" scoped>
@import "./Transformable.scss"
</style>