import { useEffect, useState } from 'react';
import './CustomDropdown.css';

export default function CustomDropdown(props) {

    const index = 0;

    const [dreamTypes, setDreamTypes] = useState(props.dreamTypes);

    const [selectActive, setSelectActive] = useState(false);

    const [optListHidden, setOptListHidden] = useState(true);

    const [selectedValue, setSelectedValue] = useState(props.dreamTypes[index].name);

    const [selectedIndex, setSelectedIndex] = useState(index);

    const updateForm = props.updateForm;

    useEffect(() => {
        const preselectedQuality = props.preselectedQuality
        if (preselectedQuality) {
            const preselectedQualityIndex = dreamTypes
                .map((dreamType) => dreamType.name)
                .indexOf(preselectedQuality);
            updateForm({ quality: preselectedQuality });
            setSelectedValue(preselectedQuality);
            setSelectedIndex(preselectedQualityIndex)
            highlightOption(preselectedQuality);
        } else {
            updateForm({ quality: selectedValue });
            highlightOption(selectedValue);
        }
    }, [props.preselectedQuality])

    function deactivateSelect() {
        setOptListHidden(true);
        setSelectActive(false);
    }

    function activateSelect() {
        /* selectList.forEach(deactivateSelect); */ // How to implement this?
        setSelectActive(true);
    }
    function handleClick(event, index) {
        const name = event.target.innerHTML;
        updateValue(name, index);
    }
    function updateValue(name, index) {
        updateForm({ quality: name });
        setSelectedIndex(index);
        setSelectedValue(name);
        highlightOption(name);
    }

    function handleMouseOver(event) {
        const name = event.target.innerHTML;
        highlightOption(name);
    }

    function highlightOption(name) {
        const newDreamTypes = dreamTypes.map((dreamType) => {
            return {
                ...dreamType, 
                highlight: dreamType.name === name
            }
        })
        setDreamTypes(newDreamTypes);
    }

    function handleKeyDown(event) {
        
        let newSelectedIndex = selectedIndex;

        if (event.key === "Escape" || event.key === "Enter") {
            deactivateSelect();
        }
        if (event.key === "Tab" && !optListHidden) {
            event.preventDefault();
            deactivateSelect();
        }
        if (event.key === "ArrowDown") {
            event.preventDefault();
            if (selectedIndex < dreamTypes.length - 1) newSelectedIndex++;
        }
        if (event.key === "ArrowUp") {
            event.preventDefault();
            if (selectedIndex > 0) newSelectedIndex--;
        }

        setSelectedIndex(newSelectedIndex);

        const newSelectedValue = dreamTypes[newSelectedIndex].name;

        updateValue(newSelectedValue, newSelectedIndex);
    }

    const dreamTypeList = dreamTypes.map((dreamType, index) => (
            <li 
                key={dreamType.id}
                className={`option${dreamType.highlight ? " highlight" : ""}`}
                onMouseOver={handleMouseOver}
                onClick={(event) => handleClick(event, index)}>
                {dreamType.name}
            </li>
        )
    )

    return (
        <>
            <div
                className={`select${selectActive ? " active" : ""}`}
                onClick={() => setOptListHidden(!optListHidden)}
                onFocus={activateSelect}
                onBlur={deactivateSelect}
                onKeyDown={handleKeyDown}
                tabIndex={0}>
                <span className="value">{selectedValue}</span>
                <menu 
                    className={`optList${optListHidden ? " hidden" : ""}`}>
                    {dreamTypeList}
                </menu>
            </div>
        </>
    )
}