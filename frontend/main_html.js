function emailElement(from, date, subject, content, emailId) {
  let div = document.createElement("div");
  div.innerHTML = `
  <div class="emailPreview">
    <button class="hamburger">•••</button>
    <div class="hamburgermenu" style="visibility:hidden">
      <a class="hamburgeroption markasread">Mark as read</a><hr>
      <a class="hamburgeroption star">Star</a><hr>
      <a class="hamburgeroption delete">Delete</a>
    </div>
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

function postHeaders(body) {
  return {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify(body),
  };
}

function addEmail(from, date, subject, content, emailId) {
  let el = emailElement(from, date, subject, content, emailId);
  el.addEventListener("click", function (event) {
    if (!event.target.className.includes("hamburger")) {
      // Close existing email window if open
      if (emailWindow) {
        document.body.classList.remove("has-modal");
        document.body.removeChild(emailWindow);
        emailWindow = null;
        document.querySelectorAll(".emailPreview.viewing").forEach(el => el.classList.remove("viewing"));
      }

      createEmailWindow(el);
      el.querySelector(".emailPreview").classList.add("viewing");
    } else if (event.target === el.querySelector(".hamburger")) {
      el.querySelector(".hamburgermenu").style.visibility = el.querySelector(".hamburgermenu").style.visibility === "visible" ? "hidden" : "visible";
    } else {
      if (event.target.className.includes("markasread")) markasreadBtn();
      if (event.target.className.includes("star")) starBtn();
      if (event.target.className.includes("delete")) deleteBtn();
    }
  });

  function delete_email() {
    el.parentElement.removeChild(el);
    if (emailWindow && emailWindow.getAttribute("emailId") === el.getAttribute("emailId")) {
      emailWindow.parentElement.removeChild(emailWindow);
      emailWindow = null;
      document.body.classList.remove("has-modal");
    }
  }

  function markasreadBtn() {
    if (confirm("Do you want to mark this email as read?")) {
      fetch("/markasread", postHeaders({"id": el.getAttribute("emailId")})).then(res => res.json()).then(res => {
        console.log(res);
        delete_email();
      });
    }
  }
  function starBtn() {
    alert("Im a star! ⭐️");
    fetch("/star", postHeaders({"id": el.getAttribute("emailId")})).then(res => res.json()).then(res => {
      console.log(res);
    });
  }
  function deleteBtn() {
    if (confirm("Do you want to delete this email?")) {
      fetch("/delete", postHeaders({"id": el.getAttribute("emailId")})).then(res => res.json()).then(res => {
        console.log(res);
        delete_email();
      });
    }
  }

  let emails = document.querySelector("#emails");
  emails.insertBefore(el, emails.querySelector(".emailPreview")?.parentElement);
}

addEmail("project.throwaway@gmail.com", "Today", "I love your content", "i love your content!\nI find it entertaining and invigorating");
addEmail("company@gmail.com", "Today", "I love your content", "i love your content!\nI find it entertaining and invigorating");
addEmail("sponsorship@gmail.com", "Today", "I love your content", "i love your content!\nI find it entertaining and invigorating");
addEmail("cam_and_petra_fan@gmail.com", "Today", "I love your content", "i love your content!\nI find it entertaining and invigorating");
addEmail("top_sponsor@gmail.com", "Today", "I love your content", "i love your content!\nI find it entertaining and invigorating");
addEmail("fanmail@gmail.com", "Today", "I love your content", "i love your content!\nI find it entertaining and invigorating");
addEmail("john_smith@mac.com", "Today", "I love your content", "i love your content!\nI find it entertaining and invigorating");
addEmail("jane_smith@yahoo.com", "Today", "I love your content", "i love your content!\nI find it entertaining and invigorating");

const followup_text = `
Looks amazing! Thank you for reaching out.

We are a highly covered tech / lifestyle / gaming creator, and a partnered YouTuber with millions of weekly views and media coverage. We have a massive IG and TikTok following too.

We would love to work with you. 

Can we discuss rates? 

We can do a post to:
@CamXPetra YouTube (165k Subs)
@CamXPetra TikTok (270k Followers)
@CamXPetra IG (130k Followers)
@PetraXCam IG (75k Followers)
@Gamrtalk IG Photo (213k Followers)

Plus:
- Link on our website
- Content usage rights
- Long form video (Extra cost)
`;

const long_text = `
We actually have some ideas for content that I think would complement your product perfectly! 

If you are not already aware, we own several pages and have more than 1M ifetime followers, netting us millions of views from our loyal community every week. We also have some of the most recognizable gaming and tech setups on the internet. We have worked with many top-end brands in the past, and you can learn more about us on our websites CamXPetra.com, and GamrTalk.com. 

I would love to work around your needs and find the best ways to push your product to my audience. You can find us on TikTok / YouTube under CamXPetra, and on Instagram under PetraXCam and CamXPetra. (additional Twitter and social media links can be found on our respective websites as well.) 

We offer several services including (But Not Limited To):

- Original video and photo content creation with your product/service. Filmed in HD and highly optimized to go viral. Edited extensively for best results. 
- Website link shares across stories and our link in bio. Duration is negotiable. 
- Rights to reuse our content on your own social media and in marketing. (UGC is available too!)
- Themed product giveaways through our network GamrTalk, which drives engagement and follows back to your brand account. 
- Product / service testimonials and reviews.

All of my services come with a guarantee of quality. Any advertising we do comes paired with extensive exposure for your brand. Products and services get promoted alongside our top-of-the-line setups and brands. We are really excited about the idea of working together! 

Please let me know how you would like to proceed. If you have something specific in mind, feel free to make us an offer!

Best Regards, 
Cam
`;

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
      composeBox.value = "Hi! This is CamXPetra. We would love to collaborate with you if this is something you are interested in? We are a partnered YouTuber with over 1M lifetime follows across all of our social media. Our videos and shorts get millions of views per week. Let me know if this is something we can discuss. Thank you!";
    },
    long() {
      composeBox.value = long_text;
    },
    followup() {
      composeBox.value = followup_text;
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
