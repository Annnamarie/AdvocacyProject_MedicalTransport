//button for dark theme
let themeButton = document.getElementById("theme-button");

// sign now button here
let signNowButton = document.getElementById("sign-now-button");

//form
let form = document.getElementById('sign-petition')

//intializing count to 3 since there is already three signatures
let count = 3;

//revealable containers for animation function fade in fade out when scrolling
let revealableContainers = document.querySelectorAll('.revealable');

//Toggle Dark Mode Function
const toggleDarkMode = () => {
    document.body.classList.toggle("dark-mode");

}

themeButton.addEventListener("click", toggleDarkMode);

//add signature function
const addSignature = (person) => {


  /*
  let name = document.getElementById('name').value;
  let hometown = document.getElementById('hometown').value;
  let email = document.getElementById('email').value;
  */
  let signatures = document.querySelector('.signatures');
  
  let newSignature = document.createElement('p');
  newSignature.textContent = `🖊️ ${person.name} from ${person.hometown} supports this cause.`;
  signatures.appendChild(newSignature);
  console.log(person.name, person.hometown , person.email);
  event.preventDefault(); 
  

  //stretch feature: Signature Counter

  //incrementing count
  count = count + 1;
 
  let existingCounter = document.getElementById('counter');

  //removing the existing counter
  if (existingCounter) {
    existingCounter.remove();
  }
    
  
    
  let newCounter = document.createElement('p');
  newCounter.id = 'counter';
  newCounter.innerText = `🖊️ ${count} people have signed this petition and support this cause.`;
    
    signatures.appendChild(newCounter);
  }


// Validation form function

const validateForm = () => {

  let containsErrors = false;
  
  //object for person
  let person;

  let petitionInputs = document.getElementById("sign-petition").elements;

  person = {name: petitionInputs[0].value, hometown: petitionInputs[1].value, email: petitionInputs[2].value}

 
  //  Looping through all inputs

  for (let i = 0; i < petitionInputs.length; i++) {
    //Validate the value of each input

    //using person object -> hometown  
    if (person.hometown.length < 2) {
      petitionInputs[i].classList.add('error');
      containsErrors = true;
    }
    else {
      petitionInputs[i].classList.remove('error');
    }
  }
  
  //stretch feature : validating email

  //using person object -> email
  if (!person.email.includes('.com')){
    containsErrors = true;
    email.classList.add('error');
    event.preventDefault()
  }

    else {
        email.classList.remove('error');
    }

  // Call addSignature() and clear fields if no errors
  if (containsErrors == false) {
    //now takes in argument person since we now have object -> person
    addSignature(person);
    toggleModal(person);
    for (let i = 0; i < petitionInputs.length; i++) {
      petitionInputs[i].value = "";
      containsErrors = false;
    }
  }

}

//triggering the validate form function with an event listener
signNowButton.addEventListener('click', validateForm);

//Animation

let animation = {
  revealDistance: 150,
  initialOpacity: 0,
  transitionDelay: 0,
  transitionDuration: '2s',
  transitionProperty: 'all',
  transitionTimingFunction: 'ease'
}

//reveal function
const reveal = () => {
  for (let i = 0; i < revealableContainers.length; i++) {
    let windowHeight = window.innerHeight;
    let topOfRevealableContainer = revealableContainers[i].getBoundingClientRect().top;
    if (topOfRevealableContainer < windowHeight - animation.revealDistance) {
      revealableContainers[i].classList.add('active');
    }
    else {
      revealableContainers[i].classList.remove('active');
    }
  }
}

window.addEventListener('scroll', reveal)

//stretch feature- Reduce Motion
let reduceMotionButton = document.getElementById("reduce-motion");

const reduceMotion = () => {
  animation.transitionDuration = '0s';
  animation.transitionProperty = 'none';
  animation.transitionTimingFunction = 'linear';
  animation.revealDistance = 0;
  animation.initialOpacity = 1;
  for (let i = 0; i < revealableContainers.length; i++) {
    revealableContainers[i].style.transitionDuration = animation.transitionDuration;
    revealableContainers[i].style.transitionProperty = animation.transitionProperty;
    revealableContainers[i].style.transitionTimingFunction = animation.transitionTimingFunction;
    revealableContainers[i].style.transform = `translateY(${animation.revealDistance}px)`;
    revealableContainers[i].style.opacity = animation.initialOpacity;
  }
}
//event listener to reduce motion
reduceMotionButton.addEventListener("click", reduceMotion);

//Modal

const toggleModal = (person) => {
  let modal = document.getElementById("thanks-modal")
  let modalContent = document.getElementById("thanks-modal-content")

  modal.style.display = "flex";

  let newModalContent = `Thank you so much ${person.name}! ${person.hometown} represent!`;

  modalContent.textContent = newModalContent;
  
  setTimeout(() => {
    modal.style.display = "none";
    clearInterval(intervalId); 
  }, 4000)

  let intervalId = setInterval(scaleImage, 500)
  
}

let scaleFactor = 1;
let modalImage = document.getElementById("modal-img");

const scaleImage = () => {
  if (scaleFactor === 1) {
    scaleFactor = 0.8;
  } else {
    scaleFactor = 1;
  }

  modalImage.style.transform = `scale(${scaleFactor})`;
}
