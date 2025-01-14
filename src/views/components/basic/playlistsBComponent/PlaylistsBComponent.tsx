import { useNavigate, useSearchParams } from 'react-router-dom'
import { responsiveBreak } from "utils/componentsConstants";
import useWindowSizeReport from "hooks/useWindowSizeReport";
import RenderPlaylist from '../renders/renderPlaylist/RenderPlaylist';
import './playlistsBComponent.scss';
import { MdArrowBack } from 'react-icons/md'

export default function PlaylistsBComponent({ playlists }: any) {
  const [screenWidth] = useWindowSizeReport()
  const [searchParams] = useSearchParams();
  const playlistsQuery = searchParams.get('playlists');


  const filterPlaylists = (playlist: any) => playlist.filter((playlist: any) => new RegExp(`.*${playlistsQuery}.*`, 'i').test(playlist.name))

  const navigate = useNavigate();

  const renderPlaylists = () => (
    playlistsQuery ? (
      filterPlaylists(playlists)
        .map((playlist: any) => <RenderPlaylist key={playlist._id} playlist={playlist} />)
    ) : (
      playlists.map((playlist: any) => <RenderPlaylist key={playlist._id} playlist={playlist} />)
    )
  )

  return (
    <div className="playlist-page-content">
      {(screenWidth < responsiveBreak) &&
        <button onClick={() => navigate(-1)} className="playlist-page-content__mobile">
          <MdArrowBack size={27} />
        </button>}
      <h1>Playlist Page</h1>
      <div className='playlist-page-content__grid'>
        {playlists &&
          renderPlaylists()
        }
      </div>
    </div>
  )
}


