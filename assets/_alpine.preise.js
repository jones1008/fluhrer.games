const minSpielende = 6;

const teamGroesseJugendarbeit = 8;
const teamGroesseStandard = 5;
const teamGroesseKlein = Math.floor(minSpielende / 2);

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
        jugendarbeit: true,
        anzahlErweiterungen() {
            return this.erweiterungen.length
        },
        anzahlTeams() {
            return Math.floor(this.anzahlSpielende / this.teamGroesse());
        },
        teamGroesse() {
            if (this.jugendarbeit) {
                return teamGroesseJugendarbeit;
            }
            if (this.anzahlSpielende <= this.minSpielende) {
                return teamGroesseKlein;
            }
            return teamGroesseStandard;
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
            if (this.jugendarbeit) {
                return this.anzahlTeams() * preisGrundspielProTeamJugendarbeit
            }
            return this.anzahlTeams() * preisGrundspielProTeamStandard
        },
        preisErweiterungen() {
            let preis = this.anzahlTeams() * this.anzahlErweiterungen();
            if (this.jugendarbeit) {
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
            return Math.round(this.gesamtPreis() / this.anzahlSpielende, 2);
        },

        euro(value) {
            return value.toLocaleString('de-DE', {style: 'currency', currency: 'EUR'});
        }
    }
}