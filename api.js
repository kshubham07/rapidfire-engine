function api (app) {
    
    var firebase = require("firebase");
    var config = {
      apiKey: "AIzaSyBgAM5jSK6KvBScur-k-fC1PsmIe8afH_4",
      authDomain: "rapidfire-6140a.firebaseapp.com",
      databaseURL: "https://rapidfire-6140a.firebaseio.com",
      storageBucket: "rapidfire-6140a.appspot.com",
    };
    firebase.initializeApp(config);

    var database = firebase.database;

    app.post("/api/user", function (request, response) {
        console.log(request.body);
        if(!request.body.name || !request.body.age)
            response.send("Bad request");
        else
        {
            var newPostKey = database().ref().child('USERS').push().key;
                database().ref().child('USERS').child(newPostKey).set({
                name : request.body.name,
                age : request.body.age
            });
        response.send(newPostKey+" is the key inserted");
        }
    });
    
};

module.exports = api;