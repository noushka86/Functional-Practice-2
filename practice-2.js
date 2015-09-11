
//  Part I

// ----------------------------
// write your own forEach() function that takes an array and a function
// ----------------------------

function forEach(array, callback){
        for (var i = 0; i < array.length; i++) {
          // console.log(array[i])
            callback(array[i]);
        }
}


function reduce(array, callback){
   var tot=array[0];
   newArray=array.slice(1);
   forEach(newArray,function(a){
    tot=callback(a,tot);
   })
return tot;
}



function map(array, callback){
    
    var newArray=[];

    forEach(array,function(a){
        newArray.push(callback(a))
    });

    return newArray;
}

function filter(array, callback){
  
  var newArray=[];
var isEven;
  forEach(array,function(a){
    isEven=callback(a);
    if(isEven)
    {
        newArray.push(a);
    }
  });

    return newArray;

}



// using our own forEach(), map(), reduce(), and filter()
// functions written in js-functions-functional-practice-1


// -----------
// Write a function pluck() that extracts a list of
// values associated with property names.
// -----------
function pluck(list, propertyName) {

      return map(list,function(obj){
              return obj[propertyName];
        })
}

// tests
// ---
var stooges = [{name: 'moe', age: 40}, {name: 'larry', age: 50}, {name: 'curly', age: 60}]
console.assert(pluck(stooges, 'name')[0] === 'moe')
console.assert(pluck(stooges, 'age')[2] === 60)


// console.assert(pluck(stooges, 'name')[0] === 'moe')
// console.assert(pluck(stooges, 'age')[2] === 60)



// -----------
// Write a function reject() that does the opposite of filter,
// if the callback function returns a "truthy" value then that
// item is **not** inserted into the new collection,
// otherwise it is.
// -----------


function reject(list, callback) {
    
  var rejected= filter(list,function(a){
      if(a%2===0) return false;
      else  return true;
    })
  return rejected;
}

// tests
// ---
var lt10 = [0,1,2,3,4,5,6,7,8,9,10]
var odds = reject(lt10, function(n){ return n%2 === 0 })


console.assert(odds[0] === 1)
console.assert(odds[1] === 3)
console.assert(odds[4] === 9)



// -----------
// Write a function find() that returns the very first item
// in a collection when the callback function returns true;
// otherwise returns undefined.
// -----------

function find(list, callback) {
      
        var found= filter(list,function(obj){
                if (callback(obj)) return obj;

          })
        if (found.length>0) return found[0];
            
        // console.log(found);
}


// tests
// ---
var people = [
    {name: "Justin", teaches: "JS"},
    {name: "Jwo", teaches: "Ruby"},
    {name: "Dorton", teaches: "life"}
]
var JS = find(people, function(n){ return n.  teaches === "JS" })
console.assert(JS.name === "Justin")





// -----------
// Write a function where() that filters for all the values
// in the properties object.
// -----------
function where(list, properties) {
           
        return filter(list, function(obj){
       
                for(var p in properties){
                   
                  if(obj[p]!==properties[p]) return false;
                  
              else continue;
            }
            return obj;

            })
}

// tests
// ---
var plays = [
    {title: "Cymbeline", author: "Shakespeare", year: 1623},
    {title: "The Tempest", author: "Shakespeare", year: 1623},
    {title: "Hamlet", author: "Shakespeare", year: 1603},
    {title: "A Midsummer Night's Dream", author: "Shakespeare", year: 1600},
    {title: "Macbeth", author: "Shakespeare", year: 1620},
    {title: "Death of a Salesman", author: "Arthur Miller", year: 1949},
    {title: "Two Blind Mice", author: "Samuel and Bella Spewack", year: 1949}
]

var sh8spr = where(plays, {author: "Shakespeare"})
console.assert(sh8spr instanceof Array)
console.assert(sh8spr.length === 5)
console.assert(sh8spr[0].title === "Cymbeline")

sh8spr = where(plays, {author: "Shakespeare", year: 1611})
console.assert(sh8spr.length === 0)

sh8spr = where(plays, {author: "Shakespeare", year: 1623})
console.assert(sh8spr.length === 2)

var midcentury = where(plays, {year: 1949})
console.assert(midcentury.length === 2)
