module.exports = { 
    findTiny: function(tiny, map_global){
     if(map_global[tiny][0] === undefined ) {
       return false;
     }
     else {
          console.log(map_global[tiny][0]);
          return map_global[tiny][0];
      }
    }
};

