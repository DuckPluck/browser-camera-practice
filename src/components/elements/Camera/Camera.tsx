'use client';

import classNames from 'classnames';
import React, { useEffect, useRef } from 'react';

import './Camera.scss';

interface Props {
  className?: string;
}

export const Camera = ({ className }: Props) => {
  const blockClassName = classNames('camera', className);

  let imageCapture: any;

  const videoEl = useRef<HTMLVideoElement>(null);
  const grabFrameButton = useRef<HTMLButtonElement>(null);
  const grabFrameCanvas = useRef<HTMLCanvasElement>(null);
  const takePhotoButton = useRef<HTMLButtonElement>(null);
  const takePhotoCanvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (videoEl.current) {
      console.log(4);
      videoEl.current.addEventListener('play', function() {
        if (grabFrameButton.current && takePhotoButton.current) {
          console.log(5);
          grabFrameButton.current.disabled = false;
          takePhotoButton.current.disabled = false;
        }
      });
    }
  }, []);

  function onGetUserMediaButtonClick() {
    console.log(1, navigator.mediaDevices);
    navigator.mediaDevices.getUserMedia({ video: true })
      .then((mediaStream) => {
        if (videoEl.current) {
          videoEl.current.srcObject = mediaStream;
          console.log(2, videoEl.current.srcObject);
        }

        const track = mediaStream.getVideoTracks()[0];
        imageCapture = new ImageCapture(track);
        console.log(3, imageCapture);
      })
      .catch((error: any) => console.error(error));
  }

  function onGrabFrameButtonClick() {
    imageCapture.grabFrame()
      .then((imageBitmap: ImageBitmap) => {
        if (grabFrameCanvas.current) {
          drawCanvas(grabFrameCanvas.current, imageBitmap);
        }
      })
      .catch((error: any) => console.error(error));
  }

  function onTakePhotoButtonClick() {
    imageCapture.takePhoto()
      .then((blob: Blob) => createImageBitmap(blob))
      .then((imageBitmap: ImageBitmap) => {
        if (takePhotoCanvas.current) {
          drawCanvas(takePhotoCanvas.current, imageBitmap);
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
        {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
        <video ref={videoEl} className="camera__preview" />
        <button type="button" onClick={onGetUserMediaButtonClick}>open camera preview</button>
      </div>

      <div className="camera__column">
        <canvas ref={takePhotoCanvas} className="camera__preview" />
        <button type="button" disabled={true} onClick={onTakePhotoButtonClick} ref={takePhotoButton}>take a photo</button>
      </div>

      <div className="camera__column">
        <canvas ref={grabFrameCanvas} className="camera__preview"/>
        <button type="button" disabled={true} onClick={onGrabFrameButtonClick} ref={grabFrameButton}>grab a frame</button>
      </div>
    </div>
  );
};
