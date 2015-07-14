//handling of stream feeds 

module.exports = function(stream){
    
    stream.on('data',function(data){
       console.log(data) 
    })
    
}