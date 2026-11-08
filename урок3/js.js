const superheroes = [
    {
        name: "Molecule Man",
        secretIdentity: "Dan Jukes",
        age: 29,
        superpowers: [
            "Radiation resistance",
            "Turning tiny",
            "Radiation blast"
        ]
    },
    {
        name: "Madame Uppercut",
        secretIdentity: "Jane Wilson",
        age: 39,
        superpowers: [
            "Million tonne punch",
            "Damage resistance",
            "Superhuman reflexes"
        ]
    },
    {
        name: "Eternal Flame",
        secretIdentity: "Unknown",
        age: 1000000,
        superpowers: [
            "Immortality",
            "Heat Immunity",
            "Inferno",
            "Teleportation",
            "Interdimensional travel"
        ]
    }
];

function renderSquad() {
    const container = document.getElementById('squad-container');
    if (!container) return;

    superheroes.forEach(hero => {
        const card = document.createElement('div');
        card.className = 'hero-card';

        const nameElement = document.createElement('h2');
        nameElement.className = 'hero-name';
        nameElement.innerText = hero.name.replace(' ', '\n');

        const identityElement = document.createElement('p');
        identityElement.className = 'hero-info';
        identityElement.textContent = `Secret identity: ${hero.secretIdentity}`;

        const ageElement = document.createElement('p');
        ageElement.className = 'hero-info';
        ageElement.textContent = `Age: ${hero.age.toLocaleString('en-US')}`;

        const powersTitleElement = document.createElement('p');
        powersTitleElement.className = 'powers-title';
        powersTitleElement.textContent = 'Superpowers:';

        const powersListElement = document.createElement('ul');
        powersListElement.className = 'powers-list';

        hero.superpowers.forEach(power => {
            const li = document.createElement('li');
            li.textContent = power;
            powersListElement.appendChild(li);
        });

        card.appendChild(nameElement);
        card.appendChild(identityElement);
        card.appendChild(ageElement);
        card.appendChild(powersTitleElement);
        card.appendChild(powersListElement);

        container.appendChild(card);
    });
}

document.addEventListener('DOMContentLoaded', renderSquad);
