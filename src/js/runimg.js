(function(){
    var $ =function(e){
        return document.querySelectorAll(e);
    }
    var log = function(text){
        console.log(text);
    }
    var bindEvent = function(target,type,handler){
        if(target.addEventListener){
            target.addEventListener(type,handler,false);
        }else{
            target.attachEvent('on'+type,function(e){
                handler.call(target,e);
            });
        }
    }
    window.onload = function(){
        var container = $('#runimg-container')[0],
            list = $('#runimg-list')[0],
            buttons = $('#runimg-buttons .dot'),
            prev = $('#runimg-prev')[0],
            next = $('#runimg-next')[0],
            animated = false;

        function animate(offset){
            if(offset === 0){
                return;
            }
            animated = true;
            var left = parseInt(list.style.left)+offset;
            var go = function(){

            }
            go();
        }
        bindEvent(prev,'click',function(){
            list.style.left = parseInt(list.style.left) - 600 + 'px';
            log(list.style.left);
        });
        bindEvent(next,'click',function(){
            list.style.left = parseInt(list.style.left) + 600 + 'px';
        });
        
    }
})();