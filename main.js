Prediction= "";

Webcam.set({
    width:350,
    height:300,
    image_format:'png',
    png_quality:90
});

camera= document.getElementById("camera");

Webcam.attach('#camera');

function take_snapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML='<img id="capture_image" src="'+ data_uri+ '"/>';
    });
}

console.log('ml5 version:', ml5.version);

classifier= ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/pWonh9gg2/model.json', modelLoaded);

function modelLoaded(){
    console.log('model is loaded!');
}

function check(){
    img= document.getElementById('capture_image');
    classifier.classify(img, gotResult);
}

function gotResult(error, results){
    if (error){
        console.log(error);
    } else{
        console.log(results);
        document.getElementById("result_gesture_name").innerHTML= results[0].label;

        Prediction= results[0].label;
        speak();

        if (results[0].label=="Victory"){
            document.getElementById("update_emoji").innerHTML= "&#9996;";
        }
        if (results[0].label=="Amazing"){
            document.getElementById("update_emoji").innerHTML= "&#128076;";
        }
        if (results[0].label=="Good"){
            document.getElementById("update_emoji").innerHTML= "&#128077;";
        }
        if (results[0].label=="Not Good"){
            document.getElementById("update_emoji").innerHTML= "&#128078;";
        }
    }
}

function speak(){
    var synth= window.speechSynthesis;
    speak_data="The prediction is "+ Prediction;

    var utter_this= new SpeechSynthesisUtterance(speak_data);
    synth.speak(utter_this);
}