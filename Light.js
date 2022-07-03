
//Some coeficients and limitations
var minimumColorAmount = 60;





class Light {

  constructor(x, y, diameter, index, direction) {
    this.diameter = diameter;
    this.x = x+ index*20;
    this.y = y+ index*20;
    this.transX = width/2;
    this.transY = height/2;

    this.index = index;
    this.direction = direction;

    this.xoff = 0.0;
    this.yoff = 0.0;
  }




  display() {

    var secondBrightness =  0;

    if(this.direction == 0) secondBrightness = animationParameters.firstBrightness;
    else secondBrightness = animationParameters.secondBrightness;

    var d = this.diameter * map(Values.Extraversion, 0,100,0.5,1.5) * animationParameters.size;

    var red = constrain( map(Values.Neuroticism, 0,100,0,255) * map(Values.Oppeness, 0,100,0.5,1)* animationParameters.brightness * secondBrightness, 0,255) ;
    var blue = constrain( map(Values.Conscientiousness, 0,100,0,255) * map(Values.Oppeness, 0,100,0.5,1)* animationParameters.brightness * secondBrightness, 0,255);
    var green = constrain(  map(Values.Agreeableness, 0,100,0,255) * map(Values.Oppeness, 0,100,0.5,1)* animationParameters.brightness* secondBrightness, 0,255);
    var speed =  map(Values.Extraversion, 0,100, 20,80)*0.001 ;
    var offset = this.index * 50;
    this.xoff = this.xoff + 0.001;
    this.yoff = this.yoff + 0.001;

    noStroke();

    this.x = sin((offset+frames)*speed)*(50*animationParameters.closiness)+sin(offset+frameCount*0.1*speed) * (map(Values.Neuroticism, 0,100,1,100) * animationParameters.wiggleness * animationParameters.closiness);
    this.y = cos((offset+frames)*speed)*(50*animationParameters.closiness)+sin(offset+frameCount*0.5*speed) * (map(Values.Neuroticism, 0,100,1,100) * animationParameters.wiggleness * animationParameters.closiness);




      for(var i = 0; i < 10; i++){
        var a = map(i,0,10,10,255);
          fill(red,green,blue,a* animationParameters.alpha);
          var diff = map(i,0,10,1,d);
          ellipse(this.x,this.y, d-diff, d-diff);
      }


  }// display



  isMouseOver() {

  }

isPressed(){

}
isReleased(){

}



}//Light CLASS
