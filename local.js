//storage


//database
//getting from server / without server

//local storage
    // data store in local


localStorage.setItem('firstName', 'Jasim');
localStorage.setItem('lastName', 'Uddim');
const person = {
    firstName:'jasim',
    lastName:'uddim'
}
localStorage.setItem('person', JSON.stringify(person))
localStorage.setItem('person', person);
console.log(localStorage.getItem('firstName'));
localStorage.setItem('age', 20);
console.log(typeof(localStorage.getItem('age')));
