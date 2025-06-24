let subject = document.getElementById("sub1");
let question = document.getElementById("question");
let submitBtn = document.querySelector(".bot");
let questionList = document.getElementById("question-list");
let right = document.getElementById("right");
let searchBox = document.getElementById("search");
let newQBtn = document.querySelector(".op button");

let questions = JSON.parse(localStorage.getItem("questions")) || [];

function getRelativeTime(timestamp) {
  const now = Date.now();
  const diff = now - timestamp;

  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (seconds < 60) return "Just now";
  if (minutes < 60) return minutes + " minutes ago";
  if (hours < 24) return hours + " hours ago";
  if (days < 7) return days + " days ago";

  let date = new Date(timestamp);
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();
  return day + "/" + month + "/" + year;
}

function createQuestion(subjectText, questionText) {
  return {
    id: Date.now(),
    subject: subjectText.trim(),
    question: questionText.trim(),
    answers: [],
    time: Date.now()
  };
}

function addQuestionToList(questionObj) {
  questions.push(questionObj);
  localStorage.setItem("questions", JSON.stringify(questions));
}

function clearInputs() {
  subject.value = "";
  question.value = "";
}

function getFilteredQuestions(searchText) {
  let trimmed = searchText.trim().toLowerCase();
  if (trimmed == "") return questions;
  return questions.filter(q =>
    q.subject.toLowerCase().includes(trimmed) ||
    q.question.toLowerCase().includes(trimmed)
  );
}

function renderQuestionList(filteredQuestions) {
  questionList.innerHTML = "";
  filteredQuestions.forEach(q => {
    let box = document.createElement("div");
    box.className = "question-card";
    box.id = `question-${q.id}`;
    box.style = "background:#f0f0f0; padding:10px; margin:10px 0; border-radius:5px; cursor:pointer;";
    box.innerHTML = `
      <h4>${q.subject}</h4>
      <p>${q.question}</p>
      <small style="color:gray;">Task added time: ${getRelativeTime(q.time)}</small>
    `;
    box.dataset.id = q.id;
    questionList.appendChild(box);
  });
}

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

  document.querySelector(".bot").addEventListener("click", () => {
    if (!subject.value.trim() || !question.value.trim()) {
      alert("Please fill out both fields.");
      return;
    }

    let newQ = createQuestion(subject.value, question.value);
    addQuestionToList(newQ);
    renderQuestionList(getFilteredQuestions(searchBox.value));
    clearInputs();
  });
}

function renderFullQuestionCard(questionObj) {
  right.innerHTML = `
    <h2>${questionObj.subject}</h2>
    <p>${questionObj.question}</p>
    <small style="color:gray;">Posted Time: ${getRelativeTime(questionObj.time)}</small>
    <hr>
    <button id="deleteQuestion" style="margin-left:10px;float:right; background:blue; color:white;">Delete</button><br><br>

    <h3>Add Response</h3>
    <input id="name" placeholder="Enter your Name" style="width:100%"><br>
    <textarea id="comment" placeholder="Enter your Comment" style="width:100%; height:60px"></textarea><br>
    <hr>
    <button id="submitAnswer" style="float:right; background-color:blue; color:white;">Submit</button><br>

    <h4>Responses :</h4>
    <div id="answers"></div>
  `;

  let answerBox = document.getElementById("answers");

  let sortedAnswers = [...questionObj.answers].sort((a, b) => {
    let priorityA = (a.likes || 0) - (a.dislikes || 0);
    let priorityB = (b.likes || 0) - (b.dislikes || 0);
    return priorityB - priorityA;
  });

  sortedAnswers.forEach(answer => {
    let likeCount = answer.likes || 0;
    let dislikeCount = answer.dislikes || 0;

    let div = document.createElement("div");
    div.style = "background:#fff; border:1px solid #ccc; margin:5px 0; padding:5px;";
    div.id = `answer-${questionObj.id}-${answer.id}`;
    div.innerHTML = `
      <b>${answer.name}</b> 
      <small style="color:gray; float:right;">Response time: ${getRelativeTime(answer.time)}</small>
      <p style="clear:both;">${answer.comment}</p>
      <button class="like-btn">like <span>${likeCount}</span></button>
      <button class="dislike-btn">dislike <span>${dislikeCount}</span></button>
    `;

    const likeBtn = div.querySelector(".like-btn");
    const dislikeBtn = div.querySelector(".dislike-btn");

    likeBtn.addEventListener("click", () => {
      likeCount++;
      likeBtn.querySelector("span").innerText = likeCount;
      answer.likes = likeCount;
      localStorage.setItem("questions", JSON.stringify(questions));
      renderFullQuestionCard(questionObj);
    });

    dislikeBtn.addEventListener("click", () => {
      dislikeCount++;
      dislikeBtn.querySelector("span").innerText = dislikeCount;
      answer.dislikes = dislikeCount;
      localStorage.setItem("questions", JSON.stringify(questions));
      renderFullQuestionCard(questionObj);
    });

    answerBox.appendChild(div);
  });

  document.getElementById("submitAnswer").addEventListener("click", () => {
    let name = document.getElementById("name").value.trim();
    let comment = document.getElementById("comment").value.trim();
    if (!name || !comment) {
      alert("Please fill out both name and comment.");
      return;
    }
    addAnswerToQuestion(questionObj.id, name, comment);
    let updated = questions.find(q => q.id === questionObj.id);
    renderFullQuestionCard(updated);
  });

  document.getElementById("deleteQuestion").addEventListener("click", () => {
    removeQuestionById(questionObj.id);
    let card = document.getElementById(`question-${questionObj.id}`);
    if (card) card.remove();
    right.innerHTML = "";
  });
}

function addAnswerToQuestion(qId, name, comment) {
  let question = questions.find(q => q.id == qId);
  if (question) {
    question.answers.push({
      id: Date.now(),
      name,
      comment,
      likes: 0,
      dislikes: 0,
      time: Date.now()
    });
    localStorage.setItem("questions", JSON.stringify(questions));
  }
}

function removeQuestionById(qId) {
  questions = questions.filter(q => q.id !== qId);
  localStorage.setItem("questions", JSON.stringify(questions));
}

submitBtn.addEventListener("click", () => {
  if (!subject.value.trim() || !question.value.trim()) {
    alert("Please fill out both fields.");
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
  let card = e.target.closest(".question-card");
  if (card) {
    let id = Number(card.dataset.id);
    let question = questions.find(q => q.id == id);
    if (question) {
      renderFullQuestionCard(question);
    }
  }
});

renderQuestionList(getFilteredQuestions(searchBox.value));
