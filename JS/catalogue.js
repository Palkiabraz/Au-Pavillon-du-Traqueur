let selectedCategory = 'tous';
let selectedType = 'tous';
let selectedRarity = 'tous';
let selectedAttack = '';
let searchValue = '';
const categoryWrap = document.getElementById('category-dropdown-wrap');
const categoryBtn = document.getElementById('category-btn');
const categoryMenu = document.getElementById('category-dropdown');
const typeWrap = document.getElementById('type-dropdown-wrap');
const typeBtn = document.getElementById('type-btn');
const typeMenu = document.getElementById('type-dropdown');	
const rarityWrap = document.getElementById('rarity-dropdown-wrap');
const rarityBtn = document.getElementById('rarity-btn');
const rarityMenu = document.getElementById('rarity-dropdown');
categoryBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    categoryMenu.classList.toggle('active');
    typeMenu.classList.remove('active');
    rarityMenu.classList.remove('active');
});
typeBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    typeMenu.classList.toggle('active');
    categoryMenu.classList.remove('active');
    rarityMenu.classList.remove('active');
});
rarityBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    rarityMenu.classList.toggle('active');
    categoryMenu.classList.remove('active');
    typeMenu.classList.remove('active');
});
document.querySelectorAll('#category-dropdown a').forEach(a => {
    a.addEventListener('click', (e) => {
        e.preventDefault();
        selectedCategory = a.dataset.category;
        const label = a.textContent;
        categoryBtn.textContent = selectedCategory === 'tous' ? 'Catégorie de cartes' : `${label}`;
        categoryMenu.classList.remove('active');
        applyFilters();
    });
});
document.querySelectorAll('#type-dropdown a').forEach(a => {
    a.addEventListener('click', (e) => {
        e.preventDefault();
        selectedType = a.dataset.type;
        const label = a.textContent;
        typeBtn.textContent = selectedType === 'tous' ? 'Type de familiers' : `${label}`;
        typeMenu.classList.remove('active');
        applyFilters();
    });
});
document.querySelectorAll('#rarity-dropdown a').forEach(a => {
    a.addEventListener('click', (e) => {
        e.preventDefault();
        selectedRarity = a.dataset.rarity;
        const label = a.textContent;
        rarityBtn.textContent = selectedRarity === 'tous' ? 'Rareté du familier' : `${label}`;
        rarityMenu.classList.remove('active');
        applyFilters();
    });
});
document.addEventListener('click', (e) => {
    if (!categoryWrap.contains(e.target)) categoryMenu.classList.remove('active');
    if (!typeWrap.contains(e.target)) typeMenu.classList.remove('active');
    if (!rarityWrap.contains(e.target)) rarityMenu.classList.remove('active');
});
const attackInput = document.getElementById('attack-input');
let selectedLife = '';
const lifeInput = document.getElementById('life-input');
if (attackInput) {
    attackInput.addEventListener('input', (e) => {
        selectedAttack = e.target.value.trim();
        attackInput.classList.toggle('has-value', selectedAttack !== '');
        applyFilters();
    });
}
if (lifeInput) {
    lifeInput.addEventListener('input', (e) => {
        selectedLife = e.target.value.trim();
        lifeInput.classList.toggle('has-value', selectedLife !== '');
        applyFilters();
    });
}
function parseAttackCondition(condition) {
    if (!condition) return null;
    const s = condition.trim();
    const m = s.match(/^(<=|>=|<|>|=)?\s*(\d+)$/);
    if (!m) return null;
    return { op: m[1] || '=', val: parseInt(m[2], 10) };
}
function normalizeStr(s) {
    if (!s) return '';
    try {
        return s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
    } catch (e) {
        return s.replace(/[\u0300-\u036f]/g, '').toLowerCase();
    }
}
const extraKeywords = {
    'molosse': 'fleche tir',
    'ours': 'piege',
    'renard': 'aspect',
    'rongeur': 'morsure piqure'
};
function checkAttackCondition(cardAttack, conditionStr) {
    if (!conditionStr) return true;
    const cond = parseAttackCondition(conditionStr);
    if (!cond) return false;
    const atk = Number(cardAttack);
    if (isNaN(atk)) return false;
    switch (cond.op) {
        case '<': return atk < cond.val;
        case '<=': return atk <= cond.val;
        case '>': return atk > cond.val;
        case '>=': return atk >= cond.val;
        case '=': return atk === cond.val;
        default: return atk === cond.val;
    }
}
function filterCards(value) {
    searchValue = value || '';
    applyFilters();
}
function applyFilters() {
    const familiersCatalogue = document.getElementById("familiers-catalogue");
    const armesCatalogue = document.getElementById("armes-catalogue");
    const sortsCatalogue = document.getElementById("sorts-catalogue");
    const familiersTitle = document.getElementById("familiers-title");
    const armesTitle = document.getElementById("armes-title");
    const sortsTitle = document.getElementById("sorts-title");
    let effectiveCategory = selectedCategory;
    if (selectedCategory === 'tous') {
        if (selectedType !== 'tous' || selectedRarity !== 'tous') {
            effectiveCategory = 'familiers';
        } else if ((selectedAttack && selectedAttack !== '') || (selectedLife && selectedLife !== '')) {
            effectiveCategory = 'familiers-armes';
        }
    }
    if (effectiveCategory === 'tous') {
        familiersCatalogue.style.display = "grid";
        armesCatalogue.style.display = "grid";
        sortsCatalogue.style.display = "grid";
        familiersTitle.style.display = "block";
        armesTitle.style.display = "block";
        sortsTitle.style.display = "block";
    } else if (effectiveCategory === 'familiers-armes') {
        familiersCatalogue.style.display = "grid";
        armesCatalogue.style.display = "grid";
        sortsCatalogue.style.display = "none";
        familiersTitle.style.display = "block";
        armesTitle.style.display = "block";
        sortsTitle.style.display = "none";
    } else if (effectiveCategory === 'familiers') {
        familiersCatalogue.style.display = "grid";
        armesCatalogue.style.display = "none";
        sortsCatalogue.style.display = "none";
        familiersTitle.style.display = "block";
        armesTitle.style.display = "none";
        sortsTitle.style.display = "none";
    } else if (effectiveCategory === 'armes') {
        familiersCatalogue.style.display = "none";
        armesCatalogue.style.display = "grid";
        sortsCatalogue.style.display = "none";
        familiersTitle.style.display = "none";
        armesTitle.style.display = "block";
        sortsTitle.style.display = "none";
    } else if (effectiveCategory === 'sorts') {
        familiersCatalogue.style.display = "none";
        armesCatalogue.style.display = "none";
        sortsCatalogue.style.display = "grid";
        familiersTitle.style.display = "none";
        armesTitle.style.display = "none";
        sortsTitle.style.display = "block";
    }
    let totalVisible = 0;
    if (familiersCatalogue.style.display !== "none") {
        const cards = familiersCatalogue.querySelectorAll(".catalogue-card");
        let visible = 0;
        cards.forEach(img => {
            const normSearch = normalizeStr(searchValue);
            const cardNameNorm = normalizeStr(img.alt);
            const extra = extraKeywords[cardNameNorm] || img.dataset.keywords || '';
            const nameMatch = cardNameNorm.includes(normSearch) || normalizeStr(extra).includes(normSearch);
            let typeMatch = true;
            if (selectedType !== 'tous') {
                const t = (img.dataset.type || '').toLowerCase();
                typeMatch = (selectedType === 'aucun')
                    ? (t === '' || t === 'aucun')
                    : (t === selectedType);
            }
            let rarityMatch = true;
            if (selectedRarity !== 'tous') {
                const r = (img.dataset.rarity || '').toLowerCase();
                rarityMatch = r === selectedRarity;
            }
            const attackMatch = checkAttackCondition(img.dataset.attack, selectedAttack);
            const lifeMatch = checkAttackCondition(img.dataset.life, selectedLife);
            const show = nameMatch && typeMatch && rarityMatch && attackMatch && lifeMatch;
            img.style.display = show ? "block" : "none";
            if (show) visible++;
        });
        familiersTitle.style.display = visible > 0 ? "block" : "none";
        totalVisible += visible;
    }
    if (armesCatalogue.style.display !== "none") {
        const cards = armesCatalogue.querySelectorAll(".catalogue-card");
        let visible = 0;
        cards.forEach(img => {
            const normSearch = normalizeStr(searchValue);
            const cardNameNorm = normalizeStr(img.alt);
            const extra = extraKeywords[cardNameNorm] || img.dataset.keywords || '';
            const nameMatch = cardNameNorm.includes(normSearch) || normalizeStr(extra).includes(normSearch);
            const attackMatch = checkAttackCondition(img.dataset.attack, selectedAttack);
            const lifeMatch = checkAttackCondition(img.dataset.life, selectedLife);
            const show = nameMatch && ((selectedAttack ? attackMatch : true) && (selectedLife ? lifeMatch : true));
            img.style.display = show ? "block" : "none";
            if (show) visible++;
        });
        armesTitle.style.display = visible > 0 ? "block" : "none";
        totalVisible += visible;
    }
    if (sortsCatalogue.style.display !== "none") {
        const cards = sortsCatalogue.querySelectorAll(".catalogue-card");
        let visible = 0;
        cards.forEach(img => {
            const normSearch = normalizeStr(searchValue);
            const cardNameNorm = normalizeStr(img.alt);
            const extra = extraKeywords[cardNameNorm] || img.dataset.keywords || '';
            const show = cardNameNorm.includes(normSearch) || normalizeStr(extra).includes(normSearch);
            img.style.display = show ? "block" : "none";
            if (show) visible++;
        });
        sortsTitle.style.display = visible > 0 ? "block" : "none";
        totalVisible += visible;
    }
    const searchResults = document.getElementById("search-results");
    searchResults.textContent = totalVisible === 1 ? "1 carte trouvée" : `${totalVisible} cartes trouvées`;
}
applyFilters();