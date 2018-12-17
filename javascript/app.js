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
    var trainFirstRun = $("#time").val().trim();
    var trainInterval = $("#frequency").val().trim();
    //sending data to the database

    database.ref().push({
        Tname:trainName,
        endDestination: trainDestination,
        firstRun: trainFirstRun,
        interval: trainInterval
    });

    console.log(trainName, trainDestination, trainFirstRun, trainInterval);
    console.log(moment(trainFirstRun, "HH:mm").add(10, "minutes"));
    
    $("#name").val("");
    $("#destination").val("");
    $("#time").val("");
    $("#frequency").val("");
})

database.ref().on("child_added", function(childSnap){
    var name = childSnap.val().Tname;
    var destination = childSnap.val().endDestination;
    var runOne = childSnap.val().firstRun;
    var freq = childSnap.val().interval;

    var firstTimeConverted = moment(childSnap.val().firstRun, "HH:mm").subtract(1, "years");
    console.log(firstTimeConverted);
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));
    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var tRemainder = diffTime % freq;
    console.log(tRemainder);

    // Minute Until Train
    var tMinutesTillTrain = freq - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm a"));

    var newRow = $("<tr>")
    $("#dataTable").append(newRow)

    console.log(name, destination, runOne, freq) 
    newRow.append().html("<td>" + name + "</td>" + "<td>" + destination + "</td>" + "<td>" + freq + "</td>" + "<td>" + moment(nextTrain).format("hh:mm a") + "</td>" + "<td>" + tMinutesTillTrain + "</td>");
    
}, function(errorObject) {
      console.log("Errors handled: " + errorObject.code);
})