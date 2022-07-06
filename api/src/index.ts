import express, {Request, Response} from 'express'
import {searchById, searchByArtist, TracksDataShape, RTNArtistSearch, RTNTrackId} from './utils/helperFunctions'
import tracksJson from './tracks.json'

const app = express()
const port = process.env.PORT || 3001
const tracksData: TracksDataShape = tracksJson.tracks

// Middleware
app.use(express.json())

app.get('/api', (req: Request, res: Response) => {
    return res.json(tracksJson)
})

// I decided to go with 2 separate endpoints based on a consideration of the usecase / UX
// there is a potential for crossover between an artist name and an ID e.g. artists that have a number as their alias
// However, I felt it was unlikely that a user searching by track id would be attempting to search for artist and vice versa
// Thus having two endpoints produces separation between Id and artist search, reducing time complexity of searches

app.get('/api/tracks/id/:input', (req: Request, res: Response) => {
    const trackId: string = req.params.input
    const idSearch: RTNTrackId = searchById(trackId, tracksData)
    if(idSearch === undefined) {
        res.status(404).send('No matches by track ID')
    } else {
        res.status(200).send(idSearch)
    }
})

app.get('/api/tracks/artist/:input', (req: Request, res: Response) => {
    const input: string = req.params.input
    const artistSearch: RTNArtistSearch = searchByArtist(input, tracksData)
    if(artistSearch === undefined) {
        res.status(404).send('No matches by artist name')
    } else {
        res.status(200).send(artistSearch)
    }
})

app.listen(port, () => {
    console.log(`application listening at http://localhost:${port}`)
})