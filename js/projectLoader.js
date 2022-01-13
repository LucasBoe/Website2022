var projects = [];

$.getJSON( "projects.json", function( data ) {
    projects = data;
   
    /*
    $( "<ul/>", {
      "class": "my-new-list",
      html: items.join( "" )
    }).appendTo( "body" );
    */
});