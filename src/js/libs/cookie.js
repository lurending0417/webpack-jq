// require('./encrypt.js')

// var passKey = '4c05c54d952b11e691d76c0b843ea7f9';

/*
** 保存cookie，
** cname:name, cvalue:value, exdays:过期天数
*/
export function setCookie(cname, cvalue, exdays) {
    let d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000))
    let expires = `expires=${d.toUTCString()}`;
    document.cookie = `${cname}=${escape(cvalue)}; ${expires}`
}

/*
** 获取cookie，
** cname:name
*/
export function getCookie(cname) {
    let name = `${cname}=`;
    var ca = document.cookie.split(';')
    for(let i = 0; i < ca.length; i++) {
        let c = ca[i].trim();
        if (c.indexOf(name) !== -1){
            let cvalue = unescape(c.substring(name.length, c.length));
            // return decrypt(cvalue, passKey)
            return cvalue
        }
    }
    return ''
}

/*
** 清除cookie，
** cname:name
*/
export function clearCookie(cname) {
    setCookie(cname, '', -1)
}