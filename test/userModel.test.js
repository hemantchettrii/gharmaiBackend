// this is the test for movieModel Schema
const Users = require("../models/usermodel");
const mongoose = require("mongoose");
// use the new name of the database
const url = "mongodb://localhost:27017/gharmai_test";
beforeAll(async () => {
  await mongoose.connect(url, {
    useNewUrlParser: true,
    // useCreateIndex: true,
  });
});
afterAll(async () => {
  await mongoose.connection.close();
});

describe("User Schema test anything", () => {
  // user insert testing
  it("Add user testing anything", () => {
    const user = {
      firstname: "hemant",
      lastname: "chettri",
      username: "User",
      email: "user@gmail.com",
      password: "User@123",
    };
    return Users.create(user).then((pro_ret) => {
      expect(pro_ret.username).toEqual("User");
    });
  });

  // code for update testing
  // it("to test the update user", async () => {
  //   return useNewUrlParser
  //     .findOneAndUpdate(
  //       { _id: Object("614ec63620f3041c4c1918ac") },
  //       { $set: { firstname: "test" } }
  //     )
  //     .then((pp) => {
  //       expect(pp.firstname).toEqual("hemant");
  //     });
  // });

  //     // the code below is for delete testing
  //     it("to test the delete user is working or not", async () => {
  //       const status = await Users.deleteMany();
  //       expect(status.ok).toBe(1);
  //     });
});
