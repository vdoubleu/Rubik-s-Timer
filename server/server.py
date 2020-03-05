from flask import Flask, request, jsonify, after_this_request
from pymongo import MongoClient
from pprint import pprint

app = Flask(__name__)

@app.route('/sendTime/', methods=['POST'])
def send_time():
    @after_this_request
    def add_header(response):
        response.headers.add('Access-Control-Allow-Origin', '*')
        return response
    
    post_time = request.form["time"]
    post_id = request.form["id"]
   
    #times_coll.insert_one({"id":post_id, "time":post_time})
    if times_coll.find_one({"id":post_id}) is not None:
        times_coll.update_one({"id":post_id}, {"$push":{"time": post_time}})
    else:
        times_coll.insert_one({"id":post_id, "time":[post_time]})
    
    return jsonify({"id":post_id, "time":post_time})

@app.route('/getTime/', methods=['GET'])
def get_time():
    @after_this_request
    def add_header(response):
        response.headers.add('Access-Control-Allow-Origin', '*')
        return response

    get_id = request.args["id"]
    get_data = times_coll.find_one({"id":get_id})
    times = get_data["time"]
    
    adjusted_times = []

    count = 0
    for x in times:
        adjusted_times.append({"num":str(count), "solvetime":x})
        count += 1 

    if get_data is not None:
        return jsonify({"adjtime": adjusted_times, "regtime": times})
    else:
        return jsonify(None)

@app.route('/removeLast/', methods=['POST'])
def remove_last_time():
    @after_this_request
    def add_header(response):
        response.headers.add('Access-Control-Allow-Origin', '*')
        return response

    post_id = request.form["id"]

    times_coll.update_one({"id":post_id}, {"$pop":{"time": 1}})


    return jsonify({"data":"removed last"})

@app.route('/removeAll/', methods=['POST'])
def remove_all():
    @after_this_request
    def add_header(response):
        response.headers.add('Access-Control-Allow-Origin', '*')
        return response

    post_id = request.form["id"]

    times_coll.update_one({"id":post_id}, {"$set": {"time": []}})    

    return jsonify({"data":"removed all"})

if __name__ == '__main__':
    client = MongoClient('localhost', 27017)
    times_coll = client.times_database.times_collection

    
    app.run()
