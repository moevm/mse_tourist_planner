var min_price;
var max_price;
var start_date;
var end_date;
var place;
var card;

var card_select;
var options;
var selected;
var hotels_price = {};
var photo_src;


window.onload = function (){
    const button = document.getElementById("getreq");
    button.addEventListener('click', function () {
        place = document.getElementById("city").value;
        min_price = document.getElementById("min_price").value;
        max_price = document.getElementById("max_price").value;
        start_date = document.getElementById("start_date").value;
        end_date = document.getElementById("end_date").value;
        console.log(place);
        fetch("http://engine.hotellook.com/api/v2/lookup.json?query="+place+"&lang=ru&lookFor=both&limit=10")
            .then(res => res.json())
            .then(response => {
                console.log(response.results.hotels);
                get_prices();
                document.getElementById("hotel").addEventListener("change",function () {
                    console.log("lol");
                    get_card();
                });
            })
            .catch(err => {
                console.log(err);
            })
    });
};

function get_prices() {
        options = null;
        hotels_price = {};
        fetch("http://engine.hotellook.com/api/v2/cache.json?location=Moscow&currency=rub&checkIn="+start_date+"&checkOut="+end_date+"&limit=10")
        .then(res => res.json())
        .then(response => {
            for(var i in response) {
                if((parseFloat(min_price) <= parseFloat(response[i].priceAvg)) &&
                    ((parseFloat(max_price) >= parseFloat(response[i].priceAvg)))) {
                    console.log(response[i]);
                    if (options === null) {
                        options = '<option value =' + response[i].hotelId + '>' + response[i].hotelName + '</options>';
                        hotels_price[response[i].hotelId] = response[i].priceAvg;
                    }
                    else {
                        options += '<option value =' + response[i].hotelId + '>' + response[i].hotelName + '</options>';
                        hotels_price[response[i].hotelId] = response[i].priceAvg;
                    }
                }
            }
            if(options === null) {
                card = `<p>По вашему запросу данных нет</p>`
            }
            else{
                document.getElementById("hotel").innerHtml = options;
                card_select = '<select id="hotel" style="max-width:250px">' + options + '</select>';
                document.getElementById("for_select").innerHTML = card_select;
                get_card();
            }
            if(($("#hide").css('display') === 'none'))
                $("#hide").show();
        })
        .catch(err => {
            console.log(err);
        })
}

$("#hotel").on("change", function () {
        console.log("kek");
        get_card();
});


function get_card(card) {
    selected = document.getElementById("hotel");
    card = '<div class="row"><h2>' + $("#hotel option:selected").text() +'</h2>';
    fetch("https://yasen.hotellook.com/photos/hotel_photos?id="+selected.value)
        .then(res => res.json())
        .then(response => {
            for(let i in response)
                photo_src = "https://photo.hotellook.com/image_v2/limit/"+response[i][0]+"/800/520.auto";
            card += '<div class="row" style="height: auto">' +
                '<img src="'+ photo_src +'" class="img-responsive" alt="Не удалось загрузить фото">';
            card += '<div class="row"><h3 class="text-center"> Цена: </h3>'+hotels_price[selected.value]+'</div>';
                document.getElementById("card").innerHTML = card;

               var other_fields = {};
               other_fields.hotel_name = $("#hotel option:selected").text();
               console.log(other_fields.hotel_name);
               other_fields.hotel_picture = photo_src;
               console.log(other_fields.hotel_picture);
               other_fields.hotel_price = hotels_price[selected.value];
               console.log(other_fields.hotel_price);
               $('#other-fields').val(JSON.stringify(other_fields));
        });
}
