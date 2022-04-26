import bcrypt from 'bcryptjs'

const users = [
    {
        name: 'Admin User',
        password: bcrypt.hashSync('123456', 10),
        email: 'admin@gmail.com',
        isAdmin : true,

    },
    {
        name: 'Daniel Grabinski',
        password: bcrypt.hashSync('123456', 10),
        email: 'daniel@gmail.com',
        
    },
    {
        name: 'Mambo Rambo',
        password: bcrypt.hashSync('123456', 10),
        email: 'mambo@gmail.com',
        

    },
]

export default users