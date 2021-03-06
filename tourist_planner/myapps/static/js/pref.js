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
            let hotels_list = [];
            for(let i in response) {
                if((parseFloat(min_price) <= parseFloat(response[i].priceAvg)) &&
                    ((parseFloat(max_price) >= parseFloat(response[i].priceAvg)))) {
                        console.log(response[i]);
                        hotels_list[i] = response[i];
                }
            }
            create_hotels_list(hotels_list);

        })
        .catch(err => {
            console.log(err);
        })
}

function create_hotels_list(hotels_list) {
    hotel_render_list = '';
    for (let i in hotels_list) {
        create_card(hotels_list[i]);
    }
    console.log("hotels",hotel_render_list);
    document.getElementById("hotels").innerHTML = hotel_render_list;
}


function create_card(hotel) {
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
                    $("#hotels").append(hotel_render);
            document.getElementById('button'+hotel.hotelId).addEventListener('click', function () {
                        console.log('kek');
                        let id = this.id;
                        id = id.substring(6,id.length);
                        console.log(id);
                        let img1 = document.getElementById("img"+1+id);
                        let img2 = document.getElementById("img"+2+id);
                        let img0 = document.getElementById("img"+0+id);
                        console.log(img1.src);
                        console.log(img2.src);
                        console.log(img0.src);
                        let card = document.getElementById("card"+id);
                        console.log(card.dataset.name);
                        console.log(card.dataset.price);

                        var other_fields = {};
                        other_fields.hotel_name = card.dataset.name;
                        other_fields.hotel_picture = [img1.src,img2.src,img0.src];
                        console.log(other_fields.hotel_picture);
                        other_fields.hotel_price = card.dataset.price;
                        $('#other-fields').val(JSON.stringify(other_fields));
                        document.HotelForm.submit();
                    });
                $("#card" + hotel.hotelId).data(sorce);
            })}
