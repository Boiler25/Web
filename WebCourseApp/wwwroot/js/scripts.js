function LoadBlogs() {
    GetCurrentUser();
    var myObj, i, x;
    var request = new XMLHttpRequest();
    request.onload = function (ev) {
        var msg = ""
        if (request.status == 401) {
            msg = "Вы не авторизованы";
        } else if (request.status == 200) {
            msg = "";
        } else {
            msg = "Вы не авторизованы";
        }
        document.getElementById("msgLoad").innerHTML = msg;
    };
    request.open("GET", "/api/notes/", false);
    request.send();

    myObj = JSON.parse(request.responseText);
    var x = "";
    for (i in myObj) {
        x += "<div class=\"noteRow\">";
        x += "<h4> " + myObj[i].text + "</h4>";
        x += "<h4> " + myObj[i].id + "</h4>";
        x += "<button type=\"button\" onclick=\"DeleteBlog(\"" + myObj[i].id + "\")\">Удалить</button>";
        x += "</div>";
    };
    document.getElementById("blogsDiv").innerHTML = x;
};
function DeleteBlog(id) {
    var request = new XMLHttpRequest();
    url = "/api/notes/" + id;
    request.open("DELETE", url, false);
    request.send();
    LoadBlogs();
};

function CreateBlog() {
    nText = document.getElementById("inputText").value;
    if (nText != "") {
        var xmlhttp = new XMLHttpRequest();   // new HttpRequest instance
        xmlhttp.onload = function (ev) {
            var msg = ""
            if (xmlhttp.status == 401) {
                msg = "Вы не авторизованы";
            } else if (xmlhttp.status == 200) {
                msg = "";
            } else {
                msg = "Вы не авторизованы";
            }
            document.getElementById("msgCreate").innerHTML = msg;
        }
        xmlhttp.open("POST", "/api/notes/");
        xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xmlhttp.send(JSON.stringify({
            text: nText,
        }));
        LoadBlogs();
    }
};

window.setInterval(LoadBlogs, 5000);

function ParseResponseMsgReg() {
    // Считывание данных с формы
    email = document.getElementById("Email1").value;
    password = document.getElementById("Password1").value;
    passwordConfirm = document.getElementById("PasswordConfirm1").value;
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("POST", "/api/account/Register");

    xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

    xmlhttp.onreadystatechange = function () {
        // Очистка контейнера вывода сообщений
        document.getElementById("msgReg").innerHTML = ""
        var mydiv = document.getElementById('formError1');
        while (mydiv.firstChild) {
            mydiv.removeChild(mydiv.firstChild);
        }
        // Обработка ответа от сервера
        myObj = JSON.parse(this.responseText);
        document.getElementById("msgReg").innerHTML = myObj.message;
        // Вывод сообщений об ошибках
        if (myObj.error.length > 0) {
            for (var i = 0; i < myObj.error.length; i++) {
                var ul = document.getElementsByTagName("ulReg");
                var li = document.createElement("li");
                li.appendChild(document.createTextNode(myObj.error[i]));
                ul[0].appendChild(li);
            }
        }

        // Очистка полей поролей
        document.getElementById("Password1").value = "";
        document.getElementById("PasswordConfirm1").value = "";
    };
    // Запрос на сервер
    xmlhttp.send(JSON.stringify({
        email: email,
        password: password,
        passwordConfirm: passwordConfirm
    }));
    GetCurrentUser();
};
// Обработка клика по кнопке
document.getElementById("btnReg").addEventListener("click", ParseResponseMsgReg);

function ParseResponseMsgLog() {
    // Считывание данных с формы
    email = document.getElementById("Email").value;
    password = document.getElementById("Password").value;
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("POST", "/api/Account/Login");

    xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

    xmlhttp.onreadystatechange = function () {
        // Очистка контейнера вывода сообщений
        document.getElementById("msgLog").innerHTML = ""
        var mydiv = document.getElementById('formError');
        while (mydiv.firstChild) {
            mydiv.removeChild(mydiv.firstChild);
        }
        // Обработка ответа от сервера
        myObj = JSON.parse(this.responseText);
        document.getElementById("msgLog").innerHTML = myObj.message;
        // Вывод сообщений об ошибках
        if (typeof myObj.error !== "undefined" && myObj.error.length > 0) {
            for (var i = 0; i < myObj.error.length; i++) {
                var ul = document.getElementsByTagName("ulLog");
                var li = document.createElement("li");
                li.appendChild(document.createTextNode(myObj.error[i]));
                ul[0].appendChild(li);
            }
        }
        document.getElementById("Password2").value = "";
    };
    // Запрос на сервер
    xmlhttp.send(JSON.stringify({
        email: email,
        password: password
    }));
    var msg = "";
    document.getElementById("msgCreate").innerHTML = msg;
    document.getElementById("msgLoad").innerHTML = msg;
    GetCurrentUser();
};
document.getElementById("btnLog").addEventListener("click", ParseResponseMsgReg);

function LogOut() {
    // Считывание данных с формы
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("POST", "/api/Account/LogOff");

    xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xmlhttp.send();
    GetCurrentUser();
    document.getElementById("blogsDiv").innerHTML = "";
};
// Обработка клика по кнопке
//document.getElementById("btnLog").addEventListener("click", ParseResponseMsgLog);

function GetCurrentUser() {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("POST", "/api/Account/isAuthenticated", true);
    xmlhttp.onreadystatechange = function () {
        var myObj = "";
        myObj = xmlhttp.responseText != "" ? JSON.parse(xmlhttp.responseText) :
            {};
        document.getElementById("msgAuth").innerHTML = myObj.message;
    }
    xmlhttp.send();
};