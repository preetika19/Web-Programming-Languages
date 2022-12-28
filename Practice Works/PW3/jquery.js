
$(document).ready(function(){
	$("#add").click(function(){
		$("#first-li").toggle(500);
	});

	$("#new-input").focus(function(){
		$("#add-item").addClass("borders1");
		$("#first-li").addClass("borders2");
	});

	$("#new-input").blur(function() {
		$("#new-input").val("");
		$("#add-item").removeClass("borders1");
		$("#first-li").removeClass("borders2");
	});

	$("#new-input").keypress(function(e){
		if (e.which == 13) {
			$("ul").append('<li class="list-group-item"><span><i class="fa fa-trash"></i></span>' + " " + $("#new-input").val() + '</li>');
			$("#new-input").val("");
		} 	
	});

	$("ul").on("click", "li", function(){ 
		$(this).toggleClass("done"); 
	});

	$("ul").on("mouseenter", "li", function(){ 
		$(this).find("span").fadeIn(500).css("display","inline-block"); 
	});

	$("ul").on("mouseleave", "li", function(){ 
		$(this).find("span").fadeOut(); 
	});

	$("ul").on("click", "span", function(){ 
		$(this).parent().remove(); 
	});
	
});
