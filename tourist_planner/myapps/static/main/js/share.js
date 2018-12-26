

window.onload = function () {
    console.log("kek");
    var shareButtons = document.getElementsByClassName("btn-share");
    console.log(shareButtons);
    for(let i =0; i<shareButtons.length; ++i) {
        shareButtons[i].addEventListener("click", () => {
            console.log("lol");
            console.log(shareButtons[i].dataset.name);
            $.ajax({
            type: "POST",
            contentType: "application/json; charset=utf-8",
            url: "share",
            data: JSON.stringify({name: shareButtons[i].dataset.name}),
            success: function (data) {
             },
                dataType: "json"
        });
            window.location.href=window.location.href
        })
    }

    var subButtons = document.getElementsByClassName("btn-sub");
    console.log(subButtons);
    for(let i =0; i<subButtons.length; ++i) {
        subButtons[i].addEventListener("click", () => {
            console.log("lol");
            console.log(subButtons[i].dataset.name);
            $.ajax({
            type: "POST",
            contentType: "application/json; charset=utf-8",
            url: "sub",
            data: JSON.stringify({name: subButtons[i].dataset.name}),
            success: function (data) {
             },
                dataType: "json"
        });
            window.location.href=window.location.href
        })
    }
};