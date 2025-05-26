<script setup lang="ts">
import { ref, watch, onMounted ,defineProps} from 'vue';
import { message } from 'ant-design-vue';
import { postOfAxios } from '@/utils';

// 文件项接口定义
interface FileItem {
  uid: string; // 文件唯一标识
  name?: string; // 文件名（可选）
  url?: string; // 文件URL（可选）
  type?: string; // 文件类型（可选）
  [key: string]: any; // 允许其他属性
}

// 定义Props并设置默认值
const props = defineProps({
  params: {
    type: Object,
    required: false,
    default: () => ({
      mode: 'upload' as const,
      url: '',
      deleteUrl: '',
      viewUrl: '',
      requestParams: null,
      limit: null,
    })
  },
  getParentFileList: {
    type: Function,
    required: false
  },
  id: {
    type: String,
    required: false,
    default: ''
  },
  style: {
    type: Object,
    required: false
  }
});

const spinning = ref(false); // 加载状态
const spinTip = ref('上传中...'); // 加载提示文本
const fileList = ref<FileItem[]>([]); // 文件列表
const previewHeight = ref('100px'); // 预览区域默认高度

/**
* 初始化组件
* - 初始化参数
* - 初始化样式
* - 如果是查看模式则加载文件
*/
const initPage = () => {
  initParams();
  initStyle();

  // 查看模式下从父组件获取文件列表
  if (props.params.mode === 'view') {
    props.getParentFileList(props.id).then((res) => {
      fileList.value = res;
    });
  }
};

// 初始化参数
const initParams = () => {
  fileList.value = [];
};

// 初始化样式
const initStyle = () => {
  if (props.style?.previewHeight) {
    previewHeight.value = props.style.previewHeight;
  }
};

/**
* 自定义文件上传处理
* @param action - 上传API地址
* @param file - 要上传的文件对象
* @param onSuccess - 成功回调
* @param onError - 失败回调
*/
const customRequest = ({ action, file, onSuccess, onError }: any) => {
  const formData = new FormData();
  formData.append('file', file);

  // 添加额外请求参数
  if (props.params.requestParams) {
    for (const key in props.params.requestParams) {
      if (props.params.requestParams[key] === '[type]') {
        // 特殊参数：使用文件类型作为值
        formData.append(key, file.type);
      } else {
        formData.append(key, props.params.requestParams[key]);
      }
    }
  }

  // 调用API上传文件
  postOfAxios(action, formData, {
    headers:{
      'Content-Type': 'multipart/form-data',
    }
  })
  .then((response) => {
    onSuccess(response.data);
    message.success('上传成功');
  })
  .catch((error) => {
    onError(error);
    message.error('上传失败');
  });
};

/**
* 处理文件上传状态变化
* @param info - 上传状态信息
*/
const handleChange = (info: any) => {
  spinning.value = true;

  const { status, response } = info.file;

  // 上传成功处理
  if (status === 'done' && response) {
    // 构建文件URL并设置唯一ID
    info.file.url = props.params.viewUrl + response.file_id;
    info.file.uid = response.file_id;

    // 更新文件列表并关闭加载状态
    fileList.value = info.fileList;
    spinning.value = false;
  }
};

/**
* 获取文件主类型（用于显示）
* @param type - 文件MIME类型
* @returns 简化后的类型分类（'image'、'video'、'voice' 或 'other'）
*/
const getFileMainType = (type: string = '') => {
  if (type.includes('image')) return 'image';
  if (type.includes('video')) return 'video';
  if (type.includes('audio') || type.includes('voice')) return 'voice';
  return 'other';
};

/**
* 处理文件删除
* @param file - 要删除的文件对象
*/
const handleClose = (file: FileItem) => {
  spinning.value = true;
  const fileId = file.uid;

  // 调用API删除文件
  postOfAxios(props.params.deleteUrl + fileId)
    .then(() => {
      // 从本地列表中移除文件
      fileList.value = fileList.value.filter((item) => item.uid !== fileId);
      spinning.value = false;
    })
    .catch((error) => {
      console.error(error);
      spinning.value = false;
    })
};

/**
* 处理文件下载
* @param file - 要下载的文件对象
*/
const handleDownload = (file: FileItem) => {
  if (file.url) {
    window.open(file.url);
  }
};

/**
* 获取当前文件列表
* @returns 文件数组
*/
const getFileList = () => {
  return fileList.value;
};

// 向父组件暴露方法
defineExpose({
  getFileList,
});

// 组件生命周期钩子
onMounted(() => {
  initPage();
});

// 监听props.params变化
watch(
  () => props.params,
  () => {
    initPage();
  },
  { deep: true }
);
</script>

<template>
  <div class="upload-list">
    <!-- 上传按钮（仅在上传模式显示） -->
    <a-upload
      v-model:file-list="fileList"
      :action="params.url"
      accept="image/*,video/*,audio/*"
      :show-upload-list="false"
      :custom-request="customRequest"
      :onChange="handleChange"
      :max-count="params.limit"
      v-if="params.mode === 'upload'"
    >
      <a-button> 上传 </a-button>
    </a-upload>

    <!-- 加载状态和文件列表 -->
    <a-spin :tip="spinTip" :spinning="spinning">
      <div class="file-list">
        <div class="file-box">
          <!-- 文件预览项 -->
          <div
            class="file-preview-item"
            v-for="(file, index) in fileList"
            :key="file.uid || index"
            v-show="file.url"
            :style="{ height: previewHeight }"
          >
            <!-- 图片预览 -->
            <div class="image-item file-item" v-if="getFileMainType(file.type) === 'image'">
              <a-image width="200px" :src="file.url" />
              <i v-if="params.mode === 'upload'" class="close-icon" @click="handleClose(file)">X</i>
            </div>

            <!-- 视频预览 -->
            <div class="image-item file-item" v-if="getFileMainType(file.type) === 'video'">
              <video width="200px" controls>
                <source :src="file.url" type="video/mp4" />
              </video>
              <i v-if="params.mode === 'upload'" class="close-icon" @click="handleClose(file)">X</i>
            </div>

            <!-- 音频预览 -->
            <div class="image-item file-item" v-if="getFileMainType(file.type) === 'voice'">
              <audio controls :src="file.url" style="width: 200px"></audio>
              <i v-if="params.mode === 'upload'" class="close-icon" @click="handleClose(file)">X</i>
            </div>

            <!-- 其他文件类型预览 -->
            <div class="other-item file-item" v-if="getFileMainType(file.type) === 'other'">
              <div class="other-file">
                <span>{{ file.name }}</span>
              </div>
              <i
                v-if="params.mode === 'upload'"
                class="close-icon iconfont icon-nd-hlj-close"
                @click="handleClose(file)"
              ></i>
              <i
                v-if="params.mode === 'upload'"
                class="download-icon iconfont icon-nd-hlj-xiazaidaoru"
                @click="handleDownload(file)"
              ></i>
            </div>
          </div>
        </div>
      </div>
    </a-spin>
  </div>
</template>

<style scoped lang="less">
.upload-list {
  height: 100%;
  width: 100%;

  .file-list {
    width: 100%;
    height: calc(100% - 8px);
    margin-top: 8px;

    .file-box {
      width: 100%;
      height: auto;
      min-height: 80px;
      max-height: 240px;
      overflow-y: auto;
      display: flex;

      .file-preview-item {
        position: relative;
        width: 200px;
        height: 240px;
        margin: 0 4px;
        display: flex;
        justify-content: center;
        align-items: center;

        .other-item {
          height: 100%;
          width: 100%;

          .other-file {
            height: 100%;
            width: 100%;
            background-color: #dedede;

            display: flex;
            justify-content: center;
            align-items: center;
          }
        }

        i {
          position: absolute;
          right: 0;
          top: 0;
          width: 21px;
          height: 21px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }

        i:hover {
          background-color: #6c7a86;
          border-radius: 50%;
          color: #fffdef;
        }

        .close-icon {
          right: 0;
          top: 0;
        }

        .download-icon {
          right: 25px;
          top: 0;
        }
      }
    }
  }
}
</style>
