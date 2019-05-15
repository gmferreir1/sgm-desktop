<template>
  <div>
    <div class="limiter">
      <div class="container-login100">
        <div class="wrap-login100">
          <div class="login100-pic js-tilt" data-tilt>
            <img :src="images.login" alt="IMG">
          </div>

          <!-- form login -->
          <form class="login100-form validate-form">
            <span class="login100-form-title">DADOS PARA LOGIN</span>

            <div class="wrap-input 100 validate-input">
              <input
                class="input100"
                type="text"
                placeholder="Usuário"
                v-model="form.login"
                autocomplete="off"
              >
              <span class="focus-input100"></span>
              <span class="symbol-input100">
                <i class="fa fa-user" aria-hidden="true"></i>
              </span>
            </div>

            <div class="wrap-input100 validate-input">
              <input
                class="input100"
                type="password"
                name="pass"
                placeholder="Password"
                v-model="form.password"
              >
              <span class="focus-input100"></span>
              <span class="symbol-input100">
                <i class="fa fa-lock" aria-hidden="true"></i>
              </span>
            </div>

            <div class="container-login100-form-btn">
              <!-- loader -->
              <div class="loader" v-if="loading"></div>
              <!-- / loader -->
              <button class="login100-form-btn" v-if="!loading" @click="doLogin">Entrar no Sistema</button>
            </div>

            <div class="row" style="margin-top: 5px" v-if="message_error_login">
              <div class="col-md-12">
                <span class="error">{{ message_error_login }}</span>
              </div>
            </div>
          </form>

          <!-- // form login -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "FormLogin",
  data() {
    return {
      images: {
        login: require("@/assets/images/img-01.png")
      },
      loading: false,
      form: {
        login: "",
        password: ""
      },
      message_error_login: ""
    };
  },
  methods: {
    doLogin() {
      this.loading = true;

      http
        .post("login/authenticate", this.form)
        .then(result => {
          const dataUserToken = {
            token: result.data.token,
            type_token: result.data.type
          };

          localStorage.setItem("dataLogin", JSON.stringify(dataUserToken));

          this.getDataUserLogged();
        })
        .catch(err => {
          this.loading = false;
          if (err.response.status === 401) {
            this.message_error_login = "Usuário e/ou senha inválidos";
          }
          if (err.response.status === 400) {
            this.message_error_login = `Erro: ${err.response.data[0].message}`;
          }
        });
    },
    getDataUserLogged() {
      http
        .get("login/get-data-user")
        .then(result => {
          const dataLocalStorage = JSON.parse(
            localStorage.getItem("dataLogin")
          );

          dataLocalStorage.id = result.data.id;
          dataLocalStorage.name = result.data.name;
          dataLocalStorage.last_name = result.data.last_name;
          dataLocalStorage.admin = result.data.admin;
          dataLocalStorage.login = result.data.login;
          dataLocalStorage.region_id = result.data.region_id;

          localStorage.setItem("dataLogin", JSON.stringify(dataLocalStorage));

          setTimeout(() => {
            this.$router.push({ name: "dashboard" });
          }, 1500);
        })
        .catch(() => {
          this.show_error_login = true;
          this.loading = false;
        });
    }
  },
  watch: {
    "form.login"() {
      this.message_error_login = "";
    },
    "form.password"() {
      this.message_error_login = "";
    }
  }
};
</script>

<style scoped>
@font-face {
  font-family: Poppins-Regular;
  src: url("../../../assets/fonts/poppins/Poppins-Regular.ttf");
}

@font-face {
  font-family: Poppins-Bold;
  src: url("../../../assets/fonts/poppins/Poppins-Bold.ttf");
}

@font-face {
  font-family: Poppins-Medium;
  src: url("../../../assets/fonts/poppins/Poppins-Medium.ttf");
}

@font-face {
  font-family: Montserrat-Bold;
  src: url("../../../assets/fonts/montserrat/Montserrat-Bold.ttf");
}

* {
  margin: 0px;
  padding: 0px;
  box-sizing: border-box;
}

body,
html {
  height: 100%;
  font-family: Poppins-Regular, sans-serif;
}

a {
  font-family: Poppins-Regular;
  font-size: 14px;
  line-height: 1.7;
  color: #666666;
  margin: 0px;
  transition: all 0.4s;
  -webkit-transition: all 0.4s;
  -o-transition: all 0.4s;
  -moz-transition: all 0.4s;
}

a:focus {
  outline: none !important;
}

a:hover {
  text-decoration: none;
  color: #57b846;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  margin: 0px;
}

p {
  font-family: Poppins-Regular;
  font-size: 14px;
  line-height: 1.7;
  color: #666666;
  margin: 0px;
}

ul,
li {
  margin: 0px;
  list-style-type: none;
}

input {
  outline: none;
  border: none;
}

textarea {
  outline: none;
  border: none;
}

textarea:focus,
input:focus {
  border-color: transparent !important;
}

input:focus::-webkit-input-placeholder {
  color: transparent;
}

input:focus:-moz-placeholder {
  color: transparent;
}

input:focus::-moz-placeholder {
  color: transparent;
}

input:focus:-ms-input-placeholder {
  color: transparent;
}

textarea:focus::-webkit-input-placeholder {
  color: transparent;
}

textarea:focus:-moz-placeholder {
  color: transparent;
}

textarea:focus::-moz-placeholder {
  color: transparent;
}

textarea:focus:-ms-input-placeholder {
  color: transparent;
}

input::-webkit-input-placeholder {
  color: #999999;
}

input:-moz-placeholder {
  color: #999999;
}

input::-moz-placeholder {
  color: #999999;
}

input:-ms-input-placeholder {
  color: #999999;
}

textarea::-webkit-input-placeholder {
  color: #999999;
}

textarea:-moz-placeholder {
  color: #999999;
}

textarea::-moz-placeholder {
  color: #999999;
}

textarea:-ms-input-placeholder {
  color: #999999;
}

button {
  outline: none !important;
  border: none;
  background: transparent;
}

button:hover {
  cursor: pointer;
}

iframe {
  border: none !important;
}

.txt1 {
  font-family: Poppins-Regular;
  font-size: 13px;
  line-height: 1.5;
  color: #999999;
}

.txt2 {
  font-family: Poppins-Regular;
  font-size: 13px;
  line-height: 1.5;
  color: #666666;
}

.limiter {
  width: 100%;
  margin: 0 auto;
}

.container-login100 {
  position: relative;
  width: 100%;
  min-height: 100vh;
  display: -webkit-box;
  display: -webkit-flex;
  display: -moz-box;
  display: -ms-flexbox;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
}

.wrap-login100 {
  width: 960px;
  background: #fff;
  border-radius: 10px;
  overflow: hidden;
  display: -webkit-box;
  display: -webkit-flex;
  display: -moz-box;
  display: -ms-flexbox;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 150px 100px 150px 95px;
}

.login100-pic {
  width: 316px;
}

.login100-pic img {
  max-width: 100%;
}

.login100-form {
  width: 290px;
}

.login100-form-title {
  font-family: Poppins-Bold;
  font-size: 24px;
  color: #333333;
  line-height: 1.2;
  text-align: center;

  width: 100%;
  display: block;
  padding-bottom: 34px;
}

.wrap-input100 {
  position: relative;
  width: 100%;
  z-index: 1;
  margin-bottom: 10px;
  padding-top: 10px;
}

.input100 {
  font-family: Poppins-Medium;
  font-size: 15px;
  line-height: 1.5;
  color: #666666;

  display: block;
  width: 100%;
  background: #e6e6e6;
  height: 50px;
  border-radius: 5px;
  padding: 0 30px 0 68px;
}

.focus-input100 {
  display: block;
  position: absolute;
  border-radius: 5px;
  bottom: 0;
  left: 0;
  z-index: -1;
  width: 100%;
  height: 100%;
  box-shadow: 0px 0px 0px 0px;
  color: rgba(87, 184, 70, 0.8);
}

.input100:focus + .focus-input100 {
  -webkit-animation: anim-shadow 0.5s ease-in-out forwards;
  animation: anim-shadow 0.5s ease-in-out forwards;
}

@-webkit-keyframes anim-shadow {
  to {
    box-shadow: 0px 0px 70px 25px;
    opacity: 0;
  }
}

@keyframes anim-shadow {
  to {
    box-shadow: 0px 0px 70px 25px;
    opacity: 0;
  }
}

.symbol-input100 {
  font-size: 15px;
  display: -webkit-box;
  display: -webkit-flex;
  display: -moz-box;
  display: -ms-flexbox;
  display: flex;
  align-items: center;
  position: absolute;
  border-radius: 25px;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding-left: 35px;
  pointer-events: none;
  color: #666666;
  -webkit-transition: all 0.4s;
  -o-transition: all 0.4s;
  -moz-transition: all 0.4s;
  transition: all 0.4s;
}

.input100:focus + .focus-input100 + .symbol-input100 {
  color: #40364d;
  padding-left: 28px;
}

.container-login100-form-btn {
  width: 100%;
  display: -webkit-box;
  display: -webkit-flex;
  display: -moz-box;
  display: -ms-flexbox;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding-top: 10px;
}

.login100-form-btn {
  font-family: Montserrat-Bold;
  font-size: 15px;
  line-height: 1.5;
  color: #fff;
  text-transform: uppercase;
  width: 100%;
  height: 50px;
  border-radius: 5px;
  background: #40364d;
  display: -webkit-box;
  display: -webkit-flex;
  display: -moz-box;
  display: -ms-flexbox;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 25px;
  -webkit-transition: all 0.4s;
  -o-transition: all 0.4s;
  -moz-transition: all 0.4s;
  transition: all 0.4s;
}

.login100-form-btn:hover {
  background: #333333;
}

@media (max-width: 992px) {
  .wrap-login100 {
    padding: 177px 90px 33px 85px;
  }

  .login100-pic {
    width: 35%;
  }

  .login100-form {
    width: 50%;
  }
}

@media (max-width: 768px) {
  .wrap-login100 {
    padding: 100px 80px 33px 80px;
  }

  .login100-pic {
    display: none;
  }

  .login100-form {
    width: 100%;
  }
}

@media (max-width: 576px) {
  .wrap-login100 {
    padding: 100px 15px 33px 15px;
  }
}

.validate-input {
  position: relative;
}

.alert-validate::before {
  content: attr(data-validate);
  position: absolute;
  max-width: 70%;
  background-color: white;
  border: 1px solid #c80000;
  border-radius: 13px;
  padding: 4px 25px 4px 10px;
  top: 50%;
  -webkit-transform: translateY(-50%);
  -moz-transform: translateY(-50%);
  -ms-transform: translateY(-50%);
  -o-transform: translateY(-50%);
  transform: translateY(-50%);
  right: 8px;
  pointer-events: none;
  font-family: Poppins-Medium;
  color: #c80000;
  font-size: 13px;
  line-height: 1.4;
  text-align: left;
  visibility: hidden;
  opacity: 0;
  -webkit-transition: opacity 0.4s;
  -o-transition: opacity 0.4s;
  -moz-transition: opacity 0.4s;
  transition: opacity 0.4s;
}

.alert-validate::after {
  content: "\f06a";
  font-family: FontAwesome;
  display: block;
  position: absolute;
  color: #c80000;
  font-size: 15px;
  top: 50%;
  -webkit-transform: translateY(-50%);
  -moz-transform: translateY(-50%);
  -ms-transform: translateY(-50%);
  -o-transform: translateY(-50%);
  transform: translateY(-50%);
  right: 13px;
}

.alert-validate:hover:before {
  visibility: visible;
  opacity: 1;
}

@media (max-width: 992px) {
  .alert-validate::before {
    visibility: visible;
    opacity: 1;
  }
}
</style>
