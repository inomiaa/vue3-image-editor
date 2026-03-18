<template>
    <aside class="left-panel-container">
        <!-- 侧边导航栏 -->
        <div class="sidebar-tabs">
            <div class="tab-item" :class="{ active: activeTab === 'element' }" @click="activeTab = 'element'">
                <el-icon>
                    <Picture />
                </el-icon>
                <span>元素</span>
            </div>
            <div class="tab-item" :class="{ active: activeTab === 'layer' }" @click="activeTab = 'layer'">
                <el-icon>
                    <Files />
                </el-icon>
                <span>图层</span>
            </div>
        </div>

        <!-- 内容区域 -->
        <div class="panel-content-area">
            <ElementPanel v-show="activeTab === 'element'" />
            <LayerPanel v-show="activeTab === 'layer'" />
        </div>
    </aside>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import ElementPanel from './ElementPanel.vue';
import LayerPanel from './LayerPanel.vue';
import { Picture, Files } from '@element-plus/icons-vue';

const activeTab = ref('element');
</script>

<style scoped lang="scss">
.left-panel-container {
    width: 100%;
    height: 100%;
    display: flex;
    background-color: #fff;
    box-sizing: border-box;

    .sidebar-tabs {
        width: 64px;
        flex-shrink: 0; // 锁定宽度，防止折叠时文字堆叠
        border-right: 1px solid #e4e7ed; // 稍微亮一点的边框
        display: flex;
        flex-direction: column;
        align-items: center;
        padding-top: 10px;
        background-color: #ffffff;
        box-shadow: 2px 0 8px rgba(0, 0, 0, 0.02);
        z-index: 2;

        .tab-item {
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: 70px;
            cursor: pointer;
            color: #606266;
            transition: all 0.2s;
            position: relative;

            &:hover {
                color: #409eff;
                background-color: #f5f7fa;
            }

            &.active {
                color: #409eff;
                background-color: #fff;

                // 蓝色的左侧指示条
                &::before {
                    content: '';
                    position: absolute;
                    left: 0;
                    top: 15%;
                    height: 70%;
                    width: 3px;
                    background-color: #409eff;
                    border-radius: 0 2px 2px 0;
                }
            }

            .el-icon {
                font-size: 22px;
                margin-bottom: 6px;
            }

            span {
                font-size: 13px;
            }
        }
    }

    .panel-content-area {
        width: 286px; // 350px - 64px
        flex-shrink: 0; // 防止折叠动画时由于父容器变窄导致内容被挤压形变
        height: 100%;
        overflow-y: auto;
        background-color: #fff;
        position: relative;
        z-index: 1;
    }
}
</style>