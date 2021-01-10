module.exports = function(io){
    try{
        io.on('connection', (socket) => {
        console.log('made socket connection', socket.id);
    });
    } catch(e){
        console.log("error",e)
    }

}


