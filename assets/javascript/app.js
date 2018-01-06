$(document).ready(function () {
  var topics = ["taekwondo", "jiu-jitsu", "judo", "karate", "boxing", "krav maga"];

  function renderButtons() {
    $("#button-list").empty();
    for (var i = 0; i < topics.length; i++) {
      var a = $("<button>");
      a.addClass("martial-art");
      a.attr("data-name", topics[i]);
      a.text(topics[i]);
      $("#button-list").append(a);

    }
  }
  renderButtons();

  $(document).on("click", ".martial-art", function () {
    var artSelection = $(this).html();
    var apiKey = "vE4IPGS5YdmvKK7Bc8HXBXQincivM9Vi";
    var queryUrl = "https://api.giphy.com/v1/gifs/search?q=" + artSelection + "&api_key=" + apiKey + "&limit=10";

    $.ajax({
      url: queryUrl,
      method: "GET"
    }).done(function(response) {

      var results = response.data;
      console.log(results);
      $("#gif-gallery").empty();
      // for (var j = 0; j < results.length; j++) {
      //   var searchedImage = $("<div>");
      //   var displayImage = results[j].images
      // }
    })
  });


})