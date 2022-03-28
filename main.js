//tạo object Validator
function Validator(options) {
  var formElement = document.querySelector(options.form);

  function validate(inputElement, rule) {
    var errorElement = inputElement.parentElement.querySelector(
      options.errorSelector
    );
    var errorMessage = rule.test(inputElement.value);
    if (errorMessage) {
      errorElement.innerText = errorMessage;
      inputElement.parentElement.classList.add("invalid");
    } else {
      errorElement.innerText = "";
      inputElement.parentElement.classList.remove("invalid");
    }
  }
  if (formElement) {
    // Lặp qua từng rules và validate
    options.rules.forEach(function (rule) {
      var inputElement = formElement.querySelector(rule.selector);

      if (inputElement) {
        // Xử lí trường hợp blur ra khỏi input
        inputElement.onblur = function () {
          validate(inputElement, rule);
          // Xử lí
          inputElement.oninput = function () {
            var errorElement = inputElement.parentElement.querySelector(
              options.errorSelector
            );
            errorElement.innerText = errorMessage;
            inputElement.parentElement.classList.add("invalid");
          };
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
    test: function (value) {
      var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      return regex.test(value) ? undefined : "Dòng này phải là email";
    },
  };
};
