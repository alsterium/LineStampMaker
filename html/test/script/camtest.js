window.onload = () => {
    const video = document.getElementById("camera");

    /*camera settings*/

    const constraints = {
        audio: false,
        video: {
            facingMode: "environment"
        }
    };

    /*sync camera to <video> tag */
    navigator.mediaDevices
        .getUserMedia(constraints)
        .then(stream => {
            video.srcObject = stream;
        })
        .catch(err => {
            console.log(err.name + ":" + err.message);
        });

};