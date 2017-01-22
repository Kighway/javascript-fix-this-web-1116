var cake = {
  name: "German Chocolate Cake",
  ingredients: ["eggs", "flour", "oil", "chocolate", "sugar", "butter"],
  topping: "coconut frosting",
  bakeTemp: "425 degrees",
  bakeTime: "45 minutes",
  customer: "Tommy",
  decorate: function(updateFunction) {
    var statusText = "Decorating with " + this.topping + ". Ready to eat soon!"
    setTimeout(updateFunction(statusText), 2000)
    var serveMessage = serve.apply(this, ["Happy Eating!", this.customer])
    setTimeout(updateFunction(serveMessage), 4000)
  }
}

var pie = {
  name: "Apple Pie",
  ingredients: ["apples", "flour", "eggs", "butter", "sugar"],
  topping: "streusel",
  bakeTemp: "350 degrees",
  bakeTime: "75 minutes",
  customer: "Tammy",
  // decorate: cake.decorate.bind(pie) //this would do it...
}

// pie.decorate = cake.decorate.bind(pie) //this would do it...


document.addEventListener("DOMContentLoaded", function(event) {
  //you shouldn't need to alter this function
  var cookLinks = document.getElementsByClassName("js-make")
  for(var i=0; i<cookLinks.length; i++) {
    cookLinks[i].addEventListener("click", makeDessert)
  }
})

function makeDessert() {
  switch(this.parentElement.getAttribute('id')) {
    case "cake":
        makeCake.call(this.parentElement)
        break
    case "pie":
        makePie.call(this.parentElement)
        break
    default:
        alert("nope nope nope nope nope")
  }
}

function makeCake() {
  var updateCakeStatus = updateStatus.bind(this)
  mix.call(cake, updateCakeStatus)
}

function makePie() {
  pie.decorate = cake.decorate.bind(pie) //but apparently the test wants this... testing bites... pie!
  var updatePieStatus = updateStatus.bind(this)
  mix.call(pie, updatePieStatus)
}

function updateStatus(statusText) {
  this.getElementsByClassName("status")[0].innerText = statusText
}

function mix(updateFunction) {
  var statusText = "Mixing " + this.ingredients.join(", ")
  setTimeout( () => {bake.call(this, updateFunction)}, 2000)
  updateFunction(statusText)
}

function bake(updateFunction) {
  var statusText = "Baking at " + this.bakeTemp + " for " + this.bakeTime
  setTimeout( () => {cool.call(this, updateFunction)}, 2000)
  updateFunction(statusText)
}

function cool(updateFunction) {
  var statusText = "It has to cool! Hands off!"
  setTimeout(() => {this.decorate.call(this, updateFunction)}, 2000)
  updateFunction(statusText)
}

function serve(message, customer) {
  //you shouldn't need to alter this function
  return(customer + ", your " + this.name + " is ready to eat! " + message)
}
