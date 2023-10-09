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
  el.addEventListener("click", function () {
    // Close existing email window if open
    if (emailWindow) {
      document.body.classList.remove("has-modal");
      document.body.removeChild(emailWindow);
      emailWindow = null;
    }

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
    <textarea class="emailCompose" placeholder="Compose a reply..."></textarea>
    <button class="close">&#10006</button>
  `;

  let [sender, subject, content] = [
    el.querySelector(".from").innerText, el.querySelector(".subject").innerText, el.querySelector(".content").innerText
  ];

  div.querySelector(".content").innerText = content;
  div.querySelector(".sender").innerText = sender;
  div.querySelector(".sender").href = "mailto:" + sender;
  div.querySelector(".subject").innerText = "Subject: " + subject;

  // Set CSS properties to position the email window on the right side
  div.style.position = "fixed";
  div.style.top = "0";
  div.style.right = "0";
  div.style.width = "65%"; // Adjust the width as needed
  div.style.height = "100%";
  div.style.backgroundColor = "white";
  div.style.padding = "10px";
  div.style.border = "1px solid black";
  div.style.borderRadius = "10px";

  document.body.className = "has-modal";

  emailWindow = div;
  document.body.appendChild(div);

  function remove() {
    document.body.classList.remove("has-modal");
    document.body.removeChild(emailWindow);
    emailWindow = null;
  }

  // div.querySelector(".close").onclick = remove;
}
