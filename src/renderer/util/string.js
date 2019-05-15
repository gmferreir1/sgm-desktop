const strLimit = (string, limit) => {
  if (string) {
    if (string.length > limit) {
      return string.substring(0, limit) + "...";
    }
    return string;
  }

  return null;
};

const moneyFormat = (number, useSymbol) => {
  if (!number) {
    number = 0;
  }
  if (useSymbol) {
    return window.numeral(number).format("$0,0.00");
  }
  return window.numeral(number).format("0,0.00");
};

const wordUpper = text => {
  if (!text) return;
  let words = text.toLowerCase().split(" ");
  for (let a = 0; a < words.length; a++) {
    let w = words[a];
    if (w[0] !== "d" || w.slice(1) !== "e") {
      words[a] = !w[0] ? w[0] : w[0].toUpperCase() + w.slice(1);
    }
  }
  return words.join(" ");
};

const onlyNumber = text => {
  return !text ? "" : text.replace(/[^0-9]/g, "");
};

/**
 * Mascara telefone string
 * @param {*} v
 */
const maskPhone = phone => {
  phone = phone.replace(/\D/g, "");
  phone = phone.replace(/^(\d{2})(\d)/g, "($1) $2");
  phone = phone.replace(/(\d)(\d{4})$/, "$1-$2");
  return phone;
};

const nl2br = (str, is_xhtml) => {
  var breakTag =
    is_xhtml || typeof is_xhtml === "undefined" ? "<br " + "/>" : "<br>";
  return (str + "").replace(
    /([^>\r\n]?)(\r\n|\n\r|\r|\n)/g,
    "$1" + breakTag + "$2"
  );
};

const toUpperCase = (data, exclude = []) => {
  if (typeof data === "object") {
    if (exclude.length) {
      const props = Object.keys(data);
      props.map(key =>
        typeof data[key] === "string"
          ? (data[key] = exclude.includes(key)
              ? data[key]
              : data[key].toUpperCase())
          : data[key]
      );
    } else {
      const props = Object.keys(data);
      props.map(key =>
        typeof data[key] === "string"
          ? (data[key] = data[key].toUpperCase())
          : data[key]
      );
    }
  }

  return data;
};

export {
  strLimit,
  moneyFormat,
  wordUpper,
  onlyNumber,
  maskPhone,
  nl2br,
  toUpperCase
};
