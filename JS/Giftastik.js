$(document).ready(function() {
    
    var topics = []; //Creating the topics array per HQ instructions
    
        //creating function showGif to start AJAX call to GIPHY
         function showGif() {
    
        var x = $(this).data("search");
        console.log(x);
    
        // giphy api Q parameter set to search term, inserting API key given after signing up & creating app, limiting to 10 results
        var imgURL = "https://api.giphy.com/v1/gifs/search?q=" + x + "&api_key=SiwZuQlGAMrw5rkuspkMViW734h5mIOv&limit=10"; 
        console.log(imgURL);
    
        //Start AJAX call to GIPHY
        $.ajax({
              url: imgURL,
              method: "GET"
            }).done(function(response) {
                var results = response.data;
                console.log(results);
                for (var i = 0; i < results.length; i++) {
                
                    //Set up DIV w/ still & animated image via "data-state", "data-still" and "data-animate" attributes; Adding rating to results
                var preyDiv = $("<div class='col-md-6'>");
                var rating = results[i].rating;
                var animatedSrc = results[i].images.fixed_height.url;
                var staticSrc = results[i].images.fixed_height_still.url;
                var voila = $("<img>");
                var p = $("<p>").text("Rating: " + rating);
    
                voila.attr("src", staticSrc);
                voila.addClass("preyGif");
                voila.attr("data-state", "still");
                voila.attr("data-still", staticSrc);
                voila.attr("data-animate", animatedSrc);
                preyDiv.append(p);
                preyDiv.append(voila);
                $("#gifArea").prepend(preyDiv);
    
            }
        });
    }
    
      //Search term is input, button is available; when clicked it takes input value, trim, push to topics array, displays button
        $("#addPrey").on("click", function(event) {
            event.preventDefault();
            var newPrey = $("#preyInput").val().trim();
            topics.push(newPrey);
            console.log(topics);

            $("#preyInput").val('');
            displayButtons();
          });
    
      //Function cycles through topics, applies array values in buttons/ "gifBtns" group
        function displayButtons() {
        $("#gifBtns").empty();
        for (var i = 0; i < topics.length; i++) {
          var a = $('<button class="btn btn-primary">');
          a.attr("id", "prey");
          a.attr("data-search", topics[i]);
          a.text(topics[i]);
          $("#gifBtns").append(a);
        }
      }
    
    
      displayButtons();
    
      //Click event on button with id of "show" executes showGif function
      $(document).on("click", "#prey", showGif);
    
      //Click event on gifs with class of "preyGif" executes pausePlayGifs function
      $(document).on("click", ".preyGif", pausePlayGifs);
    
      //Function to animate or keep a gif still, aaand go
      function pausePlayGifs() {
           var state = $(this).attr("data-state");              // attr jQuery method to set the value of any attribute on our HTML element
          if (state === "still") {                              // If the clicked image's state is still, 
            $(this).attr("src", $(this).attr("data-animate"));  // src attribute is updated to data-animate value
            $(this).attr("data-state", "animate");               // applying animation to image's data-state
            
          } else {                                              
            $(this).attr("src", $(this).attr("data-still"));    // Else set src to the data-still value
            $(this).attr("data-state", "still");
      }
    }
    
    });