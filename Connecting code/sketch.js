
var serial;
var portName = '/dev/cu.usbmodem14201';
var inData;
var switch1;
var switch2;
var switch3;
var switch4;
var switch5;
var switch6;
var switch7;
var switch8;
var switch9;

var final = [switch1,switch2,switch3,switch4,switch5,switch6,switch7,switch8,switch9];

//mapped values variable
var fixed = [];

//mapping
var max;// = [-100.0,-100.0,-100.0,-100.0,-100.0,-100.0,-100.0,-100.0,-100.0];
var min;// = [100.0,100.0,100.0,100.0,100.0,100.0,100.0,100.0,100.0];

//sliders
var slidernumber;
var sliderSize = 30;
var sliderY;
var sliderSpacing;

function setup() {
  createCanvas(window.innerHeight*4/3, window.innerHeight);
  background(255);
  ellipseMode(RADIUS);
  strokeWeight(0);

  serial = new p5.SerialPort();
  serial.on('list', printList);
  serial.on('connected', serverConnected);
  serial.on('open', portOpen);
  serial.on('data', serialEvent);
  serial.on('error', serialError);
  serial.on('close', portClose);
 
 serial.list();
 serial.open(portName);

max = [-100.0,-100.0,-100.0,-100.0,-100.0,-100.0,-100.0,-100.0,-100.0];
min = [100.0,100.0,100.0,100.0,100.0,100.0,100.0,100.0,100.0];

}

////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

function draw() {
  background(100);

  final = [switch1,switch2,switch3,switch4,switch5,switch6,switch7,switch8,switch9];



//constant calibration

  for(var i=0;i<9;i++){

    if(final[i] >= max[i]){
      max[i] = final[i];
    }
    if(final[i] <= min[i]){
      min[i] = final[i];
    }

  }





console.log(final[0],min[0]);

// console.log("min: " + min);
// console.log("max: " + max);


  // console.log(switch1,switch2,switch3,switch4,switch5,switch6,switch7,switch8,switch9);
  // console.log(final,final,final,final,final,final,final,final,final);

  // console.log(final[0],final[1],final[2],final[3],final[4],final[5],final[6],final[7],final[8]);


  for(var i = 0;i<9;i++){
    // sliderY = map(final[i],-4,4,0+width/18,height-width/18,true);
    sliderY = map(final[i], min[i], max[i]  ,0+width/18,height-width/18);



    sliderSpacing = (i*width/9) + (width/18);
    strokeWeight(sliderSize*2);
    stroke(50);
    line(sliderSpacing, 0+width/18, sliderSpacing, height-width/(2*9));
    strokeWeight(0);



    ellipse(sliderSpacing,sliderY,sliderSize);



  }






}

































 
 function serverConnected(){
  console.log('connected to server.');
}
function portOpen() {
  console.log('the serial port opened.')
}
function serialEvent() {
  // read a string from the serial port
  // until you get carriage return and newline:
  var inString = serial.readStringUntil('\r\n');

  //check to see that there's actually a string there:
  if (inString.length > 0 ) {
    var sensors = split(inString, ',');
    if (sensors.length > 8) {
      switch1 = sensors[0];
      switch2 = sensors[1];
      switch3 = sensors[2];
      switch4 = sensors[3];
      switch5 = sensors[4];
      switch6 = sensors[5];
      switch7 = sensors[6];
      switch8 = sensors[7];
      switch9 = sensors[8];

    }
  }
}
function serialError(err) {
  console.log('Something went wrong with the serial port. ' + err);
}
function portClose() {
  console.log('The serial port closed.');
}
// get the list of ports:
function printList(portList) {
 // portList is an array of serial port names
 for (var i = 0; i < portList.length; i++) {
 // Display the list the console:
 console.log(i + " " + portList[i]);
 }
}
