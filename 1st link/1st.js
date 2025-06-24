
let flag = 0;

const toggle_show = function (e) {
  let show = document.getElementById("show");
  show.classList.toggle("ddisplay");
};

const updateSerialNumbers = () => {
  let rows = document.querySelectorAll("#table tr");
  rows.forEach((row, index) => {
    if (index > 0) {
      row.children[0].textContent = index;
    }
  });
};

let edu = document.getElementById("education");
edu.addEventListener("click", toggle_show);

let sub = document.getElementById("sub");
sub.addEventListener("click", (e) => {
  let table = document.getElementById("table");
  let degree = document.getElementById("degree");
  let year = document.getElementById("year");
  let reg = document.getElementById("reg");
  let univ = document.getElementById("univ");

  if (degree.value == '' || year.value == '' || reg.value == '' || univ.value == '') {
    alert("FILL ALL THE GIVEN FIELDS");
    return;
  }

  table.classList.remove("ddisplay");

  if (flag != 0) {
    let rows = document.querySelectorAll("#table tr");
    rows.forEach((row, index) => {
      if (flag == row.children[0].textContent) {
        row.children[1].textContent = degree.value;
        row.children[2].textContent = year.value;
        row.children[3].textContent = reg.value;
        row.children[4].textContent = univ.value;
        flag = 0;
      }
    });
  } else {
    table.innerHTML += `
      <tr>
        <td></td>
        <td>${degree.value}</td>
        <td>${year.value}</td>
        <td>${reg.value}</td>
        <td>${univ.value}</td>
        <td>
          <button class="edit">Edit</button>
          <button class="remove">Remove</button>
        </td>
      </tr>`;
  }

  degree.value = "";
  year.value = "";
  reg.value = "";
  univ.value = "";

  updateSerialNumbers();
  toggle_show();
});

let table = document.getElementById("table");

table.addEventListener("click", (e) => {
  let degree = document.getElementById("degree");
  let year = document.getElementById("year");
  let reg = document.getElementById("reg");
  let univ = document.getElementById("univ");

  if (e.target.classList.contains("edit")) {
    let row = e.target.parentNode.parentNode;
    degree.value = row.children[1].textContent;
    year.value = row.children[2].textContent;
    reg.value = row.children[3].textContent;
    univ.value = row.children[4].textContent;
    flag = row.children[0].textContent;
    toggle_show();
  } else if (e.target.classList.contains("remove")) {
    e.target.parentNode.parentNode.remove();
    updateSerialNumbers();
  }
});

let cancel = document.getElementById("cancel");
cancel.addEventListener("click", toggle_show);
