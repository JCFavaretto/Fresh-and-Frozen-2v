export function minLengthValidation(inputData, minLenght) {
  const { value } = inputData;

  removeClassErrorSuccess(inputData);

  if (value.length >= minLenght) {
    inputData.classList.add("success");
    return true;
  } else {
    inputData.classList.add("error");
    return false;
  }
}

export function emailValidation(inputData) {
  // eslint-disable-next-line no-useless-escape
  const emailValid = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  const { value } = inputData;

  removeClassErrorSuccess(inputData);

  const resultValidation = emailValid.test(value);

  if (resultValidation) {
    inputData.classList.add("success");
    return true;
  } else {
    inputData.classList.add("error");
    return false;
  }
}

export function namesValidation(inputData) {
  const nameVal = /^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/;
  const { value } = inputData;

  removeClassErrorSuccess(inputData);

  const resultValidation = nameVal.test(value);

  if (resultValidation) {
    inputData.classList.add("success");
    return true;
  } else {
    inputData.classList.add("error");
    return false;
  }
}

function removeClassErrorSuccess(inputData) {
  inputData.classList.remove("success");
  inputData.classList.remove("error");
}
