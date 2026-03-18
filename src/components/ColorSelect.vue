<template>
    <div class="custom-color-select" :class="{ 'is-disabled': disabled }"
        :style="{ width: isNaN(Number(width)) ? width : width + 'px' }">
        <el-input :model-value="showValue ? modelValue : ''" readonly :class="{ 'hide-text': !showValue }"
            :disabled="disabled">
            <template #prefix>
                <!-- 带有棋盘格底纹的预览块包裹层 -->
                <div class="color-block-wrapper">
                    <div class="color-block" :style="{ backgroundColor: modelValue }"></div>
                </div>
            </template>
            <template #suffix>
                <svg t="1772984865774" class="icon" viewBox="0 0 1024 1024" version="1.1"
                    xmlns="http://www.w3.org/2000/svg" p-id="4614" width="16" height="16">
                    <path
                        d="M830.24 340.688l11.328 11.312a16 16 0 0 1 0 22.624L530.448 685.76a16 16 0 0 1-22.64 0L196.688 374.624a16 16 0 0 1 0-22.624l11.312-11.312a16 16 0 0 1 22.624 0l288.496 288.496 288.512-288.496a16 16 0 0 1 22.624 0z"
                        fill="#2c2c2c" p-id="4615"></path>
                </svg>
            </template>
        </el-input>

        <el-color-picker :model-value="modelValue" @update:model-value="handleChange" show-alpha placement="bottom-end"
            :disabled="disabled" />
    </div>
</template>

<script setup lang="ts">
defineProps({
    modelValue: {
        type: String,
        default: '#ffffff'
    },
    // 是否展示颜色具体的文本数值
    showValue: {
        type: Boolean,
        default: true
    },
    // 外层输入框整体横向尺寸
    width: {
        type: [Number, String],
        default: '100%'
    },
    disabled: {
        type: Boolean,
        default: false
    }
});

const emit = defineEmits(['update:modelValue', 'change']);

const handleChange = (val: string | null) => {
    // 处理清空(null)的场景
    const newValue = val || 'rgba(0, 0, 0, 0)';
    emit('update:modelValue', newValue);
    emit('change', newValue);
};
</script>

<style scoped lang="scss">
.custom-color-select {
    position: relative;
    /* 容器实际宽度已交由行内样式动态绑定 :style="{ width: ... }" */

    &.is-disabled {
        cursor: not-allowed;
        opacity: 0.6;
    }

    :deep(.el-input__wrapper) {
        box-shadow: 0 0 0 1px #dcdfe6 inset;
    }

    /* 隐藏数值时文字变透明（保留占据的物理空间，但看不见） */
    .hide-text :deep(.el-input__inner) {
        color: transparent !important;
    }

    .color-block-wrapper {
        width: 20px;
        height: 20px;
        border-radius: 4px;
        border: 1px solid #dcdfe6;
        margin-right: 8px;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        overflow: hidden;
        flex-shrink: 0;

        /* 透明棋盘格背景 */
        background-color: #fff;
        background-image:
            linear-gradient(45deg, #ccc 25%, transparent 25%),
            linear-gradient(-45deg, #ccc 25%, transparent 25%),
            linear-gradient(45deg, transparent 75%, #ccc 75%),
            linear-gradient(-45deg, transparent 75%, #ccc 75%);
        background-size: 10px 10px;
        background-position: 0 0, 0 5px, 5px -5px, -5px 0px;

        .color-block {
            width: 100%;
            height: 100%;
            transition: background-color 0.2s;
        }
    }

    /* 将原生 color picker 设置为彻底透明，绝对定位覆盖在其上方，用于监听点击事件并接管定位及弹窗 */
    :deep(.el-color-picker) {
        width: 100% !important;
        height: 100% !important;
        overflow: hidden;
        opacity: 0;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 2;

        /* 强制拉伸 trigger 来填充父级作为 Popper 的对齐有效实体基准点 */
        .el-color-picker__trigger {
            width: 100% !important;
            height: 100% !important;
            border: none !important;
            padding: 0 !important;
        }
    }
}
</style>
