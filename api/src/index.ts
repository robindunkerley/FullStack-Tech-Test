import express, {Request, Response} from 'express'
import {searchById, TracksDataShape, RTNTrackId} from './utils/helperFunctions'
import tracksJson from './tracks.json'
import Fuse from 'fuse.js'

const app = express()
const port = process.env.PORT || 3001
const tracksData: TracksDataShape = tracksJson.tracks

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

type ArtistSearchResult = Fuse.FuseResult<{
    artist: string;
    title: string;
    id: number;
}>[]

// Middleware
app.use(express.json())

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
        const response = [{  
            item: {
                    artist: idSearch.artist,
                    title: idSearch.title,
                    id: idSearch.id,
                }
            }
        ]
        res.status(200).send(response)
    }
})

app.get('/api/tracks/artist/:input', (req: Request, res: Response) => {
    const input: string = req.params.input
    const artistSearch: ArtistSearchResult = fuse.search(input)
    if(artistSearch === undefined) {
        res.status(404).send('No matches by artist name')
    } else {
        res.status(200).send(artistSearch)
    }
})

app.listen(port, () => {
    console.log(`application listening at http://localhost:${port}`)
})