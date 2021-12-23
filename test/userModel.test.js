const User = require('../models/userModel');
const mongoose = require('mongoose');

const url = 'mongodb://localhost:27017/Gharmai_Testing';

beforeAll(async () => {
    await mongoose.connect(url, {
        useNewUrlParser: true,
        useCreateIndex: true
    });
});
afterAll(async () => {
    await mongoose.connection.close();
});

describe('User schema test anything', () => {

    // User insert testing
    it('testing user insert', () => {
        const user = {
            'firstname': 'Rajesh',
            'username': 'RajeshHamal',
            'email': 'hamal16@gmail.com',
            'password': 'madhu123'
        };

        return User.create(user)
            .then((pro_ret) => {
                [
                    except(pro_ret.username).toEqual('RajeshHamal')
                ]
            })
    })

    // User delete testing
    // it('testing for delete', async () => {
    //     const status = await User.deleteMany();
    //     except(status.ok).toBe(1);
    // })

    // User update testing
    // it('testing for the update', async () => {
    //     return User.findOneAndUpdate({ _id: Object('6150b5d621a94739fc46692f') },
    //         {
    //             $set:
    //             {
    //                 firstname: 'Saugat',
    //                 username: 'SaugatMalla',
    //                 email: 'malla123@gmail.com',
    //                 password: 'shristi123',
    //             }
    //         })
    //         .then((pp) => {
    //             expect(pp.username).toEqual('SaugatMalla')
    //         })

    // });
})
