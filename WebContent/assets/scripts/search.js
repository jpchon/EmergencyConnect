/**
 * All the searching is in here
 */
// Open and close login form
$("#searchClose").click(function() {
    $("#searchModal").hide();
})

//Calls search when user clicks the button
$(document).ready(function() {
    $("#search_button").click(function() {
    	console.log("clicked search");
        //alert("clicked that search button");
        searchForUsers();

    });
});

//Calls search when user hits enter in the search bar
$('#searchbar').keydown(function(e) {
    if (e.keyCode == 13) {
        console.log("clicked search");
        //alert('you pressed enter ^_^');
        searchForUsers();
        
    }
});

 function searchForUsers() {
	 console.log($('#searchbar').val());
	 var username;
	 console.log($('#welcomeMessage').text());
     var params = {
    		 	searchInput: $('#searchbar').val(),
             inputType: "searchResults",
            	username: "markredekopp"
            		//($('#accountButton').text()).substring(9)
     };
     console.log("username-" + params.username);
     console.log("searching for: " + params.searchInput);
     
     $.post("HomepageServlet", $.param(params), function(responseText) {
         console.log("calledPOST");
         if (responseText) {
        	 console.log("in search if statement");
        	 console.log(responseText);
        	 console.log("first user id:" + responseText[0].userId);
        	 var i; 
        	 for(i=0; i<Object.keys(responseText).length; i++){
        		 var name = responseText[i].fullName;
        		 
        		 $("#searchResults").html("<tr><td><label>"+name+"</label></td><td><button onclick='follow("+name+")' type='button' value='Follow'>Follow</button></td></tr>"); 
        	 }
        	 $("#searchModal").show();
         } else {
//             $("#friendsList").html("<font color='red'>This username is already taken. Please choose another username.</font>");
             console.log("fail");
         }
     });
 }
 

//live search: as user types a key into the searchbar, 
//makes an ajax call to retrieve results if user clicks drop down item, search is called
//$(document).ready(function() {
//    $("#searchbar").keyup(function() {
//        var params = {
//            inputType: "liveSearch",
//            value: $("#searchbar").val()
//        };
//        $.post("HomepageServlet", $.param(params), function(responseJson) {
//            var availableTags = $.map(responseJson, function(el) {
//                return el;
//            });
//            
//            $("#searchbar").autocomplete({
//                source: availableTags,
//                select: function(event, ui) {
//                    $("#search_button").click(); }
//            })
//        });
//     });
// });

function follow(followeeUsername){
	console.log("clicked follow!!");
}


//Retrieve logged in users friends from the database once user logs in
function getUsersFriends(userName) {
    var params = {
        username: userName,
        inputType: "retrieveFriends"
    };    
    
    $.post("HomepageServlet", $.param(params), function(responseJson) { // Execute Ajax GET request on URL of "someservlet" and execute the following function with Ajax response JSON...
    	$("#friendsList").html("");
    	var friendsJSON = responseJson;
    	
    	if( jQuery.isEmptyObject( friendsJSON) )  {
	    	console.log(friendsJSON);
	    	 $("#friendsList").html(" <em> No followers to display. Add followers by searching for them! </em>");
    	} else {
    	 	console.log(friendsJSON);
    	 	
    	 	
    		var $ul = $("<div id='friendObjects' class='container-fluid' >").appendTo($("#friendsList"));
	    	for (var i=0; i<friendsJSON.length; i++){
	    		
	    		console.log(friendsJSON[i]);
	    		console.log(friendsJSON[i].status);
	    		
	    	 	var $divRow = $("<div 'class=row'>");
	    	 	($ul).append($divRow);
	    	 	($divRow).append("<p style='display:inline' > <a href=mailto:" + friendsJSON[i].email + " >" + friendsJSON[i].fullName + "</p>");
	    	 	
	    		if( friendsJSON[i].status == "pending") {
	    			($divRow).append("<button id='pending_status'>"+ friendsJSON[i].status + "</button");
	    		}
	    		else if(friendsJSON[i].status == "not safe" ) {
	    			($divRow).append("<button id='danger_status'>"+ friendsJSON[i].status + "</button");
	    		}else {
	    			($divRow).append("<button id='safe_status'>"+ friendsJSON[i].status + "</button");
	    		}
	    		($divRow).append("</div>");
	    	}
	    	($ul).append("</div>");
    	}
 
    });
}




//Display message for guest (necesssary if we create cookies, etc. )
$(document).ready(function() {
    $("#friendsList").html(" <em> You are currently accessing the site as a guest. To add or find friends, please log in. </em>");
});