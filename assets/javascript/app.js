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
            a.addClass('animalBtn');
		    a.text(gifs[i]); // Provided the initial button text
		    $('#animalButtons').append(a); // Added the button to the HTML
		} 
	}
    renderButtons();
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

	$('#animalButtons').on('click', '.animalBtn', function() {
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
                    var animalImage = $('<img>').attr('src', results[i].images.fixed_height_still.url);
                    animalImage.attr('data-still', results[i].images.fixed_height_still.url);
                    animalImage.attr('data-animate', results[i].images.fixed_height.url);
                    animalImage.attr('data-state', 'still');
                    animalImage.addClass('animalGif');

                    animalDiv.append(p);
                    animalDiv.append(animalImage);
                    $('#animals').prepend(animalDiv);
                    // console.log(results);
                    // console.log(gifs);

                    //--------------------------------
                }

            });
    });
      $('#animals').on('click', '.animalGif', function(){
            //STEP ONE: study the html above. Look at all the data attributes. Run the file in the browser. Look at the images. After you fill in steps 1 and 2 you'll be able to pause gifs from giphy.

            //STEP TWO: make a variable named state and then reference the button's data-state into it. Do not use .data('state'). It won't work the way we expect.

            //---------------FILL IN CODE HERE FOR STEP TWO----------------------------
            var state = $(this).attr('data-state');
            var animate = $(this).attr('data-animate');
            var still = $(this).attr('data-still');
            console.log(animate);
            //----------------------------------------------------

            /*STEP THREE: 
                * if variable state is equal to 'still' then 
                    * update the src attribute of this image that you clicked on to what data-animate is equal to for this image
                    * and update the data-state attribute to 'animate'
                * if state does not equal 'still' then 
                    * update the src attribute of this image that you clicked on to what data-still is equal to for this image
                    * and update the data-state attribute to 'still'
            */

            //---------------FILL IN CODE HERE FOR STEP THREE----------------------------
            if (state == 'still') {
                $(this).attr('src', animate);
                $(this).attr('data-state', 'animate');
            } else {
                $(this).attr('src', still);
                $(this).attr('data-state', 'still');
            }
            //----------------------------------------------------

            //STEP FOUR: open the file in the browser and click on the images. Then click again to pause.
        });
});
