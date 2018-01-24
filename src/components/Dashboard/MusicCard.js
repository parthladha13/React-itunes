import React from "react";
import { MdMusicNote, MdLibraryMusic } from "react-icons/lib/md";

const MusicCard = props => (
  <div className="column col-3 mt-2 mb-2">
    <div className="card">
      <div className="card-header">
        <div className="columns">
          <div className="column col-4">
            <img
              src={props.info.artworkUrl100}
              className="img-responsive"
              alt={props.info.trackName}
            />
          </div>
          <div className="column col-8">
            <div className="card-title h6">{props.info.trackName}</div>
            <div className="card-subtitle text-gray">
              {props.info.artistName}
            </div>
            <div className="price">
              <MdMusicNote />
              {props.info.trackPrice} {props.info.currency}
              &nbsp;
              <MdLibraryMusic />
              {props.info.collectionPrice} {props.info.currency}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default MusicCard;
