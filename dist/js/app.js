require.config({
    paths:{
        scrollimg:'component/runimg'
    }
});
require(function(p){
    $('#exit').click(function(){
        new p.Runimg().setup({
            
        });
    })
});


