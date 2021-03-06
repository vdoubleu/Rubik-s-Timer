from flask import Flask, request, jsonify, after_this_request
from pymongo import MongoClient
from pprint import pprint
import logging
import json
import numpy as np
from numpy.polynomial.polynomial import polyfit
from unicodedata import numeric

app = Flask(__name__)

@app.route('/sendTime/', methods=['POST'])
def send_time():
    @after_this_request
    def add_header(response):
        response.headers.add('Access-Control-Allow-Origin', '*')
        return response
    
    post_time = request.form["time"]
    post_id = request.form["id"]
   
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

@app.route('/resetTimes/', methods=['POST'])
def set_times():
    @after_this_request
    def add_header(response):
        response.headers.add('Access-Control-Allow-Origin', '*')
        return response

    post_id = request.form["id"]
    new_times = json.loads(request.form["newtimes"])
    times_coll.update_one({"id":post_id}, {"$set": {"time": new_times}})
   
    return jsonify({"data": new_times})

@app.route('/getCBF/', methods=['GET'])
def get_CBF():
    @after_this_request
    def add_header(response):
        response.headers.add('Access-Control-Allow-Origin', '*')
        return response

    get_id = request.args["id"]
    get_data = times_coll.find_one({"id":get_id})
    times = get_data["time"]
   
    
    x = np.array(list(range(1, len(times))))

    timesInt = map(lambda x: float(x.encode('ascii')), times)

    d, c, b, a = polyfit(np.concatenate(([0],x)), np.asarray(np.array(times), dtype=float), 3)

    res = map(lambda x: (x, a*(x**3) + b*(x**2) + c*x + d), times)
     
    #app.logger.info(timesInt)

    return jsonify({"data": "hi"})

if __name__ == '__main__':
    client = MongoClient('localhost', 27017)
    times_coll = client.times_database.times_collection

    
    app.run(debug=True, host='0.0.0.0')
