import express, {NextFunction, Request, Response} from 'express'
import Fuse from 'fuse.js'
import {EndpointResponse, TrackShape} from '../../types'
import {searchById} from './utils/helperFunctions'
import tracksJson from './tracks.json'

const app = express()
const port = process.env.PORT || 3001
const tracksData: TrackShape[] = tracksJson.tracks

const options = {
    isCaseSensitive: false,
    includeScore: false,
    shouldSort: true,
    includeMatches: false,
    findAllMatches: false,
    minMatchCharLength: 1,
    location: 0,
    threshold: 0.2,
    distance: 100,
    useExtendedSearch: false,
    ignoreLocation: false,
    ignoreFieldNorm: false,
    fieldNormWeight: 1,
    keys: [
      "artist",
    ]
  };

const fuse = new Fuse(tracksData, options)

// Middleware
app.use(express.json())

// I decided to go with 2 separate endpoints based on a consideration of the usecase / UX
// there is a potential for crossover between an artist name and an ID e.g. artists that have a number as their alias
// However, I felt it was unlikely that a user searching by track id would be attempting to search for artist and vice versa
// Thus having two endpoints produces separation between Id and artist search, reducing time complexity of searches

app.get('/api/tracks/id/:input', (req: Request, res: Response<EndpointResponse>) => {
    const trackId: string = req.params.input
    const idSearch = searchById(trackId, tracksData)
    res.status(200).send(idSearch ? [idSearch] : [])
})

app.get('/api/tracks/artist/:input', (req: Request, res: Response<EndpointResponse>) => {
    const input: string = req.params.input
    const artistSearch = fuse.search(input).map((data) => data.item) 
    res.status(200).send(artistSearch)
})

app.post('/api/newtrack', (req, res) => {
    const newTrack = req.body
    tracksData.unshift(newTrack)
    res.send(tracksData)
})

// Pagination
const sliceMiddleware = (dataSet: TrackShape[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const page = req.query.page?.toString()
        const limit = req.query.limit?.toString()
        if(page !== undefined && limit !== undefined) {
            let startIndex = (parseInt(page) - 1) * parseInt(limit)
            let endIndex = parseInt(page) * parseInt(limit)
            res.send(dataSet.slice(startIndex, endIndex))
        } else {
            res.send([])
        }
    }
}
// example - /api/tracks/?page=1&limit=20
app.get('/api/tracks/', sliceMiddleware(tracksData))

app.listen(port, () => {
    console.log(`application listening at http://localhost:${port}`)
})