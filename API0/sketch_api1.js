let bubbles = [];
let canvas;
let h1;
let slider;
let b1;
let astroData;
let txtband;
let txtsong;
let txtsearch;

function setup() {
  canvas = createCanvas(400, 400);
  //canvas.position(0,0);
  h1 = createElement("h1", "TEST");
  b1 = createButton("TEST!");
  b1.mousePressed(button1MousePress);
  b1.mouseOver(button1MouseOver);
  b1.mouseOut(button1MouseOut);
  slider = createSlider(1, 50, 50);


    for (let i = 0; i < 120; i++)
        bubbles[i] = new Bubble(200, 100, random(5, 10));

    
    // API
    
    let button = select('#submit');
    button.mousePressed(fetchData);
    let button2 = select('#submit2');
    button2.mousePressed(fetchData2);
    txtband = select('#band');
    txtsong = select('#song');
    txtsearch = select('#searchterm');
    
}

function fetchData(){
   
    
    loadJSON("https://private-anon-932ab6093f-lyricsovh.apiary-proxy.com/v1/" + txtband.value() + "/" + txtsong.value(), gotData, gotErr);
}

function fetchData2(){       
    loadJSON("http://api.giphy.com/v1/gifs/search?api_key=SG4i8RiKipm8Rxsj1NHxBgz1uxqizgNp&q=" + txtsearch.value() +"&limit=25&offset=0&rating=G&lang=en", gotGIPHYData, gotErr);
}

function gotData(data){
    astroData = data;
    createP(astroData.lyrics);
}

function gotGIPHYData(data){
    astroData = data;
    //console.log(astroData.data[1].images.downsized.url);
    createImg(astroData.data[1].images.downsized.url,'no_img','secure');
}

function gotErr(errdata){
    createP("No lyrics found");
}

function draw() {

  background(57);
/*
    if (astroData)
    {
        //let img = loadImage(astroData.data[0].embed_url);        
        //image(img, 10, 10, 50, 50);
    }
    

  for (let b of bubbles) {
    b.changeSize(slider.value());
    b.move(5);
    let intsersects = false;
    for (let b2 of bubbles) {
      if (b !== b2 && b.intersects(b2))
        intsersects = true;
    }
    if (intsersects)
      b.changeColor(color('red'));
    else
      b.changeColor(color('#FFFFF'));
    b.show();
  }

  today = new Date();
  h1.html(today);
*/
}

function button1MousePress() {
  clear();
  createP("button1MousePress");
}

function button1MouseOver() {
  b1.html("Push me!");
}

function button1MouseOut() {
  b1.html("Out");
}


// ---------------------------------------

class Bubble {
  constructor(px, py, pdiam, pcolor = color('#FF0F1F')) {
    this.x = px;
    this.y = py;
    this.r = pdiam / 2;
    this.color = pcolor;
  }

  changeSize(psize) {
    this.r = psize;
  }

  show() {
    noStroke();
    fill(this.color);
    ellipse(this.x, this.y, this.r * 2, this.r * 2);
  }

  move(pspeed) {
    this.x += random(-pspeed, pspeed);
    this.y += random(-pspeed, pspeed);
  }

  intersects(pbubble) {
    return (this.r + pbubble.r > dist(this.x, this.y, pbubble.x, pbubble.y))
  }

  changeColor(pnewcolor) {
    this.color = pnewcolor;
  }

}