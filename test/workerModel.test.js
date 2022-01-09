// const Worker = require('../models/workerModel');
// const mongoose = require('mongoose');

// const url = 'mongodb://localhost:27017/Gharmai_Testing';

// beforeAll(async () => {
//     await mongoose.connect(url, {
//         useNewUrlParser: true,
//         useCreateIndex: true
//     });
// });
// afterAll(async () => {
//     await mongoose.connection.close();
// });

// describe('Worker schema test anything', () => {

    // Worker insert testing
    // it('testing worker insert', () => {
    //     const worker = {
    //         'firstname': 'Rekhs',
    //         'username': 'RekhaThapa',
    //         'email': 'thapa45@gmail.com',
    //         'password': 'qwerty'
    //     };

    //     return Worker.create(worker)
    //         .then((pro_ret) => {
    //             [
    //                 except(pro_ret.username).toEqual('RekhaThapa')
    //             ]
    //         })
    // })

    // Worker delete testing
    // it('testing for delete', async () => {
    //     const status = await Worker.deleteMany();
    //     except(status.ok).toBe(1);
    // })

    // Worker update testing
    // it('testing for the update', async () => {
    //     return Worker.findOneAndUpdate({ _id: Object('6150b5d621a94739fc46692f') },
    //         {
    //             $set:
    //             {
    //                 firstname: 'Niruta',
    //                 username: 'NirutaSingh',
    //                 email: 'singh90@gmail.com',
    //                 password: 'asdfgh',
    //             }
    //         })
    //         .then((pp) => {
    //             expect(pp.username).toEqual('NirutaSingh')
    //         })

    // });
// })
