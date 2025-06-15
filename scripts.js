$(document).ready(function () {
    let inputSequence = "";
    const unsorted_stratagems = {
        // Blue
        '↓↑↑↓↑': 'LIFT-850 Jump Pack',
        '↓←↓↑↑↓': 'B-1 Supply Pack',
        '↓↑←↑→→': 'AX/LAS-5 "Guard Dog" Rover',
        '↓←↓↓↑←': 'SH-20 Ballistic Shield Backpack',
        '↓↑←→←→': 'SH-32 Shield Generator Pack',
        '↓↑←↑→↓': 'AX/AR-23 "Guard Dog"',
        '↓←↓↑→': 'MG-43 Machine Gun',
        '↓←→↑↓': 'APW-1 Anti-Materiel Rifle',
        '↓←↓↑↑←': 'M-105 Stalwart',
        '↓↓←↑→': 'EAT-17 Expendable Anti-tank',
        '↓←→→←': 'GR-8 Recoilless Rifle',
        '↓←↑↓↑': 'FLAM-40 Flamethrower',
        '↓←↓↑↑→': 'AC-8 Autocannon',
        '↓←↑↓↓': 'MG-206 Heavy Machine Gun',
        '↓→↓↑←→': 'RS-422 Railgun',
        '↓↓↑↓↓': 'FAF-14 SPEAR Launcher',
        '↓←↑←↓': 'GL-21 Grenade Launcher',
        '↓←↓↑←': 'LAS-98 Laser Cannon',
        '↓→↓↑←←': 'ARC-3 Arc Thrower',
        '↓↓↑←→': 'LAS-99 Quasar Cannon',
        '←↓→↑←↓↓': 'EXO-45 Patriot Exosuit',
        '←↓→↑←↓↑': 'EXO-49 Emancipator Exosuit',
        '↓↑↑←→': 'RL-77 Airburst Rocket Launcher',
        '↓←↑↓→': 'MLS-4X Commando',
        '↓←↑↓←': 'TX-41 Sterilizer',
        '↓↑←↑→↑': 'AX/TX-13 "Guard Dog" Dog Breath',
        '↓↑←→↑↑': 'SH-51 Directional Shield',
        '←↓→↓→↓↑': 'M-102 Fast Recon Vehicle',
        '↓→↑↑↑': 'B-100 Portable Hellbomb',
        // Yellow
        '↑↓→←↑': 'Reinforce',
        '↑↓→↑': 'SOS Beacon',
        '↓↓↑→': 'Resupply',
        '↓↑←↓↑→↓↑': 'NUX-223 Hellbomb',
        '↓↓↓↑↑': 'SSSD Delivery',
        '↑↑←→↓↓': 'Seismic Probe',
        '↑↑←→↓↓': 'Upload Data',
        '↑↑←→↓↓': 'Eagle Rearm',
        '→↑↑↓': 'SEAF Artillery',
        '↓↑↓↑': 'Super Earth Flag',
        '↓↓←→↓↓': 'Prospecting Drill',
        '→→←←': 'Orbital Illumination Flare',
        '↑←→↓↑↑': 'Dark Fluid Vessel',
        '↓←↑↓→': 'Tectonic Drill',
        '←↑↓→↓↓': 'Hive Breaker Drill',
        // Green
        '↓↑←→→←': 'E/MG-101 HMG Emplacement',
        '↓↓←→←→': 'FX-12 Shield Generator Relay',
        '↓↑→↑←→': 'A/ARC-3 Tesla Tower',
        '↓←↑→': 'MD-6 Anti-Personnel Minefield',
        '↓←←↓': 'MD-I4 Incendiary Mines',
        '↓←↑↑': 'MD-17 Anti-Tank Mines',
        '↓←←→': 'MD-8 Gas Mines',
        '↓↑→→↑': 'A/MG-43 Machine Gun Sentry',
        '↓↑→←': 'A/G-16 Gatling Sentry',
        '↓↑→→↓': 'A/M-12 Mortar Sentry',
        '↓↑→↑←↑': 'A/AC-8 Autocannon Sentry',
        '↓↑→→←': 'A/MLS-4X Rocket Sentry',
        '↓↑→↓→': 'A/M-23 EMS Mortar Sentry',
        '↓↑←→→→': 'E/AT-12 Anti-Tank Emplacement',
        '↓↑→↓↑↑': 'A/FLAM-40 Flamethrower Sentry',
        '↓→↓←→': 'E/GL-21 Grenadier Battlement',
        // Red
        '→↓←↑↑': 'Orbital Gatling Barrage',
        '→→→': 'Orbital Airburst Strike',
        '→→↓←→↓': 'Orbital 120MM HE Barrage',
        '→↓↑↑←↓↓': 'Orbital 380MM HE Barrage',
        '→→↓←→↑': 'Orbital Napalm Barrage',
        '→↓→↓→↓': 'Orbital Walking Barrage',
        '→↓↑→↓': 'Orbital Laser',
        '→↑↓↓→': 'Orbital Railcannon Strike',
        '→→↑': 'Orbital Precision Strike',
        '→→↓→': 'Orbital Gas Strike',
        '→→←↓': 'Orbital EMS Strike',
        '→→↓↑': 'Orbital Smoke Strike',
        '↑→→': 'Eagle Strafing Run',
        '↑→↓→': 'Eagle Airstrike',
        '↑→↓↓→': 'Eagle Cluster Bomb',
        '↑→↓↑': 'Eagle Napalm Airstrike',
        '↑→↑↓': 'Eagle Smoke Strike',
        '↑→↑←': 'Eagle 110MM Rocket Pods',
        '↑→↓↓↓': 'Eagle 500kg Bomb',
    };

    const arrowOrder = { '↓': 0, '→': 1, '↑': 2, '←': 3 };

    function computeSortableValue(key) {
        return key.split('').map(arrow => arrowOrder[arrow]).join('');
    }

    const sortedKeys = Object.keys(unsorted_stratagems).sort((a, b) => {
        const sortValA = computeSortableValue(a);
        const sortValB = computeSortableValue(b);
        return sortValA.localeCompare(sortValB);
    });

    const stratagems = {};
    sortedKeys.forEach(key => {
        stratagems[key] = unsorted_stratagems[key];
    });

    const keyToIcon = {
        'ArrowUp': 'north',
        'ArrowRight': 'east',
        'ArrowDown': 'south',
        'ArrowLeft': 'west',
        'w': 'north',
        'd': 'east',
        's': 'south',
        'a': 'west',
        '↑': 'north',
        '→': 'east',
        '↓': 'south',
        '←': 'west'
    };

    const iconToArrow = {
        'north': '↑',
        'east': '→',
        'south': '↓',
        'west': '←'
    }

    const keyToMacro = {
        '↑': 'ArrowUp',
        '→': 'ArrowRight',
        '↓': 'ArrowDown',
        '←': 'ArrowLeft'
    }

    $(document).keydown(function (event) {
        if (event.ctrlKey && event.key === 'c') {
            $("#copyButton").click();
            event.preventDefault();
        }
        else if (event.ctrlKey && event.key === 'v') {
            $("#pasteButton").click();
            event.preventDefault();
        }
        if (event.key === "Escape") {
            $("#clearButton").click();
            event.preventDefault();
        } else {
            handleInput(event);
        }
    });

    $("#copyButton").click(function () {
        navigator.clipboard.writeText(inputSequence).then(() => {
            console.log("Copied to clipboard successfully!");
        }, (err) => {
            console.error("Could not copy text: ", err);
        });
    });

    $("#copyMacroButton").click(function () {
        if (inputSequence.length > 0) {
            let mappedKeys = [...inputSequence].map(char => keyToMacro[char])
            macro = `{{KeyDown:CTRL}}{{${mappedKeys.join("}}{{PAUSE:25}}{{")}}}{{KeyUp:CTRL}}`
            navigator.clipboard.writeText(macro).then(() => {
                console.log("Copied to clipboard successfully!");
            }, (err) => {
                console.error("Could not copy text: ", err);
            });
        }
    });

    $("#pasteButton").click(async function () {
        try {
            const text = await navigator.clipboard.readText();
            const filtered = text.replace(/[^→↓↑←wasd]/gi, ''); // Remove all characters not WASD or arrows
            let converted = filtered.replace(/[wasd]/gi, function (match) {
                return iconToArrow[keyToIcon[match.toLowerCase()]];
            });
            inputSequence = converted;
            displayInputSequence();
            updateList();
        } catch (err) {
            console.error("Failed to read clipboard contents: ", err);
        }
    });

    $("#clearButton").click(function () {
        clearInputs();
        $(this).css('transform', 'scale(0.8)');
        setTimeout(() => {
            $(this).css('transform', 'scale(1)');
        }, 100);
    });

    function handleInput(event) {
        if (keyToIcon[event.key] || keyToIcon[event.key.toLowerCase()]) {
            addIconToInput(keyToIcon[event.key], keyToIcon[event.key]);
            event.preventDefault();
        } else if (event.key === "Backspace" || event.key === "Delete") {
            removeLastIcon();
            event.preventDefault();
        }
    }

    function addIconToInput(icon, code) {
        const iconElement = $('<i>').addClass('material-icons').text(icon);
        $("#inputContent").append(iconElement);
        inputSequence += iconToArrow[code];
        updateList();
    }

    function removeLastIcon() {
        if ($("#inputContent").children().length > 0) {
            $("#inputContent i:last-child").remove();
            inputSequence = inputSequence.slice(0, -1);
            updateList();
        }
    }

    function clearInputs() {
        $("#inputContent").empty();
        inputSequence = "";
        updateList();
    }

    function displayInputSequence() {
        $("#inputContent").empty();
        inputSequence.split('').forEach(char => {
            const icon = keyToIcon[char];
            const iconElement = $('<i>').addClass('material-icons').text(icon);
            $("#inputContent").append(iconElement);
        });
    }

    function updateList() {
        $("#stratagemList").empty();
        $.each(stratagems, function (code, name) {
            if (code.startsWith(inputSequence)) {
                const matchedPart = code.substring(0, inputSequence.length);
                const unmatchedPart = code.substring(inputSequence.length);
                const li = $("<li>").addClass('stratagem-item');
                const codeSpan = $("<span>").addClass('code');
                matchedPart.split('').forEach(char => {
                    codeSpan.append($("<i>").addClass('material-icons highlight').text(keyToIcon[char]));
                });
                unmatchedPart.split('').forEach(char => {
                    codeSpan.append($("<i>").addClass('material-icons').text(keyToIcon[char]));
                });
                li.append(codeSpan);
                li.append($("<span>").addClass('name').text(name));
                $("#stratagemList").append(li);
            }
        });
    }

    updateList()
});
