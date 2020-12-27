const minSpielende = 6;

const teamGroesseMin = Math.round(minSpielende / 2);
const teamGroesseJugendarbeit = 8; // weil Kinder tendenziell mehr Leute/Team brauchen
const teamGroesseStandard = 5;

const anleiterMatrix = [
    {spielende: 100, anleiter: 3},
    {spielende: 35, anleiter: 2}
]
const preisAnleiterProStunde = 30;
const stundenProAnleiter = 6.25

const preisGrundspielProTeamJugendarbeit = 10
const preisErweiterungProTeamJugendarbeit = 5
const preisGrundspielProTeamStandard = 40
const preisErweiterungProTeamStandard = 20

function preise() {
    return {
        paket: "ausleihen",
        anzahlSpielende: 30,
        minSpielende,
        erweiterungen: ["naturkatastrophen"],
        jugendarbeit: "ja",
        isJugendarbeit() {
            return this.jugendarbeit === "ja";
        },
        anzahlErweiterungen() {
            return this.erweiterungen.length
        },
        anzahlTeams() {
            let teams = Math.ceil(this.anzahlSpielende / this.teamGroesse());
            return (teams <= 1) ? 2 : teams;
        },
        teamGroesse() {
            if (this.anzahlSpielende <= this.minSpielende) {
                return teamGroesseMin;
            }
            if (this.isJugendarbeit()) {
                return teamGroesseJugendarbeit;
            }
            return teamGroesseStandard;
        },
        realTeamGroesse() {
            return Math.round(this.anzahlSpielende / this.anzahlTeams());
        },
        anzahlAnleiter() {
            for (let entry of anleiterMatrix) {
                if (this.anzahlSpielende >= entry.spielende) {
                    return entry.anleiter;
                }
            }
            return 1;
        },
        preisGrundspiel() {
            if (this.isJugendarbeit()) {
                return this.anzahlTeams() * preisGrundspielProTeamJugendarbeit
            }
            return this.anzahlTeams() * preisGrundspielProTeamStandard
        },
        preisErweiterungen() {
            let preis = this.anzahlTeams() * this.anzahlErweiterungen();
            if (this.isJugendarbeit()) {
                return preis * preisErweiterungProTeamJugendarbeit;
            }
            return preis * preisErweiterungProTeamStandard;
        },
        preisAnleiter() {
            return this.anzahlAnleiter() * preisAnleiterProStunde * stundenProAnleiter;
        },
        gesamtPreis() {
            let gesamt = this.preisGrundspiel() + this.preisErweiterungen()
            if (this.paket === "anleiten") {
                return gesamt + this.preisAnleiter();
            }
            return gesamt
        },
        preisProPerson() {
            return +((this.gesamtPreis() / this.anzahlSpielende).toFixed(2));
        },

        euro(value) {
            return value.toLocaleString('de-DE', {style: 'currency', currency: 'EUR'});
        }
    }
}