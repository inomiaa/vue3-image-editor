<template>
    <div class="element-panel">
        <div class="basic-element">
            <div class="title">基础要素</div>
            <div class="tool-group">
                <div class="tool-btn" @click="addText" title="添加文字">
                    <svg t="1772812432053" class="icon" viewBox="0 0 1024 1024" version="1.1"
                        xmlns="http://www.w3.org/2000/svg" p-id="7478" width="200" height="200">
                        <path
                            d="M384 810.666667a42.666667 42.666667 0 0 1 42.666667-42.666667h170.666666a42.666667 42.666667 0 1 1 0 85.333333h-170.666666a42.666667 42.666667 0 0 1-42.666667-42.666666z"
                            fill="#14181F" p-id="7479"></path>
                        <path
                            d="M512 170.666667a42.666667 42.666667 0 0 1 42.666667 42.666666v597.333334a42.666667 42.666667 0 1 1-85.333334 0V213.333333a42.666667 42.666667 0 0 1 42.666667-42.666666z"
                            fill="#14181F" p-id="7480"></path>
                        <path
                            d="M213.333333 213.333333a42.666667 42.666667 0 0 1 42.666667-42.666666h512a42.666667 42.666667 0 0 1 42.666667 42.666666v42.666667a42.666667 42.666667 0 1 1-85.333334 0H298.666667a42.666667 42.666667 0 0 1-85.333334 0V213.333333z"
                            fill="currentColor" p-id="7481"></path>
                    </svg>
                </div>
                <div class="tool-btn" @click="addRect" title="添加矩形">
                    <svg t="1772809259081" class="icon" viewBox="0 0 1024 1024" version="1.1"
                        xmlns="http://www.w3.org/2000/svg" p-id="5633" width="200" height="200">
                        <path
                            d="M841.34 959.36H182.66c-65.06 0-117.99-52.94-117.99-118.02V182.69c0-65.08 52.94-118.04 117.99-118.04h658.68c65.06 0 117.99 52.96 117.99 118.04v658.65c0 65.08-52.93 118.02-117.99 118.02zM182.66 142.17c-22.31 0-40.51 18.18-40.51 40.51v658.65c0 22.34 18.2 40.49 40.51 40.49h658.68c22.31 0 40.51-18.15 40.51-40.49V182.69c0-22.34-18.2-40.51-40.51-40.51H182.66z"
                            fill="currentColor" p-id="5634"></path>
                    </svg>
                </div>
                <div class="tool-btn" @click="addCircle" title="添加圆形">
                    <svg t="1772809356869" class="icon" viewBox="0 0 1024 1024" version="1.1"
                        xmlns="http://www.w3.org/2000/svg" p-id="6649" width="200" height="200">
                        <path
                            d="M511.99 960.22C264.84 960.22 63.77 759.15 63.77 512S264.84 63.78 511.99 63.78 960.23 264.85 960.23 512 759.14 960.22 511.99 960.22z m0-823.81C304.88 136.41 136.4 304.89 136.4 512s168.48 375.59 375.59 375.59c207.13 0 375.61-168.48 375.61-375.59S719.12 136.41 511.99 136.41z"
                            fill="currentColor" p-id="6650"></path>
                    </svg>
                </div>
                <div class="tool-btn" @click="addTriangle" title="添加三角形">
                    <svg t="1772809414461" class="icon" viewBox="0 0 1024 1024" version="1.1"
                        xmlns="http://www.w3.org/2000/svg" p-id="4619" width="200" height="200">
                        <path
                            d="M905.216 895.488H119.808c-11.264 0-22.016-6.144-27.648-15.872-5.632-9.728-5.632-22.016 0-31.744L484.864 167.424c5.632-9.728 16.384-15.872 27.648-15.872s22.016 6.144 27.648 15.872l392.704 679.936c5.632 9.728 5.632 22.016 0 31.744s-16.384 16.384-27.648 16.384zM175.104 831.488H849.92L512.512 247.296 175.104 831.488z"
                            fill="currentColor" p-id="4620"></path>
                    </svg>
                </div>
                <div class="tool-btn" @click="addPolygon" title="添加五边形">
                    <svg t="1772809718222" class="icon" viewBox="0 0 1024 1024" version="1.1"
                        xmlns="http://www.w3.org/2000/svg" p-id="6458" width="200" height="200">
                        <path
                            d="M512 210.176l320.512 232.832L710.059 819.84H313.94L191.488 443.008 512 210.176z m405.76 205.141L512 120.491 106.24 415.317l154.965 477.014h501.59l155.008-477.014z"
                            fill="currentColor" p-id="6459"></path>
                    </svg>
                </div>
            </div>
        </div>
        <div class="print-element">
            <div class="title">绘制元素</div>
            <div class="tool-group">
                <div class="tool-btn" @click="store.setDrawMode(store.drawMode === 'line' ? 'select' : 'line')"
                    :class="{ active: store.drawMode === 'line' }">
                    <svg t="1772816184070" class="icon" viewBox="0 0 1024 1024" version="1.1"
                        xmlns="http://www.w3.org/2000/svg" p-id="8458" width="200" height="200">
                        <path d="M236.1 757.3l533.6-524 25.9 26.6-533.7 524z" fill="#748696" p-id="8459"></path>
                        <path
                            d="M837.2 66.4c-66.8 0-121 54.2-121 121s54.2 121 121 121 121-54.2 121-121-54.2-121-121-121z m-0.1 203.5c-45.7 0-82.7-37-82.7-82.7s37-82.7 82.7-82.7 82.7 37 82.7 82.7-37 82.7-82.7 82.7zM185 717.3c-66.8 0-121 54.2-121 121s54.2 121 121 121 121-54.2 121-121-54.2-121-121-121z m-0.1 203.6c-45.7 0-82.7-37-82.7-82.7s37-82.7 82.7-82.7 82.7 37 82.7 82.7-37 82.7-82.7 82.7z"
                            fill="currentColor" p-id="8460"></path>
                    </svg>
                </div>
                <div class="tool-btn" @click="store.setDrawMode(store.drawMode === 'arrow' ? 'select' : 'arrow')"
                    :class="{ active: store.drawMode === 'arrow' }">
                    <svg t="1772816260069" class="icon" viewBox="0 0 1024 1024" version="1.1"
                        xmlns="http://www.w3.org/2000/svg" p-id="9470" width="200" height="200">
                        <path
                            d="M879.20500065 175.5483713l-461.30058132 461.30058132L375.19140244 594.13593572 836.49198376 132.83535441l42.71301688 42.7130169z"
                            fill="#2c2c2c" p-id="9471"></path>
                        <path
                            d="M540.77457834 769.61032983L146.50208883 872.12117685l98.56812232-398.21521421 295.70436719 295.70436719z"
                            fill="#2c2c2c" p-id="9472"></path>
                    </svg>
                </div>
                <div class="tool-btn" @click="store.setDrawMode(store.drawMode === 'pencil' ? 'select' : 'pencil')"
                    :class="{ active: store.drawMode === 'pencil' }">
                    <svg t="1772816329556" class="icon" viewBox="0 0 1024 1024" version="1.1"
                        xmlns="http://www.w3.org/2000/svg" p-id="14027" width="200" height="200">
                        <path
                            d="M819 190.3c-26.7-26.4-70.1-26.4-96.8 0L437.9 471.1c-3.8 3.8-3.9 10 0 13.8l82.4 82.4c3.8 3.8 9.9 3.8 13.7 0l285-281.5c26.8-26.3 26.8-69.1 0-95.5zM404.9 517.2c-3.8-3.8-9.9-3.8-13.7 0l-63 62.1c-1.8 1.8-4.3 2.8-6.8 2.8-48.1-0.1-112.4 18.7-140.8 110.7-0.1 0.4-0.3 0.8-0.4 1.2-14.1 31.3-42.2 41.9-61.2 45.5-7.7 1.5-10.7 11-5 16.5 118.1 114.1 251.5 42.3 282.9 10.5 27.2-27.6 32.3-61 30.2-88.6-0.2-2.9 0.8-5.7 2.9-7.7l57.5-56.7c3.8-3.8 3.9-10 0-13.8l-82.6-82.5z m-40.3 217.4c-21.4 19.8-112.7 62.7-173.2 29.6-5.6-3.1-6.7-10.6-2.4-15.2 7.5-7.8 18.5-21.2 27.8-40.4 0.1-0.3 0.2-0.5 0.4-0.8 33.3-87.9 110.1-86.6 127.7-85.2 2.3 0.2 4.4 1.2 6 2.8l29.9 29.5c0.2 0.4 24 42.4-16.2 79.7z"
                            fill="#070101" p-id="14028"></path>
                    </svg>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import * as fabric from 'fabric';
import { useEditorStore } from '../store/editor';

const store = useEditorStore();

//新元素出现在画布中央
const addToCenter = (obj: fabric.Object) => {
    if (!store.canvas) return;
    const canvasCenter = store.canvas.getVpCenter();
    obj.set({
        left: canvasCenter.x,
        top: canvasCenter.y,
        originX: 'center',
        originY: 'center',
    });
    store.canvas.add(obj);
    store.canvas.setActiveObject(obj);
    store.setSelectedElement(obj);
    store.canvas.renderAll();

    store.saveHistory();
}

//创建文本对象
const addText = () => {
    const text = new fabric.IText('请输入文字', {
        fontSize: 24,
        fill: '#E6A23C',
    });
    addToCenter(text);
}

//创建矩形对象
const addRect = () => {
    const rect = new fabric.Rect({
        fill: '#409EFF',
        width: 100,
        height: 100,
        rx: 8,
        ry: 8
    });
    addToCenter(rect);
}

//创建圆形对象
const addCircle = () => {
    const circle = new fabric.Circle({
        fill: '#67C23A',
        radius: 50,
    });
    addToCenter(circle);
}

//创建三角形对象
const addTriangle = () => {
    const triangle = new fabric.Triangle({
        fill: '#909399',
        width: 100,
        height: 100,
    });
    addToCenter(triangle);
}

//创建多边形
const addPolygon = () => {
    const pentagonPoints = [
        { x: 50, y: 0 },
        { x: 97.5, y: 34.5 },
        { x: 79.4, y: 90.5 },
        { x: 20.6, y: 90.5 },
        { x: 2.5, y: 34.5 }
    ];

    const polygon = new fabric.Polygon(pentagonPoints, {
        fill: '#8E44AD',
        width: 100,
        height: 100,
    });
    addToCenter(polygon);
}
</script>

<style scoped lang="scss">
.element-panel {
    padding: 20px;
    background-color: #fff;
    width: 100%;
    height: 100%;
    box-sizing: border-box;

    .title {
        font-size: 14px;
        color: #333;
        margin-bottom: 12px;
    }

    .basic-element,
    .print-element {
        .tool-group {
            width: 100%;
            display: flex;
            flex-direction: row;
            justify-content: flex-start; // 靠左分布
            align-items: center;
            gap: 12px; // 设置每个图标之间的固定空隙
            flex-wrap: wrap; // 超出换行

            .tool-btn {
                width: 45px;
                height: 45px;
                background-color: #f5f5f5; // 淡灰色背景
                border-radius: 6px; // 圆角
                display: flex;
                justify-content: center;
                align-items: center;
                cursor: pointer;
                transition: background-color 0.2s;

                &:hover {
                    background-color: #e4e7ed; // 鼠标悬停加深
                }

                // 画笔等工具独有的选中常亮状态
                &.active {
                    background-color: #ecf5ff;
                    border-color: #c6e2ff;
                    color: #409eff;

                    svg {
                        color: #409eff;
                    }
                }

                svg {
                    width: 24px; // 强制统一图标宽度
                    height: 24px; // 强制统一图标高度
                    color: #606266;
                    transition: color 0.2s;
                }
            }
        }
    }

    .print-element {
        margin-top: 15px;
    }
}
</style>
