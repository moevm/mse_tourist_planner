var min_price;
var max_price;
var start_date;
var end_date;
var place;
var card;

var card_select;
var options;
var selected;

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
            })
            .catch(err => {
                console.log(err);
            })
    });
};

function get_prices() {
        options = null;
        fetch("http://engine.hotellook.com/api/v2/cache.json?location=Moscow&currency=rub&checkIn="+start_date+"&checkOut="+end_date+"&limit=10")
        .then(res => res.json())
        .then(response => {
            for(var i in response) {
                if((parseFloat(min_price) <= parseFloat(response[i].priceAvg)) &&
                    ((parseFloat(max_price) >= parseFloat(response[i].priceAvg)))) {
                    console.log(response[i]);
                    if (options === null)
                        options = '<option value =' + response[i] + ' selected = "selected">' + 'Crowne Plaza Moscow World Trade Centre' + '</options>';
                    else
                        options += '<option value =' + response[i] + '>' + response[i].hotelName + '</options>';
                }
            }
            if(options === null) {
                card = `<p>По вашему запросу данных нет</p>`
            }
            else {
                console.log(options);
                card_select = '<select id="hotel" style="max-width:250px">' + options + '</select>';
                document.getElementById("for_select").innerHTML = card_select;
                get_card();
            }
            document.getElementById("hotel").addEventListener("change", function () {
                card_select = '<select id="hotel"  style="max-width:250px">' + options + '</select>';
                document.getElementById("for_select").innerHTML = card_select;
                get_card();
            });
            if(($("#hide").css('display') === 'none'))
                $("#hide").show();
        })
        .catch(err => {
            console.log(err);
        })
}

function get_card(card) {
    selected = document.getElementById("hotel");
    console.log(selected);
    selected = selected.value;
    console.log(selected);
    card = '<div class="row"><h2>' +'Crowne Plaza Moscow World Trade Centre'+'</h2>';
    card += '<div class="row"><a href="https://www.cpmow.ru/">Сайт Отеля</a></div>';
    card += '<div class="row" style="height: auto"><img src="https://s-ec.bstatic.com/images/hotel/max1024x768/109/109690031.jpg" class="img-responsive">';
    card += '<div class="row"><h3>Цена: </h3> 4560.3</div>';
    document.getElementById("card").innerHTML = card;
}
