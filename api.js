function api (app) {
    
    var requestModels = require("./app/models/request-models.js")
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
        var validJson = validatePostUser(request.body,requestModels.postUserModel);
        if(!validJson)
            response.send("Bad request");
        else
        {
            var newTeamKey = database().ref().child('TEAMS').push().key;
            var newUserKey = database().ref().child('USERS').push().key;
            var userJson = {};
            userJson[newUserKey] = 1;
            database().ref().child('TEAMS').child(newTeamKey).set(userJson);
            var teamJson = {};
            teamJson[newTeamKey] = 1;
            validJson["user_teams"] = teamJson;
            validJson["user_status"] = 1;
            database().ref().child('USERS').child(newUserKey).set(validJson);
            response.send(newUserKey+" is the key inserted");
        }
    });
    
    function validatePostUser(objA, objB)
    {
        return objA;
    }
    
};

module.exports = api;