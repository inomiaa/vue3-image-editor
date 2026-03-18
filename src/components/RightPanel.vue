<template>
    <aside class="right-panel">
        <template v-if="!activeElement">
            <div class="title">尺寸</div>
            <div class="row-flex">
                <div class="prop-item">
                    <label>宽度</label>
                    <el-input type="number" v-model.number="canvasWidth" disabled />
                </div>
                <div class="prop-item">
                    <label>高度</label>
                    <el-input type="number" v-model.number="canvasHeight" disabled />
                </div>
                <svg @click="dialogVisible = true" t="1772873064334" class="icon" viewBox="0 0 1024 1024" version="1.1"
                    xmlns="http://www.w3.org/2000/svg" p-id="6517" width="200" height="200">
                    <path
                        d="M684.202667 117.248c15.893333-15.872 42.154667-15.36 58.922666 1.408l90.517334 90.517333c16.661333 16.661333 17.344 42.986667 1.429333 58.922667l-445.653333 445.653333c-7.936 7.914667-23.104 16.746667-34.218667 19.776l-143.701333 39.253334c-21.909333 5.994667-35.114667-7.104-29.568-28.949334l37.248-146.773333c2.773333-10.944 11.562667-26.346667 19.392-34.176l445.653333-445.653333zM268.736 593.066667c-2.901333 2.901333-8.106667 12.074667-9.130667 16.021333l-29.12 114.773333 111.957334-30.570666c4.437333-1.216 13.632-6.549333 16.810666-9.728l445.653334-445.653334-90.517334-90.496-445.653333 445.653334zM682.794667 178.986667l90.517333 90.517333-30.186667 30.186667-90.496-90.517334 30.165334-30.165333z m-362.026667 362.048l90.496 90.517333-30.165333 30.165333-90.517334-90.496 30.165334-30.186666zM170.666667 874.666667c0-11.776 9.429333-21.333333 21.461333-21.333334h661.077333a21.333333 21.333333 0 1 1 0 42.666667H192.128A21.333333 21.333333 0 0 1 170.666667 874.666667z"
                        fill="currentColor" p-id="6518"></path>
                </svg>
            </div>
            <div class="title">颜色</div>
            <ColorSelect v-model="bgColor" @change="updateBgColor" :show-value="true" />
            <div class="title">配色</div>
            <div class="preset-colors">
                <div class="color-block" v-for="color in presetColors" :key="color" :style="{ backgroundColor: color }"
                    @click="applyPresetColor(color)">
                </div>
            </div>
        </template>
        <template v-else>
            <div class="function-area">
                <div class="title">操作</div>
                <div class="function-list">
                    <div class="function-item">
                        <el-tooltip content="删除" placement="bottom" :show-after="300">
                            <el-button link @click="store.deleteSelectedElement">
                                <template #icon>
                                    <svg t="1773482718397" class="icon" viewBox="0 0 1024 1024" version="1.1"
                                        xmlns="http://www.w3.org/2000/svg" p-id="5845" width="200" height="200">
                                        <path
                                            d="M847.743 223.953H640.639c-3.132-68.921-60.177-124.029-129.858-124.029s-126.726 55.108-129.858 124.029H173.256c-17.673 0-32 14.327-32 32s14.327 32 32 32h674.487c17.673 0 32-14.327 32-32s-14.327-32-32-32z m-336.962-60.03c34.379 0 62.689 26.426 65.718 60.029H445.064c3.029-33.603 31.338-60.029 65.717-60.029zM767.743 351.79c-17.673 0-32 14.327-32 32v478.173H288.256V383.79c0-17.673-14.327-32-32-32s-32 14.327-32 32v510.173c0 17.673 14.327 32 32 32h511.487c17.673 0 32-14.327 32-32V383.79c0-17.673-14.327-32-32-32z"
                                            fill="currentColor" p-id="5846"></path>
                                        <path
                                            d="M449.306 732.802V448.208c0-17.673-14.327-32-32-32s-32 14.327-32 32v284.593c0 17.673 14.327 32 32 32s32-14.326 32-31.999zM640.84 732.802V448.208c0-17.673-14.327-32-32-32s-32 14.327-32 32v284.593c0 17.673 14.327 32 32 32s32-14.326 32-31.999z"
                                            fill="currentColor" p-id="5847"></path>
                                    </svg>
                                </template>
                            </el-button>
                        </el-tooltip>
                    </div>
                    <div class="function-item">
                        <el-tooltip content="复制" placement="bottom" :show-after="300">
                            <el-button link @click="store.copySelectedElement">
                                <template #icon>
                                    <svg t="1773482796696" class="icon" viewBox="0 0 1024 1024" version="1.1"
                                        xmlns="http://www.w3.org/2000/svg" p-id="6937" width="200" height="200">
                                        <path
                                            d="M833.33 767.96h-91.9c-21.73 0-39.34-17.6-39.34-39.34s17.62-39.34 39.34-39.34h91.9c8.82 0 15.98-7.18 15.98-15.98V193.8c0-8.8-7.17-15.98-15.98-15.98H353.84c-8.82 0-15.98 7.18-15.98 15.98v90.86c0 21.75-17.62 39.34-39.34 39.34s-39.34-17.6-39.34-39.34V193.8c0-52.21 42.47-94.67 94.67-94.67h479.49c52.19 0 94.67 42.45 94.67 94.67v479.49c-0.01 52.21-42.49 94.67-94.68 94.67z"
                                            fill="currentColor" p-id="6938"></path>
                                        <path
                                            d="M675.96 925.33H196.47c-52.19 0-94.67-42.45-94.67-94.67V351.17c0-52.21 42.47-94.67 94.67-94.67h479.49c52.19 0 94.67 42.45 94.67 94.67v479.49c-0.01 52.22-42.48 94.67-94.67 94.67zM196.47 335.19c-8.82 0-15.98 7.18-15.98 15.98v479.49c0 8.8 7.17 15.98 15.98 15.98h479.49c8.82 0 15.98-7.18 15.98-15.98V351.17c0-8.8-7.17-15.98-15.98-15.98H196.47z"
                                            fill="currentColor" p-id="6939"></path>
                                    </svg>
                                </template>
                            </el-button>
                        </el-tooltip>
                    </div>
                </div>
                <div class="layer-list">
                    <div class="layer-item">
                        <el-tooltip content="置顶" placement="bottom" :show-after="300">
                            <el-button link @click="store.bringToFront">
                                <template #icon>
                                    <svg t="1773586169325" class="icon" viewBox="0 0 1024 1024" version="1.1"
                                        xmlns="http://www.w3.org/2000/svg" p-id="1750" width="200" height="200">
                                        <path
                                            d="M855.872 106.432a42.464 42.464 0 0 1-42.464 42.464H203.44a42.464 42.464 0 0 1 0-84.928h609.968a42.464 42.464 0 0 1 42.464 42.464z m-344.048 157.92a42.464 42.464 0 0 0-42.464 42.464v609.968a42.464 42.464 0 0 0 84.928 0V306.816a42.464 42.464 0 0 0-42.464-42.464z m30.144-31.328c-16.592-16.576-42.528-17.536-57.92-2.128L171.232 543.68c-15.408 15.408-14.448 41.344 2.128 57.92 16.592 16.592 42.512 17.536 57.92 2.128l312.8-312.784c15.392-15.408 14.448-41.344-2.128-57.92z m-60.272 0c-16.576 16.576-17.536 42.512-2.128 57.92l312.8 312.8c15.392 15.392 41.328 14.448 57.92-2.144 16.576-16.576 17.52-42.512 2.112-57.92L539.616 230.896c-15.408-15.408-41.344-14.448-57.92 2.128z"
                                            fill="currentColor" p-id="1751"></path>
                                    </svg>
                                </template>
                            </el-button>
                        </el-tooltip>
                    </div>
                    <div class="layer-item">
                        <el-tooltip content="上移一层" placement="bottom" :show-after="300">
                            <el-button link @click="store.bringForward">
                                <template #icon>
                                    <svg t="1773586453782" class="icon" viewBox="0 0 1024 1024" version="1.1"
                                        xmlns="http://www.w3.org/2000/svg" p-id="6207" width="200" height="200">
                                        <path
                                            d="M134.229333 721.493333a32.341333 32.341333 0 0 1-6.997333-5.418666 31.36 31.36 0 0 1-5.034667-6.698667 32.213333 32.213333 0 0 1-4.010666-15.616 32.213333 32.213333 0 0 1 4.010666-15.616 31.317333 31.317333 0 0 1 5.034667-6.698667 32.341333 32.341333 0 0 1 6.997333-5.418666l377.514667-217.173334 377.514667 217.173334a32.426667 32.426667 0 0 1 7.04 5.418666 30.976 30.976 0 0 1 4.992 6.698667 32.213333 32.213333 0 0 1 4.010666 15.616 32.213333 32.213333 0 0 1-4.010666 15.616 30.933333 30.933333 0 0 1-4.992 6.698667 32.426667 32.426667 0 0 1-7.04 5.418666L511.744 938.666667z m70.186667-28.16l307.2 176.64 307.2-176.64-307.2-176.64z m-58.026667-148.224l-12.032-6.912a32.554667 32.554667 0 0 1-7.04-5.418666 31.061333 31.061333 0 0 1-4.992-6.698667 32.213333 32.213333 0 0 1-4.010666-15.616 32.213333 32.213333 0 0 1 4.010666-15.616 31.530667 31.530667 0 0 1 4.992-6.698667 32.597333 32.597333 0 0 1 7.04-5.418666l377.514667-217.173334 0.426667 0.256v69.418667z m548.864-44.117333V199.381333l-109.226666 109.226667-42.24-42.24L724.821333 85.333333l181.034667 181.034667-42.24 42.24-108.586667-108.586667v301.013334zM146.389333 364.842667l-12.032-6.912a32.554667 32.554667 0 0 1-7.04-5.418667 31.061333 31.061333 0 0 1-4.992-6.698667 32.213333 32.213333 0 0 1-4.138666-15.573333 32.213333 32.213333 0 0 1 4.010666-15.616 31.317333 31.317333 0 0 1 4.992-6.698667 32.597333 32.597333 0 0 1 7.04-5.418666L511.744 85.333333l0.426667 0.256v69.418667z"
                                            p-id="6208" fill="currentColor"></path>
                                    </svg>
                                </template>
                            </el-button>
                        </el-tooltip>
                    </div>
                    <div class="layer-item">
                        <el-tooltip content="下移一层" placement="bottom" :show-after="300">
                            <el-button link @click="store.sendBackwards">
                                <template #icon>
                                    <svg t="1773586513962" class="icon" viewBox="0 0 1024 1024" version="1.1"
                                        xmlns="http://www.w3.org/2000/svg" p-id="8957" width="200" height="200">
                                        <path
                                            d="M543.786667 757.632l42.24-42.24 109.226666 109.226667v-301.653334h59.733334v301.013334l108.586666-108.586667 42.24 42.24L724.821333 938.666667z m-409.6-36.138667a32.597333 32.597333 0 0 1-7.04-5.418666 31.274667 31.274667 0 0 1-4.992-6.698667 32.213333 32.213333 0 0 1-4.010667-15.616 32.213333 32.213333 0 0 1 4.010667-15.616 31.104 31.104 0 0 1 4.992-6.698667 32.554667 32.554667 0 0 1 7.04-5.418666l12.032-6.912 365.44 210.005333v69.418667l-0.426667 0.256z m0-180.224a32.597333 32.597333 0 0 1-7.04-5.418666 31.530667 31.530667 0 0 1-4.992-6.698667 32.213333 32.213333 0 0 1-4.010667-15.616 32.213333 32.213333 0 0 1 4.010667-15.616 31.061333 31.061333 0 0 1 4.992-6.698667 32.554667 32.554667 0 0 1 7.04-5.418666l12.032-6.912 365.44 210.005333v69.290667l-0.426667 0.256z m0-183.466666a32.341333 32.341333 0 0 1-6.997334-5.418667 31.317333 31.317333 0 0 1-5.034666-6.698667 32.213333 32.213333 0 0 1-3.968-15.445333 32.213333 32.213333 0 0 1 4.010666-15.616 31.317333 31.317333 0 0 1 5.034667-6.698667 32.341333 32.341333 0 0 1 6.997333-5.418666L511.744 85.333333l377.514667 217.173334a32.384 32.384 0 0 1 7.04 5.418666 30.933333 30.933333 0 0 1 4.992 6.698667 32.213333 32.213333 0 0 1 4.010666 15.616 32.213333 32.213333 0 0 1-4.010666 15.616 30.933333 30.933333 0 0 1-4.992 6.698667 32.426667 32.426667 0 0 1-7.04 5.418666l-377.514667 217.173334z m70.186666-27.306667l307.2 176.64 307.2-176.64-307.2-176.64z"
                                            p-id="8958" fill="currentColor"></path>
                                    </svg>
                                </template>
                            </el-button>
                        </el-tooltip>
                    </div>
                    <div class="layer-item">
                        <el-tooltip content="置底" placement="bottom" :show-after="300">
                            <el-button link @click="store.sendToBack">
                                <template #icon>
                                    <svg t="1773585275114" class="icon" viewBox="0 0 1024 1024" version="1.1"
                                        xmlns="http://www.w3.org/2000/svg" p-id="11117" width="200" height="200">
                                        <path
                                            d="M564.384 751.2l4.16-3.872 244.704-244.704a32 32 0 0 0 0-45.248l-22.624-22.624a32 32 0 0 0-42.24-2.656l-3.008 2.656-185.376 185.344V96a32 32 0 0 0-32-32h-32a32 32 0 0 0-31.808 28.256L464 96v524.16l-185.376-185.408a32 32 0 0 0-42.24-2.656l-3.008 2.656-22.624 22.624a32 32 0 0 0 0 45.248l244.672 244.704a80 80 0 0 0 108.96 3.872zM832 928v-32a32 32 0 0 0-32-32H224a32 32 0 0 0-32 32v32a32 32 0 0 0 32 32h576a32 32 0 0 0 32-32z"
                                            fill="currentColor" p-id="11118"></path>
                                    </svg>
                                </template>
                            </el-button>
                        </el-tooltip>
                    </div>
                </div>
            </div>
            <div class="title">填充</div>
            <ColorSelect v-model="fillColor" @change="updateFillColor" :show-value="true" :disabled="isFillDisabled" />
            <div class="title">边框</div>
            <div class="border-box">
                <div class="border-item">
                    <label>颜色</label>
                    <ColorSelect v-model="strokeColor" @change="updateStrokeColor" :show-value="false" :width="80" />
                </div>
                <div class="border-item">
                    <label>粗细</label>
                    <el-input-number v-model="strokeWidth" :min="0" :max="50" controls-position="right"
                        style="width: 80px;" @change="updateStrokeWidth" />
                </div>
            </div>
            <div class="title">透明度</div>
            <div class="opacity-box">
                <el-slider v-model="opacity" @change="updateOpacity" show-alpha class="hidden-slider" :step="0.01"
                    :max="1" :min="0" size="small" />
            </div>
        </template>
    </aside>
    <el-dialog v-model="dialogVisible" title="调整画布尺寸" width="500">
        <div class="custom-size">
            <h3>自定义尺寸</h3>
            <div class="row-flex">
                <div class="prop-item">
                    <label>宽度</label>
                    <el-input type="number" v-model.number="canvasWidth" />
                </div>
                <div class="prop-item">
                    <label>高度</label>
                    <el-input type="number" v-model.number="canvasHeight" />
                </div>
                <el-button type="primary" @click="dialogVisible = false">确定</el-button>
                <el-button type="primary" @click="updateCanvasSize(800, 600)" style="margin-left: 0;">还原</el-button>
            </div>
        </div>
        <div class="recommend-size">
            <h3>系统推荐尺寸</h3>
            <div class="size-list">
                <div class="size-item" v-for="item in recommendSizes"
                    @click="updateCanvasSize(item.width, item.height)">
                    <div class="left-item">
                        <div class="shape">{{ item.shape }}</div>
                        <div class="size">{{ item.width }} × {{ item.height }} px</div>
                    </div>
                    <div class="right-item">
                        <svg t="1772890519467" class="icon" viewBox="0 0 1024 1024" version="1.1"
                            xmlns="http://www.w3.org/2000/svg" p-id="7611" width="200" height="200">
                            <path
                                d="M469.333333 469.333333V170.666667h85.333334v298.666666h298.666666v85.333334h-298.666666v298.666666h-85.333334v-298.666666H170.666667v-85.333334h298.666666z"
                                fill="#444444" p-id="7612"></path>
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    </el-dialog>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { useEditorStore } from '../store/editor';
import ColorSelect from './ColorSelect.vue';

const store = useEditorStore();

const activeElement = computed(() => store.selectedElement);

// 画布默认属性
const bgColor = ref('#ffffff');
const canvasWidth = ref(800);
const canvasHeight = ref(600);

// 填充色
const fillColor = ref('#ffffff');
// 边框色
const strokeColor = ref('#000000');
// 边框粗细
const strokeWidth = ref(0);
// 透明度
const opacity = ref(1);

// 是否禁用填充色（如直线、箭头无内填充概念）
const isFillDisabled = computed(() => {
    const el = activeElement.value as any;
    if (!el) return false;
    const type = el.type;
    if (type === 'line' || type === 'path') return true;
    if (type === 'group' && el._objects) {
        return el._objects.some((o: any) => o.type === 'triangle');
    }
    return false;
});

// 弹窗
const dialogVisible = ref(false)


// 预设常用配色
const presetColors = ref([
    '#ffffff', // 纯白
    '#f5f5f5', // 浅灰
    '#000000', // 纯黑
    '#F56C6C', // 珊瑚红
    '#E6A23C', // 橘黄
    '#f1c40f', // 明黄
    '#2ecc71', // 翡翠绿
    '#1abc9c', // 蓝绿
    '#409EFF', // 经典蓝
    '#9b59b6'  // 紫罗兰
]);

// 快速应用预设色
const applyPresetColor = (color: string) => {
    bgColor.value = color;
    updateBgColor();
};

// 预设尺寸数据
const recommendSizes = ref([
    { shape: '正方形', width: 1000, height: 1000 },
    { shape: '横版海报', width: 1920, height: 1080 },
    { shape: '竖版长图', width: 1080, height: 1920 },
    { shape: '公众号首图', width: 900, height: 383 }
]);



// 同步画布数据
watch(() => store.canvas, (newVal) => {
    if (newVal) {
        canvasWidth.value = newVal.width || 800;
        canvasHeight.value = newVal.height || 600;
        bgColor.value = newVal.backgroundColor as string || '#fff';
        updateBgColor();
    }
})

// 用户修改画布尺寸
const updateCanvasSize = (w: number, h: number) => {
    canvasWidth.value = w;
    canvasHeight.value = h;
    if (store.canvas) {
        store.canvas.setDimensions({
            width: canvasWidth.value,
            height: canvasHeight.value,
        })
    }

    store.saveHistory();
}

// 用户修改背景颜色
const updateBgColor = () => {
    if (store.canvas) {
        store.canvas.backgroundColor = bgColor.value;
        store.canvas.renderAll();
    }

    store.saveHistory();
}

// 监听选择元素变化
watch(() => activeElement.value, (newVal) => {
    if (newVal) {
        fillColor.value = newVal.fill as string || '#fff';
        let applyStroke = newVal.stroke as string || '#000000';

        // 如果是特殊的 Group（比如由 Line 和 Triangle 组合的箭头），向上拉取其线条的具体数据
        const el = newVal as any;
        if (el.type === 'group' && el._objects) {
            const isArrow = el._objects.some((o: any) => o.type === 'triangle') && el._objects.some((o: any) => o.type === 'line' || o.type === 'path');
            if (isArrow) {
                const line = el._objects.find((o: any) => o.type === 'line' || o.type === 'path');
                if (line) {
                    applyStroke = line.stroke || '#000000';
                }
            }
        }

        strokeColor.value = applyStroke;
        strokeWidth.value = newVal.strokeWidth || 0;
        opacity.value = newVal.opacity || 1;
    } else {
        if (store.canvas) {
            bgColor.value = store.canvas.backgroundColor as string || '#fff';
        }
    }
}, {
    immediate: true
})

// 修改元素填充色
const updateFillColor = () => {
    if (activeElement.value && store.canvas) {
        activeElement.value.set('fill', fillColor.value);
        store.canvas.renderAll();
    }

    store.saveHistory();
}

// 修改元素透明度
const updateOpacity = () => {
    if (activeElement.value && store.canvas) {
        activeElement.value.set('opacity', opacity.value);
        store.canvas.renderAll();
    }

    store.saveHistory();
}

// 修改元素边框色
const updateStrokeColor = () => {
    if (activeElement.value && store.canvas) {
        const el = activeElement.value as any;
        const isArrow = el.type === 'group' && el._objects && el._objects.some((o: any) => o.type === 'triangle');

        if (isArrow) {
            el._objects.forEach((obj: any) => {
                if (obj.type === 'line' || obj.type === 'path') {
                    obj.set('stroke', strokeColor.value);
                } else if (obj.type === 'triangle') {
                    // 箭头的头部三角形颜色与线条同步
                    obj.set('fill', strokeColor.value);
                }
            });
        } else {
            activeElement.value.set('stroke', strokeColor.value);
        }
        store.canvas.renderAll();
    }
    store.saveHistory();
}

// 修改元素边框粗细
const updateStrokeWidth = () => {
    if (activeElement.value && store.canvas) {
        activeElement.value.set('strokeWidth', strokeWidth.value);
        store.canvas.renderAll();
    }
    store.saveHistory();
}

</script>

<style scoped lang="scss">
.right-panel {
    width: 350px;
    height: 100%;
    background-color: #fff;
    padding: 20px;
    box-sizing: border-box;
    flex-shrink: 0; // 锁定宽度，防止折叠时被挤压

    .function-area {
        .function-list {
            display: flex;
            justify-content: space-evenly;
            background: rgb(246, 247, 249);
            border-radius: 4px;
            padding: 5px;

            .function-item {
                width: 70px;
                height: 40px;
                display: flex;
                justify-content: center;
                align-items: center;
                cursor: pointer;

                &:hover {
                    background-color: #eef0f3 !important;

                    :deep(.el-button) {
                        color: #409eff !important;
                    }
                }

                :deep(.el-button) {
                    color: #333;

                    .el-icon,
                    svg {
                        width: 20px !important;
                        height: 20px !important;
                    }
                }
            }
        }

        .layer-list {
            display: flex;
            justify-content: space-evenly;
            background: rgb(246, 247, 249);
            border-radius: 4px;
            padding: 5px;
            margin-top: 10px;

            .layer-item {
                width: 70px;
                height: 40px;
                display: flex;
                justify-content: center;
                align-items: center;
                cursor: pointer;

                &:hover {
                    background-color: #eef0f3 !important;

                    :deep(.el-button) {
                        color: #409eff !important;
                    }
                }

                :deep(.el-button) {
                    color: #333;

                    .el-icon,
                    svg {
                        width: 20px !important;
                        height: 20px !important;
                    }
                }
            }
        }
    }

    .title {
        margin-top: 18px;
        margin-bottom: 12px;

        &:first-child {
            margin-top: 0;
        }
    }

    .row-flex {
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        gap: 10px;

        .prop-item {
            display: flex;
            align-items: center;

            label {
                width: 35px;
                font-size: 15px;
            }

            > :deep(.el-input) {
                width: 65px;

                .el-input__wrapper {
                    padding: 0 5px;
                    box-shadow: 0 0 0 1px #dcdfe6 inset;
                }

                .el-input__inner {
                    height: 30px;
                    text-align: center;
                    color: #606266;
                }
            }

        }

        svg {
            width: 24px;
            height: 24px;
            color: #606266;
            transition: color 0.2s;
            cursor: pointer;
        }
    }

    /* 预设配色区域样式 */
    .preset-colors {
        display: flex;
        flex-wrap: wrap;
        gap: 12px;
        margin-top: 15px;

        .color-block {
            width: 26px;
            height: 26px;
            border-radius: 6px;
            border: 1px solid #dcdfe6;
            cursor: pointer;
            transition: all 0.2s cubic-bezier(0.25, 0.8, 0.25, 1);
            box-sizing: border-box;

            &:hover {
                transform: translateY(-2px) scale(1.1);
                box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
                border-color: #c0c4cc;
            }
        }
    }

    .border-box {
        display: flex;
        align-items: center;
        gap: 8px;

        .border-item {
            display: flex;
            align-items: center;
            background-color: #f5f7fa;
            border-radius: 4px;
            overflow: hidden;
            border: 1px solid #e4e7ed;

            label {
                padding: 0 8px;
                font-size: 13px;
                color: #909399;
                flex-shrink: 0;
            }

            :deep(.custom-color-select) {
                .el-input__wrapper {
                    background-color: #fff !important;
                    border-radius: 0 !important;
                    box-shadow: none !important;
                    border-left: 1px solid #e4e7ed !important;
                    height: 32px;
                }
            }

            :deep(.el-input-number) {
                .el-input__wrapper {
                    background-color: #fff !important;
                    border-radius: 0 !important;
                    box-shadow: none !important;
                    border-left: 1px solid #e4e7ed !important;
                    height: 32px;
                }
            }
        }
    }

    .opacity-box {
        background-color: #f5f7fa;
        border-radius: 4px;
        height: 32px;
        padding: 0 12px;
        display: flex;
        align-items: center;

        :deep(.el-slider) {
            height: 32px;
            width: 100%;

            .el-slider__runway {
                margin: 0;
            }
        }
    }
}

.custom-size {
    width: 100%;
    height: 80px;
    border-bottom: 1px solid #e4e7ed;
    margin-bottom: 10px;

    h3 {
        margin-top: 0;
        margin-bottom: 15px;
    }

    .row-flex {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        gap: 15px;

        .prop-item {
            display: flex;
            align-items: center;

            label {
                width: 35px;
                font-size: 15px;
            }

            :deep(.el-input) {
                width: 70px;

                .el-input__wrapper {
                    padding: 0 5px;
                    box-shadow: 0 0 0 1px #dcdfe6 inset;
                }

                .el-input__inner {
                    height: 30px;
                    text-align: center;
                    color: #606266;
                }
            }

        }
    }
}

.recommend-size {
    width: 100%;

    h3 {
        margin-top: 0;
        margin-bottom: 5px;
    }

    .size-list {
        width: 100%;

        .size-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            box-sizing: border-box;
            padding: 5px 15px;

            .shape {
                font-size: 16px;
            }

            .size {
                color: #808695;
                font-size: 12px;
            }

            svg {
                width: 24px;
                height: 24px;
                color: #606266;
            }

            &:hover {
                background-color: #dcdfe6;
                cursor: pointer;
            }
        }
    }
}
</style>

<style lang="scss">
.el-dialog {
    .el-dialog__header {
        margin-right: 0;
        border-bottom: 1px solid #e4e7ed;
    }

    .el-dialog__body {
        padding-top: 15px;
    }
}
</style>