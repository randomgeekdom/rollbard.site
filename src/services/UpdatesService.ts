import update from "../types/update"

export default class UpdatesService{
    private updates: update[] = [
        {
            Date: this.getDate(2022, 12, 11),
            Title: "Radiant Rebels",
            Text: "I'm three sessions into Radiant Rebels, a sci-fi RPG I'm running for my siblings using the Fate Core system.  My focus in the upcoming weeks will be add a few tools for Fate Core that I can use to quickly spin up situations, enemies, etc.",
        },
    ];

    private getDate(year: number, month: number, day: number){
        return new Date(year, month - 1, day);
    }

    GetUpdates(): update[]{
        return this.updates.sort((x, y) => (x.Date > y.Date ? -1 : 1));
    }
}