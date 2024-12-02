const loginBtn = document.querySelector(".start-counting");
const userNameInput = document.querySelector(".userNameInput");
const userEmailInput = document.querySelector(".email");
const passwordInput = document.querySelector(".pass");
const showPasswordBtn = document.querySelector("#showPass");
const backToLoginBtn = document.querySelector(".backToLogin");
const loginPage = document.querySelector(".loginPage");
const mainPage = document.querySelector(".mainPage");
const selectedAccName = document.querySelector(".accountName");
const userIcon = document.querySelector(".user-icon");
const userSection = document.querySelector(".userSection");
const closeUserSectionBtn = document.querySelector(".close-userSection");
const saveBtn = document.querySelector(".saveBtn");
const calTarget = document.getElementById("calTargetNum");
const proteinTarget = document.getElementById("proteinTargetNum");
const carbsTarget = document.getElementById("carbsTargetNum");
const fatsTarget = document.getElementById("fatsTargetNum");
const calculateBtn = document.getElementById("calculateBtn");
const femaleRadio = document.getElementById("female");
const maleRadio = document.getElementById("male");
const buildMuscle = document.querySelector("#buildMuscle");
const maintainWeight = document.querySelector("#maintain");
const loseWeight = document.querySelector("#loseWeight");
const openListOfMealsBtn = document.querySelector("#openListOfMeals");
const showMealsBtn = document.querySelector("#showMealsBtn");
const consumedMealsList = document.querySelector(".show-meals-consumed");
const closeListOfMealsBtn = document.querySelector("#close-list-of-meals");
const foodTypeSelect = document.querySelector(".type-of-food-container select");
const nameOfNewFoodInput = document.getElementsByName("new-food-name-input");
const newFoodNameInput = document.querySelector(
  "input[name='new-food-name-input']"
);
const newFoodCaloriesInput = document.querySelector(
  "input[name='new-food-calories-input']"
);
const newFoodProteinInput = document.querySelector(
  "input[name='new-food-protein-input']"
);
const newFoodCarbsInput = document.querySelector(
  "input[name='new-food-carbs-input']"
);
const newFoodFatsInput = document.querySelector(
  "input[name='new-food-fats-input']"
);
const registerNewFoodBtn = document.getElementById("register-new-food");
const openRegisterTabBtn = document.getElementById("openRegisterFood");
const progressBarCalorieTarget = document.getElementById(
  "progress-bar-calorie-target"
);
const progressBarCarbsTarget = document.getElementById(
  "progress-bar-carbs-target"
);
const progressBarProteinTarget = document.getElementById(
  "progress-bar-protein-target"
);
const progressBarFatsTarget = document.getElementById(
  "progress-bar-fats-target"
);
const progressBarCalorieConsumed = document.getElementById(
  "progress-bar-calorie-consumed"
);
const progressBarCarbsConsumed = document.getElementById(
  "progress-bar-carbs-consumed"
);
const progressBarProteinConsumed = document.getElementById(
  "progress-bar-protein-consumed"
);
const progressBarFatsConsumed = document.getElementById(
  "progress-bar-fats-consumed"
);

const listOfMeals = document.querySelector(".list-of-meals");

let currentPage = "Login";
let currentUser;

console.log(closeListOfMealsBtn);

// Load accounts from localStorage or default to predefined accounts
function loadAccounts() {
  const defaultAccounts = [
    {
      email: "admin@123",
      pass: "admin123",
      name: "Petar Kolev",
      kilograms: 80,
      height: 179,
      bodyGoal: "maintain",
      calorieGoalUser: 0,
      proteinGoalUser: 0,
      carbsGoalUser: 0,
      fatsGoalUser: 0,
      caloriesConsumedUser: 0,
      fatsConsumedUser: 0,
      carbsConsumedUser: 0,
      proteinConsumedUser: 0,
    },
    {
      email: "guest@123",
      pass: "guest123",
      name: "Guest",
      kilograms: 0,
      height: 0,
      bodyGoal: "maintain",
      calorieGoalUser: 0,
      proteinGoalUser: 0,
      carbsGoalUser: 0,
      fatsGoalUser: 0,
      caloriesConsumedUser: 0,
      fatsConsumedUser: 0,
      carbsConsumedUser: 0,
      proteinConsumedUser: 0,
    },
  ];
  const storedAccounts = localStorage.getItem("accounts");
  return storedAccounts ? JSON.parse(storedAccounts) : defaultAccounts;
}

let accountsList = loadAccounts();

const meals = [
  {
    name: "Grilled Chicken Salad",
    calories: 350,
    protein: 35,
    carbs: 10,
    fats: 15,
  },
  {
    name: "Spaghetti Bolognese",
    calories: 450,
    protein: 25,
    carbs: 50,
    fats: 15,
  },
  {
    name: "Vegetarian Stir-Fry",
    calories: 300,
    protein: 12,
    carbs: 40,
    fats: 8,
  },
  {
    name: "Salmon with Quinoa",
    calories: 400,
    protein: 30,
    carbs: 20,
    fats: 18,
  },
  {
    name: "Avocado Toast with Egg",
    calories: 280,
    protein: 12,
    carbs: 20,
    fats: 18,
  },
  {
    name: "Beef Burrito",
    calories: 500,
    protein: 35,
    carbs: 55,
    fats: 20,
  },
  {
    name: "Greek Yogurt with Berries",
    calories: 150,
    protein: 10,
    carbs: 20,
    fats: 2,
  },
  {
    name: "Chicken Caesar Wrap",
    calories: 400,
    protein: 30,
    carbs: 25,
    fats: 18,
  },
  {
    name: "Sweet Potato and Black Bean Chili",
    calories: 350,
    protein: 15,
    carbs: 55,
    fats: 8,
  },
  {
    name: "Tuna Salad Sandwich",
    calories: 350,
    protein: 25,
    carbs: 30,
    fats: 12,
  },
];

localStorage.setItem("meals", JSON.stringify(meals));
const storedMeals = JSON.parse(localStorage.getItem("meals"));

// Save accounts to localStorage
function saveAccounts(accounts) {
  localStorage.setItem("accounts", JSON.stringify(accounts));
}

function loadUserData() {
  if (currentUser) {
    userNameInput.value = currentUser.name;
    document.querySelector(".userHeightInput").value = currentUser.height;
    document.querySelector(".userKilogramsInput").value = currentUser.kilograms;
  }
}

// Utility to switch pages
function switchPages(fromPage, toPage) {
  toPage.classList.contains("blurred")
    ? toPage.classList.remove("blurred")
    : toPage.classList.remove("hidden");
  fromPage.classList.toggle("hidden");
}

function openSectionWithBlur(fromPage, toPage) {
  fromPage.classList.toggle("blurred");
  toPage.classList.toggle("hidden");
}

// Utility to calculate percentages
const calculatePercentage = (value, goal) =>
  goal > 0 ? Math.min((value / goal) * 100, 100) : 0;

// Update UI with current user data
const updateUI = function () {
  const caloriePercent = calculatePercentage(
    currentUser.caloriesConsumedUser,
    currentUser.calorieGoalUser
  );
  const calorieCircle = document.querySelector(".circle");
  const calorieText = document.querySelector("#caloriePercentage");
  calorieCircle.style.background = `conic-gradient(orange ${caloriePercent}%, #eaeaea ${caloriePercent}%)`;
  calorieText.textContent =
    currentUser.calorieGoalUser === 0 ? "-" : `${caloriePercent.toFixed(0)}%`;

  const proteinPercent = calculatePercentage(
    currentUser.proteinConsumedUser,
    currentUser.proteinGoalUser
  );
  document.getElementById("proteinProgress").style.width = `${proteinPercent}%`;

  const carbsPercent = calculatePercentage(
    currentUser.carbsConsumedUser,
    currentUser.carbsGoalUser
  );
  document.getElementById("carbsProgress").style.width = `${carbsPercent}%`;

  const fatsPercent = calculatePercentage(
    currentUser.fatsConsumedUser,
    currentUser.fatsGoalUser
  );
  document.getElementById("fatsProgress").style.width = `${fatsPercent}%`;

  selectedAccName.textContent = currentUser.name;
  progressBarCalorieTarget.textContent = currentUser.calorieGoalUser;
  progressBarCarbsTarget.textContent = currentUser.carbsGoalUser;
  progressBarFatsTarget.textContent = currentUser.fatsGoalUser;
  progressBarProteinTarget.textContent = currentUser.proteinGoalUser;

  progressBarCalorieConsumed.textContent = currentUser.caloriesConsumedUser;
  progressBarProteinConsumed.textContent = currentUser.proteinConsumedUser;
  progressBarCarbsConsumed.textContent = currentUser.carbsConsumedUser;
  progressBarFatsConsumed.textContent = currentUser.fatsConsumedUser;
};

// Login logic
function handleLogin() {
  const acc = accountsList.find((acc) => {
    return (
      acc.email === userEmailInput.value && acc.pass === passwordInput.value
    );
  });
  if (acc) {
    currentUser = acc;
    localStorage.setItem("currentUser", JSON.stringify(currentUser));
    currentPage = "Main";
    updateUI();
    switchPages(loginPage, mainPage);
  } else {
    alert("Error! Check username/password");
  }
}

// Calorie calculation
function calculateCalories() {
  const userHeight = Number(document.querySelector(".userHeightInput").value);
  const userKilos = Number(document.querySelector(".userKilogramsInput").value);
  const BMR =
    10 * userKilos +
    6.25 * userHeight -
    5 * 25 +
    (maleRadio.checked ? 5 : -161);
  const activityLevel = 1.55;
  const TDEE = BMR * activityLevel;

  let calTargetValue, proteinTargetValue, fatsTargetValue, carbsTargetValue;

  if (buildMuscle.checked) {
    calTargetValue = TDEE * 1.1;
    fatsTargetValue = userKilos;
    proteinTargetValue = userKilos * 2.2;
  } else if (loseWeight.checked) {
    calTargetValue = TDEE - 500;
    fatsTargetValue = Math.trunc(0.25 * calTargetValue) / 9;
    proteinTargetValue = userKilos * 2.2;
  } else if (maintainWeight.checked) {
    calTargetValue = TDEE;
    fatsTargetValue = userKilos;
    proteinTargetValue = userKilos * 1.6;
  } else {
    alert("Error: Please select a body goal.");
    return;
  }

  carbsTargetValue = Math.trunc(
    (calTargetValue - (fatsTargetValue * 9 + proteinTargetValue * 4)) / 4
  );

  calTarget.textContent = Math.trunc(calTargetValue);
  proteinTarget.textContent = Math.trunc(proteinTargetValue);
  fatsTarget.textContent = Math.trunc(fatsTargetValue);
  carbsTarget.textContent = Math.trunc(carbsTargetValue);
}

// Save updated account data
function updateAccountData() {
  if (currentUser) {
    const sanitizedHeight = document
      .querySelector(".userHeightInput")
      .value.replace(/[.,]/g, "");

    currentUser.name = userNameInput.value;
    currentUser.height = Number(sanitizedHeight);
    currentUser.kilograms = Number(
      document.querySelector(".userKilogramsInput").value
    );
    currentUser.calorieGoalUser = Number(calTarget.textContent);
    currentUser.proteinGoalUser = Number(proteinTarget.textContent);
    currentUser.fatsGoalUser = Number(fatsTarget.textContent);
    currentUser.carbsGoalUser = Number(carbsTarget.textContent);

    saveAccounts(accountsList);
    updateUI();
    switchPages(userSection, mainPage);
  } else {
    alert("Error! There is no current user!");
  }
}

function showListOfMeals() {
  listOfMeals.innerHTML = "";

  storedMeals.forEach((meal) => {
    listOfMeals.innerHTML += `
            <div class="meal-choice" onClick="addMeal('${meal.name}')">
              <div class="meal-img"></div>
              <p class="meal-list-name">${meal.name}</p>
            </div>`;
  });
  document.querySelector(".detailed-div").classList.toggle("hidden");
  document.querySelector(".show-meals-consumed").classList.toggle("hidden");

  once = false;

  setTimeout(() => {
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
  }, 0);
}

function removeMeal(id) {
  const divToRemove = document.getElementById(id);

  const mealName = divToRemove.querySelector(".meal-name").textContent;
  const mealToRemove = storedMeals.find((meal) => meal.name === mealName);

  if (mealToRemove) {
    currentUser.caloriesConsumedUser -= mealToRemove.calories;
    currentUser.proteinConsumedUser -= mealToRemove.protein;
    currentUser.carbsConsumedUser -= mealToRemove.carbs;
    currentUser.fatsConsumedUser -= mealToRemove.fats;

    currentUser.caloriesConsumedUser = Math.max(
      0,
      currentUser.caloriesConsumedUser
    );
    currentUser.proteinConsumedUser = Math.max(
      0,
      currentUser.proteinConsumedUser
    );
    currentUser.carbsConsumedUser = Math.max(0, currentUser.carbsConsumedUser);
    currentUser.fatsConsumedUser = Math.max(0, currentUser.fatsConsumedUser);

    updateUI();
  }

  divToRemove.remove();
}

function addMeal(name) {
  const currentMeal = storedMeals.find((meal) => {
    return meal.name === name;
  });

  console.log(currentMeal.protein);

  currentUser.caloriesConsumedUser += currentMeal.calories;
  currentUser.proteinConsumedUser += currentMeal.protein;
  currentUser.carbsConsumedUser += currentMeal.carbs;
  currentUser.fatsConsumedUser += currentMeal.fats;

  const mealId = `meal-num-${i}`;
  const newMeal = `
  <div id="${mealId}">
    <div class="top-container">
                <h3 class="left">
                  for: <span class="type-breakfast">${
                    foodTypeSelect.options[foodTypeSelect.selectedIndex]
                      .textContent
                  }</span>
                </h3>
                <h3 onClick="removeMeal('meal-num-${i}')" class="remove-meal-from-list">X</h3>
              </div>
              <div class="meal">
                <div class="bottom-container">
                  <div class="meal-img"></div>
                  <h1 class="meal-name">${currentMeal.name}</h1>
                  <h2>
                    Calories: <span class="meal-nutrion-calories">${
                      currentMeal.calories
                    }</span>
                  </h2>
                  <div class="meal-nutrion-ifno">
                    <h3>
                      Protein: <span class="meal-nutrion-protein">${
                        currentMeal.protein
                      }</span>
                    </h3>
                    <h3>Carbs: <span class="meal-nutrion-protein">${
                      currentMeal.carbs
                    }</span></h3>
                    <h3>Fats: <span class="meal-nutrion-protein">${
                      currentMeal.fats
                    }</span></h3>
                  </div>
                </div>
              </div>
            </div>
          
  `;
  i++;
  consumedMealsList.innerHTML += newMeal;
  updateUI();
}

function closeListOfMeals() {
  document.querySelector(".detailed-div").classList.toggle("hidden");
  document.querySelector(".show-meals-consumed").classList.toggle("hidden");
  once = false;
}

function registerNewFood() {
  const newFoodName = newFoodNameInput.value.trim();
  const newFoodCalories = Number(newFoodCaloriesInput.value);
  const newFoodProtein = Number(newFoodProteinInput.value);
  const newFoodCarbs = Number(newFoodCarbsInput.value);
  const newFoodFats = Number(newFoodFatsInput.value);

  if (
    !newFoodName ||
    isNaN(newFoodCalories) ||
    isNaN(newFoodProtein) ||
    isNaN(newFoodCarbs) ||
    isNaN(newFoodFats)
  ) {
    alert("Please fill out all fields correctly!");
  }

  const newFood = {
    name: newFoodName,
    calories: newFoodCalories,
    protein: newFoodProtein,
    carbs: newFoodCarbs,
    fats: newFoodFats,
  };

  storedMeals.push(newFood);

  localStorage.setItem("meals", JSON.stringify(storedMeals));

  newFoodNameInput.value = "";
  newFoodCaloriesInput.value = "";
  newFoodProteinInput.value = "";
  newFoodCarbsInput.value = "";
  newFoodFatsInput.value = "";

  alert(`${newFoodName} has been registered successfully!`);
}

function toggleVisibility(sectionToShow) {
  const sections = [
    document.querySelector(".detailed-div"),
    document.querySelector(".show-meals-consumed"),
    document.querySelector(".register-new-food"),
  ];

  sections.forEach((section) => {
    if (section === sectionToShow) {
      section.classList.remove("hidden");
    } else {
      section.classList.add("hidden");
    }
  });
}

// Event Listeners
document.addEventListener("keydown", (event) => {
  if (event.key === "Enter" && currentPage === "Login") {
    handleLogin();
  }
});

loginBtn.addEventListener("click", handleLogin);

backToLoginBtn.addEventListener("click", function () {
  currentPage = "Login";
  switchPages(mainPage, loginPage);
});

showPasswordBtn.addEventListener("change", function () {
  passwordInput.type = this.checked ? "text" : "password";
});

userIcon.addEventListener("click", function () {
  loadUserData();
  openSectionWithBlur(mainPage, userSection);
});

calculateBtn.addEventListener("click", calculateCalories);

closeUserSectionBtn.addEventListener("click", function () {
  switchPages(userSection, mainPage);
});

saveBtn.addEventListener("click", function () {
  updateAccountData();
  updateUI();
});

let i = 0;

openListOfMealsBtn.addEventListener("click", function () {
  showListOfMeals();
  toggleVisibility(document.querySelector(".detailed-div"));
});

closeListOfMealsBtn.addEventListener("click", function () {
  toggleVisibility(document.querySelector(".show-meals-consumed")); // Show Consumed Meals
});

registerNewFoodBtn.addEventListener("click", function () {
  registerNewFood();
});

openRegisterTabBtn.addEventListener("click", function () {
  toggleVisibility(document.querySelector(".register-new-food"));
});
