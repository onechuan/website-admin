<template>
  <div class="login-container">
    <div class="header">一码平川管理系统</div>
    <div class="wrap">
      <form>
        <div class="form-item">
          <label for="email">email: </label>
          <input
            id="email"
            type="email"
            name="email"
            placeholder="Please input your email!"
            required
          />
        </div>
        <div class="form-item">
          <label for="password">password: </label>
          <input
            id="password"
            type="password"
            name="password"
            placeholder="Please input your password!"
            required
          />
        </div>
        <div class="form-item">
          <input class="submit-btn" type="submit" value="提交" />
        </div>
      </form>
    </div>
  </div>
</template>

<script setup></script>

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
    .wrap {
      width: 400px;
      height: 250px;
      border-radius: 10px;
      background-color: rgba(0, 0, 0, 0.3);
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      display: flex;
      justify-content: center;
      align-items: center;
      form {
        display: flex;
        flex-direction: column;
        justify-content: center;
        .form-item {
          display: flex;
          justify-content: flex-end;
          align-items: center;
          padding: 10px 20px;
          label {
            color: #888;
            font-size: 15px;
          }
          input {
            color: #fff;
            padding: 10px;
            width: 200px;
            background-color: transparent;
            border: none;
            border-bottom: 1px solid #888;
            outline: none;
          }
          input:hover{
            border-bottom: 1px solid yellowgreen;
          }
          .submit-btn {
            margin: 0 auto;
            width: 100px;
            height: 40px;
          }
          .submit-btn:hover{
            cursor: pointer;
            color: yellowgreen;
            border-bottom: 1px solid yellowgreen;
          }
        }
      }
    }
  }
</style>
