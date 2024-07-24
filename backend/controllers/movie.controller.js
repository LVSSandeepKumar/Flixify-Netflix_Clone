import { fetchFromTMDB } from "../services/tmdb.service.js";

export const getTrendingMovie = async(req,res) => {
    try {
        const data = await fetchFromTMDB("https://api.themoviedb.org/3/trending/movie/day?language=en-US");
        const randomMovie = data.results[Math.floor(Math.random() * data.results?.length)];

        return res.status(200).json({ success: true, content: randomMovie});
    } catch (error) {
        console.log("Error in getTrendingMovie controller" + error.message);
        return res.status(500).json({ success: false, message: "Internal server error"})
    }
};

export const getMovieTrailers = async(req, res) => {
    try {
        const {id} = req.params;
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`);
        
        return res.status(200).json({success: true, trailers: data.results})
    } catch (error) {
        if(error.message.includes("404")) {
            return res.status(404).send(null);
        }
        console.log("Error in getMovieTrailers controller " + error.message);
        return res.status(500).json({success: false, message: "Internal server error"})
    }
}

export const getMovieDetails = async(req,res) => {
    try {
        const {id} = req.params;
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/movie/${id}?language=en-US`);

        return res.json({ success: true, content: data});
    } catch (error) {
        if(error.message.includes("404")) {
            return res.status(404).send(null);
        }
        console.log("Error in getMovieDetails controller " + error.message);
        return res.status(500).json({ success: true, message: "Internal Server Error"})
    }
}

export const getSimilarMovies = async(req,res) => {
    try {
        const {id} = req.params;
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/movie/${id}/similar?language=en-US&page=1`);

        return res.status(200).json({ success: true, similar: data.results });
    } catch (error) {
        console.log("Error in getSimilarMovies controller " + error.message);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
}

export const getMoviesByCategory = async(req, res) => {
    try {
        const {category} = req.params;
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/movie/${category}?language=en-US&page=1`)
        
        return res.status(200).json({ success: true, content: data.results})
    } catch (error) {
        console.log("Error in getMoviesByCategory controller " + error.message);
        return res.status(500).json({ success: false, message: "Internal Server Error"})
    }
}