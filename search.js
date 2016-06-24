module.exports = { 
    findTiny: function(tiny, map_global){
     try{
          console.log(map_global[tiny][0]);
          return map_global[tiny][0];
      }
     catch(err){
        return false;
       
     }  
    }
};

