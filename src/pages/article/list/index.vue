<template>
  <el-table
    :data="tableData"
    style="width: 100%"
    @headerClick="handleHeadClick"
  >
    <el-popover
      v-model:visible="visible"
      placement="bottom"
      title="Title"
      :width="200"
      content="this is content, this is content, this is content"
    >
      <template #reference>
        <el-button>Hover to activate</el-button>
      </template>
    </el-popover>
    <el-table-column
      v-for="tableHead in tableHeadList"
      :key="tableHead.label"
      :prop="tableHead.prop"
      :label="tableHead.label"
      :width="tableHead.width"
    />
  </el-table>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';

  import {tableHeadList} from "./setting"

  const visible = ref(false);
  
  const tableData = [
    {
      date: '2016-05-03',
      name: 'Tom',
      address: 'No. 189, Grove St, Los Angeles',
    },
    {
      date: '2016-05-02',
      name: 'Tom',
      address: 'No. 189, Grove St, Los Angeles',
    },
    {
      date: '2016-05-04',
      name: 'Tom',
      address: 'No. 189, Grove St, Los Angeles',
    },
    {
      date: '2016-05-01',
      name: 'Tom',
      address: 'No. 189, Grove St, Los Angeles',
    },
  ];
  function handleHeadClick(column, event) {
    console.log('column, event', column, event);
    if(column.label === "Date") visible.value = true;
  }
</script>
