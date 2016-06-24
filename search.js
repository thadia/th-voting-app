module.exports = { 
    findTiny: function(tiny, map_global){
     // for(var i=0;i<100;i++){
     //   if(map_global[i][1] == tiny )
     if(map_global[tiny][0] === undefined ) {
       return false;
     }
     else {
          console.log(map_global[tiny][0]);
          return map_global[tiny][0];
     // }
      }
    }
};

