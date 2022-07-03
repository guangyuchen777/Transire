var frames = 0;
var introFinished = false;



//Personality slider values goes here
var Values = {
  Oppeness:63,
  Conscientiousness:74,
  Extraversion:46,
  Agreeableness:73,
  Neuroticism:36
}

//Default animation values.
//These most of these values are multiplied, so if it is 1, then it does not change currently any value
var animationParameters = {
  speed: 1,
  size:1,
  firstBrightness:1, // Variable to change brightness of n-th light
  secondBrightness:1, // Variable to change brightness of n-th light
  brightness:1,
  wiggleness:1,
  closiness:1,
  alpha:0,     // Transparency value for the first tapping
  easing:0.06  // Easing variable for moving the dots for stroking, hugging and holding
};

//Setting the interaction way. (Can be done in smarter way, too lazy)
var stroking = false;
var hugging = false;
var holding = false;
var wakedUp = false;

//Moving Lights Array
var Lights = [];


function setup() {

  //Initialize Sliders and attach each slider to the right personality parameter
  initializeSliders();

  canvas = createCanvas(windowHeight*0.6, windowHeight*0.6).parent("Container");
  frameRate(60);

  //Create new moving lights
  Lights[0] = new Light(50, 50, 40,1, 1);
  Lights[1] = new Light(50, 50, 40,2, 1);
  Lights[2] = new Light(50, 50, 40,3, 1);
  Lights[3] = new Light(50, 50, 40,4, 0);
  Lights[4] = new Light(50, 50, 40,5, 0);

  //Set default sizes
  for(var i = 0; i < 5;i++){
    Lights[i].transX = width/2;
    Lights[i].transY = height/2;
    Lights[i].diameter = height*0.08;
  }

}


function draw(){

  background(48, 48, 54);



  //Center the canvas
  push();
  translate(width/2,height/2);


  noFill();
  strokeWeight(4);
  stroke('#6f6f6f');
  ellipse(0,0,height*0.9,height*0.9);   //Draw outline circle

  stroke(77, 77, 77, 70);
  ellipse(0,0,height*0.1,height*0.1);   //Draw hugging circle


  ellipse(height*0.9/2+ height*0.05,0,height*0.3,height*0.3);  //Draw right holding circle
  ellipse(-height*0.9/2 - height*0.05,0,height*0.3,height*0.3); //Draw right holding circle
  pop();

  //Draw each Light Dot
  for(var i = 0; i < 5;i++){
    push();

    //Light dots movement to specific place based on interaction
    let targetX = 0; //temporal value
    let targetY = 0;//temporal value

    if(stroking){ //if interaction is stroking
      targetX = mouseX;
      targetY = mouseY;
    }else if(holding){ //if interaction is holding

      //Direction shows to which direction left or right light needs to go when the person holds the device
      if(Lights[i].direction == 0){
        targetX = width/2 + height*0.9/2+ height*0.05;
        targetY = height/2;
      }else{
        targetX = width/2 -height*0.9/2 - height*0.05;
        targetY = height/2;
      }

    }else{ //do normal light movement when nothing is moving
      targetX = width/2;
      targetY = height/2;
    }

    // Move to the correct place depending on the interaction
    let dx = targetX - Lights[i].transX;
    Lights[i].transX += dx * animationParameters.easing;

    let dy = targetY - Lights[i].transY;
    Lights[i].transY += dy * animationParameters.easing;

    translate(Lights[i].transX,Lights[i].transY);
    Lights[i].display();

    pop();
  }


  //Draw the outer ellipse to hide the lights if they go out
  translate(width/2,height/2);
  noFill();
  strokeWeight(400);
  stroke(48, 48, 54);
  ellipse(0,0,height*0.9+400,height*0.9+400);

  frames = frames + animationParameters.speed;


  // Interaction part:
  if(mouseIsPressed && introFinished){

    if(!mouseWasPressed && millis() - mousePressedTime > 200){ //do the first
      mouseWasPressed = true;
              let d = int(dist(width/2, height/2, mouseX, mouseY)); //Distance between center and mouse
              let d1 = int(dist(width/2 + height*0.9/2 + height*0.05, height/2, mouseX, mouseY)); //Distance between left part and mouse
              let d2 = int(dist(width/2 -height*0.9/2 - height*0.05, height/2, mouseX, mouseY)); //Distance between right part and mouse


              if(d < height*0.9/2){ //If the mouse is inside of the bubble
                if(wakedUp){ //check if the device is waken up

                  if(d <height*0.1/2){ //HUGGING

                    //Define the correct Size
                    var s = map(Values.Extraversion, 0,100, 16,6);

                    anime({
                      targets: animationParameters,
                      closiness:0.3,
                      size:s,
                      easing: 'easeInOutSine',
                      duration: 500,
                      complete:function(anim){
                        console.log("Finished going up");
                      }
                    });
                    hugging = true;

                    interactionPara.innerHTML = "Hugging...";

                  }else if(d1 < (height*0.3)/2 ||  d2 < (height*0.3)/2){

                    console.log(d1, d2, height*0.3/2);

                    //Define the correct Size
                    var s = map(Values.Extraversion, 0,100, 12,4);

                    anime({
                      targets: animationParameters,
                      closiness:0.3,
                      size:s,
                      easing: 'easeInOutSine',
                      duration: 500,
                      complete:function(anim){
                        console.log("Finished IN");
                      }
                    });

                    interactionPara.innerHTML = "Holding...";
                    holding = true;
                  }
                  else{  // STROKING
                    animationParameters.easing = 0.06;

                    strokingAnimation = anime({
                      targets: animationParameters,
                      closiness:0.3,
                      easing: 'easeInOutSine',
                      duration: 500,
                      complete:function(anim){
                        console.log("Finished IN");
                      }
                    });
                    stroking = true;
                    interactionPara.innerHTML = "Stroking...";
                  }
                }

              } // height*0.9/2



    }
  }



}



var strokingAnimation; // Test to put animation into variable
var mousePressedTime = 0;
var mouseWasPressed = false;
function mousePressed() {

  let d = int(dist(width/2, height/2, mouseX, mouseY)); //Distance between center and mouse
  if(d < height*0.9/2){ //If the mouse is inside of the bubble
    mousePressedTime = millis();

    if(!wakedUp && introFinished){

      //Waking up
      anime({
        targets: animationParameters,
        alpha:1,
        easing: 'easeInOutSine',
        duration: 2000,
        complete:function(anim){
          wakedUp = true;

        }
      });

      anime({
        targets: '#tapMessage',
        opacity:0,
        easing: 'easeInOutSine',
        duration: 1000,
        complete:function(anim){
          if(document.getElementById("tapMessage") != undefined && document.getElementById("tapMessage") != null) document.getElementById("tapMessage").remove();
        }
      });

      anime({
        targets: '.text_output, .emotion_output, .interaction_output',
        opacity:1,
        easing: 'easeInOutSine',
        duration: 2000,
        complete:function(anim){

        }
      });


    }

  }
  //document.querySelector('.reverse-anim-demo .reverse').onclick = animation.reverse;

}



function mouseReleased() {
  mouseWasPressed = false;
  if(millis() - mousePressedTime < 200){
    interactionPara.innerHTML = "Tapping";
    console.log("Tap tap");
    anime({
      targets: animationParameters,
      easing: 'easeInOutSine',
      closiness:1.5,
        brightness:2,
      duration: 200,
      complete:function(anim){
        console.log("In Tapping");
        anime({
          targets: animationParameters,
          easing: 'easeInOutSine',
          closiness:1,
            brightness:1,
          duration: 400,
          complete:function(anim){
            console.log("Out Tappig");
            interactionPara.innerHTML = "-";
          }
        });
      }
    });

  }

  if(hugging){
    hugging = false;
    anime({
      targets: animationParameters,
      closiness:1,
      size:1,
      easing: 'easeInOutSine',
      duration: 1000,
      complete:function(anim){
        console.log("Finished IN");
      }
    });
   interactionPara.innerHTML = "-";
  }else if(stroking){
    stroking = false;
    animationParameters.easing = 0.01;
    strokingAnimation = anime({
      targets: animationParameters,
      closiness:1,
      easing: 'easeInOutSine',
      duration: 1000,
      complete:function(anim){
        console.log("Finished OUT");
      }
    });
    interactionPara.innerHTML = "-";
  }else if(holding){
    strokingAnimation = anime({
      targets: animationParameters,
      closiness:1,
      size:1,
      easing: 'easeInOutSine',
      duration: 1000,
      complete:function(anim){
        console.log("Finished OUT");
      }
    });

    holding = false;
      interactionPara.innerHTML = "-";
  }




}


// function keyPressed(){
//   if(key=='r'){
//     console.log("Reset");
//     var x = document.getElementsByClassName("icon1");
//     x[0].src = "assets/"+Wheels[0].getImgUrl(Wheels[0].getIndex());
//   }
// }




function windowResized() {
  console.log("Window resized");
//  resizeCanvas(windowWidth/2, windowWidth/3);
  //  Lights.resizeWheel();
}



function initializeSliders(){

  var sliderOpp = document.getElementById("sliderOpp");
  sliderOpp.oninput = function(event){
    var output = document.getElementById("valueOpp");
    output.innerHTML = sliderOpp.value;
    Values.Oppeness= sliderOpp.value;
  }

  var sliderCon = document.getElementById("sliderCon");
  sliderCon.oninput = function(event){
    var output = document.getElementById("valueCon");
    output.innerHTML = sliderCon.value;
    Values.Conscientiousness= sliderCon.value;
  }

  var sliderExt = document.getElementById("sliderExt");
  sliderExt.oninput = function(event){
    var output = document.getElementById("valueExt");
    output.innerHTML = sliderExt.value;
    Values.Extraversion= sliderExt.value;
  }

  var sliderAgr = document.getElementById("sliderAgr");
  sliderAgr.oninput = function(event){
    var output = document.getElementById("valueAgr");
    output.innerHTML = sliderAgr.value;
    Values.Agreeableness= sliderAgr.value;
  }

  var sliderNeu = document.getElementById("sliderNeu");
  sliderNeu.oninput = function(event){
    var output = document.getElementById("valueNeu");
    output.innerHTML = sliderNeu.value;
    Values.Neuroticism= sliderNeu.value;
  }
}
