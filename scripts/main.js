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
  $("#logout").on("click", (e) => {
    e.preventDefault();
    signOut();
  });
  $("#country").on("click", () => {
    $("#country-data").show();
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

function onSignIn(googleUser) {
  $.ajax({
    method: "post",
    url: "http://localhost:3000/loginGoogle",
    data: {
      token: googleUser.getAuthResponse().id_token,
    },
  })
    .done((response) => {
      localStorage.setItem("token", response.token);
      checkLocalStorage();
    })
    .fail((err) => {
      console.log(err);
    });
}

function signOut() {
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    console.log("User signed out.");
  });
  localStorage.removeItem("token");
  checkLocalStorage();
}

function checkLocalStorage() {
  $("section").hide();
  if (localStorage.token) {
    getDataCovid();
    $("#header").show();
    $("#banner").show();
    $("#international-data").show();
    $("#news").show();
  } else {
    $("#login-page").show();
  }
}

function getDataCovid() {
  $.ajax({
    url: baseURL + "/data",
    method: "GET",
  })
    .done((response) => {
      response.forEach((el) => {
        $("#data-covid").append(`
        <tr>
          <td><button id="country" onclick="getDataCountry('${el.country}','${el.cases}','${el.deaths}','${el.todayCases}','${el.casesPerOneMillion}')">${el.country}</button></td>
          <td>${el.cases}</td>
          <td>${el.todayCases}</td>
          <td>${el.casesPerOneMillion}</td>
          <td>${el.deaths}</td>
        <tr>
        `);
      });
    })
    .fail((err) => {
      console.log(err);
    });
}
function getDataCountry(
  countryName,
  totalCase,
  deaths,
  todayCases,
  casesPerOneMillion
) {
  $("#country-name").text(`${countryName}`);
  $("#total-case").text(`${totalCase}`);
  $("#deaths").text(`${deaths}`);
  $("#casesPer-one-million").text(`${casesPerOneMillion}`);
  $("#today-cases").text(`${todayCases}`);
}
