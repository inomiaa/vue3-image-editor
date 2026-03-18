import { defineStore } from 'pinia';
import { shallowRef, ref, computed } from 'vue';
import * as fabric from 'fabric';

export const useEditorStore = defineStore('editor', () => {

    //画布实例
    const canvas = shallowRef<fabric.Canvas | null>(null);

    //当前选中的图形元素
    const selectedElement = shallowRef<fabric.Object | null>(null);

    // 侧边栏可见性
    const leftPanelVisible = ref(true);
    const rightPanelVisible = ref(true);

    const toggleLeftPanel = () => {
        leftPanelVisible.value = !leftPanelVisible.value;
        // 折叠后重新计算画布大小
        setTimeout(() => canvas.value?.calcOffset(), 300);
    };

    const toggleRightPanel = () => {
        rightPanelVisible.value = !rightPanelVisible.value;
        // 折叠后重新计算画布大小
        setTimeout(() => canvas.value?.calcOffset(), 300);
    };

    const canvasZoom = ref(1);

    //初始化画布
    const initCanvas = (canvasInstance: fabric.Canvas) => {
        canvas.value = canvasInstance;
        canvasZoom.value = canvasInstance.getZoom();
        canvas.value.on('object:added', updateLayer);
        canvas.value.on('object:removed', updateLayer);
        canvas.value.on('object:modified', updateLayer);
        // 选中的时候也要刷一下，用来做列表高亮
        canvas.value.on('selection:created', updateLayer);
        canvas.value.on('selection:updated', updateLayer);
        canvas.value.on('selection:cleared', updateLayer);

    }

    //更新当前选中的元素
    const setSelectedElement = (element: fabric.Object | null) => {
        selectedElement.value = element;
    }

    //当前模式
    const drawMode = shallowRef<string>('select');

    //更新当前模式
    const setDrawMode = (mode: string) => {
        drawMode.value = mode;
        if (canvas.value) {
            canvas.value.selection = mode === 'select';
            canvas.value.isDrawingMode = mode === 'pencil';
            if (mode === 'pencil') {
                const brush = new fabric.PencilBrush(canvas.value);
                brush.color = '#000';
                brush.width = 2;
                canvas.value.freeDrawingBrush = brush;
            }
        }
    }

    //存储历史记录
    const history = ref<string[]>([]);
    const historyIndex = ref<number>(-1);

    //是否正在处理历史记录,防止重复保存
    const isHistoryProcessing = ref(false);

    const canUndo = computed(() => historyIndex.value > 0);
    const canRedo = computed(() => historyIndex.value < history.value.length - 1);

    //图层
    const layers = ref<fabric.Object[]>([])

    //保存当前画布状态
    const saveHistory = () => {
        if (!canvas.value || isHistoryProcessing.value) return;
        // 将当前画布导出为JSON字符串
        const json = JSON.stringify(canvas.value.toJSON());
        // 如果当前指针不在末尾（即已经撤销过），则删除之后的所有历史记录
        if (historyIndex.value < history.value.length - 1) {
            history.value = history.value.slice(0, historyIndex.value + 1);
        }
        // 防止出现一模一样的连续快照
        if (history.value.length > 0 && history.value[historyIndex.value] === json) {
            return;
        }
        history.value.push(json);
        historyIndex.value++;
    }

    //撤销
    const undo = () => {
        if (!canUndo.value || !canUndo.value || isHistoryProcessing.value) return;
        //上锁
        isHistoryProcessing.value = true;
        historyIndex.value--;
        const json = history.value[historyIndex.value];
        if (!json) {
            isHistoryProcessing.value = false;
            return;
        }
        //加载旧画布
        canvas.value?.loadFromJSON(json).then(() => {
            canvas.value?.renderAll();
            //解锁
            isHistoryProcessing.value = false;

            //同步选中元素
            const activeObject = canvas.value?.getActiveObject();
            if (activeObject) {
                setSelectedElement(activeObject);
            }
        })
    }

    //重做
    const redo = () => {
        if (!canvas.value || !canRedo.value || isHistoryProcessing.value) return;
        //上锁
        isHistoryProcessing.value = true;
        historyIndex.value++;
        const json = history.value[historyIndex.value];
        if (!json) {
            isHistoryProcessing.value = false;
            return;
        }
        //加载旧画布
        canvas.value?.loadFromJSON(json).then(() => {
            canvas.value?.renderAll();
            //解锁
            isHistoryProcessing.value = false;

            //同步选中元素
            const activeObject = canvas.value?.getActiveObject();
            if (activeObject) {
                setSelectedElement(activeObject);
            }
        })
    }

    //删除当前选中的元素
    const deleteSelectedElement = () => {
        if (!canvas.value || !selectedElement.value) return;
        const selectedElements = canvas.value.getActiveObjects();
        if (selectedElements.length > 0) {
            canvas.value.remove(...selectedElements);
        }
        canvas.value.discardActiveObject();
        setSelectedElement(null);
        saveHistory();
        canvas.value.renderAll();
    }

    //复制当前选中的元素
    const copySelectedElement = () => {
        if (!canvas.value || !selectedElement.value) return;
        selectedElement.value.clone().then((clonedElement: fabric.Object) => {
            clonedElement.set({
                left: clonedElement.left + 20,
                top: clonedElement.top + 20
            })
            canvas.value?.add(clonedElement);
            canvas.value?.setActiveObject(clonedElement);
            setSelectedElement(clonedElement);
            canvas.value?.renderAll();
            saveHistory();
        })
    }

    //置顶
    const bringToFront = () => {
        if (!canvas.value || !selectedElement.value) return;
        canvas.value.bringObjectToFront(selectedElement.value);
        canvas.value.renderAll();
        saveHistory();
    }

    //置底
    const sendToBack = () => {
        if (!canvas.value || !selectedElement.value) return;
        canvas.value.sendObjectToBack(selectedElement.value);
        canvas.value.renderAll();
        saveHistory();
    }

    //上移一层
    const bringForward = () => {
        if (!canvas.value || !selectedElement.value) return;
        canvas.value.bringObjectForward(selectedElement.value);
        canvas.value.renderAll();
        saveHistory();
    }

    //下移一层
    const sendBackwards = () => {
        if (!canvas.value || !selectedElement.value) return;
        canvas.value.sendObjectBackwards(selectedElement.value);
        canvas.value.renderAll();
        saveHistory();
    }

    //缩放画布
    const setZoom = (zoom: number, pointer?: { x: number, y: number }) => {
        if (!canvas.value) return;
        const newZoom = Math.min(Math.max(0.1, zoom), 20);
        let point: fabric.Point;
        if (pointer) {
            //以鼠标位置为中心缩放
            point = new fabric.Point(pointer.x, pointer.y);
        } else {
            //以画布中心缩放
            const center = canvas.value.getVpCenter();
            point = new fabric.Point(center.x, center.y);
        }
        canvas.value.zoomToPoint(point, newZoom);
        canvasZoom.value = newZoom;
        canvas.value.renderAll();
    }

    //重置缩放
    const resetZoom = () => {
        if (!canvas.value) return;
        // 重置视口矩阵到初始状态
        canvas.value.setViewportTransform([1, 0, 0, 1, 0, 0]);
        canvasZoom.value = 1;
        canvas.value.renderAll();
    }
    //插入本地图片到画布中
    const insertImage = (url: string) => {
        if (!canvas.value) return;
        fabric.FabricImage.fromURL(url, {
            crossOrigin: 'anonymous'
        }).then((image: fabric.Image) => {
            const center = canvas.value!.getVpCenter();
            image.set({
                left: center.x,
                top: center.y,
                originX: 'center',
                originY: 'center'
            })

            //缩放图片到合适大小
            const maxWidth = canvas.value!.width * 0.8;
            const maxHeight = canvas.value!.height * 0.8;
            if (image.width! > maxWidth || image.height! > maxHeight) {
                const scale = Math.min(maxWidth / image.width!, maxHeight / image.height!);
                image.set({
                    scaleX: scale,
                    scaleY: scale
                })
            }
            canvas.value?.add(image);
            canvas.value?.setActiveObject(image);
            setSelectedElement(image);
            canvas.value?.renderAll();
            saveHistory();
        }).catch((err) => {
            console.error('插入图片失败:', err);
        })
    }
    // 清空画布
    const clearCanvas = () => {
        if (!canvas.value) return;

        //清空画布上所有对象
        canvas.value.clear();
        //重置背景色
        canvas.value.backgroundColor = '#ffffff';
        setSelectedElement(null);
        saveHistory();
        canvas.value.renderAll();
    }
    //更新图层
    const updateLayer = () => {
        if (!canvas.value) return;
        layers.value = [...canvas.value.getObjects()].reverse();
    }
    //导出画布
    const exportPng = () => {
        if (!canvas.value) return;
        const url = canvas.value.toDataURL({
            format: 'png',
            quality: 1,
            multiplier: 2
        });
        const a = document.createElement('a');
        a.href = url;
        a.download = `image-${Date.now()}.png`;
        document.body.appendChild(a);
        a.click();
        URL.revokeObjectURL(url);
        document.body.removeChild(a);
    }

    // 导出工程为 JSON 文件
    const saveProject = () => {
        console.log('开始导出工程...');
        if (!canvas.value) {
            console.warn('画布实例不存在，无法导出');
            return;
        }

        try {
            // 恢复默认 toJSON，解决类型报错
            const projectData = canvas.value.toJSON();
            const jsonContent = JSON.stringify(projectData, null, 2);

            const blob = new Blob([jsonContent], { type: 'application/json' });
            const url = URL.createObjectURL(blob);

            const a = document.createElement('a');
            a.style.display = 'none';
            a.href = url;
            a.download = `project-${new Date().getTime()}.json`;
            document.body.appendChild(a);
            a.click();

            setTimeout(() => {
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
                console.log('工程导出成功');
            }, 100);
        } catch (err) {
            console.error('导出工程失败:', err);
        }
    };

    // 从 JSON 载入工程
    const loadProject = (jsonContent: string) => {
        if (!canvas.value) return;
        try {
            canvas.value.loadFromJSON(jsonContent).then(() => {
                canvas.value?.renderAll();
                // 载入成功后，重置历史记录，以免混合不同工程的状态
                history.value = [JSON.stringify(canvas.value?.toJSON())];
                historyIndex.value = 0;
                setSelectedElement(null);
            });
        } catch (err) {
            console.error('载入工程失败:', err);
        }
    };

    return {
        canvas,
        selectedElement,
        initCanvas,
        setSelectedElement,
        drawMode,
        setDrawMode,
        history,
        historyIndex,
        canUndo,
        canRedo,
        saveHistory,
        undo,
        redo,
        deleteSelectedElement,
        copySelectedElement,
        bringToFront,
        sendToBack,
        bringForward,
        sendBackwards,
        canvasZoom,
        setZoom,
        resetZoom,
        insertImage,
        clearCanvas,
        exportPng,
        saveProject,
        loadProject,
        leftPanelVisible,
        rightPanelVisible,
        toggleLeftPanel,
        toggleRightPanel,
        layers,
        updateLayer
    }
})