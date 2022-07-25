from flask import Flask, render_template, redirect, url_for
from flask import jsonify
from flask import request
from flask_cors import CORS, cross_origin
import os
import json
import base64
import mysql.connector

import pymysql

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

if __name__ == "__main__":
    app.run(debug=True, port=5000)