<template>
  <div class="login-container">
    <div class="header">一码平川管理系统</div>
    <div class="form-wrap">
      <h2 class="title">登录</h2>
      <el-form
        ref="userFormRef"
        :model="userForm"
        :rules="userRules"
        label-width="20px"
      >
        <el-form-item label="email" prop="email">
          <el-input v-model="userForm.email" />
        </el-form-item>
        <el-form-item label="password" prop="password">
          <el-input
            v-model="userForm.password"
            type="password"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSubmit(userFormRef)"
            >Login In</el-button
          >
          <el-button @click="handleReset(userFormRef)">Reset</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { reactive, ref } from 'vue';
  import { ElMessage, FormInstance, FormRules } from 'element-plus';
  import useLoading from '@/hooks/useLoading';
  import { useUserStore } from '@/store';
  import { useRouter } from 'vue-router';

  const { setLoading } = useLoading();
  const userStore = useUserStore();
  const router = useRouter();

  const userFormRef = ref<FormInstance>();

  const userForm = reactive({
    email: '',
    password: '',
  });
  const userRules = reactive<FormRules>({
    email: [
      { required: true, message: 'Please Input Your Email.', trigger: 'blur' },
      { min: 8, max: 30, message: 'Length should be 8 to 30', trigger: 'blur' },
    ],
    password: [
      {
        required: true,
        message: 'Please Input Your Password.',
        trigger: 'blur',
      },
      { min: 8, max: 30, message: 'Length should be 6 to 30', trigger: 'blur' },
    ],
  });

  async function handleSubmit(formEl: FormInstance | undefined) {
    if (!formEl) return;
    const isValidated = await formEl.validate((valid) => valid);
    if (!isValidated) {
      ElMessage.error('email or password is invalid');
      return;
    }
    setLoading(true);
    try {
      await userStore.login(userForm);
      console.log('Ssssss');

      const { redirect, ...othersQuery } = router.currentRoute.value.query;
      console.log('ssss', redirect, othersQuery);

      router.push({
        name: (redirect as string) || 'Workplace',
        query: {
          ...othersQuery,
        },
      });
      ElMessage.success('login is success!');
    } catch (err) {
      ElMessage.error(err.msg || 'login is faild');
    } finally {
      setLoading(false);
    }
  }

  function handleReset(formEl: FormInstance | undefined) {
    if (!formEl) return;
    formEl.resetFields();
  }
</script>

<style lang="scss" scoped>
  .login-container {
    width: 100vw;
    height: 100vh;
    background-image: url('@/assets/css/login-bg.png');
    background-size: 100% 100%;
    background-position: center;
    background-repeat: no-repeat;
    position: relative;
    .header {
      position: fixed;
      z-index: 2;
      background-color: rgba(255, 255, 255, 0.3);
      height: 60px;
      width: 100%;
      color: #fff;
      padding: 20px;
      box-sizing: border-box;
    }
    .form-wrap {
      width: 400px;
      height: 250px;
      border-radius: 10px;
      background-color: rgba(0, 0, 0, 0.3);
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-direction: column;
      .title {
        color: #fff;
        padding: 20px 0;
      }
      .el-form {
        .el-form-item {
          width: 250px;
          .el-button {
            flex: 1;
          }
        }
      }
    }
  }
</style>
