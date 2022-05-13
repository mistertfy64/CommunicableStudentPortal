const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://localhost:22222/Cluster1');
}

const eventSchema = new mongoose.Schema({
    title: String,
    datetime: { type: Date, default: Date.now },
    author: String,
    describtion: String,
    comment: [{ body: String, datetime: Date }],
  });

const Event = mongoose.model('Event', eventSchema);

const silence = new Event({
   title: 'Lecture',
   datetime: '2022-06-15T14:00:00 GMT-0700',
   author: 'Jane Doe',
   describtion: 'On the 5th of June there will be a lecture about the ecosystem.',
   comment: [{}],
});

console.log(lecture.name);

eventSchema.methods.speak = function speak() {
    const eventTitle = this.name
      ? this.name + " at " + this.time
      : "I don't have a name";
    console.log(eventTitle);
};
  
const orientation = new Event({ name: 'Orientation' });
orientation.speak();

const events = await Event.find();
console.log(events);

await Event.find({ name: /^orientation/ });