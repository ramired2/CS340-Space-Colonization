from asyncio.windows_events import NULL
from flask import Flask, render_template, redirect, url_for
from flask import jsonify
from flask import request
from flask_cors import CORS, cross_origin
import os
import json
import mysql.connector

app = Flask(__name__, static_folder='../build', static_url_path='/')

# import pymysql
cors = CORS(app)

# Python Flask secret key
app.secret_key = os.environ.get("FLASK_SECRET_KEY", "scrfanfaklfetkey")

def connect():
    cnx = mysql.connector.connect(
        host = 'us-cdbr-east-06.cleardb.net',
        user = 'b5980e2dd948ca',
        password = 'd9afab4b',
        database = 'heroku_1167b9347be4684'
    )
    cursor = cnx.cursor()
    return (cnx, cursor)

@app.route("/", methods=['GET','POST'])
def hello():
    return "henlo!"

################################################################################
#                       NATION MANIPULATIONS
################################################################################

############################    SELECTS    #####################################
# get all nations
# @cross_origin(supports_credentials=True)
@app.route('/allnations/<orderType>', methods=['GET', 'POST', 'PUT', 'DELETE'])
def getAllNations(orderType):
    # opens DB connection
    dbInfo = connect()
    cursor = dbInfo[1]
    cnx = dbInfo[0]

    print(str(orderType))
    if orderType == 'ASC' or orderType == 'asc':
        cursor.execute('select nationID, nationName, conquestsQuantity, shipQuantity from Nations order by nationName asc')
    else:
        cursor.execute('select nationID, nationName, conquestsQuantity, shipQuantity from Nations order by nationName desc')

    # put nations in list format
    row_headers = [x[0] for x in cursor.description]
    data = cursor.fetchall()
    json_data = []

    for result in data:
        json_data.append(dict(zip(row_headers, result)))

    print(json_data)

    # closes DB connections
    cursor.close()
    cnx.close()
    return json.dumps(json_data)

# get names, ID for dropdown list
@app.route('/dropdownNations', methods=['GET', 'POST', 'PUT', 'DELETE'])
def dropdownNations():
    # opens DB connection
    dbInfo = connect()
    cursor = dbInfo[1]
    cnx = dbInfo[0]

    cursor.execute('SELECT nationID, nationName from Nations ORDER BY nationName ASC;')

    # put nations in list format
    row_headers = [x[0] for x in cursor.description]
    data = cursor.fetchall()
    json_data = []

    for result in data:
        json_data.append(dict(zip(row_headers, result)))

    print(json_data)

    # closes DB connections
    cursor.close()
    cnx.close()
    return json.dumps(json_data)

# get nations who own planets
@app.route('/getOwnShips/<orderType>/<colStat>', methods=['GET'])
def getOwnPlanets(orderType, colStat):
    # opens DB connection
    dbInfo = connect()
    cursor = dbInfo[1]
    cnx = dbInfo[0]

    print(str(orderType))
    if colStat == "hs": # has colonized planets
        if orderType == 'ASC' or orderType == 'asc':
            cursor.execute('SELECT Nations.nationName, Ships.name as shipName, Nations.nationID, Nations.conquestsQuantity, Nations.shipQuantity  FROM Ships INNER JOIN Nations ON Nations.nationID = Ships.nationID WHERE Nations.shipQuantity > 0 GROUP BY Nations.nationName ORDER BY Nations.nationName ASC;')
        else:
            cursor.execute('SELECT Nations.nationName, Ships.name as shipName, Nations.nationID, Nations.conquestsQuantity, Nations.shipQuantity FROM Ships INNER JOIN Nations ON Nations.nationID = Ships.nationID WHERE Nations.shipQuantity > 0 GROUP BY Nations.nationName ORDER BY Nations.nationName DESC;')

    else:
        if orderType == 'ASC' or orderType == 'asc':
            cursor.execute('SELECT Nations.nationName, Ships.name as shipName, Nations.nationID, Nations.conquestsQuantity, Nations.shipQuantity FROM Ships INNER JOIN Nations ON Nations.nationID = Ships.nationID WHERE Nations.shipQuantity = 0 || Nations.shipQuantity = NULL GROUP BY Nations.nationName ORDER BY Nations.nationName ASC;')
        else:
            cursor.execute('SELECT Nations.nationName, Ships.name as shipName, Nations.nationID, Nations.conquestsQuantity, Nations.shipQuantity FROM Ships INNER JOIN Nations ON Nations.nationID = Ships.nationID WHERE Nations.shipQuantity = 0 || Nations.shipQuantity = NULL GROUP BY Nations.nationName ORDER BY Nations.nationName DESC;')

    # put nations in list format
    row_headers = [x[0] for x in cursor.description]
    data = cursor.fetchall()
    json_data = []

    for result in data:
        json_data.append(dict(zip(row_headers, result)))

    print(json_data)

    # closes DB connections
    cursor.close()
    cnx.close()
    return json.dumps(json_data)

# get nations no ships
@app.route('/colonized', methods=['GET', 'POST', 'PUT', 'DELETE'])
def colonized():
    # opens DB connection
    dbInfo = connect()
    cursor = dbInfo[1]
    cnx = dbInfo[0]

    cursor.execute('SELECT nationID, nationName from Nations ORDER BY nationName ASC;')

    # put nations in list format
    row_headers = [x[0] for x in cursor.description]
    data = cursor.fetchall()
    json_data = []

    for result in data:
        json_data.append(dict(zip(row_headers, result)))

    print(json_data)

    # closes DB connections
    cursor.close()
    cnx.close()
    return json.dumps(json_data)

# get nation for edit
@app.route('/getnationsbyID/<id>', methods=['GET', 'POST'])
def getnationsbyID(id):
    # opens DB connection
    dbInfo = connect()
    cursor = dbInfo[1]
    cnx = dbInfo[0]

    cursor.execute("select nationID, nationName, conquestsQuantity, shipQuantity from Nations WHERE nationID = %s;", (id,))

    # put nations in list format
    row_headers = [x[0] for x in cursor.description]
    data = cursor.fetchall()
    json_data = []

    for result in data:
        json_data.append(dict(zip(row_headers, result)))

    print(json_data)

    # closes DB connections
    cursor.close()
    cnx.close()
    return json.dumps(json_data)


############################    INSERTS  #######################################
# adding a nation
@cross_origin(supports_credentials=True)
@app.route('/addnation', methods=['GET', 'POST'])
def addNation():
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

        msg = "added nation"

    else:
        msg = "Please fill out the form."
    
    print("Message: ", msg)

        # closes DB connections
    cursor.close()
    cnx.close()

    return redirect(url_for('getAllNations', orderType="ASC"))


############################    UPDATES   ######################################
# edit a nation
@cross_origin(supports_credentials=True)
@app.route('/editnation', methods=['GET', 'POST'])
def editNation():
    # opens DB connection
    dbInfo = connect()
    cursor = dbInfo[1]
    cnx = dbInfo[0]

    # parse for new individuals data
    theform = request.get_json(force=True)
    nationID = theform['nationID']
    name = theform['name']
    numColonized = theform['numColonized']
    numShips = theform['numShips']

    cursor.execute("UPDATE Nations SET nationName = %s, conquestsQuantity = %s, shipQuantity = %s WHERE nationID = %s;", (name, numColonized, numShips, nationID,))

    cnx.commit()

    print("editing nationID: ", nationID)

        # closes DB connections
    cursor.close()
    cnx.close()

    return redirect(url_for('getAllNations', orderType="ASC"))



############################    DELETE    ######################################
# Delete a nation
@cross_origin(supports_credentials=True)
@app.route('/deletenation/<nationID>', methods=['GET', 'DELETE'])
def deleteNation(nationID):
    # opens DB connection
    dbInfo = connect()
    cursor = dbInfo[1]
    cnx = dbInfo[0]

    cursor.execute("DELETE FROM Nations WHERE nationID = %s;", (nationID,))

    cnx.commit()

    print("deleted nationID: ", nationID)

    
    # closes DB connections
    cursor.close()
    cnx.close()

    return redirect(url_for('getAllNations', orderType="ASC"))



################################################################################
#                       PLANETS MANIPULATIONS
################################################################################
############################    SELECTS    #####################################
# get all materials
@app.route('/allplanets', methods=['GET', 'POST', 'PUT', 'DELETE'])
def getAllPlanets():

    print("in planets")
    # opens DB connection
    dbInfo = connect()
    cursor = dbInfo[1]
    cnx = dbInfo[0]

    print("after db")

    cursor.execute('SELECT Planets.planetID, Planets.planetName, Nations.nationName, StarSystems.systemName, Planets.colonized FROM Planets left JOIN Nations ON planets.nationID = Nations.nationID left JOIN StarSystems ON Planets.systemID = StarSystems.systemID Order BY Planets.planetName ASC;')

    # put nations in list format
    row_headers = [x[0] for x in cursor.description]
    data = cursor.fetchall()
    json_data = []

    for result in data:
        json_data.append(dict(zip(row_headers, result)))

    print(json_data)

    # closes DB connections
    cursor.close()
    cnx.close()
    return json.dumps(json_data)

# get names, ID for dropdown list
@app.route('/dropdownPlanets', methods=['GET', 'POST', 'PUT', 'DELETE'])
def dropdownPlanets():
    # opens DB connection
    dbInfo = connect()
    cursor = dbInfo[1]
    cnx = dbInfo[0]

    cursor.execute('SELECT planetID, planetName FROM Planets ORDER BY planetName ASC;')

    # put nations in list format
    row_headers = [x[0] for x in cursor.description]
    data = cursor.fetchall()
    json_data = []

    for result in data:
        json_data.append(dict(zip(row_headers, result)))

    print(json_data)

    # closes DB connections
    cursor.close()
    cnx.close()
    return json.dumps(json_data)

# get uncolonized planets
@app.route('/uncolonizedPlanets', methods=['GET', 'POST', 'PUT', 'DELETE'])
def uncolonizedPlanets():
    # opens DB connection
    dbInfo = connect()
    cursor = dbInfo[1]
    cnx = dbInfo[0]

    cursor.execute('SELECT Planets.planetID, Planets.planetName, Nations.nationName, StarSystems.systemName, Planets.colonized FROM Nations INNER JOIN Planets ON Nations.nationID = Planets.nationID INNER JOIN StarSystems ON Planets.systemID = StarSystems.systemID WHERE colonized = 0 Order BY Planets.planetName ASC;')

    # put nations in list format
    row_headers = [x[0] for x in cursor.description]
    data = cursor.fetchall()
    json_data = []

    for result in data:
        json_data.append(dict(zip(row_headers, result)))

    print(json_data)

    # closes DB connections
    cursor.close()
    cnx.close()
    return json.dumps(json_data)


# get planets per nation
@app.route('/planetsPerNation/<id>', methods=['GET', 'POST', 'PUT', 'DELETE'])
def planetsPerNation(id):
    # opens DB connection
    dbInfo = connect()
    cursor = dbInfo[1]
    cnx = dbInfo[0]

    cursor.execute('SELECT Planets.planetID, Planets.planetName, Nations.nationName, StarSystems.systemName, Planets.colonized FROM Nations INNER JOIN Planets ON Nations.nationID = Planets.nationID INNER JOIN StarSystems ON Planets.systemID = StarSystems.systemID WHERE Nations.nationID = %s;', ( id,))

    # put nations in list format
    row_headers = [x[0] for x in cursor.description]
    data = cursor.fetchall()
    json_data = []

    for result in data:
        json_data.append(dict(zip(row_headers, result)))

    print(json_data)

    # closes DB connections
    cursor.close()
    cnx.close()
    return json.dumps(json_data)

# get planet for edit
@app.route('/getplsnetsbyID/<id>', methods=['GET', 'POST'])
def getplsnetsbyID(id):
    # opens DB connection
    dbInfo = connect()
    cursor = dbInfo[1]
    cnx = dbInfo[0]

    cursor.execute("SELECT Planets.planetID, Planets.planetName, Planets.colonized, Nations.nationName, Nations.nationID, StarSystems.systemName, StarSystems.systemID FROM Planets LEFT JOIN Nations ON Planets.nationID = Nations.nationID LEFT JOIN StarSystems ON Planets.systemID = StarSystems.systemID WHERE Planets.planetID = %s;", (id,))

    # put nations in list format
    row_headers = [x[0] for x in cursor.description]
    data = cursor.fetchall()
    json_data = []

    for result in data:
        json_data.append(dict(zip(row_headers, result)))

    print(json_data)

    # closes DB connections
    cursor.close()
    cnx.close()
    return json.dumps(json_data)


############################    INSERTS  #######################################
# adding a planet
@cross_origin(supports_credentials=True)
@app.route('/addplanet', methods=['GET', 'POST'])
def addPlanet():
    # opens DB connection
    dbInfo = connect()
    cursor = dbInfo[1]
    cnx = dbInfo[0]

    if request.method=='POST':
        # parse for new individuals data
        theform = request.get_json(force=True)
        nationID = theform['nationID']
        name = theform['name']
        systemID = theform['systemID']
        colonized = theform['colonized']

        print(nationID)
        print(colonized)

        if colonized == 1 or nationID == "":
            print("add a null nationID planet")
            cursor.execute("INSERT INTO Planets (nationID, planetName, systemID, colonized) VALUES (NULL, %s, %s, %s);", (name, systemID, colonized,))
        else:
            cursor.execute("INSERT INTO Planets (nationID, planetName, systemID, colonized) VALUES (%s, %s, %s, %s);", (nationID, name, systemID, colonized,))

        cnx.commit()

        msg = "added planet"

    else:
        msg = "Please fill out the form."
    
    print("Message: ", msg)

        # closes DB connections
    cursor.close()
    cnx.close()

    return redirect(url_for('getAllPlanets'))

############################    UPDATES   ######################################
@app.route('/editplanet', methods=['GET', 'POST'])
def editplanet():
    # opens DB connection
    dbInfo = connect()
    cursor = dbInfo[1]
    cnx = dbInfo[0]

    # parse for new individuals data
    theform = request.get_json(force=True)
    planetID = theform['planetID']
    nationID = theform['nationID']
    name = theform['name']
    systemID = theform['systemID']
    colonized = theform['colonized']

    print(colonized)
    print(nationID)

    if colonized == 1 or nationID == 0 or colonized == "1" or nationID == "0":
        print("add a null nationID planet")
        cursor.execute("UPDATE Planets SET nationID = null, planetName = %s, systemID = %s, colonized = %s WHERE planetID = %s;", (name, systemID, colonized, planetID,))
    else:
        print("adding w planet has nation")
        cursor.execute("UPDATE Planets SET nationID = %s, planetName = %s, systemID = %s, colonized = %s WHERE planetID = %s;", (nationID, name, systemID, colonized, planetID,))

    cnx.commit()

    print("editing planetID: ", planetID)

        # closes DB connections
    cursor.close()
    cnx.close()

    return redirect(url_for('getAllPlanets'))

# rem relat between planet and nation  -- set NULL
@app.route('/remNationRelat/<planetID>', methods=['GET', 'POST'])
def remNationRelat(nationID, planetID):
    # opens DB connection
    dbInfo = connect()
    cursor = dbInfo[1]
    cnx = dbInfo[0]

    # parse for new individuals data
    theform = request.get_json(force=True)

    cursor.execute("UPDATE Planets SET nationID = NULL WHERE planetID = %s;", (planetID,))

    cnx.commit()

    print("setting nationID to null")

        # closes DB connections
    cursor.close()
    cnx.close()

    return redirect(url_for('getAllPlanets'))

############################    DELETE    ######################################
@cross_origin(supports_credentials=True)
@app.route('/deletePlanet/<planetID>', methods=['GET', 'DELETE'])
def deletePlanet(planetID):
    # opens DB connection
    dbInfo = connect()
    cursor = dbInfo[1]
    cnx = dbInfo[0]

    cursor.execute("DELETE FROM Planets WHERE planetID = %s;", (planetID,))

    cnx.commit()

    print("deleted planetID: ", planetID)

    
    # closes DB connections
    cursor.close()
    cnx.close()

    return redirect(url_for('getAllPlanets'))



################################################################################
#                       NATURAL RESOURCES MANIPULATIONS
################################################################################
@app.route('/allnatl', methods=['GET', 'POST', 'PUT', 'DELETE'])
def getAllNatl():
    # opens DB connection
    dbInfo = connect()
    cursor = dbInfo[1]
    cnx = dbInfo[0]

    cursor.execute('SELECT NaturalResources.materialID, Materials.materialName, Planets.planetName, NaturalResources.natlQuantity, NaturalResources.natlResourcesID FROM NaturalResources INNER JOIN Materials ON NaturalResources.materialID = Materials.materialID INNER JOIN Planets ON NaturalResources.planetID = Planets.planetID ORDER BY Materials.materialName ASC;')

    # put nations in list format
    row_headers = [x[0] for x in cursor.description]
    data = cursor.fetchall()
    json_data = []

    for result in data:
        json_data.append(dict(zip(row_headers, result)))

    print(json_data)

    # closes DB connections
    cursor.close()
    cnx.close()
    return json.dumps(json_data)

# get names, ID for dropdown list
@app.route('/dropdownNatl', methods=['GET', 'POST', 'PUT', 'DELETE'])
def dropdownNatl():
    # opens DB connection
    dbInfo = connect()
    cursor = dbInfo[1]
    cnx = dbInfo[0]

    cursor.execute('SELECT NaturalResources.natlResourcesID, Materials.materialName FROM NaturalResources INNER JOIN Materials ON NaturalResources.materialID = Materials.materialID ORDER BY materialName ASC;')

    # put nations in list format
    row_headers = [x[0] for x in cursor.description]
    data = cursor.fetchall()
    json_data = []

    for result in data:
        json_data.append(dict(zip(row_headers, result)))

    print(json_data)

    # closes DB connections
    cursor.close()
    cnx.close()
    return json.dumps(json_data)


# get natl materials by nation
@app.route('/natlPerNation/<id>', methods=['GET', 'POST', 'PUT', 'DELETE'])
def natlPerNation(id):
    # opens DB connection
    dbInfo = connect()
    cursor = dbInfo[1]
    cnx = dbInfo[0]

    cursor.execute('SELECT NaturalResources.materialID, Materials.materialName, Nations.nationName, NaturalResources.natlQuantity, NaturalResources.natlResourcesID FROM NaturalResources INNER JOIN Materials ON NaturalResources.materialID = Materials.materialID INNER JOIN Planets ON NaturalResources.planetID = Planets.planetID INNER JOIN Nations ON Planets.nationID = Nations.nationID WHERE Nations.nationID = %s Order BY Materials.materialName ASC;', (id,))

    # put nations in list format
    row_headers = [x[0] for x in cursor.description]
    data = cursor.fetchall()
    json_data = []

    for result in data:
        json_data.append(dict(zip(row_headers, result)))

    print(json_data)

    # closes DB connections
    cursor.close()
    cnx.close()
    return json.dumps(json_data)

# get natl materials by planet
@app.route('/natlPerPlanet/<id>', methods=['GET', 'POST', 'PUT', 'DELETE'])
def natlPerPlanet(id):
    # opens DB connection
    dbInfo = connect()
    cursor = dbInfo[1]
    cnx = dbInfo[0]

    cursor.execute('SELECT NaturalResources.materialID, Materials.materialName, Planets.planetName, NaturalResources.natlQuantity, NaturalResources.natlResourcesID FROM NaturalResources INNER JOIN Materials ON NaturalResources.materialID = Materials.materialID INNER JOIN Planets ON NaturalResources.planetID = Planets.planetID WHERE Nations.nationID = %s Order BY Materials.materialName ASC;', (id,))

    # put nations in list format
    row_headers = [x[0] for x in cursor.description]
    data = cursor.fetchall()
    json_data = []

    for result in data:
        json_data.append(dict(zip(row_headers, result)))

    print(json_data)

    # closes DB connections
    cursor.close()
    cnx.close()
    return json.dumps(json_data)

# get planet for edit
@app.route('/getnatlsbyID/<id>', methods=['GET', 'POST'])
def getnatlsbyID(id):
    # opens DB connection
    dbInfo = connect()
    cursor = dbInfo[1]
    cnx = dbInfo[0]

    cursor.execute("SELECT NaturalResources.materialID, Materials.materialName, Planets.planetName, NaturalResources.natlQuantity, NaturalResources.natlResourcesID FROM NaturalResources INNER JOIN Materials ON NaturalResources.materialID = Materials.materialID INNER JOIN Planets ON NaturalResources.planetID = Planets.planetID WHERE NaturalResources.natlResourcesID = %s;", (id,))

    # put nations in list format
    row_headers = [x[0] for x in cursor.description]
    data = cursor.fetchall()
    json_data = []

    for result in data:
        json_data.append(dict(zip(row_headers, result)))

    print(json_data)

    # closes DB connections
    cursor.close()
    cnx.close()
    return json.dumps(json_data)

############################    INSERTS  #######################################
# adding a natlResource
@cross_origin(supports_credentials=True)
@app.route('/addnatl', methods=['GET', 'POST'])
def addNatl():
    # opens DB connection
    dbInfo = connect()
    cursor = dbInfo[1]
    cnx = dbInfo[0]

    if request.method=='POST':
        # parse for new individuals data
        theform = request.get_json(force=True)
        materialID = theform['materialID']
        planetID = theform['planetID']
        natlQuantity = theform['natlQuantity']

        cursor.execute("INSERT INTO NaturalResources (materialID, planetID, natlQuantity) VALUES (%s, %s, %s);", (materialID, planetID, natlQuantity,))

        cnx.commit()

        msg = "added material"

    else:
        msg = "Please fill out the form."
    
    print("Message: ", msg)

        # closes DB connections
    cursor.close()
    cnx.close()

    return redirect(url_for('getAllNatl'))

############################    UPDATES   ######################################
@app.route('/editnatl', methods=['GET', 'POST'])
def editNatl():
    # opens DB connection
    dbInfo = connect()
    cursor = dbInfo[1]
    cnx = dbInfo[0]

    # parse for new individuals data
    theform = request.get_json(force=True)
    natlID = theform['natlID']
    materialID = theform['materialID']
    planetID = theform['planetID']
    natlQuantity = theform['natlQuantity']

    cursor.execute("UPDATE NaturalResources SET materialID = %s, planetID = %s, natlQuantity = %s WHERE natlResourcesID = %s;", (materialID, planetID, natlQuantity, natlID,))

    cnx.commit()

    print("editing natl: ", natlID)

        # closes DB connections
    cursor.close()
    cnx.close()

    return redirect(url_for('getAllNatl'))

############################    DELETE    ######################################
@app.route('/deleteNatl/<id>', methods=['GET', 'DELETE'])
def deleteNatl(id):
    # opens DB connection
    dbInfo = connect()
    cursor = dbInfo[1]
    cnx = dbInfo[0]

    cursor.execute("DELETE FROM NaturalResources WHERE natlResourcesID = %s;", (id,))

    cnx.commit()

    print("deleted natl: ", id)

    
    # closes DB connections
    cursor.close()
    cnx.close()

    return redirect(url_for('getAllNatl'))




################################################################################
#                       MATERIALS MANIPULATIONS
################################################################################

############################    SELECTS    #####################################
# get all materials
@app.route('/allmaterials', methods=['GET', 'POST', 'PUT', 'DELETE'])
def getAllMaterials():
    # opens DB connection
    dbInfo = connect()
    cursor = dbInfo[1]
    cnx = dbInfo[0]

    cursor.execute('SELECT materialName, CONCAT (Materials.value, " (", Materials.units, ")") AS pricePer, materialID FROM Materials ORDER BY materialName ASC;')

    # put nations in list format
    row_headers = [x[0] for x in cursor.description]
    data = cursor.fetchall()
    json_data = []

    for result in data:
        json_data.append(dict(zip(row_headers, result)))

    print(json_data)

    # closes DB connections
    cursor.close()
    cnx.close()
    return json.dumps(json_data)

# get names, ID for dropdown list
@app.route('/dropdownMaterials', methods=['GET', 'POST', 'PUT', 'DELETE'])
def dropdownMaterials():
    # opens DB connection
    dbInfo = connect()
    cursor = dbInfo[1]
    cnx = dbInfo[0]

    cursor.execute('SELECT materialID, materialName FROM Materials ORDER BY materialName ASC;')

    # put nations in list format
    row_headers = [x[0] for x in cursor.description]
    data = cursor.fetchall()
    json_data = []

    for result in data:
        json_data.append(dict(zip(row_headers, result)))

    print(json_data)

    # closes DB connections
    cursor.close()
    cnx.close()
    return json.dumps(json_data)


# get names, ID for dropdown list
@app.route('/materialPerPlanet/<id>', methods=['GET', 'POST', 'PUT', 'DELETE'])
def materialPerPlanet(id):
    # opens DB connection
    dbInfo = connect()
    cursor = dbInfo[1]
    cnx = dbInfo[0]

    cursor.execute('SELECT Materials.materialName, CONCAT (Materials.value, " (", Materials.units, ")") AS pricePer, Materials.materialID, Planets.planetName, NaturalResources.planetID FROM Planets INNER JOIN NaturalResources ON Planets.planetID = NaturalResources.planetID INNER JOIN Materials ON NaturalResources.materialID = Materials.materialID WHERE Planets.planetID = %s GROUP BY materialName ORDER BY materialName ASC;', (id,))

    # put nations in list format
    row_headers = [x[0] for x in cursor.description]
    data = cursor.fetchall()
    json_data = []

    for result in data:
        json_data.append(dict(zip(row_headers, result)))

    print(json_data)

    # closes DB connections
    cursor.close()
    cnx.close()
    return json.dumps(json_data)

    # get names, ID for dropdown list
@app.route('/materialPerNation/<id>', methods=['GET', 'POST', 'PUT', 'DELETE'])
def materialPerNation(id):
    # opens DB connection
    dbInfo = connect()
    cursor = dbInfo[1]
    cnx = dbInfo[0]

    cursor.execute('SELECT Materials.materialName, CONCAT (Materials.value, " (", Materials.units, ")") AS pricePer, Materials.materialID, Nations.nationName, Planets.planetName FROM Nations INNER JOIN Planets ON Nations.nationID = Planets.nationID INNER JOIN NaturalResources ON Planets.planetID = NaturalResources.planetID INNER JOIN Materials ON NaturalResources.materialID = Materials.materialID WHERE Nations.nationID = %s GROUP BY materialName ORDER BY materialName ASC;', (id,))

    # put nations in list format
    row_headers = [x[0] for x in cursor.description]
    data = cursor.fetchall()
    json_data = []

    for result in data:
        json_data.append(dict(zip(row_headers, result)))

    print(json_data)

    # closes DB connections
    cursor.close()
    cnx.close()
    return json.dumps(json_data)

    # get planet for edit
@app.route('/getmatlsbyID/<id>', methods=['GET', 'POST'])
def getmatlsbyID(id):
    # opens DB connection
    dbInfo = connect()
    cursor = dbInfo[1]
    cnx = dbInfo[0]

    cursor.execute('SELECT materialName, Materials.value, Materials.units, materialID FROM Materials WHERE Materials.materialID = %s;', (str(id),))
    # put nations in list format
    row_headers = [x[0] for x in cursor.description]
    data = cursor.fetchall()
    json_data = []

    for result in data:
        json_data.append(dict(zip(row_headers, result)))

    print(json_data)

    print(json_data[0]['value'])

    json_data[0]['value'] = str(json_data[0]['value'])

    # closes DB connections
    cursor.close()
    cnx.close()
    return json.dumps(json_data)

############################    INSERTS  #######################################
# adding a material
@cross_origin(supports_credentials=True)
@app.route('/addmaterial', methods=['GET', 'POST'])
def addMaterial():
    # opens DB connection
    dbInfo = connect()
    cursor = dbInfo[1]
    cnx = dbInfo[0]

    if request.method=='POST':
        # parse for new individuals data
        theform = request.get_json(force=True)
        name = theform['name']
        value = theform['value']
        units = theform['units']

        cursor.execute("INSERT INTO Materials (materialName, value, units) VALUES (%s, %s, %s);", (name, value, units,))

        cnx.commit()

        msg = "added material"

    else:
        msg = "Please fill out the form."
    
    print("Message: ", msg)

        # closes DB connections
    cursor.close()
    cnx.close()

    return redirect(url_for('getAllMaterials'))

############################    UPDATES   ######################################
@app.route('/editmaterial', methods=['GET', 'POST'])
def editMaterial():
    # opens DB connection
    dbInfo = connect()
    cursor = dbInfo[1]
    cnx = dbInfo[0]

    # parse for new individuals data
    theform = request.get_json(force=True)
    materialID = theform['materialID']
    name = theform['name']
    value = theform['value']
    units = theform['units']

    cursor.execute("UPDATE Materials SET materialName = %s, value = %s, units = %s WHERE materialID = %s;", (name, value, units, materialID,))

    cnx.commit()

    print("editing materialID: ", materialID)

        # closes DB connections
    cursor.close()
    cnx.close()

    return redirect(url_for('getAllMaterials'))

############################    DELETE    ######################################
@app.route('/deleteMaterial/<materialID>', methods=['GET', 'DELETE'])
def deleteMaterial(materialID):
    # opens DB connection
    dbInfo = connect()
    cursor = dbInfo[1]
    cnx = dbInfo[0]

    cursor.execute("DELETE FROM Materials WHERE materialID = %s;", (materialID,))

    cnx.commit()

    print("deleted materialID: ", materialID)

    
    # closes DB connections
    cursor.close()
    cnx.close()

    return redirect(url_for('getAllMaterials'))


################################################################################
#                       STARSYSTEMS MANIPULATIONS
################################################################################

############################    SELECTS    #####################################
# get names, ID for dropdown list
@cross_origin(supports_credentials=True)
@app.route('/dropdownsystems',  methods=['GET', 'POST', 'PUT', 'DELETE'])
def dropdownSystems():
    # opens DB connection
    dbInfo = connect()
    cursor = dbInfo[1]
    cnx = dbInfo[0]

    cursor.execute('SELECT systemID, systemName FROM StarSystems ORDER BY systemName ASC;')

    # put nations in list format
    row_headers = [x[0] for x in cursor.description]
    data = cursor.fetchall()
    json_data = []

    for result in data:
        json_data.append(dict(zip(row_headers, result)))

    print(json_data)

    # closes DB connections
    cursor.close()
    cnx.close()
    return json.dumps(json_data)

############################    INSERTS  #######################################

############################    UPDATES   ######################################

############################    DELETE    ######################################


if __name__ == "__main__":
    app.run(debug=True, port=5000)