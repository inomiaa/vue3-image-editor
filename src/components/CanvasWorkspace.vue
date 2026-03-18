<template>
    <main class="editor-workspace">
        <div class="canvas-container">
            <canvas id="canvasRef" />
        </div>

        <div class="zoom-controls">
            <el-button link class="btn-pan" :class="{ 'is-active': isPanMode }" @click="handleTogglePanMode"
                title="平移画布">
                <template #icon>
                    <svg t="1773655588998" class="icon" viewBox="0 0 1024 1024" version="1.1"
                        xmlns="http://www.w3.org/2000/svg" p-id="16349" width="200" height="200">
                        <path
                            d="M358.08 904.32v-0.64s-1.92-2.24-2.88-3.2-0.96-1.6-1.28-2.24l-1.92-2.88-101.76-156.8a84.8 84.8 0 0 1-12.16-62.08c3.84-21.44 16-40.32 33.92-52.8 23.36-16 53.44-18.24 79.04-5.76v-261.76c0-45.44 34.24-82.56 76.16-82.56s76.48 37.12 76.48 82.56v84.16c6.08-1.92 12.8-3.2 19.2-3.2 19.84 0 38.72 9.6 51.84 26.24 10.24-6.72 22.4-10.56 34.88-10.88 14.4 0 28.16 5.12 39.36 13.76 8.64 6.72 16 15.68 21.44 25.92 6.08-1.92 12.8-2.88 19.2-2.88 39.04 0 71.04 37.12 71.04 82.56v219.84c0 48.64-21.44 102.4-54.72 136.96-18.56 19.2-38.4 30.08-56.32 30.08h-217.28c-40.64 0-58.88-30.08-73.6-54.4z m295.36 13.76c6.72 0 23.04-10.88 39.04-35.52 17.28-26.24 27.2-57.6 27.2-86.08v-225.92c0-18.56-11.52-34.56-24.32-34.56-2.88 0-5.76 0.64-8.32 2.24v79.04c-0.96 13.12-11.52 23.68-24.32 23.68s-23.68-10.56-24.32-23.68v-68.48l-1.6-19.2c-1.28-17.28-12.16-31.04-24.64-31.04-5.44 0-10.88 2.88-15.36 8v85.44c0 14.08-10.88 25.28-24.64 25.28-13.44 0-24.32-11.52-24.64-25.28v-75.2l-1.92-8.64c-2.88-14.72-13.12-25.6-23.36-25.6-7.04 0-14.08 5.12-18.88 13.12l-0.64 84.8v32c0 12.48-9.92 22.4-21.76 22.4h-5.44c-12.16 0-21.76-10.24-21.76-22.4v-264.32c0-18.88-13.44-34.56-30.08-34.56s-29.76 15.36-29.76 34.56l0.96 247.36V696c0 12.48-9.28 23.36-21.44 24.96-12.16 1.6-23.68-6.4-26.88-18.56l-9.28-27.84c-4.8-7.68-12.48-12.8-21.12-14.72a31.36 31.36 0 0 0-24.96 5.12c-15.36 10.56-19.52 32-8.96 48l104.64 160.96h0.32l1.28 2.56 1.6 2.56c0.96 1.6 1.92 3.2 2.88 4.48l0.64 0.96 0.64 0.96c16.32 26.88 22.72 32.64 34.88 32.64h224.32zM300.16 240.32L218.56 158.72s-1.92-3.2-1.92-4.8 0.64-3.52 1.92-4.8l81.6-81.6c1.92-1.92 5.12-2.56 7.68-1.6 2.56 0.96 4.16 3.52 4.16 6.4v162.88c0 2.88-1.6 5.44-4.16 6.4s-5.44 0.64-7.68-1.6z m423.36 0c-1.92 1.92-5.12 2.56-7.68 1.6a6.688 6.688 0 0 1-4.16-6.4v-163.2c0-2.88 1.6-5.44 4.16-6.4s5.44-0.32 7.68 1.6l81.6 81.6s1.92 3.2 1.92 4.8c0 1.92-0.64 3.52-1.92 4.8l-81.6 81.6z m-423.36 0"
                            fill="currentColor" p-id="16350"></path>
                        <path d="M302.4 130.24h416.96v46.4H302.4z" fill="currentColor" p-id="16351"></path>
                    </svg>
                </template>
            </el-button>
            <el-divider direction="vertical" />
            <el-button link @click="handleZoomOut">
                <el-icon>
                    <Minus />
                </el-icon>
            </el-button>
            <div class="zoom-value" @click="store.resetZoom" title="点击重置缩放">
                {{ Math.round(store.canvasZoom * 100) }}%
            </div>
            <el-button link @click="handleZoomIn">
                <el-icon>
                    <Plus />
                </el-icon>
            </el-button>
        </div>
    </main>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import * as fabric from 'fabric';
import { useEditorStore } from '../store/editor';
import { Minus, Plus } from '@element-plus/icons-vue';

const store = useEditorStore();
const isPanMode = ref(false);

const handleTogglePanMode = () => {
    isPanMode.value = !isPanMode.value;
    if (store.canvas) {
        // 如果开启平移，禁用框选；如果关闭平移，恢复框选
        store.canvas.selection = !isPanMode.value;
        // 改变鼠标指针样式
        store.canvas.defaultCursor = isPanMode.value ? 'grab' : 'default';
        store.canvas.renderAll();
    }
};

const handleZoomIn = () => {
    store.setZoom(store.canvasZoom + 0.1);
};
const handleZoomOut = () => {
    store.setZoom(store.canvasZoom - 0.1);
};

onMounted(() => {
    store.initCanvas(new fabric.Canvas('canvasRef', {
        width: 800,
        height: 600,
        backgroundColor: '#ffffff',
        preserveObjectStacking: true, //防止点选图层时，元素乱跳到最上层
    }));
    //记录初始白布
    store.saveHistory();
    //监听元素修改
    store.canvas?.on('object:modified', () => {
        store.saveHistory();
    })

    // 专门负责自由画笔的存档
    store.canvas?.on('path:created', () => {
        store.saveHistory();
    });

    initDrawEvents();
})

let isDrawing = false;
let isPanning = false;
let lastPosX = 0;
let lastPosY = 0;
let currentLine: fabric.Line | null = null;
let currentArrowHead: fabric.Triangle | null = null;

const initDrawEvents = () => {
    if (!store.canvas) return;
    const canvas = store.canvas;

    // 监听选择事件
    canvas.on('selection:created', (e) => {
        store.setSelectedElement(e.selected?.[0] || null);
    });

    canvas.on('selection:updated', (e) => {
        store.setSelectedElement(e.selected?.[0] || null);
    });

    canvas.on('selection:cleared', () => {
        store.setSelectedElement(null);
    });

    // 监听滚轮事件 (缩放)
    canvas.on('mouse:wheel', (opt) => {
        const delta = opt.e.deltaY;
        let zoom = canvas.getZoom();
        zoom *= 0.999 ** delta;
        const scenePoint = canvas.getScenePoint(opt.e);
        store.setZoom(zoom, { x: scenePoint.x, y: scenePoint.y })
        opt.e.preventDefault();
        opt.e.stopPropagation();
    });

    // 1. 鼠标按下：平移 或 开始绘制
    canvas.on('mouse:down', (opt) => {
        const evt = opt.e as MouseEvent;
        // 优先处理：平移模式
        if (isPanMode.value) {
            isPanning = true;
            canvas.selection = false;
            lastPosX = evt.clientX;
            lastPosY = evt.clientY;
            canvas.setCursor('grabbing');
            return; // 模式排他
        }

        // 其次处理：绘制模式
        const mode = store.drawMode;
        if (mode === 'line' || mode === 'arrow') {
            isDrawing = true;
            const pointer = opt.scenePoint;
            const points: [number, number, number, number] = [pointer.x, pointer.y, pointer.x, pointer.y];

            currentLine = new fabric.Line(points, {
                strokeWidth: 4,
                stroke: '#F56C6C',
                selectable: false,
                evented: false,
            })
            canvas.add(currentLine);

            if (mode === 'arrow') {
                currentArrowHead = new fabric.Triangle({
                    width: 20,
                    height: 20,
                    fill: '#F56C6C',
                    left: pointer.x,
                    top: pointer.y,
                    originX: 'center',
                    originY: 'center',
                    selectable: false,
                    evented: false,
                    angle: 90
                })
                canvas.add(currentArrowHead);
            }
        }
    });

    // 2. 鼠标移动：正在平移 或 正在绘制
    canvas.on('mouse:move', (opt) => {
        const evt = opt.e as MouseEvent;
        if (isPanning) {
            const vpt = canvas.viewportTransform!;
            vpt[4] += evt.clientX - lastPosX;
            vpt[5] += evt.clientY - lastPosY;
            canvas.requestRenderAll();
            lastPosX = evt.clientX;
            lastPosY = evt.clientY;
        } else if (isDrawing && currentLine) {
            const pointer = opt.scenePoint;
            currentLine.set({ x2: pointer.x, y2: pointer.y });

            if (store.drawMode === 'arrow' && currentArrowHead) {
                currentArrowHead.set({ left: pointer.x, top: pointer.y });
                const dx = pointer.x - currentLine.x1;
                const dy = pointer.y - currentLine.y1;
                const angle = Math.atan2(dy, dx) * (180 / Math.PI);
                currentArrowHead.set({ angle: angle + 90 });
            }
            canvas.renderAll();
        }
    });

    // 3. 鼠标抬起：结束平移 或 结束绘制
    canvas.on('mouse:up', () => {
        if (isPanning) {
            isPanning = false;
            canvas.selection = true;
        } else if (isDrawing) {
            isDrawing = false;
            if (store.drawMode === 'arrow' && currentLine && currentArrowHead) {
                canvas.remove(currentLine, currentArrowHead);
                const arrowGroup = new fabric.Group([currentLine, currentArrowHead], {
                    selectable: true,
                    evented: true,
                })
                canvas.add(arrowGroup);
                canvas.setActiveObject(arrowGroup);
                store.setSelectedElement(arrowGroup);
            } else if (store.drawMode === 'line' && currentLine) {
                currentLine.set({ selectable: true, evented: true });
                canvas.setActiveObject(currentLine);
                store.setSelectedElement(currentLine);
            }
            canvas.renderAll();
            store.saveHistory();

            // 重置状态
            currentLine = null;
            currentArrowHead = null;
            store.setDrawMode('select');
        }
    });
}
</script>

<style scoped lang="scss">
.editor-workspace {
    position: relative;
    flex: 1;
    background-color: #f0f2f5;
    min-width: 0;
    overflow: hidden; // 禁止主容器滚动，由内部容器承担

    .canvas-container {
        width: 100%;
        height: 100%;
        overflow: auto; // 开启滚动
        display: flex;
        justify-content: center;
        align-items: center;
        
        canvas {
            box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
        }
    }
}

.zoom-controls {
    position: absolute;
    right: 20px;
    bottom: 20px;
    display: flex;
    align-items: center;
    background: rgba(255, 255, 255, 0.7);
    backdrop-filter: blur(10px); // 毛玻璃效果
    border: 1px solid rgba(255, 255, 255, 0.3);
    padding: 4px 8px;
    border-radius: 8px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
    z-index: 100;
    user-select: none;

    .zoom-value {
        font-size: 13px;
        color: #333;
        font-weight: 500;
        width: 50px;
        text-align: center;
        cursor: pointer;
        padding: 4px 0;
        border-radius: 4px;
        transition: background-color 0.2s ease;

        &:hover {
            background: rgba(64, 158, 255, 0.1);
            color: #409eff;
        }
    }

    :deep(.el-button) {
        font-size: 16px;
        color: #606266;
        padding: 8px;

        &:hover {
            color: #409eff;
        }

        &.is-active {
            color: #409eff;
            background: rgba(64, 158, 255, 0.15) !important;
            border-radius: 4px;

            &:hover {
                background: rgba(64, 158, 255, 0.25) !important;
            }
        }

        svg,
        .el-icon {
            width: 20px !important;
            height: 20px !important;
        }
    }
}
</style>