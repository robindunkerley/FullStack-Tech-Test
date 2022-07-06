export type TracksDataShape = {
    artist: string,
    title: string,
    id: number
}[]


export type TrackShape = {
    artist: string,
    title: string,
    id: number
}

export type RTNArtistSearch = TracksDataShape | undefined

export type RTNTrackId = TrackShape | undefined

export const searchById = (input: string, dataSet: TracksDataShape): RTNTrackId => {
    const isNum = /^\d+$/.test(input)
    if(!isNum) {
        return undefined
    } else {
        return dataSet.find(track => track.id === parseInt(input))
    }
}


export const searchByArtist = (input: string, dataSet: TracksDataShape): RTNArtistSearch => {
    const search = dataSet.filter(track => track.artist.toLocaleLowerCase() === input.toLocaleLowerCase())
    if(search.length < 1) {
        return undefined
    } else {
        return search
    }
}


// Unused functions


// Initially - using this search was attractive for its time complexity - O(1)
// This would be potentially useful for a single endpoint search
// However - it assumes that the track ID will always be relative to its index in the dataset - thus I decided not to use it
// This could could cause problems later down the line in an application e.g. if a track is removed, and the IDs are not correctly updated
const searchByIndex = (input: string, dataSet: TracksDataShape):  RTNTrackId => {
    const isNum = /^\d+$/.test(input)
    if(!isNum) {
        return undefined
    } else {
        return dataSet[parseInt(input) - 1]
    }
}