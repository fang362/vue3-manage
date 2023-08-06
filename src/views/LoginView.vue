<template>
  <div class="onShow">
    <h3 class="titleOne">后台管理系统</h3>
    
      <!-- 姓名 -->
      用户名
      <el-input v-model="input" placeholder="请输入用户名" />
      <!-- 错误提示 -->
     <div class="errContain">
      <div v-show="inputError" class="error-message">
        {{ inputErrorMessage }}
      </div>
     </div>
     
      <!-- 密码 -->
      密码
      <el-input v-model="password" type="password" placeholder="请输入密码" />
      <!-- 错误提示 -->
      <div class="errContain">
        <div v-show="passwordError" class="error-message">
        {{ passwordErrorMessage }}
      </div>
      </div>
     
    
    <!-- 记住密码 -->
    <div class="rem">
      记住密码
      <el-switch v-model="rememberPassword" size="small" />
    </div>
    
      <!-- 验证码 -->
      <Vcode
        :show="isShow"
        :imgs="imgs"
        @success="onSuccess"
        @close="onClose"
      />
      <!-- 登录 -->
      <!-- <router-link to="/home"> -->
      <el-button type="primary" @click="onShow" :disabled="hasError"
        >安全登录</el-button
      >
      <!-- </router-link> -->
    
  </div>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import Vcode from "vue3-puzzle-vcode";
import sheep from "../assets/sheep.jpg";
import router from "@/router";
import Cookies from 'js-cookie';

const imgs = [sheep];
//记住密码开关
const rememberPassword = ref(false);

const isShow = ref(false);

const input = ref("");
const password = ref("");

const inputErrorMessage = ref(true);
const passwordErrorMessage = ref(true);
const inputError = ref(false);
const passwordError = ref(false);


// 监听input变化
watch(input, (newValue) => {
  validateInput(newValue);
});
// 监听password变化
watch(password, (newValue) => {
  validatePassword(newValue);
});
// 校验输入的用户名
const validateInput = (value) => {
  const nameRegExp = /^[\u4e00-\u9fa5]{2,5}$/; // 由2-5个汉字组成
  if (!nameRegExp.test(value)) {
    // 有一个符合就执行以下语句-
    //真，执行下行语句
    //先让快展示，然后展示信息
    inputError.value = true;
    inputErrorMessage.value = "用户名必须由2-5个汉字组成";
  } else {
    inputError.value = false;
    // inputErrorMessage.value=false
    inputErrorMessage.value = false;
  }
};
// 校验输入的密码
const validatePassword = (value) => {
  
  if (value.length >= 8 && value.length <= 16) {
    passwordError.value = false;
    inputErrorMessage.value = false;
  } else {
    passwordError.value = true;
    passwordErrorMessage.value = "密码长度在8-16位之间";
  }
};
// 联合判断是否有错误，禁用登录按钮
//禁用：返回true 只要一个为真即可
//没有错误返回的是假，目的是都为假

const hasError = computed(() => {
  return (
    inputError.value ||
    passwordError.value ||
    input.value === "" || // 添加对输入框的空值判断
    password.value === "" // 添加对密码输入框的空值判断
  );
});

const onShow = () => {
  isShow.value = true;
};
const onClose = () => {
  isShow.value = false;
};

const onSuccess = () => {
  onClose();
  ElMessage({
    message: "登录成功",
    type: "success",
    duration: 1000,
    //可手动关闭
    showClose: true,
  });

  if (rememberPassword.value) {
    const userInfo = { 
    username: input.value,
    password: password.value
  };
  Cookies.set("userInfo", JSON.stringify(userInfo), { expires: 365 });
    alert("输入信息已保存到Cookie");
  } else {
    // 执行取消记住密码的逻辑，例如删除Cookie或LocalStorage
    // ...
    Cookies.remove("userInfo");
  console.log('不存入信息');
  }
  router.push("/home");

  // 验证成功，需要手动关闭模态框
};

  
  
</script>

<style scoped>
.errContain{
  height: 15px;
  width: 100%;
}
.titleOne{
  text-align: center;
  padding-bottom: 20px;
}
.onShow {
  width: 300px;
  margin: 120px auto;
  padding: 40px 120px;
  background-image: url(../assets/bg.png);
  /* background-size:cover; */
  border-radius: 50px;
  background-size: 100% 100%;

}

.el-button,
router-link {
  width: 300px;
  margin-top: 20px;
}
.el-input {
  font-size: 10px;
}
.error-message {
  font-size: 10px;
  color: red;
}
.rem {
  font-size: 14px;
  color: rgb(87, 87, 87);
}

</style>