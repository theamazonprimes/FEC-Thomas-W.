// const faker = require('faker');
// const fs = require('fs');

// const amazonWrite = fs.createWriteStream('data.csv');

// const writeOneMillionTimes = (writer, data, encoding, callback) => {
//   let i = 10000000;

//   write();
//   function write() {
//     let ok = true;

//     do {
//       const amazon = {
//         brand: faker.company.companyName(),
//         name: faker.random.words(8),
//         reviews: faker.random.number(100000),
//         questions: faker.random.number(1000),
//         price: Math.round(Math.random() * 5000),
//         color: faker.commerce.color(),
//         size: faker.random.word(),
//         weight: faker.random.number(1000),
//         text: faker.lorem.sentences(Math.floor(Math.random() * 10) + 10)
//       };
//       const sizes = [
//         'X-Small X-Large XX-Large',
//         'Small Medium Large',
//         'Medium Large XX-Large',
//         'X-Small Medium Large',
//         'XXX-Large XXXX-Large XXXXX-Large',
//         'XXXX-Small XXX-Small Small Large'
//       ];
//       amazon.size = sizes[Math.floor(Math.random() * sizes.length)];
//       amazon.star1 = Math.floor(Math.random() * (amazon.reviews + 1));
//       amazon.star2 = Math.floor(
//         Math.random() * (amazon.reviews - amazon.star1 + 1)
//       );
//       amazon.star3 = Math.floor(
//         Math.random() * (amazon.reviews - amazon.star1 - amazon.star2 + 1)
//       );
//       amazon.star4 = Math.floor(
//         Math.random() *
//           (amazon.reviews - amazon.star1 - amazon.star2 - amazon.star3 + 1)
//       );
//       amazon.star5 =
//         amazon.reviews -
//         amazon.star1 -
//         amazon.star2 -
//         amazon.star3 -
//         amazon.star4;
//       i--;
//       if (i % 100000 === 0) {
//         console.log(i);
//       }
//       if (i === 0) {
//         // last time!

//         writer.write(
//           `\n${Object.values(amazon).join(',')}`,
//           encoding,
//           callback
//         );
//       } else {
//         // see if we should continue, or wait
//         // don't pass the callback, because we're not done yet.
//         // ok = writer.write(amazon, encoding);

//         ok = writer.write(`\n${Object.values(amazon).join(',')}`, encoding);
//       }
//     } while (i > 0 && ok);
//     if (i > 0) {
//       // had to stop early!
//       // write some more once it drains
//       writer.once('drain', write);
//     }
//   }
// };

// writeOneMillionTimes(amazonWrite, '', 'utf8', () =>
//   console.log('DONE!! FINISHED!!! COMPLETE!!!')
// );

// using csv write stream
const faker = require('faker');
const fs = require('fs');
const csvWriter = require('csv-write-stream');

const amazonWrite = csvWriter();
amazonWrite.pipe(fs.createWriteStream('data.csv'));

const writeOneMillionTimes = (writer, data, encoding, callback) => {
  let i = 10000000;

  write();
  function write() {
    let ok = true;

    do {
      const amazon = {
        brand: faker.company.companyName(),
        name: faker.random.words(8),
        reviews: faker.random.number(100000),
        questions: faker.random.number(1000),
        price: Math.round(Math.random() * 5000),
        color: faker.commerce.color(),
        size: faker.random.word(),
        weight: faker.random.number(1000),
        text: faker.lorem.sentences(Math.floor(Math.random() * 10) + 10)
      };
      const sizes = [
        'X-Small X-Large XX-Large',
        'Small Medium Large',
        'Medium Large XX-Large',
        'X-Small Medium Large',
        'XXX-Large XXXX-Large XXXXX-Large',
        'XXXX-Small XXX-Small Small Large'
      ];
      amazon.size = sizes[Math.floor(Math.random() * sizes.length)];
      amazon.star1 = Math.floor(Math.random() * (amazon.reviews + 1));
      amazon.star2 = Math.floor(
        Math.random() * (amazon.reviews - amazon.star1 + 1)
      );
      amazon.star3 = Math.floor(
        Math.random() * (amazon.reviews - amazon.star1 - amazon.star2 + 1)
      );
      amazon.star4 = Math.floor(
        Math.random() *
          (amazon.reviews - amazon.star1 - amazon.star2 - amazon.star3 + 1)
      );
      amazon.star5 =
        amazon.reviews -
        amazon.star1 -
        amazon.star2 -
        amazon.star3 -
        amazon.star4;
      i--;
      if (i % 500000 === 0) {
        console.log(i);
      }
      if (i === 0) {
        writer.write(amazon, encoding, callback);
      } else {
        // see if we should continue, or wait
        // don't pass the callback, because we're not done yet.
        ok = writer.write(amazon, encoding);

        // ok = writer.write(`\n${Object.values(amazon).join(',')}`, encoding);
      }
    } while (i > 0 && ok);
    if (i > 0) {
      // had to stop early!
      // write some more once it drains
      writer.once('drain', write);
    }
  }
};

writeOneMillionTimes(amazonWrite, '', 'utf8', () =>
  console.log('DONE!! FINISHED!!! COMPLETE!!!')
);
