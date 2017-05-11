/**
 * 签名算法工具，依赖crypto-js
 * 需要在package中添加"crypto-js":"3.1.9-1"
 * Created by wangyi on 2017/3/13.
 */
const sha512 = require("./crypto-js/sha512")
const md5 = require("./crypto-js/md5")
const base64 = require("./crypto-js/enc-base64")


// 例子
// const baseMap = {
//     "app_id": "1234",
//     "format": "JSON",
//     "charset": "utf-8",
//     "sign_type": "BASIC",
//     "timestamp": "2017-12-12 23:00:00",
//     "version": "1.0",
//     "client_type": 1,
//     "client_version": "3.1.3",
// }
//
// const bizMap = {
//     username: "liujun"
// }
// console.log(sign("asd52143fabvsdbvxcbx43123", baseMap, bizMap))
// require("superagent")
//     .post("http://becsit.myhopin.com/api/users/user/check_account_exist")
//     .send(sign("asd52143fabvsdbvxcbx43123", baseMap, bizMap))
//     .end(function (error, res) {
//         console.log(res.body)
//     });




//

// const baseMap = {
//     app_id: "1234",
//     format: "JSON",
//     charset: "utf-8",
//     sign_type: "BASIC",
//     timestamp: "2017-03-16 18:42:38",
//     version:"1.0",
//     client_type: 4,
//     client_version: "1.0",
//     app_name: "汇票交易中心",
//     device_name: "iPhone7,2",
//     environment_network: "unknown",
//     system_version: "10.2.1",
// }
// const bizMap = {
//     username: "liujun",
//     password:"123456",
// }
// console.log(sign("asd52143fabvsdbvxcbx43123", baseMap, bizMap))
// require("superagent")
//     .post("http://becsit.myhopin.com/api/users/user/login")
//     .send(sign("asd52143fabvsdbvxcbx43123", baseMap, bizMap))
//     .end(function (error, res) {
//         console.log(res.body)
//     });
function sign(signKey, baseMap, bizMap) {
    const rs = {};
    const sorted = [];
    //copy公共参数
    for (key in baseMap) {
        if (key == 'sign' || baseMap[key] == null) {
            continue
        }
        rs[key] = baseMap[key];
        sorted.push(key + "=" + baseMap[key]);
    }
    //组装业务参数
    if (bizMap) {
        rs.biz_content = JSON.stringify(bizMap)
        sorted.push("biz_content=" + JSON.stringify(bizMap))
    }
    //排序，签名
    sorted.sort(function (a, b) {
        return a > b?1:-1;
    })
    rs.sign = base64.stringify(sha512(md5(sorted.join("&") + "&key=" + signKey) + ""));

    return rs;

}
module.exports = sign;
