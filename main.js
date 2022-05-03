
status = "";
objects = [];

function setup(){
    canvas = createCanvas(350 ,350);
    canvas.center();
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    video = createCapture(VIDEO);
    video.size(350,350);
    video.hide()
    document.getElementById("status").innerHTML = "Status : Object Detection";
}
function modelLoaded(){
    console.log("ModelLoaded");
    status = true;
 

}
function gotResult(error, results){
    if (error){
        console.log(error);
    }
    console.log(results);
    objects = results;
}
function draw(){
    image(video, 0, 0, 350, 350);
    
    if(status != "")
    {
        r = random(255);
        g = random(255);
        b = random(255);
        objectDetector.detect(video, gotResult);
        for (i = 0; i< objects.length; i++)
        {
            document.getElementById("status").innerHTML = "Status : Object Detected";
            document.getElementById("number_of_objects").innerHTML = "Number of Objects detected are "+ objects.length;


            fill(r,g,b);
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " "+ percent + "%", objects[i].x + 15, objects[i].y +15);
            noFill();
            stroke(r,g,b);
            rect(objects[i].x , objects[i].y , objects[i].width, objects[i].height);
        }
    }
}
