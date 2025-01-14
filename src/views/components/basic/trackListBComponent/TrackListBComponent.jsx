import { Suspense } from "react";
import TrackItemComponentDesktop from "../desktop/trackListComponentDesktop/TrackItemComponentDesktop";
import TrackItemComponentMobile from "../mobile/tracklistComponentMobile/TrackItemComponentMobile";
import "./trackListBComponent.scss";
import { responsiveBreak } from "utils/componentsConstants";
import useWindowSizeReport from "hooks/useWindowSizeReport";
import { useTranslation } from "react-i18next";
import { AiOutlineClockCircle } from "react-icons/ai";
import { joinArtistsName } from "views/utils/joinArtistsName";
import formatToSeconds from "utils/tracks/formatToSeconds";

export default function TrackListBComponent({ tracksData }) {
  const screenWidth = useWindowSizeReport();

  return (
    <Suspense fallback={<></>}>
      {screenWidth > responsiveBreak ? (
        <TrackListDesktopComponent tracksData={tracksData} />
      ) : (
        <TrackListMobileComponent tracksData={tracksData} />
      )}
    </Suspense>
  );
}

const TrackListDesktopComponent = ({ tracksData }) => {
  const { t } = useTranslation();

  return (
    <>
      <div className="tracklist-component">
        <div className="tracklist-component__sections">
          <span>{t("track_list_track")}</span>
          <span>&nbsp;</span>
          <span>{t("track_list_artist")}</span>
          <span>{t("track_list_album")}</span>
          <span className="tracklist-component__sections--icontime">
            <AiOutlineClockCircle className="tracklist-component__sections--td-icon" />
          </span>
        </div>
        <div className="tracklist-component__line"></div>
      </div>
      <div className="tracklist-component__tracks">
        {tracksData &&
          tracksData.map((track, index) => {
            const { _id, name, artists, imageUrl, likedBy, duration, album, audioUrl } =
              track;
            const artistsName = joinArtistsName(artists);

            if (!audioUrl) return;

            return (
              <TrackItemComponentDesktop
                id={_id}
                index={index}
                name={name ? name : track.uploadByUser.name}
                artist={artistsName ? artistsName : track.uploadByUser.artists}
                thumbnail={imageUrl}
                likes={likedBy.length}
                time={duration ? formatToSeconds(duration) : "-"}
                audioUrl={audioUrl}
                album={album?.name}
                track={track}
              />
            );
          })}
      </div>
    </>
  );
};

const TrackListMobileComponent = ({ tracksData }) => {
  return (
    <main className="mobile-track-component">
      {tracksData &&
        tracksData.map((track) => {
          const { _id, name, artists, imageUrl, likedBy, duration, album, audioUrl } =
            track;
          const artistsName = joinArtistsName(artists);

          if (!audioUrl) return;

          return (
            <TrackItemComponentMobile
              id={_id}
              name={name ? name : track.uploadByUser.name}
              artist={artistsName ? artistsName : track.uploadByUser.artists}
              thumbnail={imageUrl}
              likes={likedBy.length}
              time={duration ? formatToSeconds(duration) : "-"}
              audioUrl={audioUrl}
              album={album?.name}
              track={track}
            />
          );
        })}
    </main>
  );
};
