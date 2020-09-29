const Host = "77.77.77.7";

$(document).ready(() => {
  let array = []
  $('input[type="checkbox"]').change(function(){
      if($(this).prop("checked") === true){
          array.push($(this).attr('data-id'))
      }
      else if($(this).prop("checked") === false){
          array.splice(array.findIndex((element) => element === $(this).attr('data-id')))
      }
  })

  let URL_API = `http://${Host}:5000/api/v1/status/`;
  $.get(URL_API, ({ status }) => {
    if (status === 'OK') {
      $("#api_status").addClass('available');
    } else {
      $("#api.status").removeClass('available');
    }
  });

  URL_API = `http://${Host}:5000/api/v1/places_search/`;
  $.ajax({
    type: "POST",
    url: URL_API,
    data: JSON.stringify({}),
    success: data => createArticle(data, array),
    datatype: 'json',
    contentType: 'application/json; charset=utf-8',
  });

  $('button').click(() => {
    $("section.places").remove();
    URL_API = `http://${Host}:5000/api/v1/places_search/`;
    $.ajax({
      type: "POST",
      url: URL_API,
      data: JSON.stringify({}),
      success: data => createArticle(data, array),
      datatype: 'json',
      contentType: 'application/json; charset=utf-8',
    });
  });
});

function createArticle(data, array) {
  data.map((place) => {
    console.log(place.id)
    $.get(`http://${Host}:5000/api/v1/places/${place.id}/amenities`, (amenities) => {
      if (array.length === 0 || check(amenities, array)){
        const template=`<article>
  	  <div class="title_box">
 	    <h2>${place.name}</h2>
	    <div class="price_by_night">${place.price_by_night}</div>
	  </div>
	  <div class="information">
	    <div class="max_guest">${place.max_guest}$ Guests</div>
            <div class="number_rooms">${place.number_rooms} Bedrooms</div>
            <div class="number_bathrooms">${place.number_bathrooms} Bathrooms</div>
	  </div>
          <div class="description">
	    ${place.description}
          </div>
	</article>`;
        $("section.places").append(template);
      }
    })
  });

function check(data, array){
    console.log(data)
    // array.map(element => {
    //     if (name.find(ame => ame === element) === undefined){
    //         return false;
    //     }
    // })
    return true;
}
};
