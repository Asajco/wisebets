const crown = require('../assets/crown.png')
const diamond = require('../assets/diamond.png')
const money = require('../assets/money.png')
const stats = require('../assets/stats.png')
export const faqs = [
  {
    question: 'Ako to funguje?',
    answer:
      'Vyberiete si z 3 služieb, tú ktorá vám najviac vyhovuje, objednáte si ju a uhradíte poplatok cez platobnú bránu. Po úhrade obdržíte mail s informáciami pre aktiváciu a stiahnutie našej aplikácie. Počas konzultácie nám poviete svoje preferencie a ciele. Na základe nich vám pomocou AI vyberieme najvhodnejšie riešenie. Spolupráca s nami vám prináša efektívnosť, jednoduchosť, kvalitu a podporu.',
    image: crown,
  },
  {
    question: 'Aký balík sa najviac oplatí?',
    answer:
      'Ak chcete maximalizovať svoje šance na úspech a dosiahnuť najvyššie zisky, odporúčame členstvo ELITE. Ponúka najvyššiu úspešnosť (85-87%), exkluzívny prístup s obmedzeným počtom miest, 10 AI tipov denne pre vačší zisk, bonusový kurz a e-book s tipmi pre úspešné stávkovanie.',
  },

  {
    question: 'Dostanem faktúru?',
    answer:
      'Áno dostanete. Sme oficiálne zapísaná firma, takže faktúra je samozrejmosťou. Mali by ste ju dostať na mail do 14 dní od prijatia platby.',
  },
  {
    question: 'Ako částo budem dostávať tipy?',
    answer:
      'Tipy na stávky odosielame v priebehu dňa, zväčša poobede. Môže sa však stať, že vám tip príde aj ráno alebo podvečer. Snažíme sa, aby ste tipy dostávali každý pracovný deň, avšak v závislosti od aktuálnej ponuky a dostupných informácií sa môže stať, že v daný deň tipy posielať nebudeme. V takýchto prípadoch v skupine prebieha voľno a nestávkujeme.',
    image: diamond,
  },
  {
    question: 'Prečo posielate tipy v rôznych časoch?',
    image: money,
    answers: {
      answer1:
        'Analýza a vyhodnotenie: Na vytvorenie kvalitných tipov potrebujeme čas na analýzu a vyhodnotenie dostupných informácií.',
      answer2:
        'Aktuálne informácie: Situácia v športe sa neustále mení a my sa snažíme reagovať na tieto zmeny a posielať vám tipy na základe najaktuálnejších informácií.',
      answer3:
        'Optimalizácia zisku: Niektoré športové udalosti sú vhodné na stávkovanie v rôznych časoch dňa. Snažíme sa preto posielať tipy vtedy, keď je šanca na zisk najvyššia.',
    },
  },
  {
    question: 'Je úspešnosť garantovaná?',

    answer:
      'Úspešnosť negarantujeme. Investovanie do tipov na stávky je ako investovanie do akéhokoľvek iného produktu - vždy existuje určité riziko. My vo WiseBets však veríme v naše služby a v kvalitu našich tipov natoľko, že vám ponúkame garanciu. Ak počas členstva nedosiahnete zisk, predĺžime vám ho! Stačí nám napísať a po individuálnej komunikácii sa dohodneme na podmienkach predĺženia. Sme presvedčení, že s našimi tipmi budete úspešní, a preto vám chceme dať príležitosť presvedčiť sa o tom sami.',
  },
]
