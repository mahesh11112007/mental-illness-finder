let allQuestions = [];
let selectedQuestions = [];

fetch("questions.csv")
.then(r => r.text())
.then(data => {
  let rows = data.split("\n").slice(1);
  allQuestions = rows.filter(q => q.trim() !== "");
  shuffleAndSelect();
  renderQuestions();
});

function shuffleAndSelect(){
  allQuestions.sort(() => 0.5 - Math.random());
  selectedQuestions = allQuestions.slice(0,20);
}

function renderQuestions(){
  const container = document.getElementById("questions");
  container.innerHTML = "";

  selectedQuestions.forEach((q,i)=>{
    container.innerHTML += `
      <div class="question">
        ${i+1}. ${q}
        <select required>
          <option value="">Select</option>
          <option value="1">Never</option>
          <option value="2">Rarely</option>
          <option value="3">Sometimes</option>
          <option value="4">Often</option>
          <option value="5">Always</option>
        </select>
      </div>
    `;
  });

  document.getElementById("bar").style.width = "100%";
}

document.getElementById("quiz").onsubmit = function(e){
  e.preventDefault();

  let total = 0;
  document.querySelectorAll("select").forEach(s=>{
    total += parseInt(s.value);
  });

  let avg = total / selectedQuestions.length;

  let result = "";
  if(avg >= 4) result = "High Risk";
  else if(avg >= 3) result = "Moderate Risk";
  else if(avg >= 2) result = "Mild Stress";
  else result = "Low Risk";

  document.getElementById("result").innerHTML =
  `<b>Assessment Result:</b> ${result}
   <br><small>This is a prototype screening tool.</small>`;
}

function toggleSettings(){
  let s = document.getElementById("settings");
  s.style.display = s.style.display === "block" ? "none" : "block";
}