/* eslint-disable react-native/no-inline-styles */
import React, {useState, useRef} from 'react';

import api from './api';
import {RNCamera} from 'react-native-camera';
import * as S from './styles';

const CameraTest = () => {
  const [uri, setUri] = useState('');
  const cameraRef = useRef(null);

  const handleCapture = async () => {
    if (cameraRef) {
      const options = {quality: 0.5, base64: true};
      const data = await cameraRef.current.takePictureAsync(options);

      setUri(data.uri);

      try {
        const dataFile = new FormData();

        dataFile.append('file', {
          type: 'image/jpg',
          uri: data.uri,
          name: 'assignature.jpg',
        });

        const res = await api.post('/files', dataFile);
        console.log(res);
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <S.Container>
      <S.Camera
        ref={cameraRef}
        type={RNCamera.Constants.Type.back}
        autoFocus={RNCamera.Constants.AutoFocus.on}
        flashMode={RNCamera.Constants.FlashMode.off}
        androidCameraPermissionOptions={{
          title: 'Permission to use camera',
          message: 'We need your permission to use your camera',
          buttonPositive: 'Ok',
          buttonNegative: 'Cancel',
        }}
        captureAudio={false}
      />
      <S.Button onPress={() => handleCapture()}>
        <S.Text>Enviar</S.Text>
      </S.Button>
    </S.Container>
  );
};

export default CameraTest;
