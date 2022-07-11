import { TrackShape } from "../../../types"

export const searchById = (input: string, dataSet: TrackShape[]): TrackShape | undefined => {
    return dataSet.find(track => track?.id?.toString() === input)
}

// Unused functions

// Initially - using this search was attractive for its time complexity - O(1)
// This would be potentially useful for a single endpoint search
// However - it assumes that the track ID will always be relative to its index in the dataset - thus I decided not to use it
// This could could cause problems later down the line in an application e.g. if a track is removed, and the IDs are not correctly updated

// const searchByIndex = (input: string, dataSet: TrackShape[]): TrackShape | undefined => {
//     const isNum = /^\d+$/.test(input)
//     if(!isNum) {
//         return undefined
//     } else {
//         return dataSet[parseInt(input) - 1]
//     }
// }