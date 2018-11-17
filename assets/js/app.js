$(document).ready(function () {
  var zomatoCitySearch = function (city) {
    var queryurl = 'https://developers.zomato.com/api/v2.1/cities?q=' + city
    $.ajax({
      url: queryurl,
      type: 'GET',
      dataType: 'json',
      headers: { 'user-key': '46a9d8c42a9a6217ff47dae868a48873' }
    })
      .then(function (response) {
        console.log(response.location_suggestions[0])
        // console.log(response[0])
      })
  }

  var zomatoSearch = function (restaurantSearch) {
    var queryurl = 'https://developers.zomato.com/api/v2.1/search?q=' + restaurantSearch
    $.ajax({
      url: queryurl,
      type: 'GET',
      dataType: 'json',
      headers: { 'user-key': '46a9d8c42a9a6217ff47dae868a48873' }
    })
      .then(function (response) {
        console.log(response.restaurants[0])
        // console.log(response[0])
        console.log(response.restaurants[0].restaurant.name)
        console.log(response.restaurants[0].restaurant.id)
      })
  }

  var nutritionix = function (food) {
    var settings = {
      'async': true,
      'crossDomain': true,
      'url': 'https://trackapi.nutritionix.com/v2/natural/nutrients',
      'method': 'POST',
      'headers': {
        'content-type': 'application/json',
        'accept': 'application/json',
        'x-app-id': 'c0d82573',
        'x-app-key': '7aa35984f679d0c7be1c01a88ec527be',
        'x-remote-user-id': '0',
        'cache-control': 'no-cache'
      },
      'processData': false,
      'data': '{ "query":"' + food + '", "timezone": "US/Eastern", "locale": "en_US" }'
    }

    $.ajax(settings).done(function (response) {
      console.log(response)
    })
  }

  $(function () {
    $('.create-form').on('submit', function (event) {
      // Make sure to preventDefault on a submit event.
      event.preventDefault()
var updatePage = function (restaurantData) {

  console.log('a' + restaurantData)
  console.log('b' + restaurantData.restaurants)
  //Loop through restaurants and display on page
  //Requirement: Repeating element
  for (var i = 0; i < 10; i++) {
    
    var restaurant = restaurantData.restaurants[i].restaurant;

    // Create the  list group to contain the restaurants and add the restaurant content for each
    var $restaurantList = $("<ul>");
    $restaurantList.addClass("list-group");

    // Add the newly created element to the DOM
    $("#restaurant-list").append($restaurantList);

    // If the restaurant has a headline, log and append to $restaurantList
    var restaurantName = restaurant.name;
    var $restaurantListItem = $("<li class='list-group-item restaurantName'>");
    if (restaurantName) {
      $restaurantListItem.append(
        "<a href='" + restaurant.web_url + "' target='_blank'><strong>" + restaurantName + "</strong></a>");
    }

    // Append the ID to document if exists
    var restaurantId = restaurant.id;
    if (restaurantId) {
      $restaurantListItem.append("<h6> Zomato Restaurant ID:" + restaurantId + "</h6>");
    }

    // Append section to document if exists
    var cuisines = restaurant.cuisines;
    if (cuisines) {
      $restaurantListItem.append("<h6>Cuisines: " + cuisines + "</h6>");
    }

    // Append section to document if exists
    var city = restaurant.location.city;
    var locality = restaurant.location.locality;
    
    if (city && locality) {
      $restaurantListItem.append("<h6>Location: " + locality + "\|" + city + "</h6>");
    }

    // Append section to document if exists
    var cuisines = restaurant.cuisines;
    if (cuisines) {
      $restaurantListItem.append("<h6>Cuisines: " + cuisines + "</h6>");
    }

    // Append the restaurant
    $restaurantList.append($restaurantListItem);
  }

}

$("#search").on("click", function (event) {

  event.preventDefault();

  //When user clicks search, reload the restaurants
  $("#restaurant-list").empty();
  var restaurantSearch = $("#restaurant-input").val()

  zomatoSearch(restaurantSearch)

});

var nutritionix = function (food) {
  var settings = {
    'async': true,
    'crossDomain': true,
    'url': 'https://trackapi.nutritionix.com/v2/natural/nutrients',
    'method': 'POST',
    'headers': {
      'content-type': 'application/json',
      'accept': 'application/json',
      'x-app-id': 'c0d82573',
      'x-app-key': '7aa35984f679d0c7be1c01a88ec527be',
      'x-remote-user-id': '0',
      'cache-control': 'no-cache'
    },
    'processData': false,
    'data': '{ "query":"' + food + '", "timezone": "US/Eastern", "locale": "en_US" }'
}
  $.ajax(settings).done(function (response) {
    console.log(response)
  })
}

$(function () {
  $('.create-form').on('submit', function (event) {
    event.preventDefault()

    var newUser = {
      username_pk: $('#uname').val().trim(),
      birthday: $('#bday').val().trim(),
      restrictions: $('#restrict').val().trim(),
      zipcode: $('#zip').val().trim()
    }
    console.log(newUser)
    
    // Send the POST request.
    $.ajax('/api/users', {
      type: 'POST',
      data: newUser
    }).then(
      function () {
        console.log('created new user')
        // Reload the page to get the updated list
        // location.reload();
      }
      console.log(newUser)
      // Send the POST request.
      $.ajax('/api/users', {
        type: 'POST',
        data: newUser
      }).then(
        function () {
          console.log('created new user')
          // Reload the page to get the updated list
          // location.reload();
        }
      )
    })
  })

  $('.btn-addingr').on('click', function () {
    var count = Number($(this).attr('data-count'))
    count += 1
    $(this).attr('data-count', count)
    var newDiv = $('<div>')
    var ping = $('<p>').text('Ingredient ' + count)
    var newin = $('<input>')
    newin.attr('class', 'ing' + count)
    var pam = $('<p>').text('Amount')
    var newin2 = $('<select>')
    newin2.attr('class', 'am' + count)
    var nselect = $('<select>')
    nselect.attr('class', 'amounttype' + count)
    var opt1 = $('<option>').attr('value', 'cup').text('Cup')
    var opt2 = $('<option>').attr('value', 'tbs').text('TBS')
    var opt3 = $('<option>').attr('value', 'tsp').text('TSP')
    var opt4 = $('<option>').attr('value', 'oz').text('oz')

    for (let i = 1; i < 11; i++) {
      var nopt = $('<option>').attr('value', i).text(i)
      newin2.append(nopt)
    }
// 'Add Ingredient' on click functionality
$('.btn-addingr').on('click', function () {
  var count = Number($(this).attr("data-count"))
  count += 1
  $(this).attr("data-count", count)
  var newDiv = $("<div>")
  var ping = $("<p class=\"ingtag\">").text("Ingredient " + count + ":")
  var newin = $("<input>")
  var namdiv = $("<div class=\"amdiv\">")
  newin.attr("class", "ing ing" + count)
  var pam = $("<p class=\"amtag\">").text("Amount:")
  var newin2 = $("<select class=>")
  newin2.attr("class", "am am" + count)
  var nselect = $("<select>")
  nselect.attr("class", "am amounttype" + count)
  var opt1 = $("<option>").attr("value", "cup").text("Cup")
  var opt2 = $("<option>").attr("value", "tbs").text("TBS")
  var opt3 = $("<option>").attr("value", "tsp").text("TSP")
  var opt4 = $("<option>").attr("value", "oz").text("oz")

    nselect.append(opt1)
    nselect.append(opt2)
    nselect.append(opt3)
    nselect.append(opt4)
  for (i = 1; i < 11; i++) {
    var nopt = $("<option>").attr("value", i).text(i)
    newin2.append(nopt)
  }

    newDiv.append(ping)
    newDiv.append(newin)
    newDiv.append(pam)
    newDiv.append(newin2)
    newDiv.append(nselect)
  nselect.append(opt1)
  nselect.append(opt2)
  nselect.append(opt3)
  nselect.append(opt4)
  
  namdiv.append(pam)
  namdiv.append(newin2)
  namdiv.append(nselect)

    $('.indiv').append(newDiv)
  })

  $('.btn-addrecipe').on('click', function () {
    return new Promise((resolve, reject) => {
      if ($('.ing1').val().trim() === '') {
        console.log('ingredient 1 must have value')
        return
      }
      var count = Number($('.btn-addingr').attr('data-count'))
      var searchstring = ''
      for (let i = 1; i < count + 1; i++) {
        searchstring += $('.am' + i).val() + ' ' + $('.amounttype' + i).val() + ' ' + $('.ing' + i).val() + ' '
      }
      nutritionix(searchstring)
    })
    // =======zomatoCitySearch('cleveland')
    zomatoSearch('valentinos')
    nutritionix('for breakfast i ate 2 eggs, 3 strips of bacon, and 5 pounds carrots')

  })

// Matt's code for submit button on 'add recipe form'
$('.btn-addrecipe').on('click', function() {
  if($("#ing1").val().trim() === ""){
    console.log("ingredient 1 must have value")
  }
  var count = Number($('.btn-addingr').attr("data-count"))
  var searchstring = ""

  for(i=1;i<count+1;i++) {
    searchstring += $("#am" + i).val() + " " + $(".amounttype" + i).val() + " " + $("#ing" + i).val() + " " 
    $().push("#am" + i).val()
  }
  nutritionix(searchstring)
})
// zomatoCitySearch('cleveland')
// zomatoSearch('barrio')
