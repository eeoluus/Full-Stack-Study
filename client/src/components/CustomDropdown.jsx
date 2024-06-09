export default function CustomDropdown() {

    function deactivateSelect(select) {
        if (!select.classList.contains("active")) return;

        const optList = select.querySelector(".optList");
        optList.classList.add("hidden");
        select.classList.remove("active");

        manageFlow(optList);
    }

    function activateSelect(select, selectList) {
        if (select.classList.contains("active")) return;

        selectList.forEach(deactivateSelect);
        select.classList.add("active");
    }

    function toggleOptList(select, show) {
        const optList = select.querySelector("optList");
        optList.classList.toggle("hidden");

        manageFlow(optList);
    }


    function manageFlow(optList) { /* Prevent overlap by the absolutely positioned optList */
        const selectList = document.querySelector(".select");

        if (!optList.classList.contains("hidden")) {
            const emptyDiv = document.createElement("div");
            emptyDiv.setAttribute("style", `height: ${optList.offsetHeight - 16}px`);
            selectList.insertAdjacentElement("afterend", emptyDiv);
        } else {
            selectList.nextElementSibling.remove();
        }
    }

    function highlightOption(select, option) {
        const optionList = select.querySelectorAll(".option");

        optionList.forEach((other) => {
            other.classList.remove("highlight");
        });
        option.classList.add("highlight");
    }

    function updateValue(select, index) {
        const nativeWidget = select.previousElementSibling;
        const value = select.querySelector(".value");
        const optionList = select.querySelectorAll(".option");

        nativeWidget.selectedIndex = index;
        value.innerHTML = optionList[index].innerHTML;
        highlightOption(select, optionList[index]);
    }

    function getIndex(select) {
        const nativeWidget = select.previousElementSibling;

        return nativeWidget.selectedIndex;
    }

    // ------------- //
    // Event binding //
    // ------------- //

    window.addEventListener("load", () => {
        const form = document.querySelector("form");
        form.classList.remove("no-widget");
        form.classList.add("widget");
    });

    window.addEventListener("load", () => {
        const selectList = document.querySelectorAll(".select");

        selectList.forEach((select) => {
            const optionList = select.querySelectorAll(".option");
            optionList.forEach((option) => {
                option.addEventListener("mouseover", () => {
                    highlightOption(select, option);
                });
            });
        });
        select.addEventListener("click", (event) => {
            toggleOptList(select);
        });
        select.addEventListener("focus", (event) => {
            activateSelect(select, selectList);
        });
        select.addEventListener("blur", (event) => {
            deactivateSelect(select);
        });
    });
    
    window.addEventListener("load", () => {
        const selectList = document.querySelectorAll(".select");

        selectList.forEach((select) => {
            const optionList = select.querySelectorAll(".option");
            const selectedIndex = getIndex(select);

            select.tabIndex = 0;
            select.previousElementSibling.tabIndex = -1;

            updateValue(select, selectedIndex);

            optionList.forEach((option, index) => {
                option.addEventListener("click", (event) => {
                    updateValue(select, index);
                });
            });
        });

        select.addEventListener("keyup", (event) => {
            let index = getIndex(select);

            if (event.key === "Escape") {
                deactivateSelect(select);
            }
            if (event.key === "ArrowDown" && index < optionList.length - 1) {
                index++;
            }
            if (event.key === "ArrowUp" && index > 0) {
                index--;
            }

            updateValue(select, index);
        })
    })

    return (
        <>
            <select className="dreamType">
                <option>Ordinary</option>
                <option>Nightmare</option>
            </select>

            <div className="select">
                <span className="value">Ordinary</span>
                <menu className="optList hidden">
                    <li className="option">Ordinary</li>
                    <li className="option">Nightmare</li>
                </menu>
            </div>
        </>
    )
}