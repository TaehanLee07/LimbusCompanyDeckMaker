document.addEventListener('DOMContentLoaded', () => {
    const characters = document.querySelectorAll('.character');
    const popup = document.getElementById('popup');
    const closeBtn = document.getElementById('closeBtn');
    const personaForm = document.getElementById('personaForm');
    const egoForm = document.getElementById('egoForm');
    const illustrationUpload = document.getElementById('illustrationUpload');
    const illustrationPreview = document.getElementById('illustrationPreview');
    const basicCharacterIllustration = document.getElementById('basicCharacterIllustration');

    const characterData = [
        { index: 0, name: "이상", personas: [], egos: [], defaultIllustration: "default-image.jpg" },
        { index: 1, name: "파우스트", personas: [], egos: [], defaultIllustration: "default-image.jpg" },
        { index: 2, name: "돈키호테", personas: [], egos: [], defaultIllustration: "default-image.jpg" },
        { index: 3, name: "료슈", personas: [], egos: [], defaultIllustration: "default-image.jpg" },
        { index: 4, name: "뫼르소", personas: [], egos: [], defaultIllustration: "default-image.jpg" },
        { index: 5, name: "홍루", personas: [], egos: [], defaultIllustration: "default-image.jpg" },
        { index: 6, name: "히스클리프", personas: [], egos: [], defaultIllustration: "default-image.jpg" },
        { index: 7, name: "이스마엘", personas: [], egos: [], defaultIllustration: "default-image.jpg" },
        { index: 8, name: "로쟈", personas: [], egos: [], defaultIllustration: "default-image.jpg" },
        { index: 9, name: "싱클레어", personas: [], egos: [], defaultIllustration: "default-image.jpg" },
        { index: 10, name: "오티스", personas: [], egos: [], defaultIllustration: "default-image.jpg" },
        { index: 11, name: "그레고르", personas: [], egos: [], defaultIllustration: "default-image.jpg" }
    ];

    characters.forEach(character => {
        character.addEventListener('click', () => {
            popup.style.display = 'block';
        });

        character.addEventListener('mouseover', () => {
            character.querySelector('.overlay').style.display = 'flex';
        });

        character.addEventListener('mouseout', () => {
            character.querySelector('.overlay').style.display = 'none';
        });
    });

    closeBtn.addEventListener('click', () => {
        popup.style.display = 'none';
    });

    // Update the basic character illustration when a persona is added
    function updateCharacterIllustration(characterIndex, imageUrl) {
        characterData[characterIndex].defaultIllustration = imageUrl;
        basicCharacterIllustration.src = imageUrl;
    }

    illustrationUpload.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                illustrationPreview.src = e.target.result;
                illustrationPreview.style.display = 'block';
            };
            reader.readAsDataURL(file);
        }
    });

    personaForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const characterIndex = document.getElementById('characterSelect').value;
        const personaName = document.getElementById('personaName').value;
        const health = document.getElementById('health').value;
        const speed = document.getElementById('speed').value;

        const skillTypes = Array.from(document.querySelectorAll('.skillType:checked')).map(cb => cb.value);
        const defense = {
            slash: document.getElementById('slashDefense').value,
            pierce: document.getElementById('pierceDefense').value,
            strike: document.getElementById('strikeDefense').value
        };
        const resources = Array.from(document.querySelectorAll('.resource:checked')).map(cb => cb.value);

        const resourceCounts = {
            anger: document.getElementById('angerCount').value,
            lust: document.getElementById('lustCount').value,
            sloth: document.getElementById('slothCount').value,
            gluttony: document.getElementById('gluttonyCount').value,
            depression: document.getElementById('depressionCount').value,
            pride: document.getElementById('prideCount').value,
            envy: document.getElementById('envyCount').value
        };
        const keywords = Array.from(document.querySelectorAll('.keyword:checked')).map(cb => cb.value);

        const persona = {
            name: personaName,
            health: health,
            speed: speed,
            skillTypes: skillTypes,
            defense: defense,
            resources: resources,
            resourceCounts: resourceCounts,
            keywords: keywords
        };

        characterData[characterIndex].personas.push(persona);
        console.log('Persona added:', persona);
        console.log('Updated character data:', characterData);

        // Update illustration if uploaded
        if (illustrationPreview.src) {
            updateCharacterIllustration(characterIndex, illustrationPreview.src);
        }

        popup.style.display = 'none';
        personaForm.reset();
        illustrationPreview.style.display = 'none';
    });

    egoForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const characterIndex = document.getElementById('characterSelectEgo').value;
        const egoName = document.getElementById('egoName').value;
        const baseCoin = document.getElementById('baseCoin').value;
        const coinAdd = document.getElementById('coinAdd').value;
        const coinCount = document.getElementById('coinCount').value;
        const weight = document.getElementById('weight').value;
        const defense = document.getElementById('defense').value;

        const resourceCountsEgo = {
            anger: document.getElementById('egoAngerCount').value,
            lust: document.getElementById('egoLustCount').value,
            sloth: document.getElementById('egoSlothCount').value,
            gluttony: document.getElementById('egoGluttonyCount').value,
            depression: document.getElementById('egoDepressionCount').value,
            pride: document.getElementById('egoPrideCount').value,
            envy: document.getElementById('egoEnvyCount').value
        };

        const ego = {
            name: egoName,
            baseCoin: baseCoin,
            coinAdd: coinAdd,
            coinCount: coinCount,
            weight: weight,
            defense: defense,
            resourceCounts: resourceCountsEgo
        };

        characterData[characterIndex].egos.push(ego);
        console.log('EGO added:', ego);
        console.log('Updated character data:', characterData);

        popup.style.display = 'none';
        egoForm.reset();
    });
});

function openTab(evt, tabName) {
    let i, tabcontent, tablinks;

    tabcontent = document.getElementsByClassName('tabcontent');
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = 'none';
    }

    tablinks = document.getElementsByClassName('tablink');
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(' active', '');
    }

    document.getElementById(tabName).style.display = 'block';
    evt.currentTarget.className += ' active';
}
