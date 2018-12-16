//train scheduler js and db interaction 
// Initialize Firebase
var config = {
    apiKey: "AIzaSyANviwxEC_9mL6AL7VNSG6Ee2JOULeGxUw",
    authDomain: "train-scheduler-477a7.firebaseapp.com",
    databaseURL: "https://train-scheduler-477a7.firebaseio.com",
    projectId: "train-scheduler-477a7",
    storageBucket: "",
    messagingSenderId: "1044428069396"
};
firebase.initializeApp(config);
//variable to reference the database
var database = firebase.database();

$(document).on("click", "button", function(){
    var trainName = $("#name").val().trim();
    var trainDestination = $("#destination").val().trim();
    var trainFirstRun = moment($("#time").val().trim()).format("HH:mm:ss");
    var trainInterval = $("#frequency").val().trim();
    //sending data to the database

    database.ref().push({
        name:trainName,
        endDestination: trainDestination,
        firstRun: trainFirstRun,
        interval: trainInterval
    });

    console.log(trainName, trainDestination, trainFirstRun, trainInterval);
})