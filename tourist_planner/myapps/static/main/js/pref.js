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
var hotel_render_list = '';
var hotel_render_extra_list = '';
var start_date_valid = false;
var end_date_valid = false;

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
        fetch("http://engine.hotellook.com/api/v2/cache.json?location="+place+"&currency=rub&checkIn="+start_date+"&checkOut="+end_date+"&limit=25")
        .then(res => res.json())
        .then(response => {
            let hotels_list = [];
            let hotel_extra_list = [];
            for(let i in response) {
                if((parseFloat(min_price) <= parseFloat(response[i].priceAvg)) &&
                    ((parseFloat(max_price) >= parseFloat(response[i].priceAvg)))) {
                        console.log(response[i]);
                        hotels_list[i] = response[i];
                }
                else
                    hotel_extra_list.push(response[i]);
            }
            hotel_extra_list.sort( (a,b) => {
               if (a.priceAvg >= b.priceAvg)
                   return 1;
               if (a.priceAvg < b.priceAvg)
                   return -1;
            });
            create_hotels_list(hotels_list, hotel_extra_list);

        })
        .catch(err => {
            console.log(err);
        })
}

function create_hotels_list(hotels_list, hotels_extra_list) {
    hotel_render_list = '';
    hotel_render_extra_list = '';
    console.log(hotels_list);
    console.log(hotels_extra_list);
    if (hotels_list.length === 0) {
        console.log("empty lol");
        $("#hotels").html(`<h2 class="text-center">
                        По вашему запросу не найдено ни одного отеля, посмотрите альтернативные варианты</h2>`);
    }
    else {
        $("#hotels").html(`<h2 class="text-center">Результаты по вашему запросу</h2>`);
        for (let i in hotels_list) {
            create_card(hotels_list[i], 1);
        }
    }
    $("#extra_hotels").html(`<h2 class="text-center"> Альтернативные варианты </h2>`);
    for (let i = 0; i < hotels_extra_list.length; ++i) {
        if(i > 10)
            break;
        create_card(hotels_extra_list[i], 2);
    }
    console.log("hotels",hotel_render_list);
    console.log("hotels extra", hotel_render_extra_list);
}


function create_card(hotel, point) {

    let hotel_render = `<div class="row" id="#`+ hotel.hotelId+ `" >`;
    var hotel_id = hotel.hotelId;
    hotel_render += `<div class="col-lg-1 col-md-1 col-sm-0"></div>`;
    hotel_render += `<div class="col-lg-10 col-md-10 col-sm-12">`;
    hotel_render += `<div class="row">`;
    fetch("https://yasen.hotellook.com/photos/hotel_photos?id="+hotel.hotelId)
        .then(res => res.json())
        .then(response => {
            console.log(response);
            var sorce = [];
            hotel_render += `<div class="col-lg-6 col-md-6 col-sm-12" data-name="`+hotel.hotelName+`" data-price="`+hotel.priceAvg+`"
 id="card`+hotel.hotelId+`">`;
            hotel_render += `<div id="carousel-example-generic`+hotel.hotelId+`" class="carousel slide" data-ride="carousel"> 
                                <ol class="carousel-indicators">
                                <li data-target="#carousel-example-generic`+hotel.hotelId+`" data-slide-to="0" class="active"></li>
                                <li data-target="#carousel-example-generic`+hotel.hotelId+`" data-slide-to="1"></li>
                                <li data-target="#carousel-example-generic`+hotel.hotelId+`" data-slide-to="2"></li>
                                </ol>
                             <div class="carousel-inner" role="listbox">`;
            for(let photos in response) {
                console.log(photos);
                for(let j = 0; j < response[photos].length; ++j) {
                    console.log(response[photos][j]);
                    sorce.push(response[photos][j]);
                    if (j === 3)
                        break;
                    else if (j === 0)
                        hotel_render += `<div class="item active">`;
                    else
                        hotel_render += `<div class="item">`;
                        hotel_render += `<img id="img`+j+hotel.hotelId+`" src="https://photo.hotellook.com/image_v2/limit/` +response[photos][j] +
                        `/800/520.auto" alt="Не удалось загрузить фото">
                                  <div class="carousel-caption">
                                  </div>
                                  </div>`;
                }
            }
            hotel_render += `</div>
                            <a class="left carousel-control" href="#carousel-example-generic`+hotel.hotelId+`"
                                role="button" data-slide="prev">
                                <span class="glyphicon glyphicon-chevron-left" aria-hidden="true"><</span>
                                <span class="sr-only">Previous</span>
                            </a>
                            <a class="right carousel-control" href="#carousel-example-generic`+hotel.hotelId+`"
                                role="button" data-slide="next">
                            <span class="glyphicon glyphicon-chevron-right" aria-hidden="true">></span>
                            <span class="sr-only">Next</span>
                            </a>
                            </div>
                            </div>
                            <div class="col-lg-6 col-md-6 col-sm-0">
                            <h2>`+ hotel.hotelName +`</h2>
                            <p>`+hotel.priceAvg+` рублей</p>
                            <button class="btn-primary addhotel" id="button`+hotel.hotelId+`">Добавить к себе</button>
                            </div>
                            </div>
                            </div>
                            <div class="col-lg-1 col-md-1 col-sm-0"></div>
                            </div>`;
            if(point === 1)
                    $("#hotels").append(hotel_render);
            else if(point === 2)
                    $("#extra_hotels").append(hotel_render);
            document.getElementById('button'+hotel.hotelId).addEventListener('click', function () {
                if(end_date_valid && start_date_valid) {
                    console.log('kek');
                    let id = this.id;
                    id = id.substring(6, id.length);
                    console.log(id);
                    let img1 = document.getElementById("img" + 1 + id);
                    let img2 = document.getElementById("img" + 2 + id);
                    let img0 = document.getElementById("img" + 0 + id);
                    console.log(img1.src);
                    console.log(img2.src);
                    console.log(img0.src);
                    let card = document.getElementById("card" + id);
                    console.log(card.dataset.name);
                    console.log(card.dataset.price);

                    var other_fields = {};
                    other_fields.hotel_name = card.dataset.name;
                    other_fields.hotel_picture = [img1.src, img2.src, img0.src];
                    console.log(other_fields.hotel_picture);
                    other_fields.hotel_price = card.dataset.price;
                    $('#other-fields').val(JSON.stringify(other_fields));
                    document.HotelForm.submit();
                }
                    });
                $("#card" + hotel.hotelId).data(sorce);
            })}

$("#start_date").blur(function () {
    console.log("start_lol");
  let entered_date = new Date(this.value);
  let today = new Date();
  today.setMinutes(0);
  today.setSeconds(0);
  today.setMilliseconds(0);
  console.log(this.value);
  console.log(entered_date);
  console.log(today);
  if(today <= entered_date) {
      start_date_valid = true;
      $(this).css('background-color', '')
  }
  else
      $(this).css('background-color', 'red')
}).focus(function () {
    console.log("start_lol");
    start_date_valid = false;
});

$("#end_date").blur(function () {
    console.log("end_lol");
    let end_entered_date = new Date(this.value);
    let start_entered_date = new Date($("#start_date").val());
    let today = new Date();
    today.setMinutes(0);
    today.setSeconds(0);
    today.setMilliseconds(0);
    console.log(end_entered_date);
    console.log(start_entered_date);
    console.log(today);
    if((end_entered_date > start_entered_date)&&(start_entered_date >= today)) {
        end_date_valid = true;
         $(this).css('background-color', '')
    }
    else
         $(this).css('background-color', 'red')
}).focus(function () {
    console.log("end_lol");
    end_date_valid = false;
});