//tạo object Validator
function Validator(options) {
  // var formElement = document.getElementById(options.form);
  var formElement = document.querySelector(options.form);

  if (formElement) {
    // Lặp qua từng rules và validate
    options.rules.forEach(function (rule) {
      var inputElement = formElement.querySelector(rule.selector);
      var errorElement =
        inputElement.parentElement.querySelector(".form-message");

      if (inputElement) {
        inputElement.onblur = function () {
          var errorMessage = rule.test(inputElement.value);
          console.log(errorMessage);
          if (errorMessage) {
            //em bảo nó đang bị lỗi ở dòng này nè a
            //nó đang bị k innerText ra cái dòng kia ý
            //ờ nhể dị dị
            errorElement.innerText = errorMessage;
            // inputElement.parentElement.classList.add("invalid");
          } else {
            errorElement.innerText = "";
          }
        };
      }
    });
  }
}
//Định nghĩa rules
Validator.isRequired = function (selector) {
  return {
    selector: selector,
    test: function (value) {
      return value.trim() ? undefined : "Vui lòng nhập";
    },
  };
};
Validator.minLength = function (selector, min, message) {
  return {
    selector: selector,
    test: function (value) {
      return value.length >= min
        ? undefined
        : message || `Vui lòng nhập tối thiểu ${min} kí tự`;
    },
  };
};
Validator.isPassword = function (selector) {
  return {
    selector: selector,
    test: function (value) {},
  };
};
Validator.isEmail = function (selector) {
  return {
    selector: selector,
    test: function () {},
  };
};
