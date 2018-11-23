const UserContainer = document.getElementById('list');



function parse_user(id, user) {
    if(user.place)
        return `
            <div class="w3-card-4 w3-margin-bottom w3-margin-top">
                <header class="w3-container w3-red">
                    <h3>${user.name}</h3>
                </header>
                <div class="w3-container w3-padding">
                    <div class="w3-threequarter">
                        <ul style="font-size:1.3em;">
                            <li>Логин: <strong>${user.login}</strong></li>
                            <li>Деньги: <strong>${user.money}"$"</strong></li>
                            <div class="hide">
                            <h5 id = "${id}lat">${user.place[0]}</h5>
                            <h5 id = "${id}lng">${user.place[1]}</h5>
                            </div>
                        </ul>
                    </div>
                </div>
                <footer class="w3-red w3-padding">
                    <button class="w3-btn w3-ripple w3-green w3-border w3-margin"
                     onclick="document.getElementById('modal${id}').style.display='block'">Изменить пользователя</button>
                     <button class="w3-button w3-black deleteButton" id="del${id}">Удалить</button>
                </footer>
                <div class="w3-modal" id="modal${id}">
                    <div class="w3-modal-content">
                    <div class="w3-container">
                        <span onclick="document.getElementById('modal${id}').style.display='none'"
                        class = 'w3-button w3-display-topright w3-red'>X</span>
                        <form method="post" action="/users/${id}">
                            <p>
                            <label>Имя</label>
                            <input class="w3-input" name ="name" type="text" required value="${user.name}">
                            </p>
                            <p>
                            <label>Логин</label>
                            <input class="w3-input" name = "login" type="email" required value="${user.login}">
                            </p>
                             <p>
                            <label>Деньги</label>
                            <input class="w3-input" name = "money" type="text" required value="${user.money}">
                            </p>
                            <div class="hide">
                            <input id = "${id}lat" value="${user.place[0]}" name="lat""></input>
                            <input id = "${id}lng" value="${user.place[1]}" name=""lng"></input>
                            </div>
                            <p>
                                <a class="w3-button w3-blue mapbtn" href="#" id="map${id}">Карта</a>
                            </p>
                            <div id="${id}Map" class="w3-modal">
                                <div class ="w3-modal-content">
                                    <div class="w3-container map-canvas" id = "${id}map">
                                    </div>
                                    <a href="#" class="w3-button w3-blue" id="saveMarker"> Закрыть</a>
                                </div>
                            </div>    
                            <input class="w3-btn w3-ripple w3-blue w3-border w3-margin" type="submit" value="Изменить">
                            </p>
                        </form>
                        </div>
                    </div>
                </div>
            </div>
    `;
    else
        return `
            <div class="w3-card-4 w3-margin-bottom w3-margin-top" xmlns="http://www.w3.org/1999/html">
                <header class="w3-container w3-red">
                    <h3>${user.name}</h3>
                </header>
                <div class="w3-container w3-padding">
                    <div class="w3-threequarter">
                        <ul style="font-size:1.3em;">
                            <li>Логин: <strong>${user.login}</strong></li>
                            <li>Деньги: <strong>${user.money}"$"</strong></li>
                        </ul>
                    </div>
                </div>
                <footer class="w3-red w3-padding">
                    <button class="w3-btn w3-ripple w3-blue w3-border w3-margin"
                     onclick="document.getElementById('modal${id}').style.display='block'">Изменить пользователя</button>
                     <button class="w3-button w3-black deleteButton" id="del${id}">Удалить</button>
                </footer>
               <div class="w3-modal" id="modal${id}">
                    <div class="w3-modal-content">
                    <div class="w3-container">
                        <span onclick="document.getElementById('modal${id}').style.display='none'"
                        class = 'w3-button w3-display-topright w3-red'>X</span>
                        <form method="post" action="/users/${id}">
                            <p>
                            <label>Имя</label>
                            <input class="w3-input" name ="name" type="text" required value="${user.name}">
                            </p>
                            <p>
                            <label>Логин</label>
                            <input class="w3-input" name = "login" type="email" required value="${user.login}">
                            </p>
                             <p>
                            <label>Деньги</label>
                            <input class="w3-input" name = "money" type="integer" required value="${user.money}">
                            </p>
                            <div class="hide">
                            <input id = "${id}lat" value="0" name="lat"></input>
                            <input id = "${id}lng" value="0" name="lng"></input>
                            </div>
                            <p>
                                <a class="w3-button w3-blue mapbtn" href="#" id="map${id}">Карта</a>
                            </p>
                            <div id="${id}Map" class="w3-modal">
                                <div class ="w3-modal-content map">
                                    <div class="w3-container map-canvas" id = "${id}map">
                                    </div>
                                    <a href="#" class="w3-button w3-blue svbtn" id="save${id}"> Закрыть</a>
                                </div>
                            </div>    
                            <input class="w3-btn w3-ripple w3-blue w3-border w3-margin" type="submit" value="Изменить">
                            </p>
                        </form>
                        </div>
                    </div>
                </div>
            </div>
    `;
}

$(document).on("click", "a.svbtn", function () {
   let id = $(this).attr("id");
   id = id.substr(4,id.length);
   console.log(id);
   $("#"+id+"lat").val(mark.getLatLng().lat);
   $("#"+id+"lng").val(mark.getLatLng().lng);
   $("#"+id+"Map").css("display","none");
});

$(document).on("click", "a.mapbtn", function () {
    console.log("click");
    let id = $(this).attr("id");
    id = id.substr(2,id.length);
    $("#"+id+"Map").css("display","block");
    setTimeout(function(){
        initmap(id+"map",[$("#"+id+"lat").val(),$("#"+id+"lng").val()])}, 100);

});


$(document).on("click", "button.deleteButton", function () {
   console.log("delete");
   let id = $(this).attr("id");
   id = id.substr(3,id.length);
   console.log(id);
    $.ajax({
        url:'users/?id=' + id,
        type: 'DELETE',
        success: function () {
            location.reload();
        },
        error: (e) => {
            console.log('Error: ' + e);
        }
    });
});

function restruct_container(users) {
    let UserHtml = '';
    for (let id in users) {
        console.log(id);
        UserHtml += parse_user(id, users[id]);
    }
    UserContainer.innerHTML = UserHtml;
}


$("#AddBtn").click(function () {
    console.log('hui');
    $("#AddUserModal").css('display','block');
});

$("#NextBtn").click(function () {
   $("#divMap").css('display','block');
   setTimeout(function(){
       initnewmap()}, 100);
});

$("#saveMarker").click(function () {
    $("#lat").val(marker.getLatLng().lat);
    console.log($("#lat").val());
    $("#lng").val(marker.getLatLng().lng);
    console.log($("#lng").val());
    $("#divMap").css('display','none');
});

$("#addUser").click(function () {

});

window.onload = function() {
    $.getJSON('users/all',{}, function (j) {
        console.log(j);
        restruct_container(j);
    })
};