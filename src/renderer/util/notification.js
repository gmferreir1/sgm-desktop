const toastr = require("toastr");
require("../../../node_modules/toastr/build/toastr.min.css");

toastr.options.closeButton = true;
toastr.options.progressBar = true;
toastr.options.closeHtml = '<button><i class="icon-off"></i></button>';
toastr.options.positionClass = "toast-bottom-right";

const notification = {
  success: function(message) {
    if (!message) {
      message = "Operação realizada !";
    }
    toastr.success(message, { timeOut: 2000 });
  },

  error: function(message, width = null, position = null) {
    if (position === "full_top") {
      width = null;
      toastr.options.positionClass = "toast-top-full-width";
    }

    if (!message) {
      message = "Erro ao realizar operação !";
    }
    if (width == null) {
      toastr.error(message, { timeOut: 5000 });
    } else {
      toastr.error(message, { timeOut: 5000 }).css("width", width);
    }
  },

  warning: function(message, width = null) {
    if (!message) {
      message = "Operação invalida !";
    }
    if (width == null) {
      toastr.warning(message, { timeOut: 5000 });
    } else {
      toastr.warning(message, { timeOut: 5000 }).css("width", width);
    }
  }
};

module.exports = notification;
