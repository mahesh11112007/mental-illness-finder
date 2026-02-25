const questions = {

q1:{q:"Do you feel mentally exhausted most days?",
A:{t:"Yes",n:"q2"}, B:{t:"No",n:"q3"}},

q2:{q:"Do you have trouble sleeping?",
A:{t:"Yes",n:"q4"}, B:{t:"No",n:"q5"}},

q3:{q:"Do you feel motivated at work?",
A:{t:"Yes",n:"q6"}, B:{t:"No",n:"q4"}},

q4:{q:"Do you feel hopeless or sad often?",
A:{t:"Yes",n:"q7"}, B:{t:"No",n:"q8"}},

q5:{q:"Do you feel irritated easily?",
A:{t:"Yes",n:"q7"}, B:{t:"No",n:"q6"}},

q6:{q:"Do you struggle to concentrate?",
A:{t:"Yes",n:"q8"}, B:{t:"No",n:"q9"}},

q7:{q:"Do you feel life is meaningless?",
A:{t:"Yes",n:"DEP"}, B:{t:"No",n:"q10"}},

q8:{q:"Do you feel nervous or panicky?",
A:{t:"Yes",n:"ANX"}, B:{t:"No",n:"q9"}},

q9:{q:"Do you feel tired even after rest?",
A:{t:"Yes",n:"BUR"}, B:{t:"No",n:"q10"}},

q10:{q:"Do you enjoy daily activities?",
A:{t:"Yes",n:"OK"}, B:{t:"No",n:"q11"}},

q11:{q:"Do you avoid social interaction?",
A:{t:"Yes",n:"DEP"}, B:{t:"No",n:"q12"}},

q12:{q:"Do you worry excessively?",
A:{t:"Yes",n:"ANX"}, B:{t:"No",n:"STR"}}
};

let asked = new Set();   // <-- prevents repeats

function show(id){

 if(id==="DEP") return result("Depression Risk");
 if(id==="ANX") return result("Anxiety Risk");
 if(id==="BUR") return result("Burnout Risk");
 if(id==="STR") return result("Mild Stress");
 if(id==="OK")  return result("Normal Mental Health");

 if(asked.has(id)){
   return result("Assessment Completed");
 }

 asked.add(id);

 let q = questions[id];

 document.getElementById("card").innerHTML = `
   <h2>${q.q}</h2>
   <button onclick="show('${q.A.n}')">${q.A.t}</button>
   <button onclick="show('${q.B.n}')">${q.B.t}</button>
 `;
}

function result(text){

 let msg="";
 if(text==="Depression Risk")
   msg="Talk to counselor, exercise, fixed sleep routine.";
 else if(text==="Anxiety Risk")
   msg="Breathing exercises, meditation, reduce caffeine.";
 else if(text==="Burnout Risk")
   msg="Take breaks, reduce workload, rest well.";
 else if(text==="Mild Stress")
   msg="Yoga, time management, relaxation.";
 else if(text==="Normal Mental Health")
   msg="You seem mentally healthy.";
 else
   msg="Thank you for completing the assessment.";

 document.getElementById("card").innerHTML = `
   <h2>${text}</h2>
   <p>${msg}</p>
   <button onclick="restart()">Restart</button>
 `;
}

function restart(){
 asked.clear();
 show("q1");
}

show("q1");