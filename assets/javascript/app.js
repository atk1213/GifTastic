$(document).ready(function () {
  var topics = ["taekwondo", "jiu-jitsu", "judo", "karate", "boxing", "krav maga", "silat"];

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
  $("button").css({"margin-right":"5px"});

  $(document).on("click", "#search-button", function () {
    if ($("#search").val().trim() == "") {
      alert("Please type something to search");
    }
    else {
      var userSearch = $("#search").val().trim();
      topics.push(userSearch);
      $("#search").val("");
      renderButtons();
      $("button").css({"margin":"5px", "padding":"5px"});
      //enter key should submit and render buttons too...
    }

  });

  $(document).on("click", ".martial-art", function find() {
    var artSelection = $(this).html();
    var apiKey = "vE4IPGS5YdmvKK7Bc8HXBXQincivM9Vi";
    var queryUrl = "https://api.giphy.com/v1/gifs/search?q=" + artSelection + "&api_key=" + apiKey + "&limit=10";

    $.ajax({
      url: queryUrl,
      method: "GET"
    }).done(function (response) {
      var results = response.data;
      $("#gif-gallery").empty();
      for (var j = 0; j < results.length; j++) {
        var rating = results[j].rating;
        var displayRating = $("<p>").html("Rating: " + rating);
        $("#gif-gallery").append(displayRating);
        $("p").css({"display":"inline-block", "clear":"both"});

        var searchedImage = $("<div>");
        var stillImage = results[j].images.fixed_width_still.url;
        var animateImage = results[j].images.fixed_width.url;
        var animateGif = $("<img>").attr("src", stillImage).attr("data-still", stillImage).attr("data-animate", animateImage);
        animateGif.attr("data-state", "still");
        $("#gif-gallery").append(animateGif);
        $("img").css({"margin":"5px"});
        animateGif.on("click", startStop);
      }
    })

    function startStop() {
      var state = $(this).attr("data-state");
      if (state == "still") {
        $(this).attr("src", $(this).data("animate"));
        $(this).attr("data-state", "animate");
      }
      else {
        $(this).attr("src", $(this).data("still"));
        $(this).attr("data-state", "still");
      }
    }


  });



})