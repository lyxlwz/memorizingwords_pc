<template>
  <div class="login-container">
    <div class="flex form-wrapper">
      <div class="center">
        <div class="form-container">
          <div class="bg">
            <div class="text-bold login-title">登录</div>
            <div class="bg-title">在下面输入你的密钥</div>
          </div>
          <div class="item-wrapper margin-top-xl flex align-center justify-center padding-lr-xl">
            <el-input
              v-model="password"
              class="input-pwd"
              placeholder="请输入密码"
              type="password"
              clearable
              prefix-icon="el-icon-lock"
              show-password
              @keyup.enter.native="enterClick"
            />
          </div>
          <div class="margin-top-xl padding-lr-xl">
            <el-button
              type="primary"
              class="login"
              @click="login"
            >
              登录
            </el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Cookies from 'js-cookie'
export default {
  name: 'Login',
  data() {
    return {
      password: '', // 正确密码为123456
      redirect: '',
      defaultTheme: this.$layoutStore.state.theme
    }
  },
  watch: {
    $route: {
      handler: function (route) {
        const query = route.query
        if (query) {
          this.redirect = query.redirect
        }
      },
      immediate: true
    }
  },
  mounted() {
    this.$layoutStore.changeTheme('light')
  },
  destroyed() {
    this.$layoutStore.changeTheme(this.defaultTheme)
  },
  methods: {
    // 回车点击
    enterClick() {
      if (!this.password) {
        this.$errorMsg('请输入密码')
        return
      }
      this.login()
    },
    login() {
      if (!this.password) {
        this.$errorMsg('请输入密码')
        return
      }
      this.$post({
        url: this.$urlPath.login,
        data: {
          key: this.password
        },
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        }
      }).then((res) => {
        Cookies.set('x-token', res)
        this.$store
          .dispatch('user/saveUserInfo', { token: res })
          .then((_) => {
            this.$router.push({ path: this.redirect || '/index/main' })
          })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.login-container {
  overflow: hidden;
  height: 100%;
  width: 100%;
  background: #fff;

  @media screen and (max-width: 768px) {
    .form-wrapper {
      position: absolute;
      top: 0%;
      left: 0;
      right: 0;
      .center {
        width: 100%;
        display: flex;
        flex-direction: column;
        .bg {
          height: 160px;
          background: #3d5cff;
          color: #fff;
          padding: 40px;
          display: flex;
          justify-content: flex-end;
          flex-direction: column;
          font-size: 16px;
          .login-title {
            font-size: 30px;
          }
          &-title {
            font-size: 16px;
            color: #d8d8d8;
            margin-top: 5px;
          }
        }
        .form-container {
          width: 100%;
          min-height: 60%;
          border-radius: 5px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          .item-wrapper {
            width: 100%;
            ::v-deep.el-input__inner {
              height: 50px;
              font-size: 20px;
            }
          }
          .login {
            margin-top: 30px;
            width: 100%;
            background-color: #3d5cff;
            border-radius: 10px;
            height: 50px;
            font-size: 20px;
          }
        }
      }
    }
  }
  @media screen and (min-width: 768px) and (max-width: 992px) {
    .form-wrapper {
      position: absolute;
      top: 18.5%;
      left: 0;
      right: 0;
      bottom: 15.8%;
      .center {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        .bg {
          height: 180px;
          background: #3d5cff;
          color: #fff;
          padding: 40px;
          display: flex;
          justify-content: flex-end;
          flex-direction: column;
          font-size: 20px;
          .login-title {
            font-size: 30px;
          }
          &-title {
            font-size: 16px;
            color: #d8d8d8;
            margin-top: 5px;
          }
        }
        .form-container {
          width: 35%;
          height: 60%;
          margin-bottom: 10%;
          border-radius: 5px;
          border: 2px solid #fff;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          .item-wrapper {
            width: 100%;
          }
          .login {
            width: 100%;
            background-color: #3d5cff;
            border-radius: 10px;
          }
        }
      }
    }
  }
  @media screen and (min-width: 992px) {
    .form-wrapper {
      position: absolute;
      top: 18.5%;
      left: 0;
      right: 0;
      bottom: 15.8%;
      .center {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        .bg {
          height: 180px;
          background: #3d5cff;
          color: #fff;
          padding: 40px;
          display: flex;
          justify-content: flex-end;
          flex-direction: column;
          font-size: 20px;
          .login-title {
            font-size: 30px;
          }
          &-title {
            font-size: 16px;
            color: #d8d8d8;
            margin-top: 5px;
          }
        }
        .form-container {
          width: 24%;
          height: 60%;
          margin-bottom: 10%;
          border-radius: 5px;
          border: 2px solid #fff;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          .item-wrapper {
            width: 100%;
          }
          .login {
            width: 100%;
            background-color: #3d5cff;
            border-radius: 10px;
          }
        }
      }
    }
  }
}
</style>
