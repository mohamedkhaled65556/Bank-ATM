let balance = 0;
let passward = "123456";
let historyTrans = [];
let isOnePassword = false;
let isShowBalance = false;
let span = document.querySelector("#Balance");
let register = document.querySelector("#Register");
let table = document.querySelector("#Transaction");
let passowrdModal = document.getElementById("PasswordModal");
let changePasswordModal = document.getElementById("changePasswordModal");
let input1 = document.querySelector("#otp1");
let input2 = document.querySelector("#otp2");
let input3 = document.querySelector("#otp3");
let input4 = document.querySelector("#otp4");
let input5 = document.querySelector("#otp5");
let input6 = document.querySelector("#otp6");
let input01 = document.querySelector("#otp01");
let input02 = document.querySelector("#otp02");
let input03 = document.querySelector("#otp03");
let input04 = document.querySelector("#otp04");
let input05 = document.querySelector("#otp05");
let input06 = document.querySelector("#otp06");

const oneTimePass = () => {
  if (isOnePassword == false) {
    alert("You are not logged in.");
  }
};

const openModal = () => {
  passowrdModal.style.display = "flex";
};

const closeModal = () => {
  passowrdModal.style.display = "none";
  changePasswordModal.style.display = "none";
};

const verifyPassword = () => {
  let inputs =
    input1.value +
    input2.value +
    input3.value +
    input4.value +
    input5.value +
    input6.value;
  input1.value = "";
  input2.value = "";
  input3.value = "";
  input4.value = "";
  input5.value = "";
  input6.value = "";
  if (inputs == passward) {
    register.innerHTML = `<button class="btn btn-success" id="btn3"><i class="fa-regular fa-circle-check"></i> signed</button>`;
    isOnePassword = true;
    historyTransaction();
    passowrdModal.style.display = "none";
  } else alert("Invalid password");
};

const changePassword = () => {
  oneTimePass();
  if (isOnePassword) {
    changePasswordModal.style.display = "flex";
  }
};

const editPassword = () => {
  let inputs =
    input01.value +
    input02.value +
    input03.value +
    input04.value +
    input05.value +
    input06.value;
  if (inputs === "") alert("New password not can be empty");
  else if (inputs.length < 6) alert("New passowrd must be 6 digits");
  else if (inputs === passward) {
    alert("This password is used Before");
    input01.value = "";
    input02.value = "";
    input03.value = "";
    input04.value = "";
    input05.value = "";
    input06.value = "";
  } else {
    changePasswordModal.style.display = "none";
    passward = inputs;
    input01.value = "";
    input02.value = "";
    input03.value = "";
    input04.value = "";
    input05.value = "";
    input06.value = "";
    alert("Password is changed");
    register.innerHTML = `<button class="btn btn-danger" id="btn3" onclick ="openModal()"><i class="fa-regular fa-circle-xmark"></i> Unsigned</button>`;
    isOnePassword = false;
    span.innerHTML = `<span id="Balance">**** EGP</span>`;
    isShowBalance = false;
    table.innerHTML = "";
  }
};

const showAndHideBalance = () => {
  oneTimePass();
  if (isOnePassword) {
    if (!isShowBalance) {
      span.innerHTML = `
    <span id="Balance" type="number">${balance} EGP</span>`;
      isShowBalance = true;
    } else {
      span.innerHTML = `<span id="Balance">**** EGP</span>`;
      isShowBalance = false;
    }
  }
};

const Deposite = () => {
  oneTimePass();
  if (isOnePassword) {
    let deposite = document.querySelector("#Deposite");
    let amount = +deposite.value;
    deposite.value = "";
    if (amount > 0) {
      let history = {
        BalanceBefore: `${balance} EGP`,
        Transaction: `Deposited : ${amount} EGP`,
        BalanceAfter: `${balance + amount} EGP`,
      };
      balance += amount;
      span.innerHTML = `
    <span id="Balance" type="number">${balance} EGP</span>`;
      isShowBalance = true;
      historyTrans.push(history);
      historyTransaction();
    } else alert("Invalid amount");
  }
};

const Withdraw = () => {
  oneTimePass();
  if (isOnePassword) {
    let withdraw = document.querySelector("#Withdraw");
    let amount = +withdraw.value;
    withdraw.value = "";
    if (amount <= 0) alert("Invalid amount");
    else if (balance < amount) alert("Balance not enough");
    else {
      let history = {
        BalanceBefore: `${balance} EGP`,
        Transaction: `Withdrawn : ${amount} EGP`,
        BalanceAfter: `${balance - amount} EGP`,
      };
      balance -= amount;
      span.innerHTML = `
    <span id="Balance" type="number">${balance} EGP</span>`;
      isShowBalance = true;
      historyTrans.push(history);
      historyTransaction();
    }
  }
};

const historyTransaction = () => {
  oneTimePass();
  if (isOnePassword) {
    table.innerHTML = "";
    historyTrans.forEach((el, index) => {
      table.innerHTML += `<tr>
        <td>${index + 1}</td> 
        <td id="row2">${el.BalanceBefore}</td> 
        <td id="row3">${el.Transaction}</td> 
        <td id="row4">${el.BalanceAfter}</td>
        </tr>`;
    });
  }
};

let inputs = document.querySelectorAll(".otp-input");
inputs.forEach((input, index) => {
  input.addEventListener("input", () => {
    if (index < inputs.length - 1) {
      inputs[index + 1].focus();
    }
  });
});
