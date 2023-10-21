from flask import Flask, request, render_template, send_from_directory

app = Flask(__name__, template_folder="frontend")

#instructions to run: `python3 backend.py`
#navigate to http://127.0.0.1:8000/home

@app.get("/home")
def random():
  return render_template("main.html")

@app.get("/static/<resource>")
def get_resource(resource):
  #for convenience, files such as JS and CSS will be called using this specific URI scheme.
  #given that the original resource is located at /frontend/<resource.filetype>, 
  #the HTML page will call it using /static/<resource.filetype>

  return send_from_directory("frontend", resource)
  
@app.post("/markasread")
def markasread():
  json = request.get_json()
  print("marking as read: " + json["id"])
  return {"success": True}


@app.post("/send")
def send_email_api():
  json = request.get_json()
  send_email(json["to"], json["subject"], json["content"])
  return {"success": True}

def send_email(to, subject, content):
  #code to actually send the email
  print(to, subject, content)

app.run(host='0.0.0.0', port=8000)