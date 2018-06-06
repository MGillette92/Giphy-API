
var topicsActors = [
    "Harrison Ford", "Johnny Depp", "Brad Pitt", "Leonardo DiCaprio", "Tom Cruise", "Will Smith", "Matt Damon", "Morgan Freeman", "Al Pacino", "Robert Downey Jr.", "Robert De Niro",
    "Bruce Willis"];


//initialize buttons
function initButtons() {
    $("#display-buttons").empty();//clears to stop duplicate buttons

    // Looping through the array, generating buttons for all actors
    for (var i = 0; i < topicsActors.length; i++) {
        var a = $("<button>");
        a.addClass("actor");
        a.attr("data-actor", topicsActors[i]);
        a.text(topicsActors[i]);
        $("#display-buttons").append(a);
    }
}

// listens for user adding an actor and adds it to the array
$("#add-actor").on("click", function (event) {
    event.preventDefault();
    var actor = $("#actor-input").val().trim();
    topicsActors.push(actor);
    initButtons();
});



// quieries giphy for actor gifs and displays them
function displayGifs() {

    var actor = $(this).attr("data-actor");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + actor + "&api_key=BCBbSbX8ti61x9FIpX6GJN7dRIf5xJI4&limit=10";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).done(function (response) {
        console.log(response)
        for (var index = 0; index < 10; index++) {

            var actorDivName = "actor" + index;
            var actorDiv = $("<div class=" + actorDivName + ">");

            // Retrieving the URL for the image and gif
            var imgURL = response.data[index].images.original_still.url;
            var gifURL = response.data[index].images.original.url;

            // Creating image element
            var image = $("<img>").attr({
                'class': "gif" + index,
                src: imgURL,
                'data-img': imgURL,
                'data-gif': gifURL,
                'data-state': "img"
            });

            // append image and set it above previous images
            actorDiv.append(image);
            $("#actor-gifs").prepend(actorDiv);

            //on click checks the state of the image/gif and makes it the opposite
            $(".gif" + index).on("click", function () {        
                let $this = $(this),
                currentState = $this.data('state');
                if ('img' === currentState) {
                    $this.attr('src', $this.data('gif'));
                    $this.data('state', 'gif');
                } else {
                    $this.attr('src', $this.data('img'));
                    $this.data('state', 'img');
                        }
                }) 
        }
    });
}


// listens for user clicking an actor and displays Gifs
$(document).on("click", ".actor", displayGifs);

//func call
initButtons();