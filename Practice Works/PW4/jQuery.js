
function loadDoc() {
	$.ajax({

		url: "movies.xml",
		dataType: "xml",
		success: function(data) {

		    // alert("file is loaded");
		    $("table").append('<tr><td>Title</td><td>Genre</td><td>Director</td><td>Cast</td><td>Short Description</td><td>IMDB-rating</td></tr>');
		    $(data).find('movie').each(function(){
		    	//title
		    	var title = $(this).find('title').text();

		    	//genre
		    	var temp1 = [];
		    	$(this).find('genre').each(function() {
		    		temp1.push($(this).text());
		    	});
		    	var genre = temp1.join(', ');

		    	//director
		    	var director = $(this).find('director').text();   	

		    	//cast
		    	var temp2 = [];
		    	$(this).find('cast').find('person').each(function() {
		    		temp2.push($(this).attr('name'));
		    	});
		    	var names = temp2.join(', ');

		    	//description
		    	var description = $(this).find('imdb-info').find('synopsis').text();

		    	//imdb score
		    	var score = $(this).find('imdb-info').find('score').text();

		    	var info = '<tr><td>' + title +'</td><td>' + genre + '</td><td>' + director + '</td><td>' + 
		    	names + '</td><td>' + description + '</td><td>' + score + '</td></tr>';
		    	$("table").append(info);
		    });
		    
		},
		error: function() { alert("error loading file");  }
	});


}