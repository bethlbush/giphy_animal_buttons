var topics = ["MacGyver", "The A-Team", "The Dukes of Hazzard", "Knight Rider", "Mork and Mindy",
    "Three's Company", "Diff'rent Strokes"
];
$(document).ready(function() {
	//make a new button for each item in the array
    for (i = 0; i < topics.length; i++) {

        $("#buttons").append("<button>" + topics[i] + "</button><br><br>")

    };

	//upon clicking thd "submit" button, prepend a new button to the page
    $("#submit").on("click", function(event) {
        // prevent form from trying to submit/refresh the page
        event.preventDefault();
        var tvShow = $("#yourShow").val().trim();
        console.log(tvShow);
        topics.push(tvShow);
        $("#buttons").prepend("<button>" +tvShow+ "</button><br><br>");
    });




    $("button").on("click", function() {
        var TVshow = $(this).attr("data-TVshow");

        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" +
            TVshow + "&api_key=dc6zaTOxFJmzC&limit=10";

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
                        var personImage = $("<img>");

                        // Giving the image tag an src attribute of a proprty pulled off the
                        // result item
                        personImage.attr("src", results[i].images.fixed_height.url);

                        // Appending the paragraph and personImage we created to the "gifDiv" div we created
                        gifDiv.append(p);
                        gifDiv.append(personImage);

                        // Prepending the gifDiv to the "#gifs-appear-here" div in the HTML
                        $("#gifs-appear-here").prepend(gifDiv);
                    };
                };
            });
    });
});
