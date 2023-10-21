function emailElement(from, date, subject, content, emailId) {
  let div = document.createElement("div");
  div.innerHTML = `
  <div class="emailPreview">
    <button class="markasread">&#10006</button>
    <span class="from"></span><br>
    <span class="subject"></span>
    <hr>
    <span class="content"></span>
  </div>`;
  div.querySelector(".from").innerText = from;
  div.querySelector(".subject").innerText = subject;
  div.querySelector(".content").innerText = content;
  div.setAttribute("emailId", emailId);
  return div;
}

function addEmail(from, date, subject, content, emailId) {
  let el = emailElement(from, date, subject, content, emailId);
  el.addEventListener("click", function (event) {
    if (!event.target.className.includes("markasread")) {
      // Close existing email window if open
      if (emailWindow) {
        document.body.classList.remove("has-modal");
        document.body.removeChild(emailWindow);
        emailWindow = null;
        document.querySelectorAll(".emailPreview.viewing").forEach(el => el.classList.remove("viewing"));
      }

      createEmailWindow(el);
      el.querySelector(".emailPreview").classList.add("viewing");
    } else {
      if (confirm("Do you want to mark this email as read and close it?")) {
        fetch("/markasread", {
          headers: {
            'Content-Type': 'application/json',
          },
          method: 'POST',
          body: JSON.stringify({
            id: el.getAttribute("emailId"),
          }),
        }).then(res => res.json()).then(res => {
          console.log(res);
          el.parentElement.removeChild(el);
          if (emailWindow && emailWindow.getAttribute("emailId") === el.getAttribute("emailId")) {
            emailWindow.parentElement.removeChild(emailWindow);
            emailWindow = null;
            document.body.classList.remove("has-modal");
          }
        });
      }
    }
  });

  let emails = document.querySelector("#emails");
  emails.insertBefore(el, emails.querySelector(".emailPreview")?.parentElement);
}

addEmail("serena.project.throwaway@gmail.com", "Today", "I love your content", "i love your content!\nI find it entertaining and invigorating", 1);
addEmail("serena.project.throwaway@gmail.com", "Today", "I love your content", "i love your content!\nI find it entertaining and invigorating", 2);
addEmail("serena.project.throwaway@gmail.com", "Today", "I love your content", "i love your content!\nI find it entertaining and invigorating", 3);
addEmail("serena.project.throwaway@gmail.com", "Today", "I love your content", "i love your content!\nI find it entertaining and invigorating", 4);
addEmail("serena.project.throwaway@gmail.com", "Today", "I love your content", "i love your content!\nI find it entertaining and invigorating", 5);
addEmail("serena.project.throwaway@gmail.com", "Today", "I love your content", "i love your content!\nI find it entertaining and invigorating", 6);
addEmail("serena.project.throwaway@gmail.com", "Today", "I love your content", "i love your content!\nI find it entertaining and invigorating", 7);
addEmail("serena.project.throwaway@gmail.com", "Today", "I love your content", "i love your content!\nI find it entertaining and invigorating", 8);


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
    <button class="send" disabled>Send</button>
    <button class="close">&#10006</button>
  `;

  div.setAttribute("emailId", el.getAttribute("emailId"));

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
      div.querySelector(".send").disabled = false;
    });
  });

  emailWindow = div;
  document.body.appendChild(div);

  function remove() {
    document.body.classList.remove("has-modal");
    document.body.removeChild(emailWindow);
    emailWindow = null;
    document.querySelectorAll(".emailPreview.viewing").forEach(el => el.classList.remove("viewing"));
  }

  div.querySelector(".send").addEventListener("click", function() {
    sendEmail(sender, "Re: " + subject, composeBox.value);
  });

  div.querySelector(".close").onclick = remove;
}

function sendEmail(to, subject, content) {
  fetch("/send", {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify({
      content, to, subject,
    }),
  }).then(res => res.json()).then(console.log);
}
