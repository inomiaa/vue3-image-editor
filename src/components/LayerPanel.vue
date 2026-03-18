<template>
  <div class="layer-panel">
    <div class="title">图层管理</div>
    <div class="layer-list">
      <div v-for="(item, index) in store.layers" :key="index" class="layer-item"
        :class="{ active: store.selectedElement === item }" @click="selectLayer(item)">
        <!-- 显示类型 -->
        <span class="type-tag">{{ getTypeLabel(item.type) }}</span>
        <!-- 如果你有 ID 就显示 ID，没有就显示索引 -->
        <span class="name">{{ (item as any).id || `图层 ${store.layers.length - index}` }}</span>

        <!-- 操作区 -->
        <div class="actions">
          <el-icon @click.stop="toggleVisible(item)">
            <View v-if="item.visible" />
            <Hide v-else />
          </el-icon>
          <el-icon @click.stop="toggleLock(item)">
            <Lock v-if="!(item.selectable && item.evented)" />
            <Unlock v-else />
          </el-icon>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useEditorStore } from '../store/editor';
import { View, Hide, Lock, Unlock } from '@element-plus/icons-vue';

const store = useEditorStore();

const selectLayer = (obj: any) => {
  if (obj.selectable === false && obj.evented === false) return; // 锁定的不能选
  store.canvas?.setActiveObject(obj);
  store.setSelectedElement(obj);
  store.canvas?.renderAll();
};

const toggleVisible = (obj: any) => {
  obj.set('visible', !obj.visible);
  store.canvas?.renderAll();
  store.updateLayer();
};

const toggleLock = (obj: any) => {
  const isLocked = !(obj.selectable && obj.evented);
  if (isLocked) {
    obj.set({
      selectable: true,
      evented: true
    });
  } else {
    obj.set({
      selectable: false,
      evented: false
    });
    // 如果当前选中的是被锁定的对象，则取消选中
    if (store.selectedElement === obj) {
      store.canvas?.discardActiveObject();
      store.setSelectedElement(null);
    }
  }
  store.canvas?.renderAll();
  store.updateLayer();
};

const getTypeLabel = (type: string | undefined): string => {
  switch (type) {
    case 'i-text': return '文字';
    case 'rect': return '矩形';
    case 'circle': return '圆形';
    case 'triangle': return '三角形';
    case 'polygon': return '多边形';
    case 'path': return '线条';
    case 'line': return '直线';
    case 'group': return '组合';
    case 'image': return '图片';
    default: return type || '图层';
  }
};
</script>

<style scoped lang="scss">
.layer-panel {
  width: 100%;
  height: 100%;
  padding: 20px;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;

  .title {
    font-size: 14px;
    color: #333;
    margin-bottom: 12px;
  }

  .layer-list {
    flex: 1;
    overflow-y: auto;
    margin: 0 -20px; // 让列表项依然通栏

    .layer-item {
      display: flex;
      align-items: center;
      padding: 12px 20px;
      cursor: pointer;
      border-bottom: 1px solid #f5f5f5;
      transition: background-color 0.2s;

      &:hover {
        background-color: #f9f9f9;

        .actions {
          opacity: 1;
        }
      }

      &.active {
        background-color: #ecf5ff;
        color: #409eff;
        border-left: 3px solid #409eff;
      }

      .type-tag {
        font-size: 11px;
        background: #f0f2f5;
        color: #909399;
        padding: 2px 6px;
        border-radius: 4px;
        margin-right: 10px;
      }

      .name {
        flex: 1;
        font-size: 13px;
        color: #606266;
        user-select: none;
      }

      .actions {
        display: flex;
        gap: 8px;
        opacity: 0.6; // 默认稍微透明，悬停时完全可见
        transition: opacity 0.2s;

        .el-icon {
          font-size: 14px;
          color: #909399;
          padding: 4px;
          border-radius: 4px;

          &:hover {
            color: #409eff;
            background-color: #e4e7ed;
          }
        }
      }
    }
  }
}
</style>
