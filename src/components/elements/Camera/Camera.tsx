'use client';

import classNames from 'classnames';
import React, { useEffect, useRef, useState } from 'react';

import './Camera.scss';

interface Props {
  className?: string;
}

export const Camera = ({ className }: Props) => {
  const blockClassName = classNames('camera', className);

  const [isButtonsBlocked, setIsButtonsBlocked] = useState(true);
  const [imageCapture, setImageCapture] = useState<ImageCapture>(null!);

  const videoEl = useRef<HTMLVideoElement>(null);
  const grabFrameButton = useRef<HTMLButtonElement>(null);
  const grabFrameCanvas = useRef<HTMLCanvasElement>(null);
  const takePhotoButton = useRef<HTMLButtonElement>(null);
  const takePhotoCanvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (videoEl.current) {
      videoEl.current.addEventListener('play', function() {
        setIsButtonsBlocked(false);
      });
    }
  }, []);

  function onGetUserMediaButtonClick() {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then((mediaStream) => {
        if (videoEl.current) {
          videoEl.current.srcObject = mediaStream;
          videoEl.current.play();
        }

        const track = mediaStream.getVideoTracks()[0];
        setImageCapture(new ImageCapture(track));
      })
      .catch((error: any) => console.error(error));
  }

  function onGrabFrameButtonClick() {
    console.log(11);
    imageCapture.grabFrame()
      .then((imageBitmap: ImageBitmap) => {
        console.log(5, imageBitmap);
        if (grabFrameCanvas.current) {
          drawCanvas(grabFrameCanvas.current, imageBitmap);
          console.log(6, grabFrameCanvas.current);
        }
      })
      .catch((error: any) => console.error(error));
  }

  function onTakePhotoButtonClick() {
    console.log(12);
    imageCapture.takePhoto()
      .then((blob: Blob) => {
        console.log(7, blob);
        return createImageBitmap(blob);
      })
      .then((imageBitmap: ImageBitmap) => {
        console.log(8, imageBitmap);
        if (takePhotoCanvas.current) {
          drawCanvas(takePhotoCanvas.current, imageBitmap);
          console.log(9, takePhotoCanvas.current);
        }
      })
      .catch((error: any) => console.error(error));
  }

  function drawCanvas(canvas: HTMLCanvasElement, img: ImageBitmap) {
    canvas.width = Number(getComputedStyle(canvas).width.split('px')[0]);
    canvas.height = Number(getComputedStyle(canvas).height.split('px')[0]);

    const ratio = Math.min(canvas.width / img.width, canvas.height / img.height);
    const x = (canvas.width - img.width * ratio) / 2;
    const y = (canvas.height - img.height * ratio) / 2;

    const context2d = canvas.getContext('2d');
    if (context2d) {
      context2d.clearRect(0, 0, canvas.width, canvas.height);
      context2d.drawImage(img, 0, 0, img.width, img.height,
        x, y, img.width * ratio, img.height * ratio);
    }
  }

  return (
    <div className={blockClassName}>
      <div className="camera__column">
        <canvas ref={takePhotoCanvas} className="camera__preview" />
        <button type="button" disabled={isButtonsBlocked} onClick={onTakePhotoButtonClick} ref={takePhotoButton}>take a photo</button>
      </div>

      <div className="camera__column">
        <canvas ref={grabFrameCanvas} className="camera__preview"/>
        <button type="button" disabled={isButtonsBlocked} onClick={onGrabFrameButtonClick} ref={grabFrameButton}>grab a frame</button>
      </div>

      <div className="camera__column">
        {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
        <video ref={videoEl} className="camera__preview" />
        <button type="button" onClick={onGetUserMediaButtonClick}>open camera preview</button>
      </div>
    </div>
  );
};
