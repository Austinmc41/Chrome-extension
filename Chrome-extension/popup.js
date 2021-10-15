const colorChange = document.getElementById('colorChange');
const buttonOptions = document.getElementById('buttondiv');
const selectedClassName = "current";
const buttonColors = ['blue', 'orange', 'red', 'yellow'];

chrome.storage.sync.get('color',({color})  => {
    colorChange.style.backgroundColor = color; 
})

function handleButtonClick(e) {
    console.log("in handleButtonClick")
    const current = e.target.parentElement.querySelector(`.${selectedClassName}`);
    console.log(current)
    if (current && current != e.target) {
        console.log(e.target)
        current.classList.remove(selectedClassName);
    }
    const color = e.target.dataset.color;
    console.log(color)
    e.target.classList.add(selectedClassName);
    chrome.storage.sync.set({color});
    colorChange.style.backgroundColor = color;
}

function constructOptions(buttonColors) {
    chrome.storage.sync.get("color", (data) => {
        const currentColor = data.color;

        for (let buttonColor of buttonColors ) {
            const button = document.createElement("button");
            button.dataset.color = buttonColor;
            button.style.backgroundColor = buttonColor;

            if(buttonColor === currentColor)  {
                button.classList.add(selectedClassName);
            }

            button.addEventListener("click", handleButtonClick)
            buttonOptions.appendChild(button)
        }

        
    })
}

constructOptions(buttonColors);