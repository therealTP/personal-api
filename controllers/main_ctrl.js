var myData = {
  name: "tyler",
  hometown: "hermosa beach, ca",
  fav_color: "green",
  hobbies: ["music", "hiking", "poker", "travel"],
  family: {
    justin: {
      relation: "brother",
      age: 30
    },
    braeden: {
      relation: "brother",
      age: 24
    },
    richard: {
      relation: "father",
      age: 55
    },
    caylin: {
      relation: "sister",
      age: 21
    },
    desiree: {
      relation: "stepmother",
      age: 50
    }
  },
  age: 27,
  email: 'ty@ty.ty'
};

var getFamByAge = function(age) {
  for (var person in myData.family) {
    console.log(myData[person]);
  }
};

module.exports = {
  index: function(req, res, next) {
    res.send(myData);
  },
  show: function(req, res, next) {
    var prop = req.params.prop;
    var query = req.query;
    if (myData.hasOwnProperty(prop)) {
      if (Object.keys(query).length === 0) { // if no sort
        res.send(myData[req.params.prop]);
      } else if (query.sort && prop === "hobbies") {
        if (query.sort === "asc") {
          res.send(myData.hobbies.sort());
        } else if (query.sort === "dec") {
          res.send(myData.hobbies.reverse());
        } else {
          res.send({message: "passed in an a invalid value for sort query"});
        }
      } else if (query.sort && prop !== "hobbies") {
        res.send({response: "Can't sort that data."});
      } else if (query && !query.sort) {
        res.send({response: "Query request not valid."});
      }
    } else {
      res.send({response: "No property."});
    }
  },
  filter: function(req, res, next) {
    var age = req.params.age;
    console.log(age);
    for (var person in myData.family) {
      console.log(myData.family[person].age);
      if(myData.family[person].age.toString() === age) {
        res.send(myData.family[person]);
      }
    }
    res.send({response: "No age found."});
  },
  create: function(req, res, next) {
    for (var prop in req.body) {
      if (myData.hasOwnProperty(prop)) {
        continue;
      } else {
        myData[prop] = req.body[prop];
      }
    }
    res.send(myData);
  },
  update: function(req, res, next) {
    for (var prop in req.body) {
      if (myData.hasOwnProperty(prop)) {
        myData[prop] = req.body[prop];
      } else {
        continue;
      }
    }
    res.send(myData);
  },
  destroy: function(req, res, next) {
    var prop = req.params.prop;
    if (myData.hasOwnProperty(prop)) {
      delete myData[prop];
      res.status(200).set('record deleted');
    }
  }
};
