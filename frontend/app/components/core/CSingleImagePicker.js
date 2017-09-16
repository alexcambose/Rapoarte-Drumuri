import React from 'react';
import ImagePicker from "react-native-image-picker";
import ImageResizer from 'react-native-image-resizer';
import NativeModules from 'NativeModules';
/*
    TODO: !!!!_THIS NEEDS TO BE REFACTORED A BIT_!!!!
 */
export default (callback) => {
    const options = {
        title: 'Selecteaza fotografii',
        cancelButtonTitle: 'Anuleaza',
        takePhotoButtonTitle: 'Deschide camera',
        chooseFromLibraryButtonTitle: 'Selecteaza din galerie',
        mediaType: 'photo',
        storageOptions: {
            skipBackup: true,
            path: 'images'
        }
    };
    ImagePicker.showImagePicker(options, (response) => {
        // console.log('Response = ', response);

        if(response.didCancel) return;
        // if(response.fileSize > 40000){alert('Imaginea nu poate fi mai mare de 40 de kb');return;}
        let { data, width, height, fileName, fileSize, path, latitude, longitude, timestamp } = response;
        if(fileSize > 30000){ //if the image is greater than 30 kb keep compressing :(

            let quality = 80;
            if(fileSize > 60000) quality = 50;
            else if(fileSize > 100000) quality = 20;
            else if(fileSize > 1000000) quality = 10;
            else if(fileSize > 2000000) quality = 1;

            ImageResizer.createResizedImage(path, 500, 300, 'JPEG', quality, 0).then((response) => {

                NativeModules.RNImageToBase64.getBase64String(response.uri, (err, base64)=>{

                    let source = {
                        uri: 'data:image/jpeg;base64,' + base64,
                        width,
                        height,
                        fileName: response.name,
                        fileSize: response.size,
                        path: response.path,
                        latitude,
                        longitude,
                        timestamp,
                    };
                    if(callback) callback(source);

                })

                // response.uri is the URI of the new image that can now be displayed, uploaded...
                // response.path is the path of the new image
                // response.name is the name of the new image with the extension
                // response.size is the size of the new image
            }).catch((err) => {
                console.log(err);
                // Oops, something went wrong. Check that the filename is correct and
                // inspect err to get more details.
            });
        }else{

            let source = {
                uri: 'data:image/jpeg;base64,' + data,
                width,
                height,
                fileName,
                fileSize,
                path,
                latitude,
                longitude,
                timestamp,
            };
            if(callback) callback(source);
        }

    });
}