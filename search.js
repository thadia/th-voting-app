module.exports = { 
    findTiny: function(tiny, map_global){
      for(var i=0;i<100;i++){
        if(map_global[i][0] === 0 )
          return map_global[i][1];
      }
    }
};

