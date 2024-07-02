/* import './CustomDropdown.css';
 */
export default function CustomDropdownOld() {

    /* These are just state switches */
    function deactivateSelect(select) {
        if (!select.classList.contains("active")) return;

        const optList = select.querySelector(".optList");
        optList.classList.add("hidden");
        select.classList.remove("active");

        manageFlow(optList);
    }
    /* These are just state switches */
    /* No access to other selects, though... */ // <--- This needs to be solved
    function activateSelect(select, selectList) { // DONE
        if (select.classList.contains("active")) return;

        selectList.forEach(deactivateSelect); // <--- Except for this
        select.classList.add("active");
    }

    function toggleOptList(select, show) { // DONE
        const optList = select.querySelector("optList");
        optList.classList.toggle("hidden");

        manageFlow(optList); // <--- Except for this
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

    // Ei tarvita oikeastaan, riittää, että JSX:ään määritellään nämä luokat.
    // Ei tarvitse pelätä jäsätöntä fallbackiä, koska kyseessä on React-sovellus.
    window.addEventListener("load", () => {
        const form = document.querySelector("form");
        form.classList.remove("no-widget");
        form.classList.add("widget");
    });

    // Näiden sijaan lisätään event listenerit suoraan koodiin. Etsi tapa lisätä event listenerit.
    window.addEventListener("load", () => {
        const selectList = document.querySelectorAll(".select");

        selectList.forEach((select) => {
            const optionList = select.querySelectorAll(".option");
            optionList.forEach((option) => {
                option.addEventListener("mouseover", () => {
                    highlightOption(select, option);
                });
            });
            select.addEventListener("click", (event) => {
                toggleOptList(select); // DONE
            });
            select.addEventListener("focus", (event) => {
                activateSelect(select, selectList); // MOSTLY DONE
            });
            select.addEventListener("blur", (event) => {
                deactivateSelect(select); // DONE
            });
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

            select.addEventListener("keyup", (event) => {
                let index = getIndex(select); // These indices are not ported at all
    
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
        });
    })

    return (
        <>
            <select className="dreamType">
                <option>Ordinary</option>
                <option>Nightmare</option>
            </select>

            <div className="select" onMouseOver={highlightOption}>
                <span className="value">Ordinary</span>
                <menu className="optList hidden">
                    <li className="option">Ordinary</li>
                    <li className="option">Nightmare</li>
                </menu>
            </div>
        </>
    )
}