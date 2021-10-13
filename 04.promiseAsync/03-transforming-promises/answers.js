/**
 * 
 * EXERCISE 1
 * 
 * @param {*} promise 
 * @param {*} transformer 
 * @returns {Promise}
 */
function mapPromise(promise, transformer){
  return new Promise((resolve, reject) => {
    promise.catch((err) => reject(err))
    .then((res) => resolve(transformer(res)))
    .catch((err) => reject(err))
  });
}

/**
 * 
 * EXERCISE 2
 * 
 * @param {Promise<number | string>} numberPromise 
 * @returns {Promise<number>}
 */
// function squarePromise(numberPromise){
//   return numberPromise
//     .then((val) => {
//       return new Promise((resolve, reject) => {
//         if(Number(val)) resolve(Number(val) * Number(val));
//         else reject(`Cannot convert '${val}' to a number!`); 
//       })
//     })
// }
function squarePromise(numberPromise){
  return numberPromise
    .then(/* IMPLEMENT ME! */(result)=>{
      if(!isNaN(result)){
        return result*result;
      }
      else{
        throw `Cannot convert '${result}' to a number!`;
      }
    });
}


/**
 * EXERCISE 3
 * 
 * @param {Promise<number | string>} numberPromise 
 * @returns {Promise<number>}
 */
function squarePromiseOrZero(promise){
  return squarePromise(promise)
  .catch((err) => {
    return new Promise((resolve, reject) => {
      resolve(0);
    })});
}

/**
 * EXERCISE 4
 * 
 * @param {Promise} promise 
 * @returns {Promise}
 */
//.then(successCb, failureCb)
function switcheroo(promise){
  return promise.then((val) => Promise.reject(val), (err) => Promise.resolve(err));
}

/**
 * @callback consumer
 * @param {*} value
 */

/**
 * @callback handler
 * @param {*} error
 */

module.exports = {
  mapPromise,
  squarePromise,
  squarePromiseOrZero,
  switcheroo,
};