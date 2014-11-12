function initApi() {

	function sendAjaxRequest(suggestBy) {
		$.ajax({
			url: 'http://developer.echonest.com/api/v4/artist/suggest?api_key=8H3FB86VONARR3KZV&name='+suggestBy+'&results=5',
			type: 'GET',
			dataType: 'json',
			success: function(data) {
				if(data.response.status.message === "Success") {
					var artists_List = data.response.artists;
					$("#artist-suggestion").find('p:first-child').addClass('hidden');
					$("#artist-suggestion").find('p.searched-artists').remove();
					var paraString = "";
					for(var i=0; i< artists_List.length; i++) {
						paraString += "<p class='text-center searched-artists'>"+artists_List[i].name+"</p>";
					}
					$("#artist-suggestion").append(paraString);
				} else {
					$("#artist-suggestion").find('p:first-child').removeClass('hidden')					
				}
			}
		})
	}

	//listen to change event in inputbox
	$("#artist-search-input").keyup(function(event) {
		var val= this.value;
		var length= this.value.length;
		var filtered_results= [];

		if(length >= 3) {
			sendAjaxRequest(val);
		}

		console.log(event);
	});
}