const declareEvents=()=>{
    document.querySelector("#btnCopy").addEventListener("click", () => {

    let text = document.getElementById("domain");
    navigator.clipboard.writeText(text.innerHTML);
   
})
}

declareEvents()

