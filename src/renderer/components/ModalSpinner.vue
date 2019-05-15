<template>
  <div
    id="overlay-spinner"
    style="display: none"
  >

    <div id="loader-spinner">
      <div class="spinner-message"></div>
    </div>
    <!--
    <div id="message">
      <span>{{ message }}</span>
    </div>
    -->

  </div>
</template>

<script>
import bus from '../util/bus'

export default {
  data() {
    return {
      message: null,
    }
  },
  methods: {
    open() {
      $('#overlay-spinner').fadeIn();
      $('#loader-spinner').fadeIn();
    },

    close() {
      setTimeout(() => {
        $('#overlay-spinner').fadeOut();
        $('#loader-spinner').fadeOut();
      }, 400);
    }
  },
  mounted() {
    
    this.$bus.$on('openLoading', (message) => {
  
    if (message) {
        this.message = message;
      } else {
        this.message = "Processando dados ...";
      }

      this.open();
    });

    this.$bus.$on('closeLoading', () => {
      this.close();
    });
  }
}
</script>


<style scoped>
@-webkit-keyframes rotation {
  from {
    -webkit-transform: rotate(0deg);
  }
  to {
    -webkit-transform: rotate(359deg);
  }
}

@-moz-keyframes rotation {
  from {
    -moz-transform: rotate(0deg);
  }
  to {
    -moz-transform: rotate(359deg);
  }
}

@-o-keyframes rotation {
  from {
    -o-transform: rotate(0deg);
  }
  to {
    -o-transform: rotate(359deg);
  }
}

@keyframes rotation {
  from {
    transform: rotate(0deg);
  }
}
.spinner-message {
  height: 40px;
  width: 40px;
  position: absolute;
  top: 30%;
  left: 30%;
  border: 2px solid #fff;
  border-top: 2px solid #967ADC;
  border-radius: 100%;
  -webkit-animation: rotation 0.6s infinite linear;
  -moz-animation: rotation 0.6s infinite linear;
  -o-animation: rotation 0.6s infinite linear;
  animation: rotation 0.6s infinite linear;
  -webkit-animation: load8 .6s infinite linear;
  z-index: 999999 !important;
}

#message {
  position: fixed;
  top: 44.2%;
  left: 45%;
  font-weight: bold;
  z-index: 10000000 !important;
}

#loader-spinner {
  height: 100px;
  width: 100px;
  background-color: #c6c6c6;
  position: fixed;
  top: 35%;
  left: 45%;
  border-radius: 10px;
  z-index: 999999 !important;
}
#overlay-spinner {
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-color: rgba(255, 255, 255, 0.6);
  z-index: 999999 !important;
}

@-webkit-keyframes load8 {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}


</style>

