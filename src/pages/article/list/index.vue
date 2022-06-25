<template>
  <div class="user-info">
    <div class="header">
      <Breadcrumb :breadcrumbs="breadcrumbs" />
      <el-button type="primary" @click="onClickAddArticle">新增文章</el-button>
    </div>
    <div class="main">
      <el-table :data="articleList" style="width: 100%" :border="true">
        <el-table-column prop="id" label="索引" />
        <el-table-column prop="title" label="标题" />
        <el-table-column prop="cover" width="120" label="封面">
          <template #default="scope">
            <img class="cover" :src="scope.row.cover" />
          </template>
        </el-table-column>
        <el-table-column prop="author" width="80" label="作者" />
        <el-table-column prop="desc" label="简介" />
        <el-table-column prop="tags" label="标签">
          <template #default="scope">
            <el-tag
              v-for="tag in scope.row.tags"
              :key="tag"
              class="tag"
              type="success"
              >{{ tag }}</el-tag
            >
          </template>
        </el-table-column>
        <el-table-column prop="isDel" label="删除状态">
          <template #default="scope">
            <el-switch v-model="scope.row.isDel" @change="handleDelChange" />
          </template>
        </el-table-column>
        <el-table-column prop="isPublish" label="发布状态">
          <template #default="scope">
            <el-switch v-model="scope.row.isPublish" />
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template #default="scope">
            <el-button link @click="handlePreviewArticle(scope.row)"
              >预览</el-button
            >
            <el-button
              type="primary"
              link
              @click="handleUpdateChange(scope.row)"
              >编辑</el-button
            >
            <el-popconfirm
              confirm-button-text="确认"
              cancel-button-text="取消"
              title="是否删除本篇文章?"
              @confirm="handleConfirmDelEvent(scope.row)"
              @cancel="handleCancelEvent"
            >
              <template #reference>
                <el-button type="danger" link>删除</el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination-container">
        <el-pagination
          v-model:currentPage="pageOptions.curPage"
          v-model:page-size="pageOptions.size"
          :page-sizes="[5, 10, 20, 50]"
          :small="false"
          :background="false"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pageOptions.total"
          @sizeChange="handleSizeChange"
          @currentChange="handleCurrentChange"
        />
      </div>
    </div>
    <PreviewBox
      :is-preview="isPreview"
      @changePreviewStatus="changePreviewStatus"
    />
  </div>
</template>

<script lang="ts" setup>
  import router from '@/router';
  import { reactive, ref } from 'vue';

  import Breadcrumb from '@/components/breadcrumb/index.vue';

  import { fetchArticleList } from '@/api/article';
  import { ElMessage } from 'element-plus';
  import PreviewBox from '../components/preview-box.vue';

  const articleList = ref([]);

  const pageOptions = reactive({
    curPage: 1,
    total: 0,
    size: 10,
  });

  async function initData() {
    const res = await fetchArticleList(pageOptions);
    const { curPage, total, size } = res.data;
    articleList.value = res.data.articleList;
    Object.assign(pageOptions, {
      curPage,
      total,
      size,
    });
  }
  initData();

  const breadcrumbs = [
    {
      name: '用户管理',
      path: '/user',
    },
    {
      name: '查看用户',
      path: '/user',
    },
  ];

  function onClickAddArticle() {
    router.push('/article/add');
  }

  function handleSizeChange(val: number) {
    pageOptions.size = val;
  }
  function handleCurrentChange(val: number) {
    pageOptions.curPage = val;
  }

  function handleConfirmDelEvent(val: number) {
    console.log('确定删除', val);
    ElMessage.success('删除成功');
  }

  function handleCancelEvent() {
    ElMessage.warning('取消删除');
  }

  const isPreview = ref(false);
  function changePreviewStatus(val: any) {
    isPreview.value = val;
  }
  function handlePreviewArticle(val: any) {
    console.log('vale', val);
    isPreview.value = true;
    console.log('isPreview.value', isPreview.value);
  }

  function handleDelChange(val: any) {
    console.log('vale', val);
  }

  function handleUpdateChange(val: any) {
    console.log('vale', val);
  }
</script>

<style lang="scss" scoped>
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .main {
    margin-top: 20px;
    width: 100%;
    box-sizing: border-box;
    .pagination-container {
      display: flex;
      padding: 10px;
      justify-content: flex-end;
    }
    .cover {
      width: 80px;
      height: 80px;
    }
    .tag {
      margin-right: 5px;
    }
  }
</style>
