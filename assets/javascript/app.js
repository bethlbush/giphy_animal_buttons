$(document).ready(function() {

            var topics = ["wolf", "leopard", "serval",
                "fox", "tiger", "bobcat", "hyena", "caracal", "arctic fox", "coyote"
            ];

            //make a button for each item in the array
            for (i = 0; i < topics.length; i++) {
                console.log(topics[i]);
                var animal = topics[i]
            //add button to the DOM
                var button = $("<button>");
                button.attr("data-Animal", animal);
                button.text(animal);
                $("#buttons").append(button);
                $("#buttons").append("<br><br>");

            };


            //upon user entering text in the form input and clicking the "submit" button, 
            //append a new item to the array
            $("#submit").on("click", function(event) {
                // prevent form from trying to submit/refresh the page
                event.preventDefault();
                //store value of user input animal
                var animal = $("#yourAnimal").val().trim();
                console.log(animal);
                //push the new animal to the array
                topics.push(animal);
                console.log(topics);
                //add new animal button to the DOM
                var button = $("<button>");
                button.attr("data-Animal", animal);
                button.text(animal);
                $("#buttons").append(button);
                $("#buttons").append("<br><br>");

                    for (i = 0; i < topics.length; i++) {
                        var animal = topics[i];
                        };


            });


            //on clicking a button, grab the data-Animal attribute from the button clicked
            $("button").on("click", function() {

                        var animal = $(this).attr("data-Animal");
                    

                        //set up the query to send to giphy.com
                        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" +
                            animal + "&api_key=dc6zaTOxFJmzC&limit=10";

                        //AJAX GET request
                        $.ajax({
                                url: queryURL,
                                method: "GET"
                            })
                            // After the data comes back from the API
                            .done(function(response) {
                                // Storing an array of results in the results variable
                                var results = response.data;

                                // Looping over every result item
                                for (var i = 0; i < results.length; i++) {

                                    // Only taking action if the photo has an appropriate rating
                                    if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
                                        // Creating a div with the class "item"
                                        var gifDiv = $("<div class='item'>");

                                        // Storing the result item's rating
                                        var rating = results[i].rating;

                                        // Creating a paragraph tag with the result item's rating
                                        var p = $("<p>").text("Rating: " + rating);

                                        // Creating an image tag
                                        var animalImage = $("<img>");

                                        // Giving the image tag an src attribute of a proprty pulled off the
                                        // result item
                                        animalImage.attr("src", results[i].images.fixed_height.url);

                                        // Appending the paragraph and insectImage we created to the "gifDiv" div we created
                                        gifDiv.append(p);
                                        gifDiv.append(animalImage);

                                        // Prepending the gifDiv to the "#gifs-appear-here" div in the HTML
                                        $("#gifs-appear-here").prepend(gifDiv);
                                    };
                                };
                            });
                    });
            });
