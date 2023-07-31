require('dotenv').config();
const mongoose  = require('mongoose')
mongoose.connect('mongodb+srv://root:'+process.env.MONGO_URI+'@cluster0.bjr2v3j.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });

let personSchema = new mongoose.Schema({
  name : {type : String, required : true},
  age : Number,
  favoriteFoods : [String]
})

let Person = mongoose.model('Person', personSchema);

const createAndSavePerson = (done) => {
  let person = new Person({name : 'Yash', age : 23, favoriteFoods : ['pavBhaji']})
  person.save((error, data) => {
  if(error)
    console.error(error)
  else
    done(null, data)
  })
};

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, (err, createdPeople)=>{
    if(err)
      console.error(err)
    else
      done(null, createdPeople)
  })
};

const findPeopleByName = (personName, done) => {
  Person.find({name : personName}, (err, arrayOfResults)=>{
  if(err)
    console.error(err)
  else
    done(null, arrayOfResults)
})
};

const findOneByFood = (food, done) => {
  Person.findOne({favoriteFoods : {$all : [food]}}, (err, result)=>{
    if(err)
      console.error(err)
    else
      done(null, result)
  })
};

const findPersonById = (personId, done) => {
  Person.findById({_id : personId }, (err, result)=>{
    if(err)
      console.error(err)
    else
      done(null, result)
  })
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findById({_id : personId }, (err, result)=>{
    if(err)
      console.error(err)
    else{
      result.favoriteFoods.push(foodToAdd)
      result.save((err, data)=>{
        if(err)
          console.error(err)
        else
          done(null, result)
      })
    }
  })
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate({name : personName}, {age : ageToSet}, {new : true}, (err, data)=>{
    if(err)
      console.error(err)
    else
      done(null, data)
  })
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove( personId , (err, deleteRecord)=>{
    if(err)
      console.error(err)
    else{
      done(null, deleteRecord)
    }
  })
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({name : nameToRemove}, (err, arrayOfResult)=>{
    if(err)
      console.error(err)
    else
      done(null, arrayOfResult)
  })
};

const queryChain = (done) => {
  const foodToSearch = "burrito";
  Person.find({favoriteFoods : {$all : [foodToSearch]}}).sort({name : 'asc'}).limit(2).select('-age').exec((err, data)=>{
    if(err)
      console.error(err)
    else
      done(null, data)
  })
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
