const mongoose = require('mongoose')
const Restaurant = require('../restaurant')
const User = require('../user')
const restaurantSeeds = require('../../restaurant.json')
const bcrypt = require('bcryptjs')

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/AC_S3_restaurant', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
const db = mongoose.connection
db.on('error', () => {
  console.log('mongodb error')
})
db.once('open', () => {
  // console.log('mongodb connected')

  const users = [
    {
      name: 'user1',
      email: 'user1@example.com',
      password: '12345678',
      restaurant_id: [1, 2, 3]
    },
    {
      name: 'user2',
      email: 'user2@example.com',
      password: '12345678',
      restaurant_id: [4, 5, 6]
    },
    {
      name: 'user3',
      email: 'user3@example.com',
      password: '12345678',
      restaurant_id: [7, 8]
    }
  ]

  async function createOneUser(user) {
    const { name, email, password } = user
    const newUser = new User({
      name,
      email,
      password,
    })

    // restore example users and restaurants to default
    let existUser
    await User.findOne({ email: email })
      .then(user => {
        if (user) {
          existUser = user
        }
      })

    if (existUser) {
      await Restaurant.deleteMany({ userId: existUser._id }, function (err) {
        if (err) return console.log(err)
      })
      await User.deleteOne({ _id: existUser._id }, function (err) {
        if (err) return console.log(err)
      })
    }

    // bcrypt.genSalt(10, (err, salt) => {
    //   bcrypt.hash(newUser.password, salt, (err, hash) => {
    //     if (err) {
    //       throw err
    //     }
    //     newUser.password = hash
    //   })
    // })

    newUser.password = await new Promise((resolve, reject) => {
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, function (err, hash) {
          if (err) reject(err)
          resolve(hash)
        });
      })
    })

    await newUser
      .save()
      .then(async user => {

        const restaurant_id = users.find(element => element.email === user.email).restaurant_id

        async function createOneRestaurant(id) {

          const restaurant = restaurantSeeds.results.find(element => element.id === id)
          await Restaurant.create({
            name: restaurant.name,
            name_en: restaurant.name_en,
            category: restaurant.category,
            image: restaurant.image,
            location: restaurant.location,
            phone: restaurant.phone,
            google_map: restaurant.google_map,
            rating: restaurant.rating,
            description: restaurant.description,
            userId: user._id
          })

        }

        async function createRestaurants(ids) {
          for (const id of ids) {
            await createOneRestaurant(id);
            // console.log(id)
          }
        }

        await createRestaurants(restaurant_id)
      })
      .catch(err => {
        console.log(err)
      })

  }

  // async function createUsers(users) {
  //   for (const user of users) {
  //     await createOneUser(user);
  //     console.log('User')
  //   }
  //   mongoose.connection.close()
  // }

  // createUsers(users)

  // promises.all()
  const promises = []

  for (const user of users) {
    promises.push(createOneUser(user))
    // console.log(user.name)
  }

  Promise.all(promises)
    .then(() => {
      mongoose.connection.close()
      console.log('Seeds had been created.')
    })

})
