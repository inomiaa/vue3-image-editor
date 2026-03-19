<template>
  <div class="material-panel">
    <div class="category" v-for="(category, index) in materialList" :key="index">
      <div class="category-header">
        <span class="category-title">{{ category.title }}</span>
        <span class="view-more" v-if="category.list.length > 6" @click="toggleExpand(category.type)">
          {{ expandedCategories.has(category.type) ? '收起' : '查看更多' }}
          <el-icon v-if="expandedCategories.has(category.type)">
            <ArrowUp />
          </el-icon>
          <el-icon v-else>
            <ArrowDown />
          </el-icon>
        </span>
      </div>

      <div class="grid-container">
        <div class="material-item" v-for="item in getDisplayedList(category)" :key="item.name"
          @click="addMaterialToCanvas(item.url)">
          <img :src="item.url" :alt="item.name" loading="lazy" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { materialList } from '../data/materials';
import * as fabric from 'fabric';
import { useEditorStore } from '../store/editor';
import { ArrowDown, ArrowUp } from '@element-plus/icons-vue';
import { ElMessage } from 'element-plus';

const store = useEditorStore();

// 管理展开状态: 记录哪些 type 被展开了
const expandedCategories = ref<Set<string>>(new Set());

const toggleExpand = (type: string) => {
  if (expandedCategories.value.has(type)) {
    expandedCategories.value.delete(type);
  } else {
    expandedCategories.value.add(type);
  }
};

const getDisplayedList = (category: typeof materialList[0]) => {
  if (expandedCategories.value.has(category.type)) {
    return category.list;
  }
  return category.list.slice(0, 6); // 默认截取前 6 个
};

const addMaterialToCanvas = async (url: string) => {
  if (!store.canvas) return;

  try {
    if (url.endsWith('.svg')) {
      const { objects, options } = await fabric.loadSVGFromURL(url);
      const validObjects = objects.filter((obj): obj is fabric.FabricObject => obj !== null);
      const group = fabric.util.groupSVGElements(validObjects, options);
      // 默认缩小一半，防止过大
      group.scale(0.5);
      store.canvas.add(group);

      // 使用原生的 viewportCenter 将对象放置在画布视野居中
      const vpCenter = store.canvas.getVpCenter();
      group.set({
        left: vpCenter.x,
        top: vpCenter.y,
        originX: 'center',
        originY: 'center',
      });

      store.canvas.setActiveObject(group);
      store.setSelectedElement(group);

      store.canvas.renderAll();
      store.saveHistory();
    } else {
      // png 等位图
      const img = await fabric.Image.fromURL(url);
      img.scale(0.5);
      store.canvas.add(img);

      const vpCenter = store.canvas.getVpCenter();
      img.set({
        left: vpCenter.x,
        top: vpCenter.y,
        originX: 'center',
        originY: 'center',
      });

      store.canvas.setActiveObject(img);
      store.setSelectedElement(img);

      store.canvas.renderAll();
      store.saveHistory();
    }
  } catch (error) {
    ElMessage.error('加载素材失败，请检查资源路径！');
    console.error('加载素材失败:', error);
  }
};

</script>

<style scoped lang="scss">
.material-panel {
  width: 100%;
  height: 100%;
  background-color: #fff;
  padding: 20px;
  box-sizing: border-box;
  overflow-y: auto;

  .category {
    margin-bottom: 25px;

    .category-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 10px;

      .category-title {
        font-size: 14px;
        font-weight: bold;
        color: #303133;
      }

      .view-more {
        font-size: 12px;
        color: #909399;
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 2px;
        transition: color 0.2s;

        &:hover {
          color: #409eff;
        }
      }
    }

    .grid-container {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 12px;
      background-color: #f6f7f9;
      padding: 12px;
      border-radius: 8px;

      .material-item {
        background-color: #fff;
        border-radius: 6px;
        aspect-ratio: 1 / 1; // 保持 1:1 正方形
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        transition: transform 0.2s, box-shadow 0.2s;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
        padding: 5px;

        &:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
        }

        img {
          max-width: 100%;
          max-height: 100%;
          object-fit: contain;
          pointer-events: none; // 防止拖拽图标本身而不是触发点击
        }
      }
    }
  }
}
</style>
