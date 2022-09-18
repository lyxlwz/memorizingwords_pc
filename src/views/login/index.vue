<template>
  <div class="login-container">
    <div class="flex form-wrapper">
      <div class="center">
        <div class="form-container">
          <div class="item-wrapper">
            <el-input
              v-model="password"
              placeholder="请输入密码"
              type="password"
              clearable
              prefix-icon="el-icon-lock"
              @keyup.enter.native="enterClick"
            />
          </div>
          <div class="flex-sub"></div>
          <div class="margin-top-lg">
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
export default {
  name: 'Login',
  data() {
    return {
      password: '1234567',
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
        }
      })
        .then((res) => {
          console.log(res, '==res')
          // this.$store
          //   .dispatch('user/saveUserInfo', res.data)
          //   .then((_) => {
          //     this.$router.push({ path: this.redirect || '/index/main' })
          //   })
          //   .catch((error) => {
          //     this.$errorMsg(error.message || '登录失败，未知异常')
          //   })
        })
        .catch((error) => {
          this.$errorMsg(error.message || '登录失败，未知异常')
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
  .form-wrapper {
    position: absolute;
    top: 18.5%;
    left: 0;
    right: 0;
    bottom: 15.8%;
    @media screen and (max-width: 768px) {
      .center {
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        .title {
          display: block;
          text-align: center;
          font-size: 20px;
          font-weight: bold;
          color: #34495e;
          text-shadow: 0 0 0.2em #41b883, -0 -0 0.2em #41b883;
        }
        .form-container {
          width: 80%;
          min-height: 60%;
          text-align: center;
          background: rgba(183, 183, 183, 0.2);
          padding: 5%;
          border-radius: 5px;
          border: 2px solid #fff;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          .login {
            width: 100%;
          }
        }
      }
    }
    @media screen and (min-width: 768px) and (max-width: 992px) {
      .left {
        display: none;
      }
      .right {
        display: flex;
        width: 100%;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
        .my-width {
          width: 48%;
        }
        .title {
          display: block;
          text-align: center;
          font-size: 20px;
          font-weight: bold;
          color: #5497ff;
        }
        .form-container {
          width: 50%;
          height: 60%;
          margin-bottom: 10%;
          text-align: center;
          background: rgba(183, 183, 183, 0.2);
          padding: 5%;
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
          }
        }
      }
    }
    @media screen and (min-width: 992px) {
      .left {
        display: block;
        flex: 1;
      }
      .right {
        margin-left: 10%;
        flex: 1;
        display: flex;
        justify-content: center;
        flex-direction: column;
        .my-width {
          width: 48%;
        }
        .title {
          display: block;
          font-size: 24px;
          font-weight: bold;
          color: #5497ff;
        }
        .item-wrapper {
          width: 48%;
        }
        .login {
          width: 48%;
        }
      }
    }
  }
}
</style>
