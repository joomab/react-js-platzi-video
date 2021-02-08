import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { getVideoSource } from "../actions";
import "../assets/styles/components/Player.scss";

const TEST_MP4 =
  "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";

const Player = (props) => {
  const { id } = props.match.params;
  const hasPlaying = Object.keys(props.playing).length > 0;
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      props.getVideoSource(id);
      setIsLoading(false);
    }, 2000);
  }, []);

  return isLoading ? (
    <h3>Cargando {JSON.stringify(props.playing)}</h3>
  ) : hasPlaying ? (
    <div className="player">
      <video controls autoPlay>
        {/* <source src={props.playing.source} type="video/mp4" /> */}
        <source src={TEST_MP4} type="video/mp4" />
      </video>
      <div className="Player-back">
        <button
          type="button"
          onClick={() => {
            props.history.goBack();
          }}
        >
          Regresar
        </button>
      </div>
    </div>
  ) : (
    <Redirect to="/404" />
  );
};

const mapStateToProps = (state) => {
  return {
    playing: state.playing,
  };
};

const mapDispatchToProps = {
  getVideoSource,
};

export default connect(mapStateToProps, mapDispatchToProps)(Player);
