function hasSeasonNumber(SeasonNumber) {
    return /\d/.test(SeasonNumber);
}

export default function getSeasonNumber(SeasonName, index) {
    let seasonCheck1 = SeasonName.split(" ")[0]
    let seasonCheck2 = SeasonName.split(" ")[1]

    if(hasSeasonNumber(seasonCheck1.replace(/\D/g, "").replace(/^0+/, ''))) {
        return seasonCheck1.replace(/\D/g, "").replace(/^0+/, '')
    } else if(hasSeasonNumber(seasonCheck2.replace(/\D/g, "").replace(/^0+/, ''))) {
        return seasonCheck2.replace(/\D/g, "").replace(/^0+/, '')
    } else {
        return index
    }
}