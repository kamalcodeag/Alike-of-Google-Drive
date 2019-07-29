"use strict";



let area = document.querySelector(".s-area");
let menu = document.querySelector(".s-menu");
let lists = document.querySelectorAll(".s-menu ul li");
let inner = document.querySelector(".s-inner");
let remove = document.querySelector(".s-remove");
let inputBox = document.querySelector(".s-input-box");
let input = document.querySelector("#input");
let cancel = document.querySelector(".cancel");
let create = document.querySelector(".create");

area.addEventListener("contextmenu", function (e) 
{
    e.preventDefault();
    menu.classList.toggle("d-none");
    menu.classList.toggle("d-flex");

    if (remove.classList.contains("d-flex")) {
        menu.classList.add("d-none");
        menu.classList.remove("d-flex");
    }

    menu.style.left = e.pageX + "px";
    menu.style.top = e.pageY + "px";
});

area.addEventListener("click", function (e) 
{
    menu.classList.remove("d-flex");
    menu.classList.add("d-none");
});

[...lists].forEach(list => 
{
    list.onmouseover = function () 
    {
        let activeLi = document.querySelector(".s-menu ul li.active");
        activeLi.classList.remove("active");
        this.classList.add("active");

        let newFolderLink = document.querySelector(".s-menu ul .new");

        newFolderLink.onclick = function () 
        {
            inputBox.classList.remove("d-none");
            // document.body.style.filter = "blur(1px)";

            input.onkeydown = function()
            {
                create.onclick = function()
                {
                    let inputValue = input.value.trim();

                    if(inputValue.length > 0)
                    {
                        let newFolder = document.createElement("div");
                        let span = document.createElement("span");
                        let icon = document.createElement("i");
                        let folderName = document.createElement("span");
                        newFolder.className = "s-item-holder mb-2 mr-3 d-flex align-items-center";
                        span.className = "ml-2 mr-2";
                        icon.className = "fas fa-folder";
                        folderName.innerText = inputValue;
                        folderName.className = "text-center";
                        newFolder.appendChild(span);
                        span.appendChild(icon);
                        newFolder.appendChild(folderName);
                        inner.appendChild(newFolder);
                        input.value = "";

                        if(inner.children.length > 0)
                        {
                            inputBox.classList.add("d-none");
                            inputBox.classList.remove("d-block");
                        }

                        [...document.querySelectorAll(".s-item-holder")].forEach(folder =>
                        {
                            folder.addEventListener("contextmenu",function(e)
                            {
                                remove.classList.remove("d-none");
                                remove.classList.add("d-flex");

                                remove.style.left = e.pageX + "px";
                                remove.style.top = e.pageY + "px";

                                menu.classList.remove("d-flex");
                                menu.classList.add("d-none");

                                document.querySelector(".s-remove ul li").onclick = function()
                                {
                                    folder.remove();
                                }
                            });
                            area.addEventListener("click",function()
                            {
                                remove.classList.remove("d-flex");
                                remove.classList.add("d-none");
                            })
                        })                               
                    }
                }   
            }
            cancel.onclick = function()
            {
                inputBox.classList.add("d-none");
                inputBox.classList.remove("d-block");
            }   
        }   
    }
});