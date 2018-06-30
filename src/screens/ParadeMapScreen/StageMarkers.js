// @flow
import React, { Fragment } from "react";
import { Marker } from "react-native-maps";
import { uniqWith, eqBy } from "ramda";
import type { Event } from "../../data/event";
import stageIconActive from "../../../assets/images/stageIconActive.png";
import stageIconInactive from "../../../assets/images/stageIconInactive.png";

type Props = {
  stages: Event[],
  activeMarker: ?string,
  handleMarkerPress: (stage: Event) => void
};

const StageMarkers = ({ stages, handleMarkerPress, activeMarker }: Props) => {
  if (stages.length === 0) {
    return null;
  }

  const uniqueStages = uniqWith(eqBy(stage => stage.id.split("-")[0]))(stages);

  return (
    <Fragment>
      {uniqueStages.map(stage => (
        <Marker
          zIndex={1}
          coordinate={{
            longitude: stage.fields.location.lon,
            latitude: stage.fields.location.lat
          }}
          key={stage.id}
          onPress={() => handleMarkerPress(stage)}
          stopPropagation
          image={
            activeMarker === stage.id ? stageIconActive : stageIconInactive
          }
        />
      ))}
    </Fragment>
  );
};

export default StageMarkers;