# import flask
from flask import Flask, jsonify, request
import test2  as b
import json
from flask_cors import CORS
 
prev=''
 
app = Flask(__name__)
CORS(app)
 

@app.route('/api/origin')
def get_data1():
    # data = {'message': 'Hello from Python!'}
    # global start
    data = list(b.fetch_O())

    data2={'lat':data[0],'lng':data[1]}

    data = json.dumps(data2)
    
    print(data)
    
    return data


@app.route('/api/data')
def get_data():
    # data = {'message': 'Hello from Python!'}
    data = b.fetch()
    data = json.dumps(data)
    
    print(data)
    
    return data
 
@app.route('/receive_data', methods=['POST'])
def receive_data():
    
    global final_loc
    global prev
    final_loc=[]
 
    received_data = request.json
    
    print(received_data)
    
    
    data=received_data
    
    # if data !=prev :
    #     prev=data
    b.trial(data)
    
    return jsonify({'message': 'Data received successfully'}),200
 
# @app.route('/api/query', methods = ['POST'])
# def get_query_from_react():
#     data = request.get_json()
#     print(data)
#     return data
 
if __name__ == '__main__':
    app.run(debug=True)