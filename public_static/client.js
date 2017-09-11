function change(element){


    $.get('/carforbrand',{value:element.value},function(data){

    })
}
function changecar(element){


    $.get('/carforvariant',{value:element.value},function(data){

    })
}
function checkboxid(element){


    $.get('/pricecheckbox',{id:element.id},function(data){

    })
}