import { Map as YandexMap, YMaps as YandexMapContainer } from '@pbe/react-yandex-maps';
import classNames from 'classnames';
import React from 'react';

import './Map.scss';

interface Props {
  className?: string;
  coordinates: string;
}

export const Map = ({
  className,
  coordinates,
}: Props) => {
  const blockClassName = classNames(
    'map',
    className,
  );

  const center: number[] = coordinates.replaceAll(' ', '').split(',').map((number) => parseFloat(number));

  return (
    <div className={blockClassName}>
      <YandexMapContainer query={{ lang: 'ru_RU' }}>
        <YandexMap
          className="map__yandex-map"
          defaultState={{
            center: center,
            controls: [],
            zoom: 16,
          }}
          defaultOptions={{
            autoFitToViewport: 'always',
            suppressMapOpenBlock: true,
            suppressObsoleteBrowserNotifier: true,
          }}
        />
      </YandexMapContainer>
    </div>
  );
};
