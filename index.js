const main = document.querySelector("main")
const root = document.querySelector(":root")
const input = document.getElementById("input")
const resultInput = document.getElementById("result")

const allowedKeys = ["(", ")", "/", "*", "-", "+", ".", "%","0", "1", "2", "3", "4", "5", "6", "7", "8", "9", " "]

document.querySelectorAll(".charKey").forEach((btns) => {
  btns.addEventListener("click", () => { const value = btns.dataset.value
  input.value += value})
})

document.getElementById("clear").addEventListener("click", () => {
  input.value = ""
  input.focus()
})

document.getElementById("equal").addEventListener("click", calculate)

input.addEventListener("keydown", (ev) => {
  ev.preventDefault()
  if(allowedKeys.includes(ev.key)){
    input.value += ev.key
    return
  }
  if(ev.key === "Backspace") {
    input.value = input.value.slice(0, -1)
  }
  if(ev.key === "Enter"){
    calculate()
  }
})

function calculate() {
  resultInput.value = "ERROR"
  resultInput.classList.add("error")

  const result = eval(input.value)

  resultInput.value = result
  resultInput.classList.remove("error")

  input.value = result
}

document.getElementById("themeSwitcher").addEventListener("click", () => {
  if(main.dataset.theme === "dark"){
    root.style.setProperty("--bg-color", "#f1f5f9")
    root.style.setProperty("--border-color", "#aaa")
    root.style.setProperty("--font-color", "#0e1822")
    root.style.setProperty("--primary-color", "#26834a")
    main.dataset.theme = "light"
  } else {
    root.style.setProperty("--bg-color", "#0e1822")
    root.style.setProperty("--border-color", "#666")
    root.style.setProperty("--font-color", "#f1f5f9")
    root.style.setProperty("--primary-color", "#15f56b")
    main.dataset.theme = "dark"
  }
})

document.getElementById("copyToClipboard").addEventListener("click", (ev) => {
  const btn = ev.currentTarget
  if(btn.innerText === "Copy"){
    btn.innerText = "Copied!"
    btn.classList.add("success")
    navigator.clipboard.writeText(resultInput.value)
    setInterval(() => {
      btn.innerText = "Copy"
      btn.classList.remove("success")
    },2500)
  } 
})