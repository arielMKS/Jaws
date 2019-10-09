// import axios from "axios";

// get reference to ul, li
let ul = document.querySelector("ul");
let li = document.querySelectorAll("li");
let input = document.querySelector("input");
let btn = document.querySelector("input[type='submit'");
let url = "http://localhost:5000";

// IIFE to ask server if app is on production mode.
(function() {
  fetch("/mode", {
    method: "GET"
  })
    .then(response => {
      return response.json();
    })
    .then(response => {
      url = ""; // reset url if in production mode
    })
    .catch(err => console.log("Error in /mode"));
})();

// create a button
li.forEach(liItem => {
  let btn = document.createElement("button");
  btn.innerHTML = "delete";

  // add event listener to button
  btn.addEventListener("click", evt => {
    let parent = evt.target.parentNode;
    let id = parent.firstChild.innerHTML; // get reference to <span>[id]</span>

    // url will be set appropriately both for development and production modes
    fetch(url + "/car/" + id, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data: "Sending data to server" })
    });
  });

  liItem.appendChild(btn);
});
