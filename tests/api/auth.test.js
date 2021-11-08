const axios = require('axios')
const Config = require('../../src/config/config')
const util = require("util");

root = `http://127.0.0.1:${Config.port}/api/auth`

function signUpTest() {
    const url = `${root}/signup`
    axios.post(url, {
        name: '张三',
        email: 'zhangsan@mock.com'
    }).then((res) => {
        console.log(res.data)
    })
}

function signInTest() {
    const url = `${root}/signin`
    axios.post(url, {
        name: '张三',
        password: '123456'
    }).then((res) => {
        console.log(res.data)
    })

}

function logOutTest() {
    const url = `${root}/logout`
    axios.post(url, {}, {
        headers: {
            authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2NDA5MzA4NDUuNTUyLCJuYW1lIjoi5byg5LiJIiwiYWdlIjoxOCwiZW1haWwiOiJ6aGFuZ3NhbkBtb2NrLmNvbSIsImlhdCI6MTYzNTc0Njg0NX0.Ww9CHQBSA8TZO4Fin5Uy6MNaWyUv653bUx_PPG9tDNs'
        }
    }).then((res) => {
        console.log(res.data)
    })
}

signUpTest()
// signInTest()
// logOutTest()
