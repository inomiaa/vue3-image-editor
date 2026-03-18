<template>
    <header class="app-header">
        <div class="left-section">
            <div class="logo">
                <img src="@/assets/logo-removebg.png" alt="Logo" />
            </div>
            <div class="insert">
                <el-dropdown>
                    <span class="el-dropdown-link">
                        文件
                        <el-icon class="el-icon--right">
                            <arrow-down />
                        </el-icon>
                    </span>
                    <template #dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item @click="store.saveProject">保存工程 (JSON)</el-dropdown-item>
                            <el-dropdown-item @click="triggerProjectInput">打开工程 (JSON)</el-dropdown-item>
                            <input type="file" ref="projectInput" @change="handleProjectChange" accept=".json"
                                style="display: none" />
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
                <el-dropdown>
                    <span class="el-dropdown-link link-insert">
                        插入
                        <el-icon class="el-icon--right">
                            <arrow-down />
                        </el-icon>
                    </span>
                    <template #dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item @click="triggerFileInput">插入图片</el-dropdown-item>
                            <!-- 隐藏的文件输入框 -->
                            <input type="file" ref="fileInput" @change="handleFileChange" accept="image/*"
                                style="display: none" />
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
            </div>
        </div>
        <div class="center-section">
            <el-tooltip content="撤销" placement="bottom" :show-after="300">
                <el-button :disabled="!store.canUndo" @click="store.undo" link>
                    <template #icon>
                        <svg t="1773248102282" class="icon" viewBox="0 0 1024 1024" version="1.1"
                            xmlns="http://www.w3.org/2000/svg" p-id="4787" width="200" height="200">
                            <path
                                d="M425.640718 363.245708l0-170.978945-299.323927 299.251272 299.323927 299.378162 0-175.361761c213.758218 0 363.447299 68.396695 470.302872 218.076566C853.226739 619.799572 724.955435 406.087403 425.640718 363.245708"
                                p-id="4788" fill="currentColor"></path>
                        </svg>
                    </template>
                </el-button>
            </el-tooltip>
            <el-tooltip content="重做" placement="bottom" :show-after="300">
                <el-button @click="store.redo" :disabled="!store.canRedo" link>
                    <template #icon>
                        <svg t="1773248141685" class="icon" viewBox="0 0 1024 1024" version="1.1"
                            xmlns="http://www.w3.org/2000/svg" p-id="5805" width="200" height="200">
                            <path
                                d="M128 800h20.6l38.4-62.4c41-65.4 89.8-125.6 151.6-153.2 48.8-21.8 93.4-37.8 173.4-40V704l384-256-384-256v160.6C386 358.2 295.8 394 225.4 465 120.8 570.4 128 703 128 736.4c0.2 17.8 0 43.4 0 63.6z"
                                p-id="5806" fill="currentColor"></path>
                        </svg>
                    </template>
                </el-button>
            </el-tooltip>
        </div>
        <div class="right-section">
            <div class="btn-group">
                <div class="btn-clear" @click="store.clearCanvas">
                    <span>清空</span>
                </div>
                <el-button @click="store.exportPng()" type="primary" :disabled="!store.canvas">导出</el-button>
            </div>
        </div>
    </header>
</template>

<script setup lang="ts">
import { useEditorStore } from '@/store/editor';
import { ArrowDown } from '@element-plus/icons-vue'
import { ref } from 'vue';
const store = useEditorStore();

const fileInput = ref<HTMLInputElement | null>(null);
const triggerFileInput = () => {
    fileInput.value?.click();
};
const handleFileChange = (e: Event) => {
    const input = e.target as HTMLInputElement;
    const file = input.files?.[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
            const result = event.target?.result as string;
            store.insertImage(result);
        }
        reader.readAsDataURL(file);
    }
}

const projectInput = ref<HTMLInputElement | null>(null);
const triggerProjectInput = () => {
    projectInput.value?.click();
};
const handleProjectChange = (e: Event) => {
    const input = e.target as HTMLInputElement;
    const file = input.files?.[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
            const result = event.target?.result as string;
            store.loadProject(result);
            input.value = '';
        }
        reader.readAsText(file);
    }
}
</script>

<style lang="scss" scoped>
.app-header {
    height: 60px;
    background-color: #ffffff;
    box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
    border-bottom: 1px solid #dcdfe6;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px;

    .left-section {
        display: flex;
        align-items: center;
        width: 300px;

        .logo {
            display: flex;
            align-items: center;

            img {
                width: 120px;
                height: 90px;
                margin-right: 12px;
                transform: scale(1.5);
                transform-origin: center center;
            }
        }

        .insert {
            margin-left: 20px;
            display: flex;
            align-items: center;
            flex-wrap: nowrap;
            gap: 0;

            .el-dropdown-link {
                height: 32px;
                padding: 0 15px;
                font-size: 15px;
                cursor: pointer;
                color: var(--el-color-primary);
                display: flex;
                align-items: center;
                white-space: nowrap; // 禁止换行
                outline: none;
                border-left: 1px solid #dcdfe6;
                transition: all 0.3s;

                &:hover {
                    background-color: rgba(64, 158, 255, 0.05);
                }
            }

            .el-dropdown:last-child .el-dropdown-link {
                border-right: 1px solid #dcdfe6;
            }
        }
    }

    .center-section {
        display: flex;
        align-items: center;
        gap: 15px;

        :deep(.el-button) {
            color: #333;

            .el-icon,
            svg {
                width: 20px !important;
                height: 20px !important;
            }

            &.is-disabled {
                color: #c0c4cc !important;
            }
        }
    }

    .right-section {
        width: 300px;

        .btn-group {
            display: flex;
            align-items: center;
            gap: 10px;
            margin-left: 50px;

            .btn-clear {
                font-size: 16px;
                color: #333;
                cursor: pointer;
                padding: 5px 10px;
                border-radius: 4px;
                transition: all 0.3s ease;

                &:hover {
                    background-color: #f5f5f5;
                }
            }
        }
    }

}
</style>