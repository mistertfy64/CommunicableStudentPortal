const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://localhost:8888/Cluster1');
}

const eventSchema = new mongoose.Schema({
    name: String
  });

const Event = mongoose.model('Event', eventSchema);

const silence = new Event({ name: 'Lecture' });
console.log(lecture.name);

eventSchema.methods.speak = function speak() {
    const eventTitle = this.name
      ? this.name + " at " + this.time
      : "I don't have a name";
    console.log(eventTitle);
};
  
const Kitten = mongoose.model('Kitten', kittySchema);
  
const orientation = new Event({ name: 'Orientation' });
orientation.speak();

const events = await Event.find();
console.log(events);

await Kitten.find({ name: /^orientation/ });