const moment = require("../utils/moment.min.js")
const app = getApp();


const baseMap = {
    app_id: "1234",
    format: "JSON",
    charset: "utf-8",
    sign_type: "BASIC",
    version: "1.0",
    client_type: "wxxcx",
    client_version: "2222",
    app_name: "wxxcx",
    device_name: "未知",
    system_version: "",
};
function request(url, data) {
        const baseMap = this.baseMap;
        baseMap.timestamp = moment().format('YYYY-MM-DD HH:mm:ss');
        return new Promise((success, error) => {
            app.wxApi(wx.getNetworkType)
                .then((res) => {
                    //构建网络信息
                    baseMap.environment_network = res.networkType
                })
                .then(() => {
                    //请求服务器
                    console.log("请求服务器：", app.config.apiURL + url, sign(config.key, baseMap, data));
                    return app.wxApi(wx.request, {
                        url: config.apiURL + url,
                        method: "POST",
                        body: JSON.stringify(sign(config.key, baseMap, data))
                    });
                }).then((res) => {
                    //返回结果
                    console.log("服务器返回：", app.config.apiURL + url, res);
                    if (res.code && res.code != 40004) {
                        error({ sub_msg: "好像出错了，请稍后再试" })
                    } else if (res.sub_code != "ok") {
                        error(res)
                    } else {
                        success(res)
                    }
                }).catch((e) => {
                    //返回错误
                    console.log("请求服务器出错：", app.config.apiURL + url, e);
                    error({ sub_msg: "好像出错了，请稍后再试" })
                })
        });
    }
module.exports = {
    request:request 
}

