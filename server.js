var express = require("express");   
 
  var app = express();
  app.use(express.static(__dirname + "/App")); 

  // Initialize the app.
  var server = app.listen(process.env.PORT, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
    
  });