const {signData} = require('../utils/token')

class AuthService {

    async mockSignUp(){
        const user = {
            name: '张三',
            age: 18,
            email: 'zhangsan@mock.com'
        }
        const token = await this.generateToken(user)

        return {user, token}
    }

    async mockSignIn(email, password){
        console.log(email, password)
        const user = {
            name: '张三',
            age: 18,
            email: 'zhangsan@mock.com'
        }
        const token = await this.generateToken(user)
        return {user, token}
    }

    async generateToken(user) {
        const today = new Date();
        const exp = new Date(today);

        exp.setDate(today.getDate() + 60);
        const payload = {
            exp: exp.getTime() / 1000,
        }
        Object.assign(payload, user)    // mock

        return await signData(payload)
    }
}

module.exports = {
    AuthService
}