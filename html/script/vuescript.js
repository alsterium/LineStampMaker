new Vue({
  el: "#app",
  data: {
    toggleView: true,
    stampEditMode: false,
    facingValue: "environment",
    selectedFont: "",
    Text: ""
  },
  methods: {
    grabImage: function() {
      var canvas = document.querySelector("#stampCanvas_lower");
      var stampBG = document.querySelector("#stampCanvas_upper");

      console.log(canvas);
      var context = canvas.getContext("2d");
      context.drawImage(stampBG, 0, 0, 400, 400);
      console.log(context);

      var zip = new JSZip();
      //var image = new Image();
      //image.src = canvas.toDataURL();
      //console.log(image);
      //image = window.atob(image.replace(/^.*,/,''));
      //console.log(image);
      zip.file("stamp.png", canvas.toDataURL().split("base64,")[1], {
        base64: true
      });

      // var image = new Image();
      // image = canvas.toDataURL();
      // console.log(image);
      // zip.file(image, contentOfA, {
      //   compression: "STORE"
      // });
      // console.log(zip);
      // //zip.file(image, bin_image, {binary: true});

      console.log(zip);

      //const uri = URL.createObjectURL(zip);

      //var FileSaver = require('file-saver');

      let link = document.getElementById("dllink");
      zip.generateAsync({ type: "blob" }).then(function(content) {
        saveAs(content, "stamp.zip");
      });
    },
    activateCamera: function() {
      this.toggleView = !this.toggleView;
      if (this.toggleView != true) this.initCamera();
    },
    initCamera: function() {
      var video = document.getElementById("cam_preview");

      /*camera settings*/

      var constraints = {
        audio: false,
        video: {
          facingMode: this.facingValue
        }
      };

      /*sync camera to <video> tag */
      navigator.mediaDevices
        .getUserMedia(constraints)
        .then(stream => {
          video.srcObject = stream;
          localMediaStream = stream;
        })
        .catch(err => {
          console.log(err.name + ":" + err.message);
        });
    },
    toggleCamera: function() {
      if (this.facingValue === "environment") {
        this.facingValue = "user";
        this.initCamera();
      } else if (this.facingValue === "user") {
        this.facingValue = "environment";
        this.initCamera();
      }
      console.log(this.facingValue);
    },
    toggleStampEditMode: function() {
      var modelPrevData = document.querySelector("#model_preview");
      var stampBG = document.querySelector("#stampCanvas_lower");

      //   var context = modelPrevData.getContext("2d");
      var context = modelPrevData.getContext("webgl"); //モデルを表示している部分はwebglコンテキスト（泣き）
      console.log(context);

      stampBG.getContext("2d").drawImage(modelPrevData, 0, 0, 400, 400);

      this.$nextTick(() => initStampCanvas()); //DOMレンダリングが更新されたタイミングで呼び出されるコールバック関数
      this.stampEditMode = true;
    },
    changeTextColor: function(str) {
      updateText(str, "text_color");
    },
    changeBorderWidth: function(val) {
      updateText(val, "border_weight");
    },
    changeFonts: function() {
      updateText(this.selectedFont, "font");
    },
    changeText: function() {
      updateText(this.Text, "text");
    },
    writeDownToLowerCanvas: function() {
      discardSelection();
      var canvas = document.querySelector("#stampCanvas_lower");
      var stampBG = document.querySelector("#stampCanvas_upper");
      var context = canvas.getContext("2d");
      context.drawImage(stampBG, 0, 0, 400, 400);
    }
  }
});
