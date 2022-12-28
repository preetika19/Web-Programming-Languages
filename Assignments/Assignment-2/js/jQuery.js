$(document).ready(function(){
	$.ajax({
		url: "js/data.json",
		dataType: "json",
		success: function(data){
			$.each(data, function(array){
				var image_url = '<div class="col-md-3"><img class="image_place" src="images/square/' + data[array].path + '" alt="' + data[array].title + '" value="' + data[array].id +'"></div>';
				$("#photo_gallery").append(image_url);
			});

			$(".image_place").on("mouseenter",function(event){
				$(this).parent().addClass("gray");
				var id = $(this).attr('value');

				$.each(data,function(array){
					if (data[array].id == id) {
						var src = "images/medium/" + data[array].path;
						var alt = data[array].title;
						var text = data[array].title + ", " + data[array].city + ", " + data[array].taken ;

						$("#imagepreview").attr("src", src );
						$("#imagepreview").attr("alt", alt );
						$("#imageinfo").text(text);
						
						var x = (event.pageX) - 100;
						var y = (event.pageY) - 100;
						$(".modal").css({left: x, top: y, position:'absolute'});
						$(".modal").modal("show"); 
					};
				});	
			});

			$(".image_place").on("mouseleave",function(){
				$(".modal").on("mouseleave",function(){
					$(".modal").modal("hide");
					$(".image_place").parent().removeClass("gray");
				});
			});

			$(".image_place").on("mousemove",function(){
				var x = (event.pageX) - 100;
				var y = (event.pageY) - 100;
				$(".modal").css({left: x, top: y, position:'absolute'});
				$(".modal").modal("show");
			});

 	},
 	error: function() { alert("Error loading JSON file");  },
 });
});





