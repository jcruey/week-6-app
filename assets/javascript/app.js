$(document).ready(function () {
	// Initial array of GIFs
	var gifs = ['cat', 'dog', 'snake', 'bear', "rabbit", "eagle", 'sloth', 'octopus', 'dolphin'];

	// Function to create the buttons that will pull GIFs from Giphy
	function renderButtons(){ 

		// clears the div prior to adding new buttons (this is necessary otherwise you will have repeat buttons)
		$('#animalButtons').empty();

		// Loops through the array of movies
		for (var i = 0; i < gifs.length; i++){

			// Then dynamicaly generates buttons for each movie in the array

			// Note the jQUery syntax here... 
		    var a = $('<button>') // This code $('<button>') is all jQuery needs to create the beginning and end tag. (<button></button>)
		    a.addClass('gif'); // Added a class 
		    a.attr('data-name', gifs[i]); // Added a data-attribute
		    a.text(gifs[i]); // Provided the initial button text
		    $('#animalButtons').append(a); // Added the button to the HTML
		}
	}

	// ========================================================

	// This function handles events where one button is clicked
	$('#addAnimal').on('click', function(){

		// This line of code will grab the input from the textbox
		var newGif = $('#animal-input').val().trim();

		// The movie from the textbox is then added to our array
		gifs.push(newGif);
		
		// Our array then runs which handles the processing of our movie array
		renderButtons(); 
		// We have this line so that users can hit "enter" instead of clicking on ht button and it won't move to the next page
		return false;
	})

	$('button').on('click', function() {
        var animal = $(this).data('name');
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=dc6zaTOxFJmzC&limit=10";

        $.ajax({
                url: queryURL,
                method: 'GET'
            })
            .done(function(response) {
                // step 1: Run this file, click a button, and see what the data looks like in the browser's console. Open up the Object, then open up the data key, then open up 0. Study the keys and how the JSON is structured.

                console.log(response)

                // step 2: since the image information is inside of the data key then make a variable named results and set it equal to response.data

                //------------put step 2 in between these dashes--------------------
                var results = response.data;
                //--------------------------------

                for (var i = 0; i < results.length; i++) {

                    /* step 3: 
                        * uncomment the for loop above and the closing curly bracket below
                        * make a div and reference it in a variable named animalDiv
                        * make a paragraph tag and put it in a variable named p
                            * set the text of the paragraph to the rating of the image in results[i]
                        * make an image and reference it in a variable named animalImage
                        * set the image's src to results[i]'s fixed_height.url 

                        * append the p variable to the animalDiv variable
                        * append the animalImage variable to the animalDiv variable

                        * prepend the animalDiv variable to the element with an id of gifsAppearHere

                    */

                    //------------put step 3 in between these dashes--------------------
                    var animalDiv = $('<div>');
                    var p = $('<p>').text("Rating: " + results[i].rating);
                    var animalImage = $('<img>').attr('src', results[i].images.fixed_height.url);

                    animalDiv.append(p);
                    animalDiv.append(animalImage);
                    $('#animals').prepend(animalDiv);
                    console.log(results);
                    console.log(gifs);



                    //--------------------------------
                }

            });
    })
});
