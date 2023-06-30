video = "";
status = "";
objects = [];

function preload() {
    video = createVideo('video.mp4');
    video.hide();
    video.position(523, 250);
}

function setup() {
    canvas = createCanvas(480, 380);
    canvas.center();
    canvas.position(523, 250);
}

function start() {
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
}

function modelLoaded() {
    console.log("Model loaded");
    video.loop();
    video.speed(1);
    video.volume(0);
    status = true;
}

function gotResult(error, results) {

    if (error) {
        console.log(error);
    }
    console.log(results);
    objects = results;

}

function draw() {
    image(video, 0, 0, 480, 380);
    if (status != "") {
        objectDetector.detect(video, gotResult);
        for (i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "Status : Objects Detected";
            document.getElementById("number_of_objects").innerHTML = "Number of objects detected are : " + objects.length;
            fill("#0055b3");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke("#0055b3");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
}