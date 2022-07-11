import {searchById} from './helperFunctions'
import trackData from '../tracks.json'

const dataSet = trackData.tracks

describe('searchById', () => {
    test('returns data', () => {
        const result = searchById('5', dataSet)
        expect(result).toBeTruthy()
        expect(result).toMatchObject({
            artist: "3AM",
            title: "Cold Harbour Woman",
            id: 5
        })
    })
    test('no data', () => {
        const result = searchById('0', dataSet)
        expect(result).toBeFalsy()
        expect(result).toBeUndefined()
    })
    test('alphabetic input', () => {
        const result = searchById('foo', dataSet)
        expect(result).toBeFalsy()
        expect(result).toBeUndefined()
    })
})