import requests
import os
from flask import Flask, request, Response, render_template

app = Flask(__name__)

def send_request(email):
    api_endpoint = 'https://www.signalhire.com/api/v1/candidate/search'
    api_key = {'apikey': '202..SXmJkqnWEQTS5GMEHWIadk6ezgwi'}
    payload = {"items":[email], "callbackUrl":"https://profile-finder.herokuapp.com/callback"}
    response = requests.post(api_endpoint,
                            headers=api_key, data=str(payload))

@app.route('/', methods = ['POST', 'GET'])
def home():
    return render_template('index.html')

@app.route('/search', methods = ['POST', 'GET'])
def search():
    if request.method == 'POST':
        mailid = request.form['mailid']
        if mailid not in os.listdir("results"):
            os.mkdir(f"results/{mailid}")
        send_request(mailid)
        print("started...",flush=True)
        start = "started"
        response_start = Response(start)
        return response_start

@app.route('/callback', methods = ['POST', 'GET'])
def callback():
    if request.method == 'POST':
        sent_back = request.json
        mailid = sent_back[0]['item']
        print(mailid,sent_back[0]['candidate']['social']['link'], flush=True)
        profile_link = sent_back[0]['candidate']['social']['link']
        with open(f"results/{mailid}/id.txt","w") as file:
            file.write(profile_link)
            file.close()

        return "Sucess"

@app.route('/status', methods = ['POST', 'GET'])
def status():
    if request.method == 'POST':
        mailid = request.form['mailid']
        if len(os.listdir(f"results/{mailid}")) != 0:
            with open(f"results/{mailid}/id.txt","r") as file:
                data = file.readline()
                file.close()
                return data
        else:
            code = -1
            respone_code = Response("-1")
            return respone_code
            

if __name__ == '__main__':
   app.run(host="0.0.0.0",debug=False, port=5000, threaded=True)