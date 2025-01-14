import { useCallback, useContext, useEffect, useMemo, useReducer } from "react";
import * as action from "reducers/currentTracklist/currentTracklistActions";
import currentTracklistReducer from "reducers/currentTracklist/currentTracklistReducer";
import CurrentTracklistContext from "./CurrentTracklistContext";
import initialTracklistState from "./initialTracklistState";
import CurrentTrackContext from "context/currentTrack/CurrentTrackContext";

export default function CurrentTracklistProvider({ children }: any) {
	const [tracklistState, dispatch] = useReducer(currentTracklistReducer, initialTracklistState);
	const { selectCurrentTrack } = useContext(CurrentTrackContext)

	useEffect(() => {
		action.initCurrentTracklistAction(dispatch);
	}, []);

	const shuffleTracklist = useCallback(() => {
		action.shuffleTracklistAction(dispatch, tracklistState)
	}, []);

  // const selectTrack = useCallback((trackId: any) => {
	// 	action.selectTrackAction(dispatch, trackId)
	// }, []);

	const selectAlbum = useCallback((albumId: any) => {
		action.selectAlbumAction(dispatch, albumId)
	}, [selectCurrentTrack]);

	const selectArtist = useCallback((artistId: any) => {
		action.selectArtistAction(dispatch, artistId)
	}, []);

	const selectPlaylist = useCallback((playlistId: any) => {
		action.selectPlaylistAction(dispatch, playlistId)
	}, []);

	const selectGenre = useCallback((genreId: any) => {
		action.selectGenreAction(dispatch, genreId)
	}, []);

	const memoProvider = useMemo(
		() => ({
			...tracklistState,
			shuffleTracklist,
			selectAlbum,
			selectArtist,
			selectPlaylist,
			selectGenre,
      // selectTrack
		}), [
		tracklistState,
		shuffleTracklist,
		selectAlbum,
		selectArtist,
		selectPlaylist,
		selectGenre,
    // selectTrack
	]
	);

	return (
		<CurrentTracklistContext.Provider value={memoProvider}>
			{children}
		</CurrentTracklistContext.Provider>
	)
}