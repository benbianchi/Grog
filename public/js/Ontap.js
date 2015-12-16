$(document).ready(function() {
	console.log("Document Loaded");
	$('.drink-card').click('.view-drink', function(event) {
		$('#detail_Modal').height(0);
		$('#detail_Modal *').fadeTo(0,0);

		$('#detail_Modal').animate({
			height: "0px",
			height: $('#pageContainer').height()-64},
			250, function() {
				
				$('#detail_Modal *').animate({
					opacity: "0",
					opacity: "1"},
					250, function() {
						console.log("Finished Expanse");
					});
			});
	});
});


$("#modal_close").click(function(event) {
	
	console.log("Clickity");

	event.preventDefault();

	$('#detail_Modal *').animate({
		opacity: "1",
		opacity: "0"},
		250, function() {
			console.log("Finished Shrink");
			$('#detail_Modal').animate({
				height: $('#pageContainer').height()-64,
				height: 0},
				250, function() {


				});
		});






});