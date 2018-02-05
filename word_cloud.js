
var canvas = document.getElementById('canvas'),
ctx = canvas.getContext('2d');
//ctx.fillStyle = "black";
var grd = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
grd.addColorStop(0, '#000000');   
grd.addColorStop(1, '#004CB3');
ctx.fillStyle = grd;
//context.fill();
ctx.fillRect(0, 0, canvas.width, canvas.height);
ctx.globalCompositeOperation='source-atop';
class Word{
    constructor(content,position,oritation,size,fillStyle="red",font="Comic Sans MS"){
       this.content=content;
       this.position=position;
       this.fillStyle=fillStyle;
       this.oritation=oritation;
       this.size=size;
       this.font=font;
    }
    font_width(){
        ctx.save();
        let font=this.size+"px "+this.font;
        ctx.font=font;
        let size = Math.ceil(ctx.measureText(this.content).width/this.content.length);
        ctx.restore();
        return size;
    }
    draw(){
        ctx.save();
        ctx.fillStyle=this.fillStyle;
        ctx.textAlign = "start";
        let font=this.size+"px "+this.font;
        ctx.font=font;
        if(this.oritation=='vertical'){
            ctx.translate(this.position.x,this.position.y);
            ctx.rotate(Math.PI/2);
            //let size = this.font_width();
            ctx.fillText(this.content,0,0);
        }
        else{
            ctx.fillText(this.content,this.position.x,this.position.y+this.size*0.7);
        }
        ctx.restore();
    }
    output(){
        console.log(this.content,this.oritation,this.position.x,this.position.y,this.size*this.content.length);
    }
    
    static word_width(content,txt_size,font="Comic Sans MS"){
        ctx.save();
        let temp_font=txt_size+"px "+font;
        ctx.font=temp_font;
        let size = Math.ceil(ctx.measureText(content).width/content.length);
        ctx.restore();
        return size;
    }
}
var words=[{weight: 0.15, str: "000 year"},{weight: 0.15, str: "let prove"},{weight: 0.15, str: "prove love"},{weight: 0.15, str: "early vote"},{weight: 0.15, str: "flotus trump"},{weight: 0.15, str: "north carolina"},{weight: 0.15, str: "trump wants"},{weight: 0.15, str: "millions americans"},{weight: 0.15, str: "trumps hate"},{weight: 0.15, str: "middle class"},{weight: 0.15, str: "hillary live"},{weight: 0.16, str: "trump doesn"},{weight: 0.16, str: "tonight debate"},{weight: 0.16, str: "watch hillary"},{weight: 0.16, str: "million people"},{weight: 0.16, str: "don want"},{weight: 0.16, str: "vote today"},{weight: 0.16, str: "ready vote"},{weight: 0.16, str: "vote potus"},{weight: 0.16, str: "america great"},{weight: 0.16, str: "progress ballot"},{weight: 0.16, str: "make history"},{weight: 0.16, str: "let make"},{weight: 0.16, str: "night debate"},{weight: 0.16, str: "nuclear weapons"},{weight: 0.16, str: "trump said"},{weight: 0.16, str: "health care"},{weight: 0.16, str: "president united"},{weight: 0.17, str: "commander chief"},{weight: 0.17, str: "30 years"},{weight: 0.17, str: "united states"},{weight: 0.17, str: "want president"},{weight: 0.17, str: "days election"},{weight: 0.17, str: "potus hillary"},{weight: 0.18, str: "make plan"},{weight: 0.18, str: "white house"},{weight: 0.18, str: "climate change"},{weight: 0.19, str: "days left"},{weight: 0.19, str: "vote hillary"},{weight: 0.19, str: "plan vote"},{weight: 0.20, str: "just days"},{weight: 0.20, str: "ve got"},{weight: 0.21, str: "hillary trump"},{weight: 0.21, str: "join hillary"},{weight: 0.21, str: "mike pence"},{weight: 0.22, str: "watch live"},{weight: 0.25, str: "make sure"},{weight: 0.25, str: "election day"},{weight: 0.30, str: "hillary clinton"},{weight: 0.65, str: "donald trump"}];
var draw_words=[];
console.log("words length",words.length);

function drawRect(position,width,height){
ctx.save();
ctx.fillStyle = "green";
ctx.fillRect(position.x, position.y, width, height);
ctx.restore();
}
var WIDTH=800;
var MAX_DEPTH=Math.floor(Math.log2(words.length)/2);
function render(top_left,bottom_right,depth){
if(words.length==0) return;
if(depth==MAX_DEPTH+1){if(Math.random()>0.8) return;}
if(depth>MAX_DEPTH+1) return;
let content=words.pop();
let width = bottom_right.x-top_left.x;
let height = bottom_right.y-top_left.y;
let word=content.str;
let weight=content.weight;
if(Math.max(width,height)<WIDTH*weight) {words.push(content);return;}
let txt_size =weight*WIDTH*2/word.length;
let size = Word.word_width(word,txt_size);
if(Math.min(width,height)<size*1.2){words.push(content);return;}
if(height>width){
let x=Math.floor((width-size*1.2)*0.5)+top_left.x;
let y=Math.floor((height-size*word.length)*0.5)+top_left.y;
draw_words.push(new Word(word,{x,y},"vertical",txt_size,"#"+((1<<24)*Math.random()|0).toString(16)));
render(top_left,{x:bottom_right.x,y:y},depth+1);
render({x:top_left.x,y:y},{x:x,y:y+size*word.length},depth+1);
render({x:top_left.x,y:y+size*word.length},bottom_right,depth+1);
render({x:x+size*1.2,y:y},{x:bottom_right.x,y:y+size*word.length},depth+1);
}
else{
    let x=Math.floor((width-size*word.length)*0.4+top_left.x);
    let y=Math.floor((height-size*1.2)*0.5+top_left.y);
    draw_words.push(new Word(word,{x,y},"horizontal",txt_size,"#"+((1<<24)*Math.random()|0).toString(16)));
    render({x:x,y:y+1.2*size},{x:x+word.length*size,y:bottom_right.y},depth+1);
    render(top_left,{x:x,y:bottom_right.y},depth+1);
    render({x:x,y:top_left.y},{x:size*word.length+x,y:y},depth+1);
    render({x:x+word.length*size,y:top_left.y},bottom_right,depth+1);
    
    
}
}
render({x:0,y:0},{x:800,y:600},0);
console.log(draw_words.length);
for(let i=0;i<draw_words.length;i++){
draw_words[i].draw();
}