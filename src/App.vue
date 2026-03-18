<template>
  <div class="app-wrapper">
    <Header />
    <div class="app-main">
      <!-- 左侧边栏 -->
      <div class="side-panel left" :class="{ 'is-collapsed': !store.leftPanelVisible }">
        <div class="panel-content">
          <LeftPanel />
        </div>
        <div class="collapse-btn left-btn" @click="store.toggleLeftPanel">
          <el-icon>
            <ArrowLeft v-if="store.leftPanelVisible" />
            <ArrowRight v-else />
          </el-icon>
        </div>
      </div>

      <!-- 画布区域 -->
      <CanvasWorkspace />

      <!-- 右侧边栏 -->
      <div class="side-panel right" :class="{ 'is-collapsed': !store.rightPanelVisible }">
        <div class="panel-content">
          <RightPanel />
        </div>
        <div class="collapse-btn right-btn" @click="store.toggleRightPanel">
          <el-icon>
            <ArrowRight v-if="store.rightPanelVisible" />
            <ArrowLeft v-else />
          </el-icon>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Header from './components/Header.vue';
import LeftPanel from './components/LeftPanel.vue';
import CanvasWorkspace from './components/CanvasWorkspace.vue';
import RightPanel from './components/RightPanel.vue';
import { useEditorStore } from './store/editor';
import { ArrowLeft, ArrowRight } from '@element-plus/icons-vue';

const store = useEditorStore();
</script>

<style scoped lang="scss">
.app-wrapper {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #f5f7fa;

  .app-main {
    display: flex;
    flex: 1;
    overflow: hidden;
    position: relative;

    .side-panel {
      position: relative;
      z-index: 10;
      display: flex;
      flex-shrink: 0;
      background-color: #fff;

      .panel-content {
        width: 350px;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        overflow: hidden;
        height: 100%;
        background-color: #fff;
      }

      &.left {
        border-right: 1px solid #dcdfe6;

        &.is-collapsed {
          .panel-content {
            width: 64px;
          }
        }
      }

      &.right {
        border-left: 1px solid #dcdfe6;

        &.is-collapsed {
          border-left: none;

          .panel-content {
            width: 0;
            opacity: 0;
          }
        }
      }

      // 折叠按钮样式
      .collapse-btn {
        position: absolute;
        top: 50%;
        width: 24px;
        height: 48px;
        background-color: #fff;
        border: 1px solid #dcdfe6;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        z-index: 101; // 确保在最上层
        color: #909399;
        transition: all 0.3s;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

        &:hover {
          color: var(--el-color-primary);
          background-color: #ecf5ff;
        }

        &.left-btn {
          right: -24px; // 确保折叠后按钮依然完全露出 (按钮宽度是24)
          border-radius: 0 4px 4px 0;
          transform: translateY(-50%);
        }

        &.right-btn {
          left: -24px; // 同理
          border-radius: 4px 0 0 4px;
          transform: translateY(-50%);
        }
      }
    }
  }
}
</style>
