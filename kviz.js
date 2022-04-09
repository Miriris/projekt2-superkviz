// Nejdříve si vytvoř objekt, který bude držet Tvoje super otázky :-)

const otazky = [
  {
    poradi: 1,
    otazka: 'Kdo je nejkrásnější na světě?',
    obrazek: 'obrazky/snehurka.jpg',
    dataOdpoved: ['Ledová královna', 'Sněhurka', 'Já, já jsem nejkrásnější!'],
    spravna_odpoved: 1,
  },
  {
    poradi: 2,
    otazka: 'Co je ikonická hračka z 80. let?',
    obrazek: 'obrazky/moncicak.jpg',
    dataOdpoved: ['Kočičák', 'Mončičák', 'Opičák'],
    spravna_odpoved: 1,
  },
  {
    poradi: 3,
    otazka: 'Jaké je oblíbené ovoce pro výrobu džusů?',
    obrazek: 'obrazky/ovoce.jpg',
    dataOdpoved: ['Pomeranč', 'Jahody', 'Rybíz'],
    spravna_odpoved: 0,
  },
];

console.log(otazky[0].otazka);

// Dále budeš potřebovat další proměnné - jaké?

let poradi = document.querySelector('#poradi');
let otazka = document.querySelector('#otazka');

let kviz = document.querySelector('.kviz');
let i = 0;
zobrazOtazku();
// Tato funkce se postará o vygenerování otázky
// Zavoláme ji jednou na začátku a poté vždy po odpovězení

function zobrazOtazku() {
  //for (let i = 0; i < otazky.length; i++) {
  poradi.textContent = 'OTÁZKA ' + otazky[i].poradi + '/' + otazky.length;
  //}
  otazka.textContent = otazky[i].otazka;

  let obsah = document.querySelector('.obsah');
  //kviz.removeChild(obsah);

  obsah.innerHTML = '';
  let foto = document.createElement('div');
  obsah.appendChild(foto);
  foto.className = 'foto';
  let obrazek = document.createElement('img');
  foto.appendChild(obrazek);
  obrazek.src = otazky[i].obrazek;
  obrazek.id = 'obrazek';
  obrazek.alt = 'ilustrační obrázek';

  let moznosti = document.createElement('div');
  obsah.appendChild(moznosti);
  moznosti.id = 'moznosti';
  let odpovedi = document.createElement('ul');
  moznosti.appendChild(odpovedi);
  odpovedi.id = 'odpovedi';
  for (let j = 0; j < otazky[i].dataOdpoved.length; j++) {
    let odpoved = document.createElement('li');
    odpovedi.appendChild(odpoved);
    odpoved.textContent = otazky[i].dataOdpoved[j];
    odpoved.setAttribute('data-odpoved', j);
    //odpovedi.innerHTML +=
    // '<li data-odpoved=' + j + '>' + otazky[i].dataOdpoved[j] + '</li>';
  }
  let seznamOdpovedi = document.querySelectorAll('li');
  console.log(seznamOdpovedi);
  seznamOdpovedi.forEach((vybranaOdpoved) => {
    vybranaOdpoved.addEventListener('click', klikNaOdpoved);
  });
}

let poleOdpovedi = [];
let poleOdpovediText = [];
// klikNaOdpoved();

// Funkce se postará o obsluhu kliknutí na odpověď
// Musíme ji navázat na kokrétní odpovědi každé otázky (to uděláme v rámci funkce zobrazOtazku())
function klikNaOdpoved(udalost) {
  let vybranaOdpoved = udalost.target.dataset.odpoved;
  console.log(udalost);
  console.log(vybranaOdpoved);
  poleOdpovedi.push(vybranaOdpoved);
  poleOdpovediText.push(udalost.target.innerHTML);
  console.log(otazky.length);
  if (otazky[i].poradi < otazky.length) {
    i = i + 1;
    zobrazOtazku();
    /*if (parseInt(vybranaOdpoved) == otazky[i].spravna_odpoved) {
      console.log('odpovedi');
      return 1;
    } else {
      return 0;
    }*/
  } else {
    console.log('hotovo');
    zobrazVyhodnoceni();
  }
  /*if (parseInt(vybranaOdpoved) == otazky[i].spravna_odpoved) {
    console.log('odpovedi');
    return 1;
  } else {
    return 0;
  }*/
}

/* 
  odpoved.addEventListener('click', function () {
    
    console.log(el);
    if (value == otazky[i].spravna_odpoved) {
      console.log('odpovedi');
      return 1;
    } else {
      return 0;
    }
  });*/
//}
let vyslednaOdpoved = ' ';
// Když už mám odpovězeno na vše (řídí se velikosí objektu otazky na řádku 3), tak mohu zobrazit výsledky
// Vypočítám skóre a nageneruje nové elementy do HTML
// Touto funkcí končí můj program (budu se rozhodovat, zda ji zavolat v rámci klikNaOdpoved())
function zobrazVyhodnoceni() {
  let vysledek = document.querySelector('.vysledek');
  kviz.style.display = 'none';
  vysledek.style.display = 'block';
  let hodnoceni = document.querySelector('#hodnoceni');
  for (let x = 0; x < otazky.length; x++) {
    let odpovedNaOtazku = document.createElement('div');
    hodnoceni.appendChild(odpovedNaOtazku);
    odpovedNaOtazku.className = 'stylOtazky';
    odpovedNaOtazku.innerHTML +=
      '<div>' +
      otazky[x].poradi +
      '. ' +
      otazky[x].otazka +
      '</div> <div class=odpoved> Tvoje odpověď: ' +
      poleOdpovediText[x] +
      '</div> <div class=odpoved>' +
      spravnaOdpoved() +
      '</div>';

    function spravnaOdpoved() {
      if (poleOdpovedi[x] == otazky[x].spravna_odpoved) {
        console.log(poleOdpovedi);
        console.log('odpovedi');
        return 'To je SPRÁVNĚ.';
      } else {
        console.log('chyba');
        return (
          'Správna odpověď je ' +
          otazky[x].dataOdpoved[otazky[x].spravna_odpoved] +
          '.'
        );
      }
    }
  }

  let vysledekHodnoceni = document.createElement('h2');
  vysledek.appendChild(vysledekHodnoceni);
  let pocetSpravnychOdpovedi = 0;
  for (let y = 0; y < otazky.length; y++) {
    if (poleOdpovedi[y] == otazky[y].spravna_odpoved) {
      pocetSpravnychOdpovedi = pocetSpravnychOdpovedi + 1;
    } else {
      pocetSpravnychOdpovedi = pocetSpravnychOdpovedi;
    }
  }
  vysledekHodnoceni.textContent =
    'SPRÁVNĚ ' +
    pocetSpravnychOdpovedi +
    ' ze ' +
    otazky.length +
    ' OTÁZEK. Úspěšnost ' +
    parseInt((pocetSpravnychOdpovedi / otazky.length) * 100) +
    '%.';

  //hodnoceni.innerHTML +=
  // '<div class="stylOtazky">' + otazky[x].poradi + '. ' + otazky[x].otazka + '</div>';

  // odpoved.textContent = otazky[i].dataOdpoved[j];
  //odpoved.setAttribute('data-odpoved', j);
  //odpovedi.innerHTML +=
  // '<li data-odpoved=' + j + '>' + otazky[i].dataOdpoved[j] + '</li>';
}
