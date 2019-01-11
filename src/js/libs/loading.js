(function($) {
    let options = {
        msg: '加载中，请稍后',
        gif: './img/loading.gif'
    }

    $.fn.extend = {
        openLoadForm:function(msg, callback){
            if(typeof msg=="function"){
                callback=msg;
                msg={};
            }
            $(this).on("click",function(){
                var index=$.openLoadForm(msg);
                if(typeof callback=="function"){
                    callback(index);
                }
            });
        }
    }

    $.extend({
        openMask: function(msg) {
            if (typeof msg === 'string') {
                msg = {msg: msg}
            } else if (!msg) {
                msg = {}
            }
            let option = $.extend({}, options, msg)
            // uuid
            let uuid='xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
                var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
                return v.toString(16);
            });

            let maskTag = `<div style="background-color:rgba(0,0,0, 0.1);
                                        display: flex;
                                        width: 100%;
                                        height: 100%;
                                        position: fixed;
                                        align-items: center;
                                        justify-content: center;
                                        z-index: 100;"
                                id="msk${uuid}" class="loading-mask">
                            <div>
                                <img src="${option.gif}" alt="" style="width: 20px;">
                                <span style="color: #000">${option.msg}</span>
                            </div>
                            </div>`
            $('body').append(maskTag);
            return uuid;
        },
        closeMask: function(idNum) {
            if (!idNum) {
                $('.loading-mask').remove();
            }
            $(`#msk${idNum}`).remove();
        }
    })
})($)