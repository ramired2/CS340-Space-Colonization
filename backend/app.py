from flask import Flask, render_template, redirect, url_for
from flask import jsonify
from flask import request
from flask_cors import CORS, cross_origin
import os
# import json
# import base64
import mysql.connector

# import pymysql

app = Flask(__name__)
cors = CORS(app)

# Python Flask secret key
app.secret_key = os.environ.get("FLASK_SECRET_KEY", "scrfanfaklfetkey")

def connect():
    cnx = mysql.connector.connect(
        host = 'classmysql.engr.oregonstate.edu',
        user = 'cs340_ramired2',
        password = '4302',
        database = 'cs340_ramired2'
    )
    cursor = cnx.cursor()
    return (cnx, cursor)

@app.route('/')
def hello():
    return "henlo!"

# adding a nation
@app.route('/api1/addnation', methods=['GET'])
def getUserInfo():
    # opens DB connection
    dbInfo = connect()
    cursor = dbInfo[1]
    cnx = dbInfo[0]

    if request.method=='POST':
        # parse for new individuals data
        theform = request.get_json(force=True)
        name = theform['name']
        numColonized = theform['numColonized']
        numShips = theform['numShips']

        cursor.execute("INSERT INTO Nations (nationName, conquestsQuantity, shipQuantity) VALUES(%s, %s, %s);", (name, numColonized, numShips,))

        cnx.commit()

    else:
        msg = "Please fill out the form."
    
    print("Message: ", msg)

        # closes DB connections
    cursor.close()
    cnx.close()

    return "200"

if __name__ == "__main__":
    app.run(debug=True, port=5000)