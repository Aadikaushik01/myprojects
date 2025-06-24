let subject = document.getElementById("sub1");
let question = document.getElementById("question");
let submitBtn = document.querySelector(".bot");
let questionList = document.getElementById("question-list");
let right = document.getElementById("right");
let searchBox = document.getElementById("search");
let newQBtn = document.querySelector(".op button");

let questions = JSON.parse(localStorage.getItem("questions")) || []; 

// Create new question object
function createQuestion(subjectText, questionText) {
  return {
    id: Date.now(),
    subject: subjectText.trim(),
    question: questionText.trim(),
    answers: [],
  };
}

// Push question to array
function addQuestionToList(questionObj) {
  questions.push(questionObj);
  localStorage.setItem("questions", JSON.stringify(questions)); 
}

// Clear inputs
function clearInputs() {
  subject.value = "";
  question.value = "";
  subject.focus();
}

// Filter based on search
function getFilteredQuestions(searchText) {
  let trimmed = searchText.trim();
  if (trimmed === "") return questions;
  let regex = new RegExp(trimmed, "i");
  return questions.filter(q => regex.test(q.subject) || regex.test(q.question));
}

// Render questions
function renderQuestionList(filteredQuestions) {
  questionList.innerHTML = "";
  filteredQuestions.forEach(q => {
    let box = document.createElement("div");
    box.className = "question-card";
    box.style = "background:#f0f0f0; padding:10px; margin:10px 0; border-radius:5px; cursor:pointer;";
    box.innerHTML = `<h4>${q.subject}</h4><p>${q.question}</p>`;
    box.dataset.id = q.id;
    questionList.appendChild(box);
  });
}

// Show form
function renderFormArea() {
  right.innerHTML = `
    <h1>Welcome to the Discussion Portal</h1>
    <h5>Enter a subject and question to get started.</h5>
    <input type="text" id="sub1" placeholder="Subject..." />
    <textarea id="question" cols="30" rows="10" placeholder="Question"></textarea>
    <button class="bot">Submit</button>
  `;

  subject = document.getElementById("sub1");
  question = document.getElementById("question");
  subject.focus();

  document.querySelector(".bot").addEventListener("click", () => {
    if (!subject.value.trim()) {
      alert("Subject can't be empty or just spaces");
      subject.setSelectionRange(0, 0);
      subject.focus();
      return;
    }
    if (!question.value.trim()) {
      alert("Question can't be empty or just spaces");
      question.setSelectionRange(0, 0);
      question.focus();
      return;
    }
    let newQ = createQuestion(subject.value, question.value);
    addQuestionToList(newQ);
    renderQuestionList(getFilteredQuestions(searchBox.value));
    clearInputs();
  });
}

// Show full question card
function renderFullQuestionCard(questionObj) {
  right.innerHTML = `
    <h2>${questionObj.subject}</h2>
    <p>${questionObj.question}</p>

    <hr>
    <button id="deleteQuestion" style="margin-left:10px;float:right; background:blue; color:white;">Delete</button><br><br>

    <h3>Add Response</h3>
    <input id="name" placeholder="Enter your Name" style="width:100%"><br>
    <textarea id="comment" placeholder="Enter your Comment" style="width:100%; height:60px"></textarea><br>
    <hr>
    <button id="submitAnswer" style="float:right; background-color:blue;">Submit</button><br>

    <h4>Previous Names and Comments:</h4>
    <div id="answers"></div>
  `;

  let answerBox = document.getElementById("answers");
  questionObj.answers.forEach(a => {
    let div = document.createElement("div");
    div.style = "background:#fff; border:1px solid #ccc; margin:5px 0; padding:5px;";
    div.innerHTML = `<b>${a.name}</b><p>${a.comment}</p>`;
    answerBox.appendChild(div);
  });

  document.getElementById("submitAnswer").addEventListener("click", () => {
    let nameField = document.getElementById("name");
    let commentField = document.getElementById("comment");
    let name = nameField.value.trim();
    let comment = commentField.value.trim();

    if (!name) {
      alert("Name can't be empty or just spaces");
      nameField.setSelectionRange(0, 0);
      nameField.focus();
      return;
    }

    if (!comment) {
      alert("Comment can't be empty or just spaces");
      commentField.setSelectionRange(0, 0);
      commentField.focus();
      return;
    }

    addAnswerToQuestion(questionObj.id, name, comment);
    renderFullQuestionCard(questionObj);
    setTimeout(() => {
      document.getElementById("name").focus();
    }, 0);
  });

  document.getElementById("deleteQuestion").addEventListener("click", () => {
    removeQuestionById(questionObj.id);
    renderQuestionList(getFilteredQuestions(searchBox.value));
    renderFormArea();
  });

  document.getElementById("name").focus();
}

// Save answer
function addAnswerToQuestion(qId, name, comment) {
  let q = questions.find(q => q.id == qId);
  if (q) {
    q.answers.push({ name, comment });
    localStorage.setItem("questions", JSON.stringify(questions)); 
  }
}

// Remove question
function removeQuestionById(qId) {
  let index = questions.findIndex(q => q.id == qId);
  if (index !== -1) {
    questions.splice(index, 1);
    localStorage.setItem("questions", JSON.stringify(questions)); 
  }
}

// Event Listeners

submitBtn.addEventListener("click", () => {
  if (!subject.value.trim()) {
    alert("Subject can't be empty or just spaces");
    subject.setSelectionRange(0, 0);
    subject.focus();
    return;
  }
  if (!question.value.trim()) {
    alert("Question can't be empty or just spaces");
    question.setSelectionRange(0, 0);
    question.focus();
    return;
  }
  let newQ = createQuestion(subject.value, question.value);
  addQuestionToList(newQ);
  renderQuestionList(getFilteredQuestions(searchBox.value));
  clearInputs();
});

searchBox.addEventListener("input", () => {
  renderQuestionList(getFilteredQuestions(searchBox.value));
});

newQBtn.addEventListener("click", () => {
  renderFormArea();
});

questionList.addEventListener("click", e => {
  if (e.target.closest(".question-card")) {
    let id = Number(e.target.closest(".question-card").dataset.id);
    let q = questions.find(q => q.id == id);
    if (q) renderFullQuestionCard(q);
  }
});

// Initial render
renderQuestionList(getFilteredQuestions(searchBox.value));
