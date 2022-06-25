<template>
  <el-drawer
    v-model="isShowDrawer"
    direction="ltr"
    size="800"
    title="I am the title"
    @close="handleDrawerClose"
  >
    <md-editor :model="content" :preview-only="true" class="editor" />
  </el-drawer>
</template>

<script lang="ts" setup>
  import { ElDrawer } from 'element-plus';
  import MdEditor from 'md-editor-v3';
  import 'md-editor-v3/lib/style.css';
  import { ref } from 'vue';

  const props = defineProps({
    isPreview: {
      type: Boolean,
      default: false,
    },
    content: {
      type: String,
      default: '',
    },
  });

  const emit = defineEmits(['changePreviewStatus']);

  const isShowDrawer = ref(props.isPreview);

  function handleDrawerClose() {
    emit('changePreviewStatus', isShowDrawer.value);
  }
</script>

<style lang="scss" scoped></style>
