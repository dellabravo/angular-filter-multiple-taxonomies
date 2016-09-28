angular.module('app')

.filter('filterMultipleTaxonomies', function(){    
  return function (items, filters) {
      if(filters === undefined)
          return items;
      var keys = Object.keys(filters); 
      var filtered = [];
      var populate = true;
      for (var i = 0; i < items.length ; i++){
        var item = items[i];
        populate = true;
                        
        for(var k = 0; k < keys.length ; k++){
          if(filters[keys[k]] != undefined){    
            for( var j in filters[keys[k]]){  //for each filter term (ex. domains[j] = healthcare)                            
              if(item[keys[k]] == undefined || item[keys[k]].length < 1){ //the innovation doesn't have any terms for this filter
                populate = false;
                break;
              }
              for(var n = 0; n< item[keys[k]].length; n++){  //for each item in a filter term (ex item.domains[n])                
                if(item[keys[k]][n].slug == filters[keys[k]][j].slug){
                  populate = true;
                  break;
                }
                else{
                  populate = false;
                }
              }
              if(populate == true) break;  //for OR logic between terms, remove for AND               
            }          
          }
          if(populate == false) break //for AND logic between taxonomies, remove for OR
        }
        if(populate){
            filtered.push(item);
        }
      }
    return filtered;
  };
});
