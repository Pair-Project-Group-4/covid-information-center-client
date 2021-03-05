const baseURL = "http://localhost:3000";

$(() => {
  checkLocalStorage();
  $("#to-login").on("click", (e) => {
    e.preventDefault();
    $("#login-page").show();
    $("#signup-page").hide();
  });
  $("#to-signup").on("click", (e) => {
    e.preventDefault();
    $("#signup-page").show();
    $("#login-page").hide();
  });
  $("#btn-submit-signup").on("click", () => {
    signup();
  });
  $("#btn-submit-login").on("click", () => {
    login();
  });
});

function signup() {
  const name = $("#name-signup").val();
  const email = $("#email-signup").val();
  const password = $("#password-signup").val();
  $.ajax({
    url: baseURL + "/register",
    method: "POST",
    data: {
      name,
      email,
      password,
    },
  })
    .done((response) => {
      console.log(response);
    })
    .fail((error) => {
      console.log(error);
    })
    .always(() => {
      $("#name-signup").val("");
      $("#email-signup").val("");
      $("#password-signup").val("");
    });
}

function login() {
  const email = $("#email-login").val();
  const password = $("#password-login").val();
  $.ajax({
    url: baseURL + "/login",
    method: "POST",
    data: {
      email,
      password,
    },
  })
    .done((response) => {
      console.log(response);
      localStorage.setItem("token", response.token);
      checkLocalStorage();
    })
    .fail((error) => {
      console.log(error);
    })
    .always(() => {
      $("#email-login").val("");
      $("#password-login").val("");
    });
}

function checkLocalStorage() {
  $("section").hide();
  $("nav").hide();
  if (localStorage.token) {
    $("#home-page").show();
    $("#navbar").show();
  } else {
    $("#login-page").show();
  }
}
