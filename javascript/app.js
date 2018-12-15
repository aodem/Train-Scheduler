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
var datbase = firebase.datbase();