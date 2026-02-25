let questions=[];
let index=0;
let score=0;

fetch("questions.csv")
.then(r=>r.text())
.then(data=>{
  questions=data.split("\n").slice(1);
  ask();
});

function ask(){
  addBot(questions[index]);
}

function answer(val){
  score+=val;
  addUser(getText(val));
  index++;

  if(index<questions.length){
    ask();
  }else{
    result();
  }
}

function getText(v){
  if(v==1) return "Never";
  if(v==2) return "Sometimes";
  if(v==3) return "Often";
  return "Almost Always";
}

function result(){
  let avg=score/questions.length;

  let level="";
  if(avg>=3.5) level="High Risk";
  else if(avg>=2.5) level="Moderate Risk";
  else if(avg>=1.5) level="Mild Stress";
  else level="Low Risk";

  addBot("Assessment Completed");
  addBot("Risk Level: "+level);
}

function addBot(text){
  let div=document.createElement("div");
  div.className="bot";
  div.innerText=text;
  document.getElementById("chat").appendChild(div);
}

function addUser(text){
  let div=document.createElement("div");
  div.className="user";
  div.innerText=text;
  document.getElementById("chat").appendChild(div);
}