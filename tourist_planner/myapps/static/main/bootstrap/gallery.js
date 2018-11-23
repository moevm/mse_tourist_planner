const GalerryContainer = document.getElementById('list');



function parse_galery(id, picture) {
    let answer = `
            <div class="w3-card-4 w3-margin-bottom w3-margin-top col-lg-10">
                <header class="w3-container w3-red">
                    <h3>${picture.title}</h3>
                </header>
                <div class="row">
                <div class="col-lg-8">
                    <img class="responsive image" src="${picture.image}" alt="/">
                </div>
                <div class="col-lg-4">
                <div class="w3-container w3-padding">
                    <div class="w3-threequarter">
                        <ul style="font-size:1.3em;">
                            <li>Название: <strong>${picture.title}</strong></li>
                            <li>Автор: <strong>${picture.author}</strong></li>
                            <li>Дата написание: <strong>${picture.publication_date}</strong></li>
                            <li>Описание: <strong>${picture.description}</strong></li>
                            <li>Цена: <strong>${picture.price}"$"</strong></li>
                            <li>Минимальная ставка: <strong>${picture.min_step}"$"</strong></li>
                            <li>Максимальная ставка: <strong>${picture.max_step}"$"</strong></li>
                        </ul>
                    </div>
                </div>
                </div>
                </div>
                <footer class="w3-red w3-padding">
                    <button class="w3-btn w3-ripple w3-blue w3-border w3-margin"
                     onclick="document.getElementById('modal${id}').style.display='block'">Изменить картину</button>
                     <button class="w3-button w3-black deleteButton" id="${id}">Удалить</button>
                        <lable>Аукцион</lable>
                        <label class="switch">`;
                        if(picture.auction === true)
                           answer += `
                        <input class="auction" type="checkbox" checked id="auct${id}">
                        <span class="slider round"></span>
                        </label>`;
                        else
                            answer += `
                        <input class="auction" type="checkbox" id="auct${id}">
                        <span class="slider round"></span>
                        </label>`;
                answer +=`
                </footer>
                <div class="w3-modal" id="modal${id}">
                    <div class="w3-modal-content">
                    <div class="w3-container">
                        <span onclick="document.getElementById('modal${id}').style.display='none'"
                        class = 'w3-button w3-display-topright w3-red'>X</span>
                        <form method="POST" action="/gallery/${id}">
                            <p>
                            <label>Название</label>
                            <input class="w3-input" name ="title" type="text" required value="${picture.title}">
                            </p>
                            <p>
                            <label>Автор</label>
                            <input class="w3-input" name = "author" type="text" required value="${picture.author}">
                            </p>
                             <p>
                            <label>Дата написания</label>
                            <input class="w3-input" name = "publication_date" type="date" required value="${picture.publication_date}">
                            </p>
                            <label>Описание</label>
                            <textarea class="w3-input" name = "description" required>${picture.description}</textarea>
                            </p>
                            <label>Изображение</label>
                            <input class="w3-input" name = "image" type="text" required value="${picture.image}">
                            </p>
                            <label>Цена</label>
                            <input class="w3-input" name = "price" type="integer" required value="${picture.price}">
                            </p>
                            <label>Минимальный шаг</label>
                            <input class="w3-input" name = "min_step" type="integer" required value="${picture.min_step}">
                            </p>
                            <label>Максимальный шаг</label>
                            <input class="w3-input" name = "max_step" type="integer" required value="${picture.max_step}">
                            </p>
                            <p>
                            <input class="w3-btn w3-ripple w3-blue w3-border w3-margin" type="submit" value="Изменить">
                            </p>
                        </form>
                        </div>
                    </div>
                </div>
            </div>
    `;
                return answer;
}

function restruct_container(gallery) {
    let GalleryHtml = '';
    for (let id in gallery) {
        GalleryHtml += parse_galery(id, gallery[id]);
    }
    GalerryContainer.innerHTML = GalleryHtml;
}

$(document).on("click", "input.auction", function () {
    let id = $(this).attr("id");
    id = id.substr(4,id.length);
    console.log(id);
    $.ajax({
        url:'gallery/?id=' + id,
        type: 'PUT',
        success: function () {
            location.reload();
        },
        error: (e) => {
            console.log('Error: ' + e);
        }
    });

});

$(document).on("click", "button.deleteButton", function () {
    console.log("delete");
    let id = $(this).attr("id");
    console.log(id);
    $.ajax({
        url:'gallery/?id=' + id,
        type: 'DELETE',
        success: function () {
            location.reload();
        },
        error: (e) => {
            console.log('Error: ' + e);
            location.reload();
        }
    });

});

$("#AddBtn").click(function () {
    $("#AddPictureModal").css('display','block');
});

window.onload = function() {
    $.getJSON('gallery/all',{}, function (j) {
        console.log(j);
        restruct_container(j);
    })
};