function loginButton(logined) {
  if (logined) {
    window.location.href = "http://localhost:3000/logout";
  } else {
    window.location.href = "http://localhost:3000/login";
  }
}

function myInfoButton(loggedIn) {
  if (loggedIn) {
    window.location.href = "http://localhost:3000/myinfo";
  } else {
    alert("계정정보를 보시려면 로그인을 해주세요.");
  }
}

function postData(fields) {
  method = "post";
  var form = document.createElement("form");
  form.setAttribute("method", method);
  form.setAttribute("action", "");

  for (var i = 0; i < fields.length; i++) {
    form.appendChild(fields[i]);
  }

  document.body.appendChild(form);
  form.submit();
}

function makeHiddenField(name, value) {
  var hiddenField = document.createElement("input");
  hiddenField.setAttribute("type", "hidden");
  hiddenField.setAttribute("name", name);
  hiddenField.setAttribute("value", value);

  return hiddenField;
}
