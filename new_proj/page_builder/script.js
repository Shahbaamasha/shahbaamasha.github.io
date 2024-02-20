const contentContainer = document.getElementById("content-container");

function addElement() {
    // Get form inputs
    const elementType = document.getElementById("element-type-select").value;
    const elementWidth = document.getElementById("element-width").value;
    const elementWidthUnit = document.getElementById("element-width-unit").value;
    const elementHeight = document.getElementById("element-height").value;
    const elementHeightUnit = document.getElementById("element-height-unit").value;
    const elementBgColor = document.getElementById("element-background-color").value;
    const elementBorderStyle = document.getElementById("element-border-style").value;
    const elementContent = document.getElementById("content").value; // Retrieve text content
    var textColor = document.getElementById("textColor").value;

    // Create the new element
    const newElement = document.createElement(elementType);
    newElement.style.width = `${elementWidth}${elementWidthUnit}`;
    newElement.style.height = `${elementHeight}${elementHeightUnit}`;
    newElement.style.backgroundColor = elementBgColor;
    newElement.style.border = `2px ${elementBorderStyle} black`;
    newElement.textContent = elementContent; // Set text content
    newElement.style.color = textColor;

    // Add the element to the content container
    contentContainer.appendChild(newElement);
}

function clearBoard() {
    contentContainer.innerHTML = "";
}

function saveToLocalStorage() {
    localStorage.setItem("savedContent", contentContainer.innerHTML);
}

function loadFromLocalStorage() {
    const savedContent = localStorage.getItem("savedContent");
    if (savedContent) {
        contentContainer.innerHTML = savedContent;
    }
}

// Call the function when the page loads
window.addEventListener("load", loadFromLocalStorage);