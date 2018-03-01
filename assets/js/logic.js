

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyAQ9RJpVQhWDcHO7HelxUP6a_NNM_04Kq0",
    authDomain: "schedule-1dbce.firebaseapp.com",
    databaseURL: "https://schedule-1dbce.firebaseio.com",
    projectId: "schedule-1dbce",
    storageBucket: "schedule-1dbce.appspot.com",
    messagingSenderId: "449192194101"
  };
  firebase.initializeApp(config);

var database = firebase.database();


$('#submit').on('click',function () {
    var trainName = $('#train-name').val();
    var destination = $('#destination').val();
    var firstTrainTime = $('#train-time').val();
    var frequency = $('#frequency').val();

var newTrain = {
    name: trainName,
    destination: destination,
    firstTrain: firstTrainTime,
    frequency: frequency
}

database.ref().push(newTrain);
console.log(newTrain.name);
  $("#train-name").val("");
  $("#destination").val("");
  $("#train-time").val("");
  $("#frequency").val("");
 
  return false;
});

database.ref().on("child_added", function(childSnapshot, prevChildKey){

	console.log(childSnapshot.val());

	var name = childSnapshot.val().name;
    var dest = childSnapshot.val().destination;
    var first = childSnapshot.val().firstTrain;
	var freq = childSnapshot.val().frequency;
	var timeDifference = moment().diff(moment.unix(first), "minutes");
	var timeRemainder = moment().diff(moment.unix(first), "minutes") % freq ;
	var timeMinutes = freq - timeRemainder;

	var arrivalTime = moment().add(timeMinutes, "m").format("hh:mm A"); 
	console.log(timeMinutes);
	console.log(arrivalTime);
    console.log(moment().format("hh:mm A"));
	console.log(moment().format("X"));

    $("#trainTable > tbody").append("<tr><td>" + name + "</td><td>" + dest + 
    "</td><td>" + freq + "</td><td>" + arrivalTime + "</td><td>" + timeMinutes + "</td></tr>");

});