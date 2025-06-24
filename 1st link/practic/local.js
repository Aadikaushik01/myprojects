// Simple Q&A App - Written like a 10th grade student

let subject = document.getElementById("sub1");
let question = document.getElementById("question");
let submitBtn = document.querySelector(".bot");
let questionList = document.getElementById("question-list");
let right = document.getElementById("right");
let searchBox = document.getElementById("search");
let newQBtn = document.querySelector(".op button");

let questions = JSON.parse(localStorage.getItem("questions")) || [];

submitBtn.addEventListener("click", function () {
  if (subject.value.trim() === "" || question.value.trim() === "") {
    alert("Please fill out both fields.");
    return;
  }
  let newQuestion = {
    id: Date.now(),
    subject: subject.value.trim(),
    question: question.value.trim(),
    answers: []
  };
  questions.push(newQuestion);
  localStorage.setItem("questions", JSON.stringify(questions));
  showQuestions(searchBox.value);
  subject.value = "";
  question.value = "";
});

searchBox.addEventListener("input", function () {
  showQuestions(searchBox.value);
});

newQBtn.addEventListener("click", function () {
  right.innerHTML = `
    <h1>Welcome to the Discussion Portal</h1>
    <h5>Enter a subject and question to get started.</h5>
    <input type="text" id="sub1" placeholder="Subject..." />
    <textarea id="question" cols="30" rows="10" placeholder="Question"></textarea>
    <button class="bot">Submit</button>
  `;

  subject = document.getElementById("sub1");
  question = document.getElementById("question");
  document.querySelector(".bot").addEventListener("click", function () {
    if (subject.value.trim() === "" || question.value.trim() === "") {
      alert("Please fill out both fields.");
      return;
    }
    let newQuestion = {
      id: Date.now(),
      subject: subject.value.trim(),
      question: question.value.trim(),
      answers: []
    };
    questions.push(newQuestion);
    localStorage.setItem("questions", JSON.stringify(questions));
    showQuestions(searchBox.value);
    subject.value = "";
    question.value = "";
  });
});

function showQuestions(searchText) {
  questionList.innerHTML = "";
  let regex = new RegExp(searchText.trim(), "i");
  questions.forEach(function (q) {
    if (searchText.trim() === "" || regex.test(q.subject) || regex.test(q.question)) {
      let box = document.createElement("div");
      box.className = "question-card";
      box.id = "question-" + q.id;
      box.style = "background:#f0f0f0; padding:10px; margin:10px 0; border-radius:5px; cursor:pointer;";
      box.innerHTML = `<h4>${q.subject}</h4><p>${q.question}</p>`;
      box.dataset.id = q.id;
      questionList.appendChild(box);
    }
  });
}

questionList.addEventListener("click", function (e) {
  let card = e.target.closest(".question-card");
  if (card) {
    let id = Number(card.dataset.id);
    let selected = questions.find(q => q.id === id);
    if (selected) {
      right.innerHTML = `
        <h2>${selected.subject}</h2>
        <p>${selected.question}</p>
        <hr>
        <button id="deleteQuestion" style="float:right; background:blue; color:white;">Delete</button><br><br>
        <h3>Add Response</h3>
        <input id="name" placeholder="Enter your Name" style="width:100%"><br>
        <textarea id="comment" placeholder="Enter your Comment" style="width:100%; height:60px"></textarea><br>
        <hr>
        <button id="submitAnswer" style="float:right; background-color:blue; color:white;">Submit</button><br>
        <h4>Responses :</h4>
        <div id="answers"></div>
      `;

      let answerBox = document.getElementById("answers");
      selected.answers.forEach(function (ans) {
        let div = document.createElement("div");
        div.style = "background:#fff; border:1px solid #ccc; margin:5px 0; padding:5px;";
        div.innerHTML = `
          <b>${ans.name}</b>
          <p>${ans.comment}</p>
          <button class="like-btn">Like ${ans.likes || 0}</button>
          <button class="dislike-btn">Dislike ${ans.dislikes || 0}</button>
        `;
        answerBox.appendChild(div);

        let likeBtn = div.querySelector(".like-btn");
        likeBtn.addEventListener("click", function () {
          ans.likes = (ans.likes || 0) + 1;
          localStorage.setItem("questions", JSON.stringify(questions));
          likeBtn.innerText = `Like ${ans.likes}`;
        });

        let dislikeBtn = div.querySelector(".dislike-btn");
        dislikeBtn.addEventListener("click", function () {
          ans.dislikes = (ans.dislikes || 0) + 1;
          localStorage.setItem("questions", JSON.stringify(questions));
          dislikeBtn.innerText = `Dislike ${ans.dislikes}`;
        });
      });

      document.getElementById("submitAnswer").addEventListener("click", function () {
        let name = document.getElementById("name").value.trim();
        let comment = document.getElementById("comment").value.trim();
        if (!name || !comment) {
          alert("Please fill out both name and comment.");
          return;
        }
        selected.answers.push({
          id: Date.now(),
          name: name,
          comment: comment,
          likes: 0,
          dislikes: 0
        });
        localStorage.setItem("questions", JSON.stringify(questions));
        let event = new Event("click");
        card.dispatchEvent(event); // Re-open same card
      });

      document.getElementById("deleteQuestion").addEventListener("click", function () {
        questions = questions.filter(q => q.id !== selected.id);
        localStorage.setItem("questions", JSON.stringify(questions));
        document.getElementById("question-" + selected.id).remove();
        right.innerHTML = "";
      });
    }
  }
});

// Load all questions at start
showQuestions("");
