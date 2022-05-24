<template>
  <div class="header">
    <Breadcrumb :breadcrumbs="breadcrumbs" />
  </div>
  <div class="main">
    <CardBox>
      <template #main>
        <el-form
          ref="userFormRef"
          :model="userForm"
          :rules="userFormRules"
          label-width="80px"
        >
          <el-form-item prop="avatar" label="头像" required>
            <el-upload
              class="avatar-uploader"
              action="http://127.0.0.1:3001/api/v1/upload/single/"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="imageUrl" :src="imageUrl" class="avatar" />
              <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
            </el-upload>
          </el-form-item>
          <el-form-item label="用户名" prop="userName" required>
            <el-input :model="userForm.userName" />
          </el-form-item>
          <el-form-item label="出生日期" required>
            <el-form-item prop="birth">
              <el-date-picker
                v-model="userForm.birth"
                type="date"
                label="Pick a date"
                placeholder="Pick a date"
                style="width: 100%"
              />
            </el-form-item>
          </el-form-item>
          <el-form-item label="角色" prop="role">
            <el-radio-group v-model="userForm.role">
              <el-radio :label="0">普通用户</el-radio>
              <el-radio :label="1">管理员</el-radio>
              <el-radio :label="2">超级管理员</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="邮箱" prop="email" required>
            <el-input :model="userForm.email" />
          </el-form-item>
          <el-form-item label="密码" prop="password" required>
            <el-input :model="userForm.password" />
          </el-form-item>
          <el-form-item label="确认密码" prop="rePassword" required>
            <el-input :model="userForm.rePassword" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">确定</el-button>
            <el-button>重置</el-button>
          </el-form-item>
        </el-form>
      </template>
    </CardBox>
  </div>
</template>

<script lang="ts" setup>
  import { reactive, ref } from 'vue';
  import Breadcrumb from '@/components/breadcrumb/index.vue';
  import CardBox from '@/components/card-box/index.vue';

  import { ElMessage } from 'element-plus';
  import { Plus } from '@element-plus/icons-vue';

  import type { UploadProps, FormInstance, FormRules } from 'element-plus';

  const breadcrumbs = [
    { name: '用户管理', path: '' },
    { name: '新增用户', path: '/user/add' },
  ];

  const userForm = reactive({
    avatar: '',
    userName: '',
    birth: '',
    role: 0,
    email: '',
    password: '',
    rePassword: '',
  });

  const userFormRef = ref<FormInstance>();
  const userFormRules = reactive<FormRules>({
    avatar: [
      {
        required: true,
        message: 'Please upload your avatar',
        trigger: 'blur',
      },
    ],
    userName: [
      {
        required: true,
        message: 'Please input Activity name',
        trigger: 'blur',
      },
      { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' },
    ],
    birth: [
      {
        required: true,
        message: 'Please input your birth...',
        trigger: 'blur',
      },
    ],
    email: [
      {
        required: true,
        message: 'Please input Activity name',
        trigger: 'blur',
      },
      { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' },
    ],
    password: [
      {
        required: true,
        message: 'Please input Activity name',
        trigger: 'blur',
      },
      { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' },
    ],
    rePassword: [
      {
        required: true,
        message: 'Please input Activity name',
        trigger: 'blur',
      },
      { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' },
    ],
  });

  const onSubmit = () => {
    console.log('submit!');
  };

  const imageUrl = ref('');

  const handleAvatarSuccess: UploadProps['onSuccess'] = (
    response,
    uploadFile
  ) => {
    userForm.avatar = response.data.fileUrl;
    
    imageUrl.value = URL.createObjectURL(uploadFile.raw!);
  };

  const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
    if (rawFile.type !== 'image/jpeg') {
      ElMessage.error('Avatar picture must be JPG format!');
      return false;
    }
    if (rawFile.size / 1024 / 1024 > 2) {
      ElMessage.error('Avatar picture size can not exceed 2MB!');
      return false;
    }
    return true;
  };
</script>

<style lang="scss" scoped>
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .main {
    margin-top: 20px;
    .el-form {
      padding-top: 20px;
      width: 400px;
    }
  }
  .avatar-uploader .avatar {
    width: 100px;
    height: 100px;
    display: block;
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #ccc;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .el-icon.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 100px;
    height: 100px;
    text-align: center;
    border: 1px dashed #ccc;
  }
  .el-icon.avatar-uploader-icon:hover {
    color: #8c939d;
    border: 1px dashed blue;
  }
</style>
