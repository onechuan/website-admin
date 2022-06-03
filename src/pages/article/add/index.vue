<template>
  <div class="editor-container">
    <el-form ref="articleFormRef">
      <div class="editor-header">
        <input
          v-model="articleForm.title"
          class="title-input"
          type="text"
          placeholder="请输入你的文章标题 ..."
        />
        <el-button type="primary" @click="handleDrawer"
          >发布{{ articleForm.title }}</el-button
        >
      </div>
      <md-editor v-model="articleForm.content" class="editor" />
      <el-drawer v-model="drawer" title="发布文章" @close="handleCloseDrawer">
        <el-form-item label="分类" >
          <el-select
            v-model="articleForm.category"
            placeholder="please select your zone"
          >
            <el-option label="Zone one" value="shanghai" />
            <el-option label="Zone two" value="beijing" />
          </el-select>
        </el-form-item>
        <el-form-item label="标签">
          <el-select
            v-model="articleForm.tags"
            multiple
            placeholder="Select"
            style="width: 240px"
          >
            <el-option-group :label="selectOptionGroupLabel">
              <el-option
                v-for="item in tagList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
                :disabled="filterDisableOption(item.value)"
              />
            </el-option-group>
          </el-select>
        </el-form-item>
        <el-form-item label="封面">
          <el-upload
            class="cover-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :on-success="handleCoverSuccess"
            :before-upload="beforeCoverUpload"
          >
            <img
              v-if="articleForm.cover"
              :src="articleForm.cover"
              class="cover"
            />
            <el-icon v-else class="cover-uploader-icon"><Plus /></el-icon>
          </el-upload>
        </el-form-item>
        <el-form-item label="摘要" prop="desc">
          <el-input
            v-model="articleForm.desc"
            class="desc-input"
            type="textarea"
            placeholder="请输入文章的摘要"
            maxlength="120"
            show-word-limit
            :autosize="{
              minRows: 2,
              maxRows: 6,
            }"
          />
        </el-form-item>
        <el-form-item class="btn-group">
          <el-button @click="handleCloseDrawer">取消</el-button>
          <el-button type="primary" @click="handleSubmit(articleFormRef)"
            >确认并发布</el-button
          >
        </el-form-item>
      </el-drawer>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
  import { computed, reactive, ref } from 'vue';
  import MdEditor from 'md-editor-v3';
  import 'md-editor-v3/lib/style.css';

  import {
    ElMessage,
    FormInstance,
    FormRules,
    UploadProps,
  } from 'element-plus';
  import { Plus } from '@element-plus/icons-vue';

  const articleFormRef = ref();

  const tagList = [
    {
      value: 'Option1',
      label: 'Option1',
    },
    {
      value: 'Option2',
      label: 'Option2',
    },
    {
      value: 'Option3',
      label: 'Option3',
    },
  ];

  const articleForm = reactive({
    title: '',
    content: '',
    category: '',
    cover: '',
    tags: [],
    desc: '',
  });

  const selectOptionGroupLabel = computed(
    () => `你还能添加${2 - articleForm.tags.length}个标签`
  );

  function filterDisableOption(item): boolean {
    console.log('item', item);
    // tags.length <= 2
    if (articleForm.tags.length < 2) return false;
    if (articleForm.tags.length === 2) {
      return !articleForm.tags.includes(item);
    }
    return true;
  }

  const drawer = ref(false);
  function handleDrawer() {
    drawer.value = true;
  }

  function handleCloseDrawer() {
    drawer.value = false;
  }

  const imageUrl = ref('');

  const handleCoverSuccess: UploadProps['onSuccess'] = (
    response,
    uploadFile
  ) => {
    imageUrl.value = URL.createObjectURL(uploadFile.raw!);
  };

  const beforeCoverUpload: UploadProps['beforeUpload'] = (rawFile) => {
    if (rawFile.size / 1024 / 1024 > 2) {
      ElMessage.error('cover picture size can not exceed 2MB!');
      return false;
    }
    return true;
  };

  async function handleSubmit(formEl: FormInstance | undefined) {
    if (!articleForm.title.trim()) {
      ElMessage.error('文章标题不能为空！');
      return;
    }
    if (!articleForm.content.trim()) {
      ElMessage.error('文章内容不能为空！');
      return;
    }
    if (!articleForm.category) {
      ElMessage.error('文章分类不能为空！');
      return;
    }
    if (!articleForm.tags.length) {
      ElMessage.error('文章标签不能为空！');
      return;
    }

    if (!articleForm.cover) {
      ElMessage.error('文章封面不能为空！');
      return;
    }
    if (!articleForm.desc.trim()) {
      ElMessage.error('文章简介不能为空！');
      return;
    }

    if (!formEl) return;
    await formEl.validate((valid, fields) => {
      if (valid) {
        console.log('submit!');
      } else {
        console.log('error submit!', fields);
      }
    });
  }
</script>

<style lang="scss" scoped>
  .editor-container,
  .el-form {
    height: 100%;
  }
  .editor-header {
    height: 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #fff;
    padding: 0 10px;
    border-bottom: 1px solid #ccc;
    .title-input {
      height: 40px;
      flex: 1;
      margin: 0;
      padding: 0 10px;
      font-size: 24px;
      font-weight: 500;
      color: #1d2129;
      margin-right: 20px;
      border: none;
      outline: none;
      background-color: transparent;
    }
  }
  .editor {
    height: calc(100% - 63px);
  }

  .cover-uploader {
    &.cover {
      width: 178px;
      height: 178px;
      display: block;
      border: 1px dashed yellowgreen;
    }
  }
  .el-upload {
    border: 1px dashed yellowgreen;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: yellowgreen;
  }
  .el-upload:hover {
    border-color: yellowgreen;
  }
  .el-icon.cover-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    text-align: center;
    border: 1px dashed yellowgreen;
  }
  .btn-group {
    float: right;
  }
</style>
