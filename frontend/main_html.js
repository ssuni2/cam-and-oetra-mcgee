function emailElement(from, date, subject, content) {
  let div = document.createElement("div");
  div.innerHTML = `
  <div class="emailPreview">
    <span class="from"></span><br>
    <span class="subject"></span>
    <hr>
    <span class="content"></span>
  </div>`;
  div.querySelector(".from").innerText = from;
  div.querySelector(".subject").innerText = subject;
  div.querySelector(".content").innerText = content;
  return div;
}

function addEmail(from, date, subject, content) {
  let el = emailElement(from, date, subject, content);
  el.addEventListener("click", function() {
    createEmailWindow(el);
  });
  let emails = document.querySelector("#emails");
  emails.insertBefore(el, emails.querySelector(".emailPreview")?.parentElement);
}

addEmail("fanNo1@gmail.com", "Today", "I love your content", "i love your content!\nI find it entertaining and invigorating");
addEmail("fanNo2@gmail.com", "Today", "I love your content", "i love your content!\nI find it entertaining and invigorating");
addEmail("fanNo3@gmail.com", "Today", "I love your content", "i love your content!\nI find it entertaining and invigorating");
addEmail("fanNo4@gmail.com", "Today", "I love your content", "i love your content!\nI find it entertaining and invigorating");
addEmail("fanNo5@gmail.com", "Today", "I love your content", "i love your content!\nI find it entertaining and invigorating");
addEmail("fanNo6@gmail.com", "Today", "I love your content", "i love your content!\nI find it entertaining and invigorating");
addEmail("fanNo7@gmail.com", "Today", "I love your content", "i love your content!\nI find it entertaining and invigorating");
addEmail("fanNo8@gmail.com", "Today", "I love your content", "i love your content!\nI find it entertaining and invigorating");


let emailWindow = null;
function createEmailWindow(el) {
  let div = document.createElement("div");
  div.className = "emailWindow";

  div.innerHTML = `
    <div class="emailView">
      <span>From: </span><a class="sender"></a> 
      <br>
      <span class="subject"></span>
      <hr>
      <span class="content"></span>
    </div>
    <textarea class="emailCompose" placeholder="Compose a reply..." disabled></textarea>
    <button class="overlay short">Short response</button>
    <button class="overlay long">Long response</button>
    <button class="overlay followup">Followup response</button>
    <button class="overlay writeOwn">Write my own response</button>
    <button class="send">Send</button>
    <button class="close">&#10006</button>
  `;

  let [sender, subject, content] = [
    el.querySelector(".from").innerText, el.querySelector(".subject").innerText, el.querySelector(".content").innerText
  ];

  div.querySelector(".content").innerText = content;
  div.querySelector(".sender").innerText = sender;
  div.querySelector(".sender").href = "mailto:" + sender;
  div.querySelector(".subject").innerText = "Subject: " + subject;

  document.body.className = "has-modal";

  let composeBox = div.querySelector(".emailCompose");

  let generateFunctions = {
    short() {
      composeBox.value = "<Short generated response>";
    },
    long() {
      composeBox.value = "<Long generated response>";
    },
    followup() {
      composeBox.value = "<Generated followup response>";
    },
    writeOwn() {},
  };

  div.querySelectorAll(".overlay").forEach(function(el) {
    el.addEventListener("click", function() {
      composeBox.disabled = false;
      div.querySelectorAll(".overlay").forEach(el => div.removeChild(el));
      composeBox.focus();
      generateFunctions[el.className.split(" ").filter(name => ["short", "long", "followup", "writeOwn"].includes(name))[0]]();
    });
  });

  emailWindow = div;
  document.body.append(div);
  function remove() {
    document.body.classList.remove("has-modal");
    document.body.removeChild(emailWindow);
    emailWindow = null;
  }

  div.querySelector(".close").onclick = remove;
}